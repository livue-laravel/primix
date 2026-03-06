import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // Primix Blade templates
        './packages/*/resources/views/**/*.blade.php',
        // PrimeVue components
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    plugins: [primeui],
};
