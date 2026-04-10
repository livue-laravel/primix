import { createRequire } from 'module'

/**
 * Primix Vite Plugin
 *
 * Forces Vue to use the full build (runtime + template compiler) instead of
 * the runtime-only default exported by Vue's package.json.
 *
 * LiVue compiles PHP-driven Vue templates at runtime in the browser, which
 * requires the Vue template compiler. Vue's package.json exports the
 * runtime-only build by default (`vue.runtime.esm-bundler.js`), which lacks
 * the compiler and causes a "Runtime compilation is not supported" error.
 *
 * In dev mode this plugin adds a Vite alias: `vue` → `vue.esm-bundler.js`.
 * In build mode it also ensures the aliased path is treated as external
 * (so Vue is not bundled) and remapped back to the bare `vue` specifier
 * in the output, allowing the browser import map to resolve it at runtime.
 *
 * @example
 * // vite.config.js
 * import { primixPlugin } from './vendor/primix/support/vite-plugin.mjs'
 *
 * export default defineConfig({
 *     plugins: [laravel({...}), tailwindcss(), vue(), primixPlugin()],
 * })
 */
export function primixPlugin() {
    const require = createRequire(import.meta.url)
    const vuePath = require.resolve('vue/dist/vue.esm-bundler.js')
    let isBuild = false

    return {
        name: 'primix',
        enforce: 'pre',

        config(config, { command }) {
            isBuild = command === 'build'

            return {
                resolve: {
                    alias: [{ find: /^vue$/, replacement: vuePath }],
                },
            }
        },

        configResolved(config) {
            if (!isBuild) return

            // Ensure rollupOptions exists (Vite allows mutating configResolved).
            config.build.rollupOptions ??= {}
            const rollup = config.build.rollupOptions

            // Wrap the user's existing external so vuePath is also externalized.
            // Rollup sees vuePath after alias resolution; without this it would
            // bundle the full Vue build into the app chunk.
            const userExternal = rollup.external
            rollup.external = (id, importer, isResolved) => {
                if (id === vuePath) return true
                if (typeof userExternal === 'function') return userExternal(id, importer, isResolved)
                if (Array.isArray(userExternal)) return userExternal.includes(id)
                if (typeof userExternal === 'string') return userExternal === id
                return false
            }

            // Remap vuePath back to the bare 'vue' specifier in the output so
            // the browser resolves it through the import map at runtime.
            rollup.output ??= {}
            if (!Array.isArray(rollup.output)) {
                rollup.output.paths = { [vuePath]: 'vue', ...(rollup.output.paths ?? {}) }
            }
        },
    }
}
