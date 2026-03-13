@php
    $severity = app(\Primix\Support\Colors\ColorManager::class)->toPrimeVueSeverity($color ?? 'secondary');

    $uniqueId = 'action_group_' . ($component->getId() ?? uniqid());
    $jsRefName = \Illuminate\Support\Str::camel($uniqueId);
@endphp

@if($component->isSpeedDial())
    {{-- Speed Dial (floating action button with expanding actions) --}}
    @php
        $speedDialItems = collect($actions)->map(function ($action) {
            return [
                'label' => $action->getLabel(),
                'icon' => $action->getIcon(),
            ];
        })->values()->all();
    @endphp
    <p-speed-dial
        :model="{!! \Illuminate\Support\Js::from($speedDialItems) !!}"
        direction="{{ $component->getSpeedDialDirection() }}"
        type="{{ $component->getSpeedDialType() }}"
        @if($icon) :button-props="{ icon: '{{ $icon }}', severity: '{{ $severity ?? 'secondary' }}' }" @endif
    ></p-speed-dial>
@elseif($isDropdown)
    {{-- Dropdown menu with button --}}
    <script type="application/livue-setup">
        const {{ $jsRefName }} = ref(null);
        return { {{ $jsRefName }}: {{ $jsRefName }} };
    </script>

    <div class="primix-action-group inline-flex">
        <p-button
            class="primix-action-button"
            type="button"
            @if($label) label="{{ $label }}" @endif
            @if($severity) severity="{{ $severity }}" @endif
            @if($tooltip) v-tooltip="'{{ addslashes($tooltip) }}'" @endif
            text
            rounded
            @click="{{ $jsRefName }}.toggle($event)"
            aria-haspopup="true"
        >@if($icon)<template #icon>{!! app(\Primix\Support\Icons\IconManager::class)->render($icon, 'primix-action-icon') !!}</template>@endif</p-button>

        <p-menu
            ref="{{ $jsRefName }}"
            :popup="true"
            @if($spa ?? false)
                :pt="{ itemLink: { 'data-livue-navigate': 'true' } }"
            @endif
            :model="[
                @foreach($actions as $action)
                {
                    label: '{{ addslashes($action->getLabel()) }}',
                    @if($action->getIcon()) icon: '{{ $action->getIcon() }}', @endif
                    @if($action->isDisabled()) disabled: true, @endif
                    @if($action->getUrl())
                        url: '{{ $action->getUrl() }}',
                        @if($action->shouldOpenUrlInNewTab()) target: '_blank', @endif
                    @elseif($action->doesRequireConfirmation())
                        command: () => livue.callWithConfirm('{{ $action->getCallMethod() }}', '{{ addslashes($action->getConfirmationDescription() ?? 'Are you sure?') }}', { name: '{{ $action->getName() }}' }),
                    @elseif($action->isModal())
                        command: () => openActionModal({ name: '{{ $action->getName() }}', callMethod: '{{ $action->getCallMethod() }}' }),
                    @else
                        command: () => {{ $action->getCallMethod() }}({ name: '{{ $action->getName() }}' }),
                    @endif
                },
                @endforeach
            ]"
        ></p-menu>
    </div>
@else
    {{-- Button group (inline) --}}
    <p-button-group class="primix-action-group">
        @foreach($actions as $action)
            {{ $action }}
        @endforeach
    </p-button-group>
@endif
