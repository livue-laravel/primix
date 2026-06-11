# Changelog

All notable changes to Primix are documented in this file.

## [Unreleased]

### Fixed

- Mobile sidebar drawer in `Topbar` is now styled correctly: pass-through configuration (`mobileDrawerPt`) is bound to `<p-drawer :pt="...">`, so the panel container has the expected `bg-white dark:bg-gray-900` background and header/content padding.
