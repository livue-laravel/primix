/**
 * Tooltip PrimeVue con fallback di posizione in senso orario.
 *
 * La catena di fallback nativa di PrimeVue non è oraria e soprattutto non
 * scatta mai quando il tooltip viene "strizzato" dal bordo del viewport
 * (il browser lo restringe per farcelo stare, quindi isOutOfBounds resta
 * false e il testo va in verticale). Insieme alla regola
 * `.p-tooltip { width: max-content }` nel CSS di support, questa direttiva
 * fa scegliere al tooltip la posizione successiva in senso orario che ha
 * spazio disponibile.
 */
import Tooltip from 'primevue/tooltip';

const SmartTooltip = Tooltip.extend('tooltip', {
    methods: {
        align(el) {
            // PrimeVue (fitContent, default true) imposta width: fit-content
            // INLINE sul tooltip: vince sulla regola CSS width: max-content e
            // vicino al bordo si restringe (testo in verticale) senza mai
            // andare out-of-bounds. Ripristiniamo la larghezza naturale prima
            // di misurare; il max-width: 20rem del CSS resta come tetto.
            const tooltipElement = this.getTooltipElement(el);

            if (tooltipElement) {
                tooltipElement.style.width = 'max-content';
            }

            const modifiers = el.$_ptooltipModifiers || {};
            const preferred = modifiers.top ? 'top' : modifiers.left ? 'left' : modifiers.bottom ? 'bottom' : 'right';

            const CLOCKWISE = {
                top: ['top', 'right', 'bottom', 'left'],
                right: ['right', 'bottom', 'left', 'top'],
                bottom: ['bottom', 'left', 'top', 'right'],
                left: ['left', 'top', 'right', 'bottom'],
            };

            const aligners = {
                top: this.alignTop,
                right: this.alignRight,
                bottom: this.alignBottom,
                left: this.alignLeft,
            };

            for (const pos of CLOCKWISE[preferred]) {
                aligners[pos].call(this, el);

                if (!this.isOutOfBounds(el)) {
                    return;
                }
            }

            // Nessuna posizione ha spazio (viewport minuscolo): resta la preferita.
            aligners[preferred].call(this, el);
        },
    },
});

export default SmartTooltip;
