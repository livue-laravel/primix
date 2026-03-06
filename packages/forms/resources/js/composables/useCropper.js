import { ref, onBeforeUnmount } from 'vue';
import Cropper from 'cropperjs';

export function useCropper() {
    const cropperInstance = ref(null);
    const isReady = ref(false);

    let currentScaleX = 1;
    let currentScaleY = 1;

    function initCropper(imageElement, options = {}) {
        destroy();

        currentScaleX = 1;
        currentScaleY = 1;

        cropperInstance.value = new Cropper(imageElement, {
            ...options,
        });

        isReady.value = true;
    }

    function getCropperSelection() {
        return cropperInstance.value?.getCropperSelection?.();
    }

    function getCropperImage() {
        return cropperInstance.value?.getCropperImage?.();
    }

    function getCropperCanvas() {
        return cropperInstance.value?.getCropperCanvas?.();
    }

    async function getCroppedCanvas(options = {}) {
        const selection = getCropperSelection();
        if (!selection) return null;
        return await selection.$toCanvas(options);
    }

    /**
     * Apply crop by computing the inverse affine transform from selection
     * coordinates (in the cropper-canvas CSS pixel space) to the image's
     * natural pixel coordinates.
     *
     * Cropper.js v2 stores the raw transform matrix in $matrix and applies
     * it as CSS `transform: matrix(...)`.  CSS applies that matrix relative
     * to `transform-origin: 50% 50%` of the element (whose size is set to
     * naturalWidth × naturalHeight).  We must account for the origin shift
     * when inverting the transform.
     *
     * The result is a full-resolution crop drawn directly from the source
     * <img>, independent of the on-screen display resolution.
     */
    async function applyCrop() {
        const selection = getCropperSelection();
        const image = getCropperImage();
        if (!selection || !image) return null;

        const sw = selection.width;
        const sh = selection.height;
        if (sw <= 0 || sh <= 0) return null;

        // Wait for the underlying <img> element
        const imgEl = await image.$ready();
        const natW = imgEl.naturalWidth;
        const natH = imgEl.naturalHeight;
        if (natW <= 0 || natH <= 0) return null;

        // Raw matrix from Cropper.js (same as the CSS `matrix()` values)
        const [a, b, c, d, e, f] = image.$getTransform();

        // CSS transform-origin is 50% 50% of the element, which is set to
        // naturalWidth × naturalHeight.
        const ox = natW / 2;
        const oy = natH / 2;

        // Effective affine translation after accounting for transform-origin:
        //   parentPos = T(ox,oy) · M · T(-ox,-oy) · localPos
        // which gives:
        //   eEff = e + ox·(1-a) - oy·c
        //   fEff = f + oy·(1-d) - ox·b
        const eEff = e + ox * (1 - a) - oy * c;
        const fEff = f + oy * (1 - d) - ox * b;

        // Determinant of the 2×2 part [a c; b d]
        const det = a * d - b * c;
        if (Math.abs(det) < 1e-6) return null;

        // Invert the affine transform: imagePos = M⁻¹ · (selectionPos − translation)
        const sx = selection.x;
        const sy = selection.y;

        // Top-left corner in image natural coordinates
        const x1 = ( d * (sx      - eEff) - c * (sy      - fEff)) / det;
        const y1 = (-b * (sx      - eEff) + a * (sy      - fEff)) / det;
        // Bottom-right corner
        const x2 = ( d * (sx + sw - eEff) - c * (sy + sh - fEff)) / det;
        const y2 = (-b * (sx + sw - eEff) + a * (sy + sh - fEff)) / det;

        // Handle flips (x2 < x1 or y2 < y1)
        const cropX = Math.max(0, Math.round(Math.min(x1, x2)));
        const cropY = Math.max(0, Math.round(Math.min(y1, y2)));
        const cropW = Math.min(natW - cropX, Math.round(Math.abs(x2 - x1)));
        const cropH = Math.min(natH - cropY, Math.round(Math.abs(y2 - y1)));
        if (cropW <= 0 || cropH <= 0) return null;

        // Draw the cropped region from the source image at natural resolution
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const ctx = cropCanvas.getContext('2d');
        ctx.drawImage(imgEl, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        return new Promise((resolve) => {
            cropCanvas.toBlob((blob) => {
                resolve(blob ? URL.createObjectURL(blob) : null);
            }, 'image/png');
        });
    }

    /**
     * Get the full canvas as a canvas element (for final export).
     * Includes image + all transforms (rotate, flip, zoom) at full resolution.
     */
    async function getFullCanvas() {
        const cropperCanvas = getCropperCanvas();
        if (!cropperCanvas) return null;
        return await cropperCanvas.$toCanvas();
    }

    function setAspectRatio(ratio) {
        const selection = getCropperSelection();
        if (selection) {
            // NaN = free aspect ratio
            selection.aspectRatio = ratio === null || ratio === undefined ? NaN : ratio;
        }
    }

    function rotate(degrees) {
        const image = getCropperImage();
        if (image) {
            image.$rotate(`${degrees}deg`);
        }
    }

    function flipHorizontal() {
        const image = getCropperImage();
        if (image) {
            currentScaleX = currentScaleX * -1;
            image.$scale(currentScaleX, currentScaleY);
        }
    }

    function flipVertical() {
        const image = getCropperImage();
        if (image) {
            currentScaleY = currentScaleY * -1;
            image.$scale(currentScaleX, currentScaleY);
        }
    }

    function zoom(ratio) {
        const image = getCropperImage();
        if (image) {
            image.$zoom(ratio);
        }
    }

    function setCropVisible(visible) {
        if (!cropperInstance.value) return;
        const canvas = getCropperCanvas();
        if (!canvas) return;

        // Use a CSS class instead of `hidden` attribute so the selection
        // stays in the DOM with its exact coordinates preserved.
        if (visible) {
            canvas.classList.remove('crop-hidden');
        } else {
            canvas.classList.add('crop-hidden');
        }
    }

    function resetTransform() {
        const image = getCropperImage();
        const selection = getCropperSelection();
        if (image) {
            currentScaleX = 1;
            currentScaleY = 1;
            image.$resetTransform();
            image.$center('contain');
        }
        if (selection) {
            selection.$reset();
        }
    }

    function replaceImage(url) {
        if (!cropperInstance.value) return;

        const image = getCropperImage();
        if (image) {
            currentScaleX = 1;
            currentScaleY = 1;
            image.src = url;
            image.$resetTransform();
            image.$center('contain');
        }
    }

    function destroy() {
        if (cropperInstance.value) {
            cropperInstance.value.destroy?.();
            cropperInstance.value = null;
            isReady.value = false;
        }
    }

    onBeforeUnmount(() => {
        destroy();
    });

    return {
        cropperInstance,
        isReady,
        initCropper,
        getCroppedCanvas,
        applyCrop,
        getFullCanvas,
        getCropperSelection,
        getCropperImage,
        getCropperCanvas,
        setAspectRatio,
        setCropVisible,
        rotate,
        flipHorizontal,
        flipVertical,
        zoom,
        resetTransform,
        replaceImage,
        destroy,
    };
}
