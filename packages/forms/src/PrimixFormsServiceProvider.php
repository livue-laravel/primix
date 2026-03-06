<?php

namespace Primix\Forms;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use LiVue\Facades\LiVueAsset;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use Primix\Forms\Http\Controllers\ImageEditorController;
use Primix\Forms\ImageEditor\ImageProcessorRegistry;
use Primix\Forms\ImageEditor\Processors\AutoEnhanceProcessor;
use Primix\Forms\ImageEditor\Processors\BackgroundRemovalProcessor;
use Primix\Forms\ImageEditor\Processors\UpscaleProcessor;
use Primix\Support\AssetVersion;
use Primix\Support\ComponentTypeRegistry;
use Primix\Support\ViteHot;

class PrimixFormsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(ImageProcessorRegistry::class, function () {
            $registry = new ImageProcessorRegistry;

            // Register auto-enhance (no external API needed)
            $registry->register('auto-enhance', new AutoEnhanceProcessor);

            // Register background removal if configured
            $apiKey = config('primix.image-editor.ai.background-removal.api_key');
            if ($apiKey) {
                $registry->register('background-removal', new BackgroundRemovalProcessor(
                    driver: config('primix.image-editor.ai.background-removal.driver', 'remove-bg'),
                    apiKey: $apiKey,
                ));
            }

            // Register upscale if configured
            $apiToken = config('primix.image-editor.ai.upscale.api_token');
            if ($apiToken) {
                $registry->register('upscale', new UpscaleProcessor(
                    driver: config('primix.image-editor.ai.upscale.driver', 'replicate'),
                    apiToken: $apiToken,
                ));
            }

            return $registry;
        });
    }

    public function boot(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'primix-forms');

        $this->registerAssets();
        $this->registerRoutes();
        $this->registerComponentTypes();

        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/views' => resource_path('views/vendor/primix-forms'),
            ], 'primix-forms-views');
        }
    }

    protected function registerAssets(): void
    {
        $assetVersion = AssetVersion::resolve();
        $isVite = (bool) config('primix.vite', true);

        if ($isVite && ViteHot::isRunning()) {
            return;
        }

        LiVueAsset::register([
            Css::make('primix-forms', '/primix/primix-forms.css')->onRequest()->version($assetVersion),
            Js::make('primix-forms', '/primix/primix-forms.js')->module()->onRequest()->version($assetVersion),
        ], 'primix/forms');
    }

    protected function registerComponentTypes(): void
    {
        $registry = $this->app->make(ComponentTypeRegistry::class);

        $registry->registerMany('field', [
            'text-input' => Components\Fields\TextInput::class,
            'textarea' => Components\Fields\Textarea::class,
            'select' => Components\Fields\Select::class,
            'checkbox' => Components\Fields\Checkbox::class,
            'checkbox-list' => Components\Fields\CheckboxList::class,
            'radio' => Components\Fields\Radio::class,
            'toggle' => Components\Fields\Toggle::class,
            'date-picker' => Components\Fields\DatePicker::class,
            'time-picker' => Components\Fields\TimePicker::class,
            'file-upload' => Components\Fields\FileUpload::class,
            'rich-editor' => Components\Fields\RichEditor::class,
            'color-picker' => Components\Fields\ColorPicker::class,
            'tags-input' => Components\Fields\TagsInput::class,
            'repeater' => Components\Fields\Repeater::class,
            'morph-to-select' => Components\Fields\MorphToSelect::class,
            'slider' => Components\Fields\Slider::class,
            'rating' => Components\Fields\Rating::class,
            'knob' => Components\Fields\Knob::class,
            'pick-list' => Components\Fields\PickList::class,
            'order-list' => Components\Fields\OrderList::class,
        ]);

        $registry->registerMany('layout', [
            'grid' => Components\Layouts\Grid::class,
            'section' => Components\Layouts\Section::class,
            'fieldset' => Components\Layouts\Fieldset::class,
            'tabs' => Components\Layouts\Tabs::class,
            'tab' => Components\Layouts\Tabs\Tab::class,
            'wizard' => Components\Layouts\Wizard::class,
            'step' => Components\Layouts\Wizard\Step::class,
        ]);
    }

    protected function registerRoutes(): void
    {
        Route::prefix('primix')
            ->middleware('web')
            ->group(function () {
                Route::post('/image-editor/process', [ImageEditorController::class, 'process'])
                    ->name('primix.image-editor.process');
            });
    }
}
