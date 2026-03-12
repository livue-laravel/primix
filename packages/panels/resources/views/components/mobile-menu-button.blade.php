@php
    $mergedAttributes = $attributes->merge([
        'type' => 'button',
        'class' => 'lg:hidden -m-2.5 p-2.5 text-gray-700 dark:text-gray-300',
    ]);

    $clickExpression = trim((string) ($mergedAttributes->get('@click') ?? ''));
    if ($clickExpression === '') {
        $clickExpression = 'void 0';
    }

    $extraAttributes = $mergedAttributes->except('@click')->getAttributes();

    $mobileMenuAction = \Primix\Actions\Action::make('openSidebar')
        ->label('Open sidebar')
        ->icon('pi pi-bars')
        ->iconButton(true, false)
        ->color('gray')
        ->jsAction($clickExpression)
        ->extraAttributes($extraAttributes);
@endphp

{{ $mobileMenuAction }}
