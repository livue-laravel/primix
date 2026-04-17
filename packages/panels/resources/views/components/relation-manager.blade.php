<div>
    @fragment('table')
    {{ $this->table }}
    @endfragment

    @fragment('modal')
    <x-primix-actions::modals />
    @endfragment
</div>
