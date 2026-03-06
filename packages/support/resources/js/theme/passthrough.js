/**
 * Primix Default PassThrough
 *
 * Default PrimeVue PassThrough configuration for the Primix admin panel.
 * These styles provide the baseline admin-panel look and feel.
 *
 * PassThrough (PT) allows adding classes and attributes to PrimeVue
 * component DOM elements without overriding the theme.
 */

/**
 * Recursively deep-merge two PT objects.
 * Concatenates class strings rather than replacing them.
 */
export function mergePT(basePT, overridePT) {
    if (!overridePT) return basePT;
    if (!basePT) return overridePT;

    const result = { ...basePT };

    for (const component of Object.keys(overridePT)) {
        if (!result[component]) {
            result[component] = overridePT[component];
            continue;
        }

        result[component] = { ...result[component] };

        for (const section of Object.keys(overridePT[component])) {
            const baseSection = result[component][section];
            const overrideSection = overridePT[component][section];

            if (!baseSection) {
                result[component][section] = overrideSection;
                continue;
            }

            // Merge section objects (class, style, etc.)
            if (typeof baseSection === 'object' && typeof overrideSection === 'object') {
                result[component][section] = { ...baseSection };

                for (const attr of Object.keys(overrideSection)) {
                    if (attr === 'class' && baseSection.class) {
                        // Concatenate classes
                        result[component][section].class =
                            baseSection.class + ' ' + overrideSection.class;
                    } else {
                        result[component][section][attr] = overrideSection[attr];
                    }
                }
            } else {
                result[component][section] = overrideSection;
            }
        }
    }

    return result;
}

/**
 * Default Primix PassThrough configuration.
 * Currently empty — provides extension point for future admin-panel defaults.
 */
export const primixDefaultPT = {};
