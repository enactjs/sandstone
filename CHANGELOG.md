# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Deprecated

- `sandstone/InputPopup` and `sandstone/InputPopup.NumberInputPopup` are now just `sandstone/Input`, accessible via`type="text"`, `type="password"`, `type="number"`, or `type="passwordnumber"`

### Changed

- `sandstone/Input` has been moved into `sandstone/Input.InputField` but is reserved and should only be used when expressly permitted

### Fixed

- `Scroller.Scroller` to wheel normally when `focusableScrollbar` prop is `byEnter`.

## [1.0.0-alpha.2] - 2020-03-03

### Changed

- `sandstone/Alert` visuals for updated GUI
- `sandstone/VideoPlayer` visuals for updated GUI

### Added

- `sandstone/InputPopup` component
- `sandstone/Panels.WizardPanel` component

## [1.0.0-alpha.1] - 2020-02-26

Initial alpha release.
