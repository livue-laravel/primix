<?php

use Primix\Forms\Components\Fields\Textarea;
use Primix\Forms\Components\Fields\DatePicker;
use Primix\Forms\Components\Fields\TimePicker;
use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Fields\TagsInput;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\CheckboxList;
use Primix\Forms\Components\Fields\Slider;
use Primix\Forms\Components\Fields\Rating;
use Primix\Forms\Components\Fields\Knob;
use Primix\Forms\Components\Fields\PickList;
use Primix\Forms\Components\Fields\OrderList;
use Primix\Forms\Components\Fields\RichEditor;

// === Textarea ===

describe('Textarea', function () {
    it('adds maxLength auto-rule', function () {
        $field = Textarea::make('body')->maxLength(1000);

        expect($field->getRules())->toBe('max:1000');
    });

    it('adds minLength auto-rule', function () {
        $field = Textarea::make('body')->minLength(10);

        expect($field->getRules())->toBe('min:10');
    });

    it('adds both maxLength and minLength auto-rules', function () {
        $field = Textarea::make('body')->minLength(10)->maxLength(1000);

        expect($field->getRules())->toBe('max:1000|min:10');
    });

    it('has no auto-rules by default', function () {
        $field = Textarea::make('body');

        expect($field->getRules())->toBeNull();
    });
});

// === DatePicker ===

describe('DatePicker', function () {
    it('always adds date auto-rule', function () {
        $field = DatePicker::make('date');

        expect($field->getRules())->toBe('date');
    });

    it('adds after_or_equal auto-rule with minDate', function () {
        $field = DatePicker::make('date')->minDate('2024-01-01');

        expect($field->getRules())->toBe('date|after_or_equal:2024-01-01');
    });

    it('adds before_or_equal auto-rule with maxDate', function () {
        $field = DatePicker::make('date')->maxDate('2024-12-31');

        expect($field->getRules())->toBe('date|before_or_equal:2024-12-31');
    });

    it('adds both date boundary auto-rules', function () {
        $field = DatePicker::make('date')->minDate('2024-01-01')->maxDate('2024-12-31');

        expect($field->getRules())->toBe('date|after_or_equal:2024-01-01|before_or_equal:2024-12-31');
    });

    it('combines required + date auto-rules', function () {
        $field = DatePicker::make('date')->required()->minDate('2024-01-01');

        expect($field->getRules())->toBe('required|date|after_or_equal:2024-01-01');
    });
});

// === TimePicker ===

describe('TimePicker', function () {
    it('adds date_format:H:i auto-rule by default', function () {
        $field = TimePicker::make('time');

        expect($field->getRules())->toBe('date_format:H:i');
    });

    it('adds date_format:H:i:s auto-rule with seconds', function () {
        $field = TimePicker::make('time')->withSeconds();

        expect($field->getRules())->toBe('date_format:H:i:s');
    });

    it('combines required + time format auto-rule', function () {
        $field = TimePicker::make('time')->required();

        expect($field->getRules())->toBe('required|date_format:H:i');
    });
});

// === Repeater ===

describe('Repeater', function () {
    it('always adds array auto-rule', function () {
        $field = Repeater::make('items');

        expect($field->getRules())->toBe('array');
    });

    it('adds min auto-rule with minItems', function () {
        $field = Repeater::make('items')->minItems(1);

        expect($field->getRules())->toBe('array|min:1');
    });

    it('adds max auto-rule with maxItems', function () {
        $field = Repeater::make('items')->maxItems(5);

        expect($field->getRules())->toBe('array|max:5');
    });

    it('adds both min and max auto-rules', function () {
        $field = Repeater::make('items')->minItems(1)->maxItems(10);

        expect($field->getRules())->toBe('array|min:1|max:10');
    });
});

// === TagsInput ===

describe('TagsInput', function () {
    it('always adds array auto-rule', function () {
        $field = TagsInput::make('tags');

        expect($field->getRules())->toBe('array');
    });

    it('adds max auto-rule with maxItems', function () {
        $field = TagsInput::make('tags')->maxItems(5);

        expect($field->getRules())->toBe('array|max:5');
    });
});

// === Select ===

describe('Select', function () {
    it('has no auto-rules for single select', function () {
        $field = Select::make('status');

        expect($field->getRules())->toBeNull();
    });

    it('adds array auto-rule for multiple select', function () {
        $field = Select::make('categories')->multiple();

        expect($field->getRules())->toBe('array');
    });
});

// === CheckboxList ===

describe('CheckboxList', function () {
    it('always adds array auto-rule', function () {
        $field = CheckboxList::make('roles');

        expect($field->getRules())->toBe('array');
    });

    it('combines required + array auto-rule', function () {
        $field = CheckboxList::make('roles')->required();

        expect($field->getRules())->toBe('required|array');
    });
});

// === Slider ===

describe('Slider', function () {
    it('adds numeric and min/max auto-rules', function () {
        $field = Slider::make('value');

        expect($field->getRules())->toBe('numeric|min:0|max:100');
    });

    it('adds custom min/max auto-rules', function () {
        $field = Slider::make('value')->min(10)->max(50);

        expect($field->getRules())->toBe('numeric|min:10|max:50');
    });
});

// === Rating ===

describe('Rating', function () {
    it('adds integer and between auto-rules', function () {
        $field = Rating::make('score');

        expect($field->getRules())->toBe('integer|between:0,5');
    });

    it('adds between auto-rule with custom stars', function () {
        $field = Rating::make('score')->stars(10);

        expect($field->getRules())->toBe('integer|between:0,10');
    });
});

// === Knob ===

describe('Knob', function () {
    it('adds numeric and between auto-rules', function () {
        $field = Knob::make('volume');

        expect($field->getRules())->toBe('numeric|between:0,100');
    });

    it('adds between auto-rule with custom min/max', function () {
        $field = Knob::make('volume')->min(-10)->max(10);

        expect($field->getRules())->toBe('numeric|between:-10,10');
    });
});

// === PickList ===

describe('PickList', function () {
    it('always adds array auto-rule', function () {
        $field = PickList::make('selected');

        expect($field->getRules())->toBe('array');
    });
});

// === OrderList ===

describe('OrderList', function () {
    it('always adds array auto-rule', function () {
        $field = OrderList::make('items');

        expect($field->getRules())->toBe('array');
    });
});

// === RichEditor ===

describe('RichEditor', function () {
    it('has no auto-rules by default', function () {
        $field = RichEditor::make('content');

        expect($field->getRules())->toBeNull();
    });

    it('adds max auto-rule with maxLength', function () {
        $field = RichEditor::make('content')->maxLength(5000);

        expect($field->getRules())->toBe('max:5000');
    });
});
