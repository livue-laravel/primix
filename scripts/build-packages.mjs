import { existsSync, rmSync } from 'node:fs';
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
    '@primix/panels': path.resolve(rootDir, 'packages/primix/resources/js'),
};

const targets = [
    {
        label: 'support',
        entry: 'packages/support/resources/js/index.js',
        outDir: 'packages/support/dist',
        fileName: 'primix-support',
    },
    {
        label: 'forms',
        entry: 'packages/forms/resources/js/index.js',
        outDir: 'packages/forms/dist',
        fileName: 'primix-forms',
    },
    {
        label: 'tables',
        entry: 'packages/tables/resources/js/index.js',
        outDir: 'packages/tables/dist',
        fileName: 'primix-tables',
    },
    {
        label: 'actions',
        entry: 'packages/actions/resources/js/index.js',
        outDir: 'packages/actions/dist',
        fileName: 'primix-actions',
    },
    {
        label: 'notifications',
        entry: 'packages/notifications/resources/js/index.js',
        outDir: 'packages/notifications/dist',
        fileName: 'primix-notifications',
    },
    {
        label: 'widgets',
        entry: 'packages/widgets/resources/js/index.js',
        outDir: 'packages/widgets/dist',
        fileName: 'primix-widgets',
    },
    {
        label: 'panels',
        entry: 'packages/primix/resources/js/index.js',
        outDir: 'packages/primix/dist',
        fileName: 'primix-panels',
    },
    {
        label: 'full',
        entry: 'resources/js/primix.js',
        outDir: 'packages/primix/dist',
        fileName: 'primix',
    },
];

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
        plugins: [vue()],
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
            watch: watchMode ? {} : undefined,
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
