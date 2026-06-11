/**
 * Primix Forms - PrimeVue Form Components
 *
 * Registers form input components.
 */

import { defineAsyncComponent } from 'vue';
import LiVue from 'livue';
import { ensurePrimeVueTheme } from '@primix/support/primix';

import '../css/index.css';

// Custom Primix Components
import TextInput from './components/TextInput.vue';
import TagsInput from './components/TagsInput.vue';
import CheckboxList from './components/CheckboxList.vue';

// Text Inputs
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

// Selection
import Select from 'primevue/select';

// Boolean
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';

// Advanced (small)
import Rating from 'primevue/rating';
import Knob from 'primevue/knob';

// Input Variants (small)
import InputOtp from 'primevue/inputotp';

// Toggle Variants
import ToggleButton from 'primevue/togglebutton';
import SelectButton from 'primevue/selectbutton';

// Accordion (Tabs variant)
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

// Stepper (Wizard)
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepItem from 'primevue/stepitem';
import StepPanels from 'primevue/steppanels';
import StepPanel from 'primevue/steppanel';
import StepIndicator from 'primevue/step';

// Form Layout
import FloatLabel from 'primevue/floatlabel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

const registerFormsComponents = (app) => {
    if (app?.config?.globalProperties?.__primixFormsReady) {
        return;
    }

    app.config.globalProperties.__primixFormsReady = true;
    ensurePrimeVueTheme(app);

    // Custom Primix Components
    app.component('PrimixTextInput', TextInput);
    app.component('PrimixTagsInput', TagsInput);
    app.component('PrimixCheckboxList', CheckboxList);

    // Heavy custom components (lazy - loaded only when used)
    app.component('PrimixImageEditor', defineAsyncComponent(() => import('./components/ImageEditor.vue')));
    app.component('PrimixRichEditor', defineAsyncComponent(() => import('./components/RichEditor.vue')));

    // Heavy PrimeVue fields (lazy - each becomes its own chunk, downloaded
    // only when a form on the page actually uses the component)
    app.component('PDatePicker', defineAsyncComponent(() => import('primevue/datepicker')));
    app.component('PMultiSelect', defineAsyncComponent(() => import('primevue/multiselect')));
    app.component('PAutoComplete', defineAsyncComponent(() => import('primevue/autocomplete')));
    app.component('PListbox', defineAsyncComponent(() => import('primevue/listbox')));
    app.component('PTreeSelect', defineAsyncComponent(() => import('primevue/treeselect')));
    app.component('PCascadeSelect', defineAsyncComponent(() => import('primevue/cascadeselect')));
    app.component('PInputNumber', defineAsyncComponent(() => import('primevue/inputnumber')));
    app.component('PInputMask', defineAsyncComponent(() => import('primevue/inputmask')));
    app.component('PPassword', defineAsyncComponent(() => import('primevue/password')));
    app.component('PColorPicker', defineAsyncComponent(() => import('primevue/colorpicker')));
    app.component('PSlider', defineAsyncComponent(() => import('primevue/slider')));
    app.component('PPickList', defineAsyncComponent(() => import('primevue/picklist')));
    app.component('POrderList', defineAsyncComponent(() => import('primevue/orderlist')));

    // Text Inputs
    app.component('PInputText', InputText);
    app.component('PTextarea', Textarea);

    // Selection
    app.component('PSelect', Select);

    // Boolean
    app.component('PCheckbox', Checkbox);
    app.component('PRadioButton', RadioButton);
    app.component('PToggleSwitch', ToggleSwitch);

    // Advanced (small)
    app.component('PRating', Rating);
    app.component('PKnob', Knob);

    // Input Variants (small)
    app.component('PInputOtp', InputOtp);

    // Toggle Variants
    app.component('PToggleButton', ToggleButton);
    app.component('PSelectButton', SelectButton);

    // Accordion (Tabs variant)
    app.component('PAccordion', Accordion);
    app.component('PAccordionPanel', AccordionPanel);
    app.component('PAccordionHeader', AccordionHeader);
    app.component('PAccordionContent', AccordionContent);

    // Stepper (Wizard)
    app.component('PStepper', Stepper);
    app.component('PStepList', StepList);
    app.component('PStepItem', StepItem);
    app.component('PStepPanels', StepPanels);
    app.component('PStepPanel', StepPanel);
    app.component('PStep', StepIndicator);

    // Form Layout
    app.component('PFloatLabel', FloatLabel);
    app.component('PInputGroup', InputGroup);
    app.component('PInputGroupAddon', InputGroupAddon);
};

LiVue.setup(registerFormsComponents);
