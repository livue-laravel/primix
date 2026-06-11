import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
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

const nodeModulesCandidates = [
    path.resolve(rootDir, 'node_modules'),
    path.resolve(projectRoot, 'node_modules'),
];

function resolveNodeModule(name) {
    const dir = nodeModulesCandidates
        .map((base) => path.join(base, name))
        .find((candidate) => existsSync(candidate));

    if (!dir) {
        throw new Error(`Unable to resolve node module "${name}" for Primix package build.`);
    }

    return dir;
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

/**
 * All packages are compiled in a SINGLE multi-entry build so Rollup extracts
 * the modules shared between entries (PrimeVue core, theme preset, Primix
 * support utilities, ...) into common chunks instead of duplicating them in
 * every bundle.
 *
 * Output layout mirrors the published URL layout (public/vendor/livue/primix):
 *
 *   dist/<pkg>/primix-<pkg>.js          one entry per package
 *   dist/support/chunks/<name>-<hash>.js shared + lazy chunks (shipped by the
 *                                        support package, required by all);
 *                                        entries import them via relative
 *                                        paths such as ../support/chunks/x.js
 *   dist/support/primix-support.css     single merged stylesheet (per-package
 *                                        CSS is negligible and merging keeps
 *                                        lazy-chunk styles eagerly available)
 */
const packages = ['support', 'forms', 'tables', 'actions', 'notifications', 'widgets', 'panels'];
const buildDir = path.resolve(rootDir, 'dist');

/**
 * Stage non-bundled runtime files into dist/support so they are distributed
 * and published together with the compiled bundles: self-hosted Vue for the
 * import map and primeicons with external font files (fonts inlined as
 * base64 by Vite lib mode would bloat the CSS bundle).
 */
function stageStaticAssets() {
    const supportOut = path.join(buildDir, 'support');
    mkdirSync(supportOut, { recursive: true });

    const vueDir = resolveNodeModule('vue');
    copyFileSync(
        path.join(vueDir, 'dist/vue.esm-browser.prod.js'),
        path.join(supportOut, 'vue.esm-browser.prod.js'),
    );

    const primeiconsDir = resolveNodeModule('primeicons');
    const iconsOutDir = path.join(supportOut, 'primeicons');
    mkdirSync(path.join(iconsOutDir, 'fonts'), { recursive: true });
    copyFileSync(
        path.join(primeiconsDir, 'primeicons.css'),
        path.join(iconsOutDir, 'primeicons.css'),
    );
    cpSync(path.join(primeiconsDir, 'fonts'), path.join(iconsOutDir, 'fonts'), { recursive: true });
}

/**
 * Vite plugin that distributes the build output after every build (works in
 * both normal build and watch mode):
 *   1. dist/<pkg>/ -> packages/<pkg>/dist/   (shipped with each composer package)
 *   2. dist/<pkg>/ -> public/vendor/livue/primix/<pkg>/   (local dev app)
 */
function distributePlugin() {
    return {
        name: 'primix-distribute',
        closeBundle() {
            stageStaticAssets();

            const publicBase = path.resolve(projectRoot, 'public/vendor/livue/primix');

            for (const pkg of packages) {
                const src = path.join(buildDir, pkg);
                if (!existsSync(src)) continue;

                const packageDist = path.resolve(rootDir, `packages/${pkg}/dist`);
                rmSync(packageDist, { recursive: true, force: true });
                cpSync(src, packageDist, { recursive: true });

                const publicDest = path.join(publicBase, pkg);
                rmSync(publicDest, { recursive: true, force: true });
                cpSync(src, publicDest, { recursive: true });
            }

            console.log('  → distributed to packages/*/dist/ and public/vendor/livue/primix/');
        },
    };
}

await build({
    configFile: false,
    root: rootDir,
    plugins: [vue(), distributePlugin()],
    css: {
        postcss: path.resolve(rootDir, 'postcss.config.js'),
    },
    resolve: {
        alias: aliases,
    },
    build: {
        outDir: buildDir,
        emptyOutDir: true,
        sourcemap: true,
        minify: true,
        // Single merged stylesheet: keeps styles of lazy chunks (editors)
        // eagerly available and avoids per-chunk CSS that lib mode would
        // never inject at runtime.
        cssCodeSplit: false,
        watch: watchMode ? {
                exclude: ['**/dist/**', '**/node_modules/**', '**/public/vendor/**'],
            } : undefined,
        lib: {
            entry: Object.fromEntries(packages.map((pkg) => [
                `primix-${pkg}`,
                path.resolve(rootDir, `packages/${pkg}/resources/js/index.js`),
            ])),
            name: 'Primix',
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'vue',
                'livue',
                // @imgly pulls in ONNX Runtime (~124MB) - load from CDN via import map
                /^@imgly\//,
            ],
            output: {
                entryFileNames: (chunk) => `${chunk.name.replace(/^primix-/, '')}/[name].js`,
                chunkFileNames: 'support/chunks/[name]-[hash].js',
                assetFileNames: (assetInfo) => (
                    assetInfo.name?.endsWith('.css')
                        ? 'support/primix-support.css'
                        : 'support/[name][extname]'
                ),
            },
        },
    },
});
