import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');
const liVueEsmCandidates = [
    path.resolve(projectRoot, 'livue/resources/js/livue-esm.js'),
    path.resolve(projectRoot, 'vendor/livue/livue/dist/livue.esm.js'),
    path.resolve(__dirname, 'vendor/livue/livue/dist/livue.esm.js'),
];
const liVueEsmPath = liVueEsmCandidates.find((candidate) => existsSync(candidate));

if (!liVueEsmPath) {
    throw new Error('Unable to resolve LiVue ESM runtime for Primix package build.');
}

export default defineConfig({
    plugins: [
        vue(),
    ],
    build: {
        lib: {
            entry: {
                // Main entry (includes everything)
                'primix': path.resolve(__dirname, 'resources/js/primix.js'),
                // Individual package entries
                'primix-support': path.resolve(__dirname, 'packages/support/resources/js/index.js'),
                'primix-forms': path.resolve(__dirname, 'packages/forms/resources/js/index.js'),
                'primix-tables': path.resolve(__dirname, 'packages/tables/resources/js/index.js'),
                'primix-actions': path.resolve(__dirname, 'packages/actions/resources/js/index.js'),
                'primix-notifications': path.resolve(__dirname, 'packages/notifications/resources/js/index.js'),
                'primix-widgets': path.resolve(__dirname, 'packages/widgets/resources/js/index.js'),
                'primix-panels': path.resolve(__dirname, 'packages/primix/resources/js/index.js'),
            },
            name: 'Primix',
            formats: ['es'],
        },
        outDir: 'dist',
        // Split CSS per entry/package (primix-support.css, primix-forms.css, ...)
        cssCodeSplit: true,
        rollupOptions: {
            // External dependencies - resolved via importmap at runtime
            external: [
                'vue',
                'livue',
                // @imgly pulls in ONNX Runtime (~124MB) - load from CDN via import map
                /^@imgly\//,
            ],
            output: {
                // Preserve module structure for tree-shaking
                preserveModules: false,
                // Global vars for UMD build
                globals: {
                    vue: 'Vue',
                    livue: 'LiVue',
                },
                // Asset naming
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    // Forms entry is emitted by Vite as "index.css"; keep package naming stable.
                    if (assetInfo.name === 'index.css') {
                        return 'primix-forms.css';
                    }

                    return '[name][extname]';
                },
            },
        },
        // Generate sourcemaps for debugging
        sourcemap: true,
        // Don't minify for better debugging (can enable for production)
        minify: false,
    },
    css: {
        postcss: './postcss.config.js',
    },
    resolve: {
        alias: {
            // LiVue from project root
            'livue': liVueEsmPath,
            // Primix packages
            '@primix/support': path.resolve(__dirname, 'packages/support/resources/js'),
            '@primix/forms': path.resolve(__dirname, 'packages/forms/resources/js'),
            '@primix/tables': path.resolve(__dirname, 'packages/tables/resources/js'),
            '@primix/actions': path.resolve(__dirname, 'packages/actions/resources/js'),
            '@primix/notifications': path.resolve(__dirname, 'packages/notifications/resources/js'),
            '@primix/widgets': path.resolve(__dirname, 'packages/widgets/resources/js'),
            '@primix/panels': path.resolve(__dirname, 'packages/primix/resources/js'),
        },
    },
});
