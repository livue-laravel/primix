<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\RouteCollection;
use Primix\Pages\Auth\Login;
use Primix\Pages\PageRegistration;

class BasePageRoutingTestModel extends Model
{
    protected $table = 'base_page_routing_test_models';
}

class BasePageRoutingTestResource extends \Primix\Resources\Resource
{
    protected static ?string $model = BasePageRoutingTestModel::class;

    public static function getPages(): array
    {
        return [
            'index' => new PageRegistration(BasePageRoutingListPage::class, '/'),
            'edit' => new PageRegistration(BasePageRoutingEditPage::class, '/{record}/edit'),
        ];
    }
}

class BasePageRoutingListPage extends \Primix\Resources\Pages\Page
{
    protected static ?string $resource = BasePageRoutingTestResource::class;

    protected function render(): string
    {
        return 'primix::pages.dashboard';
    }
}

class BasePageRoutingEditPage extends \Primix\Resources\Pages\Page
{
    protected static ?string $resource = BasePageRoutingTestResource::class;

    protected function render(): string
    {
        return 'primix::pages.dashboard';
    }
}

beforeEach(function () {
    app('router')->setRoutes(new RouteCollection());
});

it('keeps base route naming for regular pages', function () {
    expect(Login::getRouteName('admin'))->toBe('primix.admin.login');
});

it('resolves resource page route name from base page implementation', function () {
    expect(BasePageRoutingEditPage::getRouteName('admin'))
        ->toBe('primix.admin.base-page-routing-tests.edit');
});
