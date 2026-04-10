@php
    $isMultiple = $component->isMultiple();
    $isImage = $component->isImage();
    $isReorderable = $component->isReorderable();
    $isDownloadable = $component->isDownloadable();
    $isPreviewable = $component->isPreviewable();
    $accept = $component->getAcceptAttribute();
    $maxFiles = $component->getMaxFiles();
    $maxSizeForHumans = $component->getMaxSizeForHumans();
    $fieldId = $id . '-input';

    // For nested paths like "data.avatar", we need to handle Vue access carefully
    $vueStatePath = $statePath;

    $isAvatar = $component->isAvatar();

    // Image editor configuration
    $imageEditorConfig = $component->getImageEditorConfig();
    $hasImageEditor = !empty($imageEditorConfig);
    $imageEditorRef = 'imageEditor_' . $id;
@endphp

@if($isAvatar)
{{-- ==================== Avatar Variant ==================== --}}
<div class="primix-file-upload primix-file-upload-avatar">
    <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>

    {{-- Hidden File Input --}}
    <input
        type="file"
        ref="{{ $fieldId }}"
        id="{{ $fieldId }}"
        class="hidden"
        @if($accept) accept="{{ $accept }}" @endif
        @if($disabled) disabled @endif
        @change="(function(e) {
            var files = e.target.files;
            if (files.length === 0) return;
            livue.upload('{{ $statePath }}', files[0]);
            e.target.value = '';
        })($event)"
    >

    <div class="relative inline-block group">
        {{-- Avatar Circle --}}
        <div
            class="w-24 h-24 rounded-full overflow-hidden border-2 border-surface-300 dark:border-surface-600 bg-surface-100 dark:bg-surface-800 cursor-pointer transition-all hover:border-primary-400 dark:hover:border-primary-500"
            @click="$refs['{{ $fieldId }}'].click()"
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="(function(e) {
                var files = e.dataTransfer.files;
                if (files.length === 0) return;
                livue.upload('{{ $statePath }}', files[0]);
            })($event)"
            @if($disabled) style="pointer-events: none; opacity: 0.5;" @endif
        >
            {{-- Upload Progress --}}
            <div v-if="livue.uploading" class="w-full h-full flex flex-col items-center justify-center">
                <div class="w-12 bg-surface-200 dark:bg-surface-700 rounded-full h-1.5 mb-1">
                    <div class="bg-primary-500 h-1.5 rounded-full transition-all duration-300" :style="{ width: livue.uploadProgress + '%' }"></div>
                </div>
                <span class="text-xs text-surface-500">@{{ livue.uploadProgress }}%</span>
            </div>

            {{-- Image Preview: new upload --}}
            <img
                v-else-if="{{ $vueStatePath }} && typeof {{ $vueStatePath }} === 'object' && {{ $vueStatePath }}.previewUrl"
                :src="{{ $vueStatePath }}.previewUrl"
                class="w-full h-full object-cover"
            >

            {{-- Image Preview: saved path --}}
            <img
                v-else-if="{{ $vueStatePath }} && typeof {{ $vueStatePath }} === 'string'"
                :src="'/storage/' + {{ $vueStatePath }}"
                class="w-full h-full object-cover"
            >

            {{-- Empty State --}}
            <div v-else class="w-full h-full flex items-center justify-center">
                <i class="pi pi-user text-2xl text-surface-400"></i>
            </div>

            {{-- Hover Overlay --}}
            <div
                class="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                @if($disabled) style="display: none;" @endif
            >
                <i class="pi pi-camera text-white text-lg"></i>
            </div>
        </div>

        {{-- Remove Button --}}
        <button
            v-if="{{ $vueStatePath }}"
            type="button"
            class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-sm transition-colors"
            @click.stop="livue.removeUpload('{{ $statePath }}')"
            @if($disabled) disabled style="display: none;" @endif
            title="{{ __('primix-forms::forms.file_upload.remove') }}"
        >
            <i class="pi pi-times text-xs"></i>
        </button>
    </div>

    {{-- Upload Error --}}
    <div
        v-if="livue.errors['{{ $statePath }}'] && livue.errors['{{ $statePath }}'].file"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
    >
        <span v-text="livue.errors['{{ $statePath }}'].message"></span>
        <button type="button" class="ml-1 text-red-400 hover:text-red-600" @click="delete livue.errors['{{ $statePath }}']">
            <i class="pi pi-times text-xs"></i>
        </button>
    </div>

    {{-- Image Editor Modal --}}
    @if($hasImageEditor)
        <primix-image-editor
            ref="{{ $imageEditorRef }}"
            :config='@json($imageEditorConfig)'
            :translations='@json([
                "edit_image" => __("primix-forms::forms.edit_image"),
                "cancel" => __("primix-forms::forms.cancel"),
                "apply" => __("primix-forms::forms.image_editor.apply"),
                "tool_move" => __("primix-forms::forms.image_editor.tool_move"),
                "tool_crop" => __("primix-forms::forms.image_editor.tool_crop"),
                "tool_zoom" => __("primix-forms::forms.image_editor.tool_zoom"),
                "tool_transform" => __("primix-forms::forms.image_editor.tool_transform"),
                "tool_adjustments" => __("primix-forms::forms.image_editor.tool_adjustments"),
                "tool_filters" => __("primix-forms::forms.image_editor.tool_filters"),
                "tool_ai" => __("primix-forms::forms.image_editor.tool_ai"),
                "rotation_title" => __("primix-forms::forms.image_editor.rotation_title"),
                "rotate_ccw" => __("primix-forms::forms.image_editor.rotate_ccw"),
                "rotate_cw" => __("primix-forms::forms.image_editor.rotate_cw"),
                "free_rotation" => __("primix-forms::forms.image_editor.free_rotation"),
                "flip_title" => __("primix-forms::forms.image_editor.flip_title"),
                "flip_horizontal" => __("primix-forms::forms.image_editor.flip_horizontal"),
                "flip_vertical" => __("primix-forms::forms.image_editor.flip_vertical"),
                "crop_aspect_ratio" => __("primix-forms::forms.image_editor.crop_aspect_ratio"),
                "crop_free" => __("primix-forms::forms.image_editor.crop_free"),
                "apply_crop" => __("primix-forms::forms.image_editor.apply_crop"),
                "move_title" => __("primix-forms::forms.image_editor.move_title"),
                "drag_to_move" => __("primix-forms::forms.image_editor.drag_to_move"),
                "mouse_wheel_zoom" => __("primix-forms::forms.image_editor.mouse_wheel_zoom"),
                "zoom_title" => __("primix-forms::forms.image_editor.zoom_title"),
                "click_to_zoom_in" => __("primix-forms::forms.image_editor.click_to_zoom_in"),
                "alt_click_zoom_out" => __("primix-forms::forms.image_editor.alt_click_zoom_out"),
                "mouse_wheel_continuous" => __("primix-forms::forms.image_editor.mouse_wheel_continuous"),
                "ai_tools_title" => __("primix-forms::forms.image_editor.ai_tools_title"),
                "processing" => __("primix-forms::forms.image_editor.processing"),
                "loading_model" => __("primix-forms::forms.image_editor.loading_model"),
                "no_ai_configured" => __("primix-forms::forms.image_editor.no_ai_configured"),
                "bg_removal_label" => __("primix-forms::forms.image_editor.bg_removal_label"),
                "bg_removal_desc" => __("primix-forms::forms.image_editor.bg_removal_desc"),
                "auto_enhance_label" => __("primix-forms::forms.image_editor.auto_enhance_label"),
                "auto_enhance_desc" => __("primix-forms::forms.image_editor.auto_enhance_desc"),
            ])'
            state-path="{{ $statePath }}"
            @save="(function(payload) {
                var file = payload.file;
                var fileInput = $refs['{{ $fieldId }}'];
                var win = fileInput.ownerDocument.defaultView;
                var dt = new win.DataTransfer();
                dt.items.add(file);
                fileInput.files = dt.files;
                fileInput.dispatchEvent(new win.Event('change'));
            })($event)"
        />
    @endif
</div>
@else
{{-- ==================== Standard Variant ==================== --}}
<div class="primix-file-upload">
    <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
        {{ $label }}
        @if($required)
            <span class="text-red-500">*</span>
        @endif
    </label>

    {{-- Drop Zone (hide when single file is uploaded) --}}
    <div
        v-show="@if(!$isMultiple)!{{ $vueStatePath }}@else true @endif"
        class="primix-file-upload-dropzone border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg p-6 text-center transition-colors cursor-pointer hover:border-primary-400 dark:hover:border-primary-500"
        @dragover.prevent
        @dragleave.prevent
        @drop.prevent="(function(e) {
            var files = e.dataTransfer.files;
            if (files.length === 0) return;
            @if($isMultiple)
                livue.uploadMultiple('{{ $statePath }}', files);
            @else
                livue.upload('{{ $statePath }}', files[0]);
            @endif
        })($event)"
        @click="$refs['{{ $fieldId }}'].click()"
        @if($disabled) style="pointer-events: none; opacity: 0.5;" @endif
    >
        {{-- Hidden File Input --}}
        <input
            type="file"
            ref="{{ $fieldId }}"
            id="{{ $fieldId }}"
            class="hidden"
            @if($accept) accept="{{ $accept }}" @endif
            @if($isMultiple) multiple @endif
            @if($disabled) disabled @endif
            @change="(function(e) {
                var files = e.target.files;
                if (files.length === 0) return;
                @if($isMultiple)
                    livue.uploadMultiple('{{ $statePath }}', files);
                @else
                    livue.upload('{{ $statePath }}', files[0]);
                @endif
                e.target.value = '';
            })($event)"
        >

        {{-- Upload Progress --}}
        <div v-if="livue.uploading" class="mb-4">
            <div class="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                <div
                    class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: livue.uploadProgress + '%' }"
                ></div>
            </div>
            <p class="text-sm text-surface-500 mt-2">
                {{ __('primix-forms::forms.file_upload.uploading') }} @{{ livue.uploadProgress }}%
            </p>
        </div>

        {{-- Empty State --}}
        <div v-if="!livue.uploading" class="py-4">
            <i class="pi pi-cloud-upload text-4xl text-surface-400 mb-3 block"></i>
            <p class="text-surface-600 dark:text-surface-400 mb-2">
                @if($isImage)
                    {{ __('primix-forms::forms.file_upload.drag_image') }}
                @else
                    {{ __('primix-forms::forms.file_upload.drag_file') }}
                @endif
                <span class="text-primary-500 hover:text-primary-600 font-medium">{{ __('primix-forms::forms.file_upload.browse') }}</span>
            </p>
            @if($maxSizeForHumans)
                <p class="text-xs text-surface-400">
                    {{ __('primix-forms::forms.file_upload.max_size', ['size' => $maxSizeForHumans]) }}
                </p>
            @endif
            @if($accept)
                <p class="text-xs text-surface-400 mt-1">
                    {{ __('primix-forms::forms.file_upload.accepted_types', ['types' => str_replace(',', ', ', $accept)]) }}
                </p>
            @endif
        </div>
    </div>

    {{-- File Preview List --}}
    @if($isMultiple)
        <div
            v-if="{{ $vueStatePath }} && {{ $vueStatePath }}.length > 0"
            class="mt-4 space-y-2"
            @if($isReorderable) v-sort="{{ $vueStatePath }}" @endif
        >
            <div
                v-for="(file, index) in {{ $vueStatePath }}"
                :key="index"
                class="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg"
                @if($isReorderable) v-sort-item="index" @endif
            >
                @if($isReorderable)
                    {{-- Drag Handle --}}
                    <div v-sort-handle class="flex-shrink-0 cursor-grab active:cursor-grabbing text-surface-400 hover:text-surface-600 dark:hover:text-surface-300">
                        <i class="pi pi-bars"></i>
                    </div>
                @endif

                {{-- Image Preview --}}
                @if($isPreviewable && $isImage)
                    {{-- New upload with previewUrl --}}
                    <img
                        v-if="typeof file === 'object' && file.previewUrl"
                        :src="file.previewUrl"
                        class="w-12 h-12 object-cover rounded flex-shrink-0"
                    >
                    {{-- Saved path (string) - show from storage --}}
                    <img
                        v-else-if="typeof file === 'string'"
                        :src="'/storage/' + file"
                        class="w-12 h-12 object-cover rounded flex-shrink-0"
                    >
                    <div v-else class="w-12 h-12 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center flex-shrink-0">
                        <i class="pi pi-image text-surface-400"></i>
                    </div>
                @else
                    <div class="w-12 h-12 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center flex-shrink-0">
                        <i class="pi pi-file text-surface-400"></i>
                    </div>
                @endif

                {{-- File Info --}}
                <div class="flex-1 min-w-0">
                    {{-- Show filename: originalName for uploads, extracted from path for saved files --}}
                    <p class="text-sm font-medium text-surface-700 dark:text-surface-300 truncate"
                       v-text="typeof file === 'object' ? file.originalName : file.split('/').pop()"></p>
                    {{-- Show size only for new uploads --}}
                    <p v-if="typeof file === 'object' && file.size" class="text-xs text-surface-500"
                       v-text="file.size >= 1048576 ? (file.size / 1048576).toFixed(1) + ' MB' : (file.size / 1024).toFixed(1) + ' KB'"></p>
                </div>

                {{-- Actions --}}
                <div class="flex items-center gap-1 flex-shrink-0" v-sort-ignore>
                    @if($hasImageEditor)
                        @php
                            $editUploadedImageAction = \Primix\Actions\Action::make('editUploadedImage')
                                ->label(__('primix-forms::forms.file_upload.edit'))
                                ->icon('pi pi-pencil')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); \$refs['{$imageEditorRef}'].open(file.previewUrl, index, file.originalName)")
                                ->extraAttributes([
                                    'v-if' => "typeof file === 'object' && file.previewUrl",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => __('primix-forms::forms.file_upload.edit'),
                                ]);

                            $editSavedImageAction = \Primix\Actions\Action::make('editSavedImage')
                                ->label(__('primix-forms::forms.file_upload.edit'))
                                ->icon('pi pi-pencil')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); \$refs['{$imageEditorRef}'].open('/storage/' + file, index, file.split('/').pop())")
                                ->extraAttributes([
                                    'v-else-if' => "typeof file === 'string'",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => __('primix-forms::forms.file_upload.edit'),
                                ]);
                        @endphp
                        {{ $editUploadedImageAction }}
                        {{ $editSavedImageAction }}
                    @endif
                    @if($isDownloadable)
                        @php
                            $downloadUploadedFileAction = \Primix\Actions\Action::make('downloadUploadedFile')
                                ->label('Download')
                                ->icon('pi pi-download')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); window.open(file.downloadUrl, '_blank')")
                                ->extraAttributes([
                                    'v-if' => "typeof file === 'object' && file.downloadUrl",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => 'Download',
                                ]);
                        @endphp
                        {{ $downloadUploadedFileAction }}
                        <a
                            v-else-if="typeof file === 'string'"
                            :href="'/storage/' + file"
                            target="_blank"
                            class="p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                            title="Download"
                        >
                            <i class="pi pi-download text-sm"></i>
                        </a>
                    @endif
                    @php
                        $removeUploadedFileAction = \Primix\Actions\Action::make('removeUploadedFile')
                            ->label(__('primix-forms::forms.file_upload.remove'))
                            ->icon('pi pi-times')
                            ->iconButton(true, false)
                            ->color('danger')
                            ->jsAction("\$event.stopPropagation(); livue.removeUpload('{$statePath}', index)")
                            ->extraAttributes([
                                'class' => 'p-2 text-surface-400 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                'title' => __('primix-forms::forms.file_upload.remove'),
                                'disabled' => $disabled,
                            ]);
                    @endphp
                    {{ $removeUploadedFileAction }}
                </div>
            </div>
        </div>

        {{-- Max Files Warning --}}
        @if($maxFiles)
            <p v-if="{{ $vueStatePath }} && {{ $vueStatePath }}.length >= {{ $maxFiles }}" class="text-sm text-amber-600 mt-2">
                <i class="pi pi-info-circle mr-1"></i>
                {{ __('primix-forms::forms.file_upload.max_files_reached', ['max' => $maxFiles]) }}
            </p>
        @endif
    @else
        {{-- Single File Preview - handles both new uploads (objects) and saved paths (strings) --}}
        <div v-if="{{ $vueStatePath }}" class="mt-4">
            <div class="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                @if($isPreviewable && $isImage)
                    {{-- New upload with previewUrl --}}
                    <img
                        v-if="typeof {{ $vueStatePath }} === 'object' && {{ $vueStatePath }}.previewUrl"
                        :src="{{ $vueStatePath }}.previewUrl"
                        class="w-16 h-16 object-cover rounded flex-shrink-0"
                    >
                    {{-- Saved path (string) - show from storage --}}
                    <img
                        v-else-if="typeof {{ $vueStatePath }} === 'string'"
                        :src="'/storage/' + {{ $vueStatePath }}"
                        class="w-16 h-16 object-cover rounded flex-shrink-0"
                    >
                    <div v-else class="w-16 h-16 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center flex-shrink-0">
                        <i class="pi pi-image text-xl text-surface-400"></i>
                    </div>
                @else
                    <div class="w-16 h-16 bg-surface-200 dark:bg-surface-700 rounded flex items-center justify-center flex-shrink-0">
                        <i class="pi pi-file text-xl text-surface-400"></i>
                    </div>
                @endif

                <div class="flex-1 min-w-0">
                    {{-- Show filename: originalName for uploads, extracted from path for saved files --}}
                    <p class="text-sm font-medium text-surface-700 dark:text-surface-300 truncate"
                       v-text="typeof {{ $vueStatePath }} === 'object' ? {{ $vueStatePath }}.originalName : {{ $vueStatePath }}.split('/').pop()"></p>
                    {{-- Show size only for new uploads --}}
                    <p v-if="typeof {{ $vueStatePath }} === 'object' && {{ $vueStatePath }}.size" class="text-xs text-surface-500"
                       v-text="{{ $vueStatePath }}.size >= 1048576 ? ({{ $vueStatePath }}.size / 1048576).toFixed(1) + ' MB' : ({{ $vueStatePath }}.size / 1024).toFixed(1) + ' KB'"></p>
                </div>

                <div class="flex items-center gap-1 flex-shrink-0">
                    @if($hasImageEditor)
                        @php
                            $editSingleUploadedImageAction = \Primix\Actions\Action::make('editSingleUploadedImage')
                                ->label(__('primix-forms::forms.file_upload.edit'))
                                ->icon('pi pi-pencil')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); \$refs['{$imageEditorRef}'].open({$vueStatePath}.previewUrl, null, {$vueStatePath}.originalName)")
                                ->extraAttributes([
                                    'v-if' => "typeof {$vueStatePath} === 'object' && {$vueStatePath}.previewUrl",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => __('primix-forms::forms.file_upload.edit'),
                                ]);

                            $editSingleSavedImageAction = \Primix\Actions\Action::make('editSingleSavedImage')
                                ->label(__('primix-forms::forms.file_upload.edit'))
                                ->icon('pi pi-pencil')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); \$refs['{$imageEditorRef}'].open('/storage/' + {$vueStatePath}, null, {$vueStatePath}.split('/').pop())")
                                ->extraAttributes([
                                    'v-else-if' => "typeof {$vueStatePath} === 'string'",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => __('primix-forms::forms.file_upload.edit'),
                                ]);
                        @endphp
                        {{ $editSingleUploadedImageAction }}
                        {{ $editSingleSavedImageAction }}
                    @endif
                    @if($isDownloadable)
                        @php
                            $downloadSingleUploadedFileAction = \Primix\Actions\Action::make('downloadSingleUploadedFile')
                                ->label('Download')
                                ->icon('pi pi-download')
                                ->iconButton(true, true)
                                ->color('gray')
                                ->jsAction("\$event.stopPropagation(); window.open({$vueStatePath}.downloadUrl, '_blank')")
                                ->extraAttributes([
                                    'v-if' => "typeof {$vueStatePath} === 'object' && {$vueStatePath}.downloadUrl",
                                    'class' => 'p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                    'title' => 'Download',
                                ]);
                        @endphp
                        {{ $downloadSingleUploadedFileAction }}
                        <a
                            v-else-if="typeof {{ $vueStatePath }} === 'string'"
                            :href="'/storage/' + {{ $vueStatePath }}"
                            target="_blank"
                            class="p-2 text-surface-400 hover:text-primary-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                            title="Download"
                        >
                            <i class="pi pi-download text-sm"></i>
                        </a>
                    @endif
                    @php
                        $removeSingleUploadedFileAction = \Primix\Actions\Action::make('removeSingleUploadedFile')
                            ->label(__('primix-forms::forms.file_upload.remove'))
                            ->icon('pi pi-times')
                            ->iconButton(true, false)
                            ->color('danger')
                            ->jsAction("\$event.stopPropagation(); livue.removeUpload('{$statePath}')")
                            ->extraAttributes([
                                'class' => 'p-2 text-surface-400 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700',
                                'title' => __('primix-forms::forms.file_upload.remove'),
                                'disabled' => $disabled,
                            ]);
                    @endphp
                    {{ $removeSingleUploadedFileAction }}
                </div>
            </div>
        </div>
    @endif

    {{-- Rejected Files (upload validation errors) --}}
    @if($isMultiple)
        <template v-for="(errorData, errorKey) in livue.errors" :key="'err-' + errorKey">
            <div
                v-if="errorKey.startsWith('{{ $statePath }}.') && errorData && errorData.file"
                class="mt-2 flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
                <div class="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-times-circle text-red-500 dark:text-red-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-red-700 dark:text-red-300 truncate"
                       v-text="errorData.file"></p>
                    <p class="text-xs text-red-600 dark:text-red-400"
                       v-text="errorData.message"></p>
                </div>
                @php
                    $dismissUploadErrorAction = \Primix\Actions\Action::make('dismissUploadError')
                        ->label(__('primix-forms::forms.file_upload.close'))
                        ->icon('pi pi-times')
                        ->iconButton(true, false)
                        ->color('danger')
                        ->jsAction('delete livue.errors[errorKey]')
                        ->extraAttributes([
                            'class' => 'p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 flex-shrink-0',
                            'title' => __('primix-forms::forms.file_upload.close'),
                        ]);
                @endphp
                {{ $dismissUploadErrorAction }}
            </div>
        </template>
    @else
        <div
            v-if="livue.errors['{{ $statePath }}'] && livue.errors['{{ $statePath }}'].file"
            class="mt-2 flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded flex items-center justify-center flex-shrink-0">
                <i class="pi pi-times-circle text-red-500 dark:text-red-400"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-red-700 dark:text-red-300 truncate"
                   v-text="livue.errors['{{ $statePath }}'].file"></p>
                <p class="text-xs text-red-600 dark:text-red-400"
                   v-text="livue.errors['{{ $statePath }}'].message"></p>
            </div>
            @php
                $dismissSingleUploadErrorAction = \Primix\Actions\Action::make('dismissSingleUploadError')
                    ->label(__('primix-forms::forms.file_upload.close'))
                    ->icon('pi pi-times')
                    ->iconButton(true, false)
                    ->color('danger')
                    ->jsAction("delete livue.errors['{$statePath}']")
                    ->extraAttributes([
                        'class' => 'p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 flex-shrink-0',
                        'title' => __('primix-forms::forms.file_upload.close'),
                    ]);
            @endphp
            {{ $dismissSingleUploadErrorAction }}
        </div>
    @endif

    {{-- Image Editor Modal --}}
    @if($hasImageEditor)
        <primix-image-editor
            ref="{{ $imageEditorRef }}"
            :config='@json($imageEditorConfig)'
            :translations='@json([
                "edit_image" => __("primix-forms::forms.edit_image"),
                "cancel" => __("primix-forms::forms.cancel"),
                "apply" => __("primix-forms::forms.image_editor.apply"),
                "tool_move" => __("primix-forms::forms.image_editor.tool_move"),
                "tool_crop" => __("primix-forms::forms.image_editor.tool_crop"),
                "tool_zoom" => __("primix-forms::forms.image_editor.tool_zoom"),
                "tool_transform" => __("primix-forms::forms.image_editor.tool_transform"),
                "tool_adjustments" => __("primix-forms::forms.image_editor.tool_adjustments"),
                "tool_filters" => __("primix-forms::forms.image_editor.tool_filters"),
                "tool_ai" => __("primix-forms::forms.image_editor.tool_ai"),
                "rotation_title" => __("primix-forms::forms.image_editor.rotation_title"),
                "rotate_ccw" => __("primix-forms::forms.image_editor.rotate_ccw"),
                "rotate_cw" => __("primix-forms::forms.image_editor.rotate_cw"),
                "free_rotation" => __("primix-forms::forms.image_editor.free_rotation"),
                "flip_title" => __("primix-forms::forms.image_editor.flip_title"),
                "flip_horizontal" => __("primix-forms::forms.image_editor.flip_horizontal"),
                "flip_vertical" => __("primix-forms::forms.image_editor.flip_vertical"),
                "crop_aspect_ratio" => __("primix-forms::forms.image_editor.crop_aspect_ratio"),
                "crop_free" => __("primix-forms::forms.image_editor.crop_free"),
                "apply_crop" => __("primix-forms::forms.image_editor.apply_crop"),
                "move_title" => __("primix-forms::forms.image_editor.move_title"),
                "drag_to_move" => __("primix-forms::forms.image_editor.drag_to_move"),
                "mouse_wheel_zoom" => __("primix-forms::forms.image_editor.mouse_wheel_zoom"),
                "zoom_title" => __("primix-forms::forms.image_editor.zoom_title"),
                "click_to_zoom_in" => __("primix-forms::forms.image_editor.click_to_zoom_in"),
                "alt_click_zoom_out" => __("primix-forms::forms.image_editor.alt_click_zoom_out"),
                "mouse_wheel_continuous" => __("primix-forms::forms.image_editor.mouse_wheel_continuous"),
                "ai_tools_title" => __("primix-forms::forms.image_editor.ai_tools_title"),
                "processing" => __("primix-forms::forms.image_editor.processing"),
                "loading_model" => __("primix-forms::forms.image_editor.loading_model"),
                "no_ai_configured" => __("primix-forms::forms.image_editor.no_ai_configured"),
                "bg_removal_label" => __("primix-forms::forms.image_editor.bg_removal_label"),
                "bg_removal_desc" => __("primix-forms::forms.image_editor.bg_removal_desc"),
                "auto_enhance_label" => __("primix-forms::forms.image_editor.auto_enhance_label"),
                "auto_enhance_desc" => __("primix-forms::forms.image_editor.auto_enhance_desc"),
            ])'
            state-path="{{ $statePath }}"
            @save="(function(payload) {
                var file = payload.file;
                @if($isMultiple)
                    var fileIndex = payload.fileIndex;
                    if (fileIndex !== null && fileIndex !== undefined) {
                        livue.removeUpload('{{ $statePath }}', fileIndex);
                    }
                @endif
                var fileInput = $refs['{{ $fieldId }}'];
                var win = fileInput.ownerDocument.defaultView;
                var dt = new win.DataTransfer();
                dt.items.add(file);
                fileInput.files = dt.files;
                fileInput.dispatchEvent(new win.Event('change'));
            })($event)"
        />
    @endif
</div>
@endif
