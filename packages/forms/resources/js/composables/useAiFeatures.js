import { ref } from 'vue';

/**
 * Client-side AI image processing features.
 * No server, no API keys needed.
 */
export function useAiFeatures() {
    const processing = ref(null); // feature name being processed, or null
    const progress = ref(0);

    /**
     * Remove background using @imgly/background-removal (ONNX + WebAssembly).
     * Runs entirely in the browser. First use downloads ~30MB model (cached).
     */
    async function removeBackground(imageUrl) {
        const { removeBackground: removeBg } = await import('@imgly/background-removal');

        // Convert image to a blob URL to avoid the library treating
        // relative paths as relative to its publicPath CDN.
        const imageBlobUrl = await toAbsoluteBlobUrl(imageUrl);

        try {
            const blob = await removeBg(imageBlobUrl, {
                publicPath: 'https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/',
                progress: (key, current, total) => {
                    if (total > 0) {
                        progress.value = Math.round((current / total) * 100);
                    }
                },
            });

            return URL.createObjectURL(blob);
        } finally {
            URL.revokeObjectURL(imageBlobUrl);
        }
    }

    /**
     * Auto-enhance: auto-levels (histogram stretch) + slight sharpen.
     * Pure canvas, no dependencies.
     */
    async function autoEnhance(imageUrl) {
        const img = await loadImage(imageUrl);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Build luminance histogram
        const histogram = new Uint32Array(256);
        for (let i = 0; i < pixels.length; i += 4) {
            const lum = Math.round(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
            histogram[lum]++;
        }

        // Find 1% and 99% percentiles for auto-levels
        const totalPixels = canvas.width * canvas.height;
        const lowThreshold = totalPixels * 0.01;
        const highThreshold = totalPixels * 0.99;

        let low = 0, high = 255, count = 0;
        for (let i = 0; i < 256; i++) {
            count += histogram[i];
            if (count >= lowThreshold) { low = i; break; }
        }
        count = 0;
        for (let i = 255; i >= 0; i--) {
            count += histogram[i];
            if (count >= (totalPixels - highThreshold)) { high = i; break; }
        }

        // Apply levels stretch
        if (high > low) {
            const scale = 255 / (high - low);
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i] = Math.min(255, Math.max(0, Math.round((pixels[i] - low) * scale)));
                pixels[i + 1] = Math.min(255, Math.max(0, Math.round((pixels[i + 1] - low) * scale)));
                pixels[i + 2] = Math.min(255, Math.max(0, Math.round((pixels[i + 2] - low) * scale)));
            }
        }

        // Slight sharpen via convolution
        ctx.putImageData(imageData, 0, 0);
        const sharpened = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const src = new Uint8ClampedArray(sharpened.data);
        const w = canvas.width;
        const factor = 0.3;
        const center = 1 + 4 * factor;
        const edge = -factor;

        for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                const idx = (y * w + x) * 4;
                for (let c = 0; c < 3; c++) {
                    const val =
                        src[idx + c] * center +
                        src[((y - 1) * w + x) * 4 + c] * edge +
                        src[((y + 1) * w + x) * 4 + c] * edge +
                        src[(y * w + x - 1) * 4 + c] * edge +
                        src[(y * w + x + 1) * 4 + c] * edge;
                    sharpened.data[idx + c] = Math.min(255, Math.max(0, Math.round(val)));
                }
            }
        }

        ctx.putImageData(sharpened, 0, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, 'image/png');
        });
    }

    /**
     * Process an image with a named feature. Returns a new object URL.
     */
    async function processFeature(featureName, imageUrl) {
        processing.value = featureName;
        progress.value = 0;

        try {
            switch (featureName) {
                case 'background-removal':
                    return await removeBackground(imageUrl);
                case 'auto-enhance':
                    return await autoEnhance(imageUrl);
                default:
                    throw new Error(`Unknown feature: ${featureName}`);
            }
        } finally {
            processing.value = null;
            progress.value = 0;
        }
    }

    return {
        processing,
        progress,
        processFeature,
    };
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

async function toAbsoluteBlobUrl(url) {
    // Already a blob URL - return as-is
    if (url.startsWith('blob:')) return url;

    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}
