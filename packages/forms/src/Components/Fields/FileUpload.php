<?php

namespace Primix\Forms\Components\Fields;

use Closure;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\Facades\Storage;
use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;
use Primix\Forms\Concerns\HasImageEditor;
use Primix\Forms\Concerns\HasNestedValidation;

class FileUpload extends Field
{
    use HasImageEditor;
    use HasNestedValidation;
    protected string|array|null $acceptedFileTypes = null;

    protected int|Closure|null $maxSize = null;

    protected int|Closure|null $minSize = null;

    protected int|Closure|null $maxFiles = null;

    protected int|Closure|null $minFiles = null;

    protected bool|Closure $isMultiple = false;

    protected bool|Closure $isReorderable = false;

    protected bool|Closure $isDownloadable = false;

    protected bool|Closure $isPreviewable = true;

    protected bool|Closure $isDeletable = true;

    protected string|Closure|null $directory = null;

    protected string|Closure $disk = 'public';

    protected string|Closure $visibility = 'public';

    protected ?Closure $saveUploadedFileUsing = null;

    protected ?Closure $getUploadedFileNameForStorageUsing = null;

    protected ?Closure $deleteUploadedFileUsing = null;

    protected ?Closure $reorderUploadedFilesUsing = null;

    protected bool|Closure $shouldPreserveFilenames = false;

    protected function setUp(): void
    {
        parent::setUp();

        $this->beforeStateDehydrated(function (FileUpload $component, mixed $state): mixed {
            return $component->saveUploadedFiles($state);
        });

        $this->saveUploadedFileUsing(function (TemporaryUploadedFile $file, FileUpload $component): string {
            $directory = $component->getDirectory() ?? 'uploads';
            $disk = $component->getDisk();

            // Priority: custom callback > preserve filenames > random name
            if ($nameCallback = $component->getUploadedFileNameForStorageUsing) {
                $name = $component->evaluate($nameCallback, ['file' => $file]);

                return $file->storeAs($directory, $name, $disk);
            }

            if ($component->shouldPreserveFilenames()) {
                return $file->storeAs($directory, $file->getOriginalName(), $disk);
            }

            return $file->store($directory, $disk);
        });

        $this->deleteUploadedFileUsing(function (string $path, FileUpload $component): void {
            $disk = $component->getDisk();
            Storage::disk($disk)->delete($path);
        });

        $this->reorderUploadedFilesUsing(function (array $paths): array {
            return $paths;
        });
    }

    public function image(): static
    {
        $this->acceptedFileTypes([
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
        ]);

        return $this;
    }

    public function avatar(): static
    {
        $this->image();
        $this->directory('avatars');

        return $this;
    }

    public function acceptedFileTypes(array|string $types): static
    {
        $this->acceptedFileTypes = is_array($types) ? $types : [$types];

        return $this;
    }

    public function maxSize(int|Closure $sizeInKb): static
    {
        $this->maxSize = $sizeInKb;

        return $this;
    }

    public function minSize(int|Closure $sizeInKb): static
    {
        $this->minSize = $sizeInKb;

        return $this;
    }

    public function multiple(bool|Closure $condition = true): static
    {
        $this->isMultiple = $condition;

        return $this;
    }

    public function maxFiles(int|Closure $count): static
    {
        $this->maxFiles = $count;
        $this->multiple();

        return $this;
    }

    public function minFiles(int|Closure $count): static
    {
        $this->minFiles = $count;
        $this->multiple();

        return $this;
    }

    public function reorderable(bool|Closure $condition = true): static
    {
        $this->isReorderable = $condition;

        return $this;
    }

    public function downloadable(bool|Closure $condition = true): static
    {
        $this->isDownloadable = $condition;

        return $this;
    }

    public function previewable(bool|Closure $condition = true): static
    {
        $this->isPreviewable = $condition;

        return $this;
    }

    public function deletable(bool|Closure $condition = true): static
    {
        $this->isDeletable = $condition;

        return $this;
    }

    public function directory(string|Closure $directory): static
    {
        $this->directory = $directory;

        return $this;
    }

    public function disk(string|Closure $disk): static
    {
        $this->disk = $disk;

        return $this;
    }

    public function visibility(string|Closure $visibility): static
    {
        $this->visibility = $visibility;

        return $this;
    }

    public function saveUploadedFileUsing(?Closure $callback): static
    {
        $this->saveUploadedFileUsing = $callback;

        return $this;
    }

    public function getUploadedFileNameForStorageUsing(?Closure $callback): static
    {
        $this->getUploadedFileNameForStorageUsing = $callback;

        return $this;
    }

    public function deleteUploadedFileUsing(?Closure $callback): static
    {
        $this->deleteUploadedFileUsing = $callback;

        return $this;
    }

    public function reorderUploadedFilesUsing(?Closure $callback): static
    {
        $this->reorderUploadedFilesUsing = $callback;

        return $this;
    }

    public function preserveFilenames(bool|Closure $condition = true): static
    {
        $this->shouldPreserveFilenames = $condition;

        return $this;
    }

    public function shouldPreserveFilenames(): bool
    {
        return (bool) $this->evaluate($this->shouldPreserveFilenames);
    }

    public function isMultiple(): bool
    {
        return (bool) $this->evaluate($this->isMultiple);
    }

    public function isImage(): bool
    {
        $types = $this->getAcceptedFileTypes();

        if ($types === null) {
            return false;
        }

        foreach ($types as $type) {
            if (! str_starts_with($type, 'image/')) {
                return false;
            }
        }

        return true;
    }

    public function isReorderable(): bool
    {
        return $this->isMultiple() && (bool) $this->evaluate($this->isReorderable);
    }

    public function isDownloadable(): bool
    {
        return (bool) $this->evaluate($this->isDownloadable);
    }

    public function isPreviewable(): bool
    {
        return (bool) $this->evaluate($this->isPreviewable);
    }

    public function isDeletable(): bool
    {
        return (bool) $this->evaluate($this->isDeletable);
    }

    public function getAcceptedFileTypes(): ?array
    {
        return $this->acceptedFileTypes;
    }

    public function getMaxSize(): ?int
    {
        return $this->evaluate($this->maxSize);
    }

    public function getMinSize(): ?int
    {
        return $this->evaluate($this->minSize);
    }

    public function getMaxFiles(): ?int
    {
        return $this->evaluate($this->maxFiles);
    }

    public function getMinFiles(): ?int
    {
        return $this->evaluate($this->minFiles);
    }

    public function getDirectory(): ?string
    {
        return $this->evaluate($this->directory);
    }

    public function getDisk(): string
    {
        return $this->evaluate($this->disk);
    }

    public function getVisibility(): string
    {
        return $this->evaluate($this->visibility);
    }

    public function getDiskInstance(): FilesystemAdapter
    {
        return Storage::disk($this->getDisk());
    }

    public function getAcceptAttribute(): ?string
    {
        $types = $this->getAcceptedFileTypes();

        if ($types === null) {
            return null;
        }

        return implode(',', $types);
    }

    public function getMaxSizeForHumans(): ?string
    {
        $size = $this->getMaxSize();

        if ($size === null) {
            return null;
        }

        if ($size >= 1024) {
            return round($size / 1024, 1) . ' MB';
        }

        return $size . ' KB';
    }

    /**
     * Get validation rules for a single file.
     * Used for nested validation (field.*) when multiple.
     */
    public function getFileValidationRules(): array
    {
        // Use custom nested rules if defined
        $nestedRules = $this->getNestedRules();
        if (! empty($nestedRules)) {
            return $nestedRules;
        }

        // Otherwise, build rules from field configuration
        $rules = [];

        if ($this->isImage()) {
            $rules[] = 'image';
        } else {
            $rules[] = 'file';
        }

        if ($maxSize = $this->getMaxSize()) {
            $rules[] = "max:{$maxSize}";
        }

        if ($minSize = $this->getMinSize()) {
            $rules[] = "min:{$minSize}";
        }

        if ($types = $this->getAcceptedFileTypes()) {
            $mimeTypes = implode(',', $types);
            $rules[] = "mimetypes:{$mimeTypes}";
        }

        return $rules;
    }

    /**
     * Get validation rules for the array itself (when multiple).
     * Used for the base field path validation.
     */
    public function getArrayValidationRules(): array
    {
        // Use custom array rules if defined
        $arrayRules = $this->getArrayRules();
        if (! empty($arrayRules)) {
            return $arrayRules;
        }

        // Otherwise, build rules from field configuration
        if (! $this->isMultiple()) {
            return [];
        }

        $rules = ['array'];

        if ($minFiles = $this->getMinFiles()) {
            $rules[] = "min:{$minFiles}";
        }

        if ($maxFiles = $this->getMaxFiles()) {
            $rules[] = "max:{$maxFiles}";
        }

        return $rules;
    }

    /**
     * Get all validation rules for this field.
     * Returns rules keyed by path (including nested .* for multiple uploads).
     */
    public function getAllValidationRules(string $basePath): array
    {
        $rules = [];

        if ($this->isMultiple()) {
            // Array rules for the field itself
            $arrayRules = $this->getArrayValidationRules();
            if (! empty($arrayRules)) {
                $rules[$basePath] = $arrayRules;
            }

            // File rules for each item
            $fileRules = $this->getFileValidationRules();
            if (! empty($fileRules)) {
                $rules[$basePath . '.*'] = $fileRules;
            }
        } else {
            // Single file: rules go directly on the field
            $fileRules = $this->getFileValidationRules();
            if (! empty($fileRules)) {
                $rules[$basePath] = $fileRules;
            }
        }

        return $rules;
    }

    public function saveUploadedFiles(mixed $state): mixed
    {
        if ($state === null) {
            return null;
        }

        if ($this->isMultiple()) {
            if (! is_array($state)) {
                return [];
            }

            return array_values(array_filter(
                array_map(fn ($file) => $this->saveUploadedFile($file), $state)
            ));
        }

        return $this->saveUploadedFile($state);
    }

    protected function saveUploadedFile(mixed $file): ?string
    {
        if ($file === null) {
            return null;
        }

        if (is_string($file)) {
            return $file;
        }

        if (! ($file instanceof TemporaryUploadedFile)) {
            return null;
        }

        if ($callback = $this->saveUploadedFileUsing) {
            return $this->evaluate($callback, [
                'file' => $file,
                'component' => $this,
            ]);
        }

        return null;
    }

    public function deleteUploadedFile(string $path): void
    {
        if ($callback = $this->deleteUploadedFileUsing) {
            $this->evaluate($callback, [
                'path' => $path,
                'component' => $this,
            ]);
        }
    }

    public function reorderUploadedFiles(array $paths): array
    {
        if ($callback = $this->reorderUploadedFilesUsing) {
            return $this->evaluate($callback, [
                'paths' => $paths,
                'component' => $this,
            ]) ?? $paths;
        }

        return $paths;
    }

    public function getView(): string
    {
        return 'primix-forms::components.fields.file-upload';
    }

    public function toVueProps(): array
    {
        return array_merge(parent::toVueProps(), [
            'multiple' => $this->isMultiple(),
            'isImage' => $this->isImage(),
            'reorderable' => $this->isReorderable(),
            'downloadable' => $this->isDownloadable(),
            'previewable' => $this->isPreviewable(),
            'deletable' => $this->isDeletable(),
            'acceptedFileTypes' => $this->getAcceptedFileTypes(),
            'accept' => $this->getAcceptAttribute(),
            'maxSize' => $this->getMaxSize(),
            'minSize' => $this->getMinSize(),
            'maxFiles' => $this->getMaxFiles(),
            'minFiles' => $this->getMinFiles(),
            'maxSizeForHumans' => $this->getMaxSizeForHumans(),
            'imageEditor' => $this->getImageEditorConfig(),
        ]);
    }
}
