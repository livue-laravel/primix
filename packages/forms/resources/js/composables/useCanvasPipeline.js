import { toCssFilter } from './useAdjustments.js';

/**
 * Apply unsharp mask sharpening via convolution kernel.
 */
function applySharpen(ctx, width, height, amount) {
    if (amount <= 0) return;

    const factor = amount / 100;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const output = ctx.createImageData(width, height);
    const out = output.data;

    // Unsharp mask kernel (sharpen)
    // Center weight increases with amount
    const center = 1 + 4 * factor;
    const edge = -factor;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;
            const top = ((y - 1) * width + x) * 4;
            const bottom = ((y + 1) * width + x) * 4;
            const left = (y * width + (x - 1)) * 4;
            const right = (y * width + (x + 1)) * 4;

            for (let c = 0; c < 3; c++) {
                const val = pixels[idx + c] * center
                    + pixels[top + c] * edge
                    + pixels[bottom + c] * edge
                    + pixels[left + c] * edge
                    + pixels[right + c] * edge;
                out[idx + c] = Math.min(255, Math.max(0, Math.round(val)));
            }
            out[idx + 3] = pixels[idx + 3]; // preserve alpha
        }
    }

    // Copy edge pixels unchanged
    for (let x = 0; x < width; x++) {
        const topIdx = x * 4;
        const bottomIdx = ((height - 1) * width + x) * 4;
        for (let c = 0; c < 4; c++) {
            out[topIdx + c] = pixels[topIdx + c];
            out[bottomIdx + c] = pixels[bottomIdx + c];
        }
    }
    for (let y = 0; y < height; y++) {
        const leftIdx = (y * width) * 4;
        const rightIdx = (y * width + (width - 1)) * 4;
        for (let c = 0; c < 4; c++) {
            out[leftIdx + c] = pixels[leftIdx + c];
            out[rightIdx + c] = pixels[rightIdx + c];
        }
    }

    ctx.putImageData(output, 0, 0);
}

/**
 * Determine output MIME type based on format config and original image type.
 */
function getOutputMimeType(format, originalName) {
    const mimeMap = {
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
    };

    if (format && format !== 'original') {
        return mimeMap[format] || 'image/png';
    }

    // Infer from original filename
    if (originalName) {
        const ext = originalName.split('.').pop()?.toLowerCase();
        return mimeMap[ext] || 'image/png';
    }

    return 'image/png';
}

/**
 * Get file extension for MIME type.
 */
function getExtension(mimeType) {
    const extMap = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
    };
    return extMap[mimeType] || 'png';
}

/**
 * Export pipeline: crop → adjustments/filters → sharpen → resize → blob
 */
export async function exportImage(croppedCanvas, options = {}) {
    const {
        adjustments = {},
        filterCss = null,
        outputFormat = 'original',
        outputQuality = 0.92,
        maxWidth = null,
        maxHeight = null,
        originalName = 'edited-image.png',
    } = options;

    let { width, height } = croppedCanvas;

    // Step 1: Calculate final dimensions (respecting maxWidth/maxHeight)
    if (maxWidth || maxHeight) {
        const mw = maxWidth || Infinity;
        const mh = maxHeight || Infinity;

        if (width > mw || height > mh) {
            const ratio = Math.min(mw / width, mh / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
        }
    }

    // Step 2: Create export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');

    // Step 3: Apply CSS filters (adjustments + filter preset) via ctx.filter
    const cssFilter = toCssFilter(adjustments, filterCss);
    if (cssFilter !== 'none' && typeof ctx.filter !== 'undefined') {
        ctx.filter = cssFilter;
    }

    // Step 4: Draw the cropped image (filter is applied during draw)
    ctx.drawImage(croppedCanvas, 0, 0, width, height);

    // Reset filter before sharpen pass
    ctx.filter = 'none';

    // Step 5: Apply sharpen if needed (pixel-level operation)
    if (adjustments.sharpen > 0) {
        applySharpen(ctx, width, height, adjustments.sharpen);
    }

    // Step 6: Export as blob
    const mimeType = getOutputMimeType(outputFormat, originalName);
    const quality = mimeType === 'image/png' ? undefined : outputQuality;

    return new Promise((resolve, reject) => {
        exportCanvas.toBlob(
            (blob) => {
                if (blob) {
                    // Create a File with proper name and extension
                    const baseName = originalName.replace(/\.[^.]+$/, '');
                    const ext = getExtension(mimeType);
                    const fileName = `${baseName}.${ext}`;
                    const file = new File([blob], fileName, { type: mimeType });
                    resolve(file);
                } else {
                    reject(new Error('Failed to export image'));
                }
            },
            mimeType,
            quality
        );
    });
}

export function useCanvasPipeline() {
    return { exportImage };
}
