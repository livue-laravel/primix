<?php

use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;
use Primix\Forms\Form;
use Primix\Forms\Components\Fields\FileUpload;
use Primix\Forms\Components\Fields\Select;
use Primix\Forms\Components\Fields\Repeater;
use Primix\Forms\Components\Fields\TextInput;
use Primix\Forms\Components\Layouts\Section;
use Primix\Forms\Components\Layouts\Wizard;
use Primix\Forms\Components\Layouts\Wizard\Step;
use Primix\Forms\Concerns\WatchesFormState;
use Primix\Support\Enums\SchemaContext;

it('can be created with make', function () {
    $form = Form::make();

    expect($form)->toBeInstanceOf(Form::class);
});

it('has default name of form', function () {
    $form = Form::make();

    expect($form->getName())->toBe('form');
});

it('can set custom name', function () {
    $form = Form::make()->name('editForm');

    expect($form->getName())->toBe('editForm');
});

it('has form context', function () {
    $form = Form::make();

    expect($form->getContext())->toBe(SchemaContext::Form);
});

it('can set schema', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    expect($form->getComponents())->toHaveCount(2);
});

it('extracts leaf fields from flat schema', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveCount(2);
    expect(array_keys($fields))->toBe(['title', 'slug']);
});

it('extracts leaf fields from nested schema', function () {
    $form = Form::make()->schema([
        Section::make('Details')->schema([
            TextInput::make('title'),
            TextInput::make('slug'),
        ]),
        TextInput::make('author'),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveCount(3);
});

it('collects validation rules from all fields', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->required()->rules('max:255'),
        TextInput::make('email')->rules('email'),
        TextInput::make('optional'),
    ]);

    $rules = $form->getValidationRules();

    expect($rules)->toHaveCount(2);
    expect($rules['title'])->toBe('required|max:255');
    expect($rules['email'])->toBe('email');
});

it('collects validation messages from all fields', function () {
    $form = Form::make()->schema([
        TextInput::make('title')
            ->required()
            ->validationMessages(['required' => 'Title is required']),
        TextInput::make('email')
            ->validationMessages(['email' => 'Invalid email']),
    ]);

    $messages = $form->getValidationMessages();

    expect($messages)->toHaveKey('title.required', 'Title is required');
    expect($messages)->toHaveKey('email.email', 'Invalid email');
});

it('has default submit action', function () {
    $form = Form::make();

    expect($form->getSubmitAction())->toBe('submit');
});

it('can set custom submit action', function () {
    $form = Form::make()->submitAction('save');

    expect($form->getSubmitAction())->toBe('save');
});

it('can disable submit action', function () {
    $form = Form::make()->submitAction(null);

    expect($form->getSubmitAction())->toBeNull();
});

it('has no submit button by default', function () {
    $form = Form::make();

    expect($form->hasSubmitButton())->toBeFalse();
    expect($form->getSubmitButton())->toBeNull();
});

it('can set model', function () {
    $form = Form::make()->model('App\\Models\\Post');

    expect($form->getModel())->toBe('App\\Models\\Post');
});

it('has null model by default', function () {
    $form = Form::make();

    expect($form->getModel())->toBeNull();
});

it('detects watchers when a field is watched', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->watch(),
        TextInput::make('slug'),
    ]);

    expect($form->hasWatchers())->toBeTrue();
});

it('detects no watchers when no field is watched', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
        TextInput::make('slug'),
    ]);

    expect($form->hasWatchers())->toBeFalse();
});

it('can set state path', function () {
    $form = Form::make()->statePath('data');

    expect($form->getStatePath())->toBe('data');
});

it('has null state path by default', function () {
    $form = Form::make();

    expect($form->getStatePath())->toBeNull();
});

it('collects validation rules with state path prefix', function () {
    $form = Form::make()->statePath('data')->schema([
        TextInput::make('title')->required(),
    ]);

    $rules = $form->getValidationRules();

    // The field's statePath becomes 'title' (no prefix from form at field level)
    // But getFields uses getLeafComponents which keys by statePath
    expect($rules)->not->toBeEmpty();
});

it('serializes to array', function () {
    $form = Form::make()->schema([
        TextInput::make('title'),
    ]);

    $array = $form->toArray();

    expect($array)
        ->toHaveKey('components')
        ->toHaveKey('statePath')
        ->toHaveKey('state')
        ->toHaveKey('context', 'form')
        ->toHaveKey('model');
});

it('runs before state dehydrated callbacks before dehydrate callback', function () {
    $form = Form::make()->schema([
        TextInput::make('title')
            ->beforeStateDehydrated(fn (string $state): string => "{$state}-before")
            ->dehydrateStateUsing(fn (string $state): string => "{$state}-after"),
    ]);

    $data = ['title' => 'value'];

    $form->dehydrateState($data);

    expect($data['title'])->toBe('value-before-after');
});

it('saves file uploads during dehydrate state', function () {
    $upload = new TemporaryUploadedFile(
        path: 'tmp/avatar.jpg',
        originalName: 'avatar.jpg',
        mimeType: 'image/jpeg',
        size: 123,
        disk: 'local',
    );

    $form = Form::make()->schema([
        FileUpload::make('avatar')
            ->saveUploadedFileUsing(
                fn (TemporaryUploadedFile $file): string => 'saved/' . $file->getOriginalName()
            ),
    ]);

    $data = ['avatar' => $upload];

    $form->dehydrateState($data);

    expect($data['avatar'])->toBe('saved/avatar.jpg');
});

// ─── Wizard nested in Form ───────────────────────────────────────────────────

it('extracts leaf fields from all wizard steps', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name'),
                TextInput::make('email'),
            ]),
            Step::make('Step 2')->schema([
                TextInput::make('address'),
            ]),
        ]),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveCount(3);
    expect(array_keys($fields))->toBe(['name', 'email', 'address']);
});

it('collects validation rules from all wizard steps', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->required(),
                TextInput::make('email')->rules('email'),
            ]),
            Step::make('Step 2')->schema([
                TextInput::make('address')->required(),
                TextInput::make('optional'),
            ]),
        ]),
    ]);

    $rules = $form->getValidationRules();

    expect($rules)->toHaveCount(3);
    expect($rules)->toHaveKey('name');
    expect($rules)->toHaveKey('email');
    expect($rules)->toHaveKey('address');
    expect($rules)->not->toHaveKey('optional');
});

it('collects validation rules for a specific wizard step by index', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->required(),
            ]),
            Step::make('Step 2')->schema([
                TextInput::make('address')->required(),
            ]),
        ]),
    ]);

    $step0Rules = $form->getValidationRulesForWizardStep(0);
    $step1Rules = $form->getValidationRulesForWizardStep(1);

    expect($step0Rules)->toHaveKey('name');
    expect($step0Rules)->not->toHaveKey('address');

    expect($step1Rules)->toHaveKey('address');
    expect($step1Rules)->not->toHaveKey('name');
});

it('returns empty array for out-of-bounds wizard step index', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Only Step')->schema([
                TextInput::make('name')->required(),
            ]),
        ]),
    ]);

    $rules = $form->getValidationRulesForWizardStep(5);

    expect($rules)->toBe([]);
});

it('falls back to all rules when no wizard is present and step index is requested', function () {
    $form = Form::make()->schema([
        TextInput::make('title')->required(),
        TextInput::make('slug')->required(),
    ]);

    $rules = $form->getValidationRulesForWizardStep(0);

    expect($rules)->toHaveKey('title');
    expect($rules)->toHaveKey('slug');
});

it('fill initialises fields inside wizard steps', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name'),
                TextInput::make('email'),
            ]),
            Step::make('Step 2')->schema([
                TextInput::make('address'),
            ]),
        ]),
    ]);

    $form->fill(['name' => 'Alice', 'email' => 'alice@example.com']);

    $state = $form->getState();

    expect($state['name'])->toBe('Alice');
    expect($state['email'])->toBe('alice@example.com');
    expect($state['address'])->toBeNull();
});

it('collects validation messages from fields inside wizard steps', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')
                    ->required()
                    ->validationMessages(['required' => 'Name is required']),
            ]),
            Step::make('Step 2')->schema([
                TextInput::make('email')
                    ->validationMessages(['email' => 'Invalid email']),
            ]),
        ]),
    ]);

    $messages = $form->getValidationMessages();

    expect($messages)->toHaveKey('name.required', 'Name is required');
    expect($messages)->toHaveKey('email.email', 'Invalid email');
});

it('excludes hidden steps from wizard step validation rules', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->required(),
            ]),
            Step::make('Step 2')->hidden()->schema([
                TextInput::make('secret')->required(),
            ]),
            Step::make('Step 3')->schema([
                TextInput::make('address')->required(),
            ]),
        ]),
    ]);

    // After hiding Step 2, visible steps are: Step 1 (index 0), Step 3 (index 1)
    $step0Rules = $form->getValidationRulesForWizardStep(0);
    $step1Rules = $form->getValidationRulesForWizardStep(1);

    expect($step0Rules)->toHaveKey('name');
    expect($step0Rules)->not->toHaveKey('secret');

    expect($step1Rules)->toHaveKey('address');
    expect($step1Rules)->not->toHaveKey('secret');
});

it('excludes step hidden via closure from wizard step validation rules', function () {
    $shouldHide = true;

    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->required(),
            ]),
            Step::make('Step 2')->hidden(fn () => $shouldHide)->schema([
                TextInput::make('secret')->required(),
            ]),
            Step::make('Step 3')->schema([
                TextInput::make('address')->required(),
            ]),
        ]),
    ]);

    $step0Rules = $form->getValidationRulesForWizardStep(0);
    $step1Rules = $form->getValidationRulesForWizardStep(1);

    expect($step0Rules)->toHaveKey('name');
    expect($step1Rules)->toHaveKey('address');
    expect($step0Rules)->not->toHaveKey('secret');
    expect($step1Rules)->not->toHaveKey('secret');
});

it('includes field required via closure in wizard step validation rules', function () {
    $isRequired = true;

    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->required(fn () => $isRequired),
                TextInput::make('optional')->required(fn () => false),
            ]),
        ]),
    ]);

    $rules = $form->getValidationRulesForWizardStep(0);

    expect($rules)->toHaveKey('name');
    expect($rules['name'])->toContain('required');
    expect($rules)->not->toHaveKey('optional');
});

it('fill uses default closure for fields inside wizard steps', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->default(fn () => 'John'),
                TextInput::make('email'),
            ]),
        ]),
    ]);

    $form->fill([]);

    $state = $form->getState();

    expect($state['name'])->toBe('John');
    expect($state['email'])->toBeNull();
});

it('dehydrateState applies dehydrateStateUsing closure on field inside wizard step', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('slug')->dehydrateStateUsing(fn (string $state): string => strtolower($state)),
            ]),
        ]),
    ]);

    $data = ['slug' => 'Hello-World'];

    $form->dehydrateState($data);

    expect($data['slug'])->toBe('hello-world');
});

it('dehydrateState applies beforeStateDehydrated closure on field inside wizard step', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('title')
                    ->beforeStateDehydrated(fn (string $state): string => trim($state))
                    ->dehydrateStateUsing(fn (string $state): string => strtoupper($state)),
            ]),
        ]),
    ]);

    $data = ['title' => '  hello  '];

    $form->dehydrateState($data);

    expect($data['title'])->toBe('HELLO');
});

// ─── Watch / watchDebounce / watchBlur inside Wizard ────────────────────────

it('hasWatchers returns true when a watched field is inside a wizard step', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name'),
                TextInput::make('slug')->watch(),
            ]),
        ]),
    ]);

    expect($form->hasWatchers())->toBeTrue();
});

it('hasWatchers returns false when no field in wizard steps is watched', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name'),
                TextInput::make('slug'),
            ]),
        ]),
    ]);

    expect($form->hasWatchers())->toBeFalse();
});

it('watchDebounce inside wizard step stores mode and debounce ms', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->watchDebounce(ms: 500),
            ]),
        ]),
    ]);

    $fields = $form->getFields();
    $nameField = $fields['name'];

    expect($nameField->isWatched())->toBeTrue();
    expect($nameField->getWatchMode())->toBe('debounce');
    expect($nameField->getWatchDebounceMs())->toBe(500);
});

it('watchBlur inside wizard step stores blur mode', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('email')->watchBlur(),
            ]),
        ]),
    ]);

    $fields = $form->getFields();

    expect($fields['email']->isWatched())->toBeTrue();
    expect($fields['email']->getWatchMode())->toBe('blur');
});

it('watch callback on name field inside wizard step generates slug', function () {
    $form = Form::make()->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->watch(function (string $state, $set): void {
                    $set('slug', str($state)->slug()->toString());
                }),
                TextInput::make('slug'),
            ]),
        ]),
    ]);

    $fields = $form->getFields();
    $nameField = $fields['name'];

    // Use an invokable object, not a Closure: EvaluatesClosures calls value() on named
    // injections, which would immediately invoke a Closure with zero arguments.
    $setter = new class {
        public ?string $result = null;

        public function __invoke(string $path, mixed $value): void
        {
            $this->result = $value;
        }
    };

    $nameField->evaluate($nameField->getWatchCallback(), [
        'state' => 'Hello World',
        'old'   => '',
        'set'   => $setter,
    ]);

    expect($setter->result)->toBe('hello-world');
});

it('WatchesFormState auto-fills slug from name typed inside wizard step', function () {
    $form = Form::make()->statePath('data')->schema([
        Wizard::make()->steps([
            Step::make('Step 1')->schema([
                TextInput::make('name')->watch(function (string $state, $set): void {
                    $set('slug', str($state)->slug()->toString());
                }),
                TextInput::make('slug'),
            ]),
        ]),
    ]);

    $component = new class {
        use WatchesFormState;
        public array $data = ['name' => '', 'slug' => ''];
        public array $cachedForms = [];
    };
    $component->cachedForms = [$form];

    // First cycle: hydration (skipped by the trait)
    $component->updatingHasForms('data', $component->data);
    $component->updatedHasForms('data', $component->data);

    // Second cycle: user types "My Full Name" in the name field
    $component->updatingHasForms('data', ['name' => 'My Full Name', 'slug' => '']);
    $component->data = ['name' => 'My Full Name', 'slug' => ''];
    $component->updatedHasForms('data', $component->data);

    expect($component->data['slug'])->toBe('my-full-name');
});

// ─── Regression: Repeater field isolation in getFields() / WatchesFormState ──
//
// Bug: Repeater::getChildComponents() was exposing schema template fields to
// flattenComponents(), overwriting watched top-level fields with the same name.
// Fix: getChildComponents() returns only real runtime items; template fields
// are accessible only via getSchema().

it('getFields does not include Repeater schema template fields', function () {
    $form = Form::make()->schema([
        TextInput::make('name'),
        Repeater::make('items')->schema([
            TextInput::make('name'),   // same name as top-level — must not appear separately
            TextInput::make('value'),
        ]),
    ]);

    $fields = $form->getFields();

    // 'name' (TextInput) + 'items' (Repeater) = 2 total
    // Repeater template fields 'name'/'value' must NOT appear as top-level entries
    expect($fields)->toHaveCount(2);
    expect(array_keys($fields))->toContain('name');
    expect(array_keys($fields))->toContain('items');
});

it('getFields returns the watched top-level field even when Repeater has a same-named template field', function () {
    $form = Form::make()->schema([
        TextInput::make('name')->watchDebounce(fn ($state, $set) => $set('slug', str($state)->slug()->toString()), 800),
        TextInput::make('slug'),
        Repeater::make('rows')->schema([
            TextInput::make('name'),  // same key — would overwrite watched field if bug is present
        ]),
    ]);

    $fields = $form->getFields();

    expect($fields)->toHaveKey('name');
    expect($fields['name'])->toBeInstanceOf(TextInput::class);
    expect($fields['name']->isWatched())->toBeTrue();
    expect($fields['name']->getWatchMode())->toBe('debounce');
});

it('WatchesFormState fires watch callback when form contains Repeater with same-named template field', function () {
    $form = Form::make()->statePath('data')->schema([
        TextInput::make('name')->watchDebounce(function (string $state, $set): void {
            $set('slug', str($state)->slug()->toString());
        }, 800),
        TextInput::make('slug'),
        Repeater::make('fields')->schema([
            TextInput::make('name'),  // same name as watched top-level field
        ]),
    ]);

    $component = new class {
        use WatchesFormState;
        public array $data = ['name' => '', 'slug' => '', 'fields' => []];
        public array $cachedForms = [];
    };
    $component->cachedForms = [$form];

    // First cycle: hydration (skipped by the trait)
    $component->updatingHasForms('data', $component->data);
    $component->updatedHasForms('data', $component->data);

    // Second cycle: user types in the 'name' field
    $component->updatingHasForms('data', ['name' => 'My Facility', 'slug' => '', 'fields' => []]);
    $component->data = ['name' => 'My Facility', 'slug' => '', 'fields' => []];
    $component->updatedHasForms('data', $component->data);

    expect($component->data['slug'])->toBe('my-facility');
});

it('WatchesFormState fires watch inside Wizard step when a Repeater with same-named fields is present in another step', function () {
    $form = Form::make()->statePath('data')->schema([
        Wizard::make()->steps([
            Step::make('Info')->schema([
                Section::make()->schema([
                    TextInput::make('name')->watchDebounce(function (string $state, $set): void {
                        $set('slug', str($state)->slug()->toString());
                    }, 800),
                    TextInput::make('slug'),
                ]),
            ]),
            Step::make('Items')->schema([
                Repeater::make('fields')->schema([
                    TextInput::make('name'),  // same name, different context
                ]),
            ]),
        ]),
    ]);

    $component = new class {
        use WatchesFormState;
        public array $data = ['name' => '', 'slug' => '', 'fields' => []];
        public array $cachedForms = [];
    };
    $component->cachedForms = [$form];

    // Hydration cycle (skipped)
    $component->updatingHasForms('data', $component->data);
    $component->updatedHasForms('data', $component->data);

    // User types in the 'name' field in step 1
    $component->updatingHasForms('data', ['name' => 'Sports Arena', 'slug' => '', 'fields' => []]);
    $component->data = ['name' => 'Sports Arena', 'slug' => '', 'fields' => []];
    $component->updatedHasForms('data', $component->data);

    expect($component->data['slug'])->toBe('sports-arena');
});
