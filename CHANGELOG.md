# Changelog

All notable changes to Primix are documented in this file.

## [Unreleased]

### Added

- Native loading state on `Primix\Actions\Action`. The `<p-button>` rendered by `action.blade.php`, `action-group.blade.php`, and `action-modal.blade.php` now binds `:loading` to the LiVue helpers `livue.isCallingAction('<name>')` (regular and confirmation actions) and `livue.isSubmittingForm()` (submit buttons). A built-in multi-click guard drops concurrent invocations of the same action name. Client-side branches (`->url(...)`, `->jsAction(...)`) and the modal opener button are intentionally not bound. Requires LiVue ≥ 1.5.22 (introduced the matching `runAction` / `runActionWithConfirm` / `runFormSubmit` / `isCallingAction` / `isSubmittingForm` helpers).

### Fixed

- Mobile sidebar drawer in `Topbar` is now styled correctly: pass-through configuration (`mobileDrawerPt`) is bound to `<p-drawer :pt="...">`, so the panel container has the expected `bg-white dark:bg-gray-900` background and header/content padding.
