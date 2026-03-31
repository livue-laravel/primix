<template #option="slotProps">
    <div v-if="typeof slotProps.option.value === 'string' && slotProps.option.value.startsWith('__quick_create__:')" class="flex items-center gap-2 text-primary-500 font-medium">
        <i class="pi pi-plus text-sm"></i>
        <span v-text="slotProps.option.label"></span>
    </div>
    <span v-else v-text="slotProps.option.label"></span>
</template>
