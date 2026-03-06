<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\RouteCollection;
use Primix\Pages\PageRegistration;
use Primix\Panel;
use Primix\PanelRegistry;

class BreadcrumbTestModel extends Model
{
    protected $table = 'breadcrumb_test_models';
}

class BreadcrumbTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = BreadcrumbTestModel::class;

    protected static ?string $slug = 'products';

    protected static ?string $navigationLabel = 'Products';

    protected static ?string $modelLabel = 'product';

    protected static ?string $pluralModelLabel = 'products';

    public static function getPages(): array
    {
        return [
            'index' => new PageRegistration(BreadcrumbTestListPage::class, '/'),
            'create' => new PageRegistration(BreadcrumbTestCreatePage::class, '/create'),
            'edit' => new PageRegistration(BreadcrumbTestEditPage::class, '/{record}/edit'),
        ];
    }
}

class BreadcrumbTestHomePage extends \Primix\Pages\Page
{
    protected static ?string $slug = '';

    protected static ?string $navigationLabel = 'Dashboard';

    protected ?string $title = 'Dashboard';

    protected function render(): string
    {
        return 'primix::pages.dashboard';
    }
}

class BreadcrumbTestReportsPage extends \Primix\Pages\Page
{
    protected static ?string $slug = 'reports';

    protected ?string $title = 'Reports';

    protected function render(): string
    {
        return 'primix::pages.dashboard';
    }
}

class BreadcrumbTestListPage extends \Primix\Resources\Pages\ListRecords
{
    protected static ?string $resource = BreadcrumbTestResource::class;
}

class BreadcrumbTestCreatePage extends \Primix\Resources\Pages\CreateRecord
{
    protected static ?string $resource = BreadcrumbTestResource::class;
}

class BreadcrumbTestEditPage extends \Primix\Resources\Pages\EditRecord
{
    protected static ?string $resource = BreadcrumbTestResource::class;
}

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());

    $registry = app(PanelRegistry::class);
    $registry->register(
        Panel::make('admin')
            ->path('admin')
            ->pages([
                BreadcrumbTestHomePage::class,
                BreadcrumbTestReportsPage::class,
            ])
            ->resources([BreadcrumbTestResource::class]),
    );
    $registry->setCurrentPanel('admin');
});

it('returns no breadcrumb for panel home page', function () {
    $page = new BreadcrumbTestHomePage();

    expect($page->getBreadcrumbs())->toBe([]);
});

it('returns no breadcrumbs when disabled on panel', function () {
    app(PanelRegistry::class)->get('admin')?->breadcrumbs(false);

    $panelPage = new BreadcrumbTestReportsPage();
    $resourcePage = new BreadcrumbTestCreatePage();

    expect($panelPage->getBreadcrumbs())->toBe([])
        ->and($resourcePage->getBreadcrumbs())->toBe([]);
});

it('prepends panel home breadcrumb for non-home panel pages', function () {
    $page = new BreadcrumbTestReportsPage();

    expect($page->getBreadcrumbs())->toBe([
        ['label' => 'Dashboard'],
        ['label' => 'Reports'],
    ]);
});

it('returns only the resource root breadcrumb on index page', function () {
    $page = new BreadcrumbTestListPage();

    expect($page->getBreadcrumbs())->toBe([
        ['label' => 'Products'],
        ['label' => 'List'],
    ]);
});

it('returns resource root and current breadcrumb on create page', function () {
    $page = new BreadcrumbTestCreatePage();

    expect($page->getBreadcrumbs())->toBe([
        ['label' => 'Products'],
        ['label' => 'Create'],
    ]);
});

it('returns path-based breadcrumb label on edit page', function () {
    $page = new BreadcrumbTestEditPage();

    expect($page->getBreadcrumbs())->toBe([
        ['label' => 'Products'],
        ['label' => 'Edit'],
    ]);
});
