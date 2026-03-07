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
import InputMask from 'primevue/inputmask';
import Textarea from 'primevue/textarea';

// Selection
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import AutoComplete from 'primevue/autocomplete';
import Listbox from 'primevue/listbox';

// Boolean
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import ToggleSwitch from 'primevue/toggleswitch';

// Date & Time
import DatePicker from 'primevue/datepicker';

// Advanced
import ColorPicker from 'primevue/colorpicker';
import Slider from 'primevue/slider';
import Rating from 'primevue/rating';
import Knob from 'primevue/knob';

// Select Variants
import TreeSelect from 'primevue/treeselect';
import CascadeSelect from 'primevue/cascadeselect';

// Input Variants
import InputOtp from 'primevue/inputotp';
import Password from 'primevue/password';
import InputNumber from 'primevue/inputnumber';

// Toggle Variants
import ToggleButton from 'primevue/togglebutton';
import SelectButton from 'primevue/selectbutton';

// Accordion (Tabs variant)
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

// Data Components
import PickList from 'primevue/picklist';
import OrderList from 'primevue/orderlist';

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

    // Text Inputs
    app.component('PInputText', InputText);
    app.component('PInputMask', InputMask);
    app.component('PTextarea', Textarea);

    // Selection
    app.component('PSelect', Select);
    app.component('PMultiSelect', MultiSelect);
    app.component('PAutoComplete', AutoComplete);
    app.component('PListbox', Listbox);

    // Boolean
    app.component('PCheckbox', Checkbox);
    app.component('PRadioButton', RadioButton);
    app.component('PToggleSwitch', ToggleSwitch);

    // Date & Time
    app.component('PDatePicker', DatePicker);

    // Advanced
    app.component('PColorPicker', ColorPicker);
    app.component('PSlider', Slider);
    app.component('PRating', Rating);
    app.component('PKnob', Knob);

    // Select Variants
    app.component('PTreeSelect', TreeSelect);
    app.component('PCascadeSelect', CascadeSelect);

    // Input Variants
    app.component('PInputOtp', InputOtp);
    app.component('PPassword', Password);
    app.component('PInputNumber', InputNumber);

    // Toggle Variants
    app.component('PToggleButton', ToggleButton);
    app.component('PSelectButton', SelectButton);

    // Accordion (Tabs variant)
    app.component('PAccordion', Accordion);
    app.component('PAccordionPanel', AccordionPanel);
    app.component('PAccordionHeader', AccordionHeader);
    app.component('PAccordionContent', AccordionContent);

    // Data Components
    app.component('PPickList', PickList);
    app.component('POrderList', OrderList);

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
