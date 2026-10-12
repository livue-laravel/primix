# Changelog

All notable changes to Primix are documented in this file.

## [Unreleased]

### Added

- Native loading state on `Primix\Actions\Action`. The `<p-button>` rendered by `action.blade.php`, `action-group.blade.php`, and `action-modal.blade.php` now binds `:loading` to the LiVue helpers `livue.isCallingAction('<name>')` (regular and confirmation actions) and `livue.isSubmittingForm()` (submit buttons). A built-in multi-click guard drops concurrent invocations of the same action name. Client-side branches (`->url(...)`, `->jsAction(...)`) and the modal opener button are intentionally not bound. Requires LiVue ≥ 1.5.22 (introduced the matching `runAction` / `runActionWithConfirm` / `runFormSubmit` / `isCallingAction` / `isSubmittingForm` helpers).

### Fixed

- Mobile sidebar drawer in `Topbar` is now styled correctly: pass-through configuration (`mobileDrawerPt`) is bound to `<p-drawer :pt="...">`, so the panel container has the expected `bg-white dark:bg-gray-900` background and header/content padding.
- A field's label now points at the control it names. The Blade views of `toggle`, `checkbox`, `color-picker`, `select` and the text input's spin buttons passed `id` to the PrimeVue component, which spends it on its own wrapper, so `<label for>` reached a `<div>`: clicking the label did nothing, and a test or a screen reader could not find the control through its name. They pass `input-id` now, which PrimeVue puts on the real input.
- A repeater row reads its own state. `$get` and `$set` inside a repeater item resolved against the form root instead of the row, so a field's `->visible(fn ($get) => ...)` or `->watch()` saw the wrong value — or none. `FormComponent::scopeStatePath()` and `Repeater::prepareItemField()` scope a field to the container it lives in, which makes conditional fields inside a repeater work at all.
