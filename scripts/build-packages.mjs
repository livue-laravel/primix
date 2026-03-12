import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const projectRoot = path.resolve(rootDir, '../..');
const watchMode = process.argv.includes('--watch');

const liVueEsmCandidates = [
    path.resolve(projectRoot, 'livue/resources/js/livue-esm.js'),
    path.resolve(projectRoot, 'vendor/livue/livue/dist/livue.esm.js'),
    path.resolve(rootDir, 'vendor/livue/livue/dist/livue.esm.js'),
];
const liVueEsmPath = liVueEsmCandidates.find((candidate) => existsSync(candidate));

if (!liVueEsmPath) {
    throw new Error('Unable to resolve LiVue ESM runtime for Primix package build.');
}

const aliases = {
    livue: liVueEsmPath,
    '@primix/support': path.resolve(rootDir, 'packages/support/resources/js'),
    '@primix/forms': path.resolve(rootDir, 'packages/forms/resources/js'),
    '@primix/tables': path.resolve(rootDir, 'packages/tables/resources/js'),
    '@primix/actions': path.resolve(rootDir, 'packages/actions/resources/js'),
    '@primix/notifications': path.resolve(rootDir, 'packages/notifications/resources/js'),
    '@primix/widgets': path.resolve(rootDir, 'packages/widgets/resources/js'),
    '@primix/panels': path.resolve(rootDir, 'packages/panels/resources/js'),
};

const targets = [
    {
        label: 'support',
        entry: 'packages/support/resources/js/index.js',
        outDir: 'packages/support/dist',
        fileName: 'primix-support',
        publicVendorDir: 'primix/support',
    },
    {
        label: 'forms',
        entry: 'packages/forms/resources/js/index.js',
        outDir: 'packages/forms/dist',
        fileName: 'primix-forms',
        publicVendorDir: 'primix/forms',
    },
    {
        label: 'tables',
        entry: 'packages/tables/resources/js/index.js',
        outDir: 'packages/tables/dist',
        fileName: 'primix-tables',
        publicVendorDir: 'primix/tables',
    },
    {
        label: 'actions',
        entry: 'packages/actions/resources/js/index.js',
        outDir: 'packages/actions/dist',
        fileName: 'primix-actions',
        publicVendorDir: 'primix/actions',
    },
    {
        label: 'notifications',
        entry: 'packages/notifications/resources/js/index.js',
        outDir: 'packages/notifications/dist',
        fileName: 'primix-notifications',
        publicVendorDir: 'primix/notifications',
    },
    {
        label: 'widgets',
        entry: 'packages/widgets/resources/js/index.js',
        outDir: 'packages/widgets/dist',
        fileName: 'primix-widgets',
        publicVendorDir: 'primix/widgets',
    },
    {
        label: 'panels',
        entry: 'packages/panels/resources/js/index.js',
        outDir: 'packages/panels/dist',
        fileName: 'primix-panels',
        publicVendorDir: 'primix/panels',
    },
];

/**
 * Vite plugin that copies built assets to public/vendor after every build.
 * Works in both normal build and watch mode (fires after each rebuild).
 */
function autoCopyPlugin(target, absoluteOutDir) {
    return {
        name: 'primix-auto-copy',
        closeBundle() {
            if (!target.publicVendorDir) return;

            const destDir = path.resolve(projectRoot, 'public/vendor/livue', target.publicVendorDir);
            mkdirSync(destDir, { recursive: true });

            for (const ext of ['.js', '.css', '.js.map']) {
                const src = path.join(absoluteOutDir, `${target.fileName}${ext}`);
                const dest = path.join(destDir, `${target.fileName}${ext}`);
                if (existsSync(src)) {
                    copyFileSync(src, dest);
                }
            }

            console.log(`  → copied to public/vendor/livue/${target.publicVendorDir}/`);
        },
    };
}

if (!watchMode) {
    rmSync(path.resolve(rootDir, 'dist'), { recursive: true, force: true });
}

const cleanedOutDirs = new Set();

for (const target of targets) {
    const absoluteOutDir = path.resolve(rootDir, target.outDir);
    const emptyOutDir = !cleanedOutDirs.has(absoluteOutDir);

    cleanedOutDirs.add(absoluteOutDir);

    // eslint-disable-next-line no-console
    console.log(`Building ${target.label} -> ${target.outDir}/${target.fileName}.{js,css}`);

    await build({
        configFile: false,
        root: rootDir,
        plugins: [vue(), autoCopyPlugin(target, absoluteOutDir)],
        css: {
            postcss: path.resolve(rootDir, 'postcss.config.js'),
        },
        resolve: {
            alias: aliases,
        },
        build: {
            outDir: absoluteOutDir,
            emptyOutDir,
            sourcemap: true,
            minify: false,
            cssCodeSplit: false,
            watch: watchMode ? {
                    exclude: ['**/dist/**', '**/node_modules/**', '**/public/vendor/**'],
                } : undefined,
            lib: {
                entry: {
                    [target.fileName]: path.resolve(rootDir, target.entry),
                },
                name: 'Primix',
                formats: ['es'],
            },
            rollupOptions: {
                external: [
                    'vue',
                    'livue',
                    /^@imgly\//,
                ],
                output: {
                    inlineDynamicImports: true,
                    entryFileNames: '[name].js',
                    assetFileNames: (assetInfo) => (
                        assetInfo.name?.endsWith('.css')
                            ? `${target.fileName}.css`
                            : '[name][extname]'
                    ),
                },
            },
        },
    });
}
