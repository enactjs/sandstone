# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Changed

- `sandstone/VirtualList.VirtualList`, `sandstone/VirtualList.VirtualGridList` and `sandstone/Scroller.Scroller` samplers have been updated based on current VirtualList and Scroller APIs

## [1.0.0-alpha.3] - 2020-03-09

### Deprecated

- `sandstone/InputPopup` and `sandstone/InputPopup.NumberInputPopup` are now just `sandstone/Input`, accessible via`type="text"`, `type="password"`, `type="number"`, or `type="passwordnumber"`

### Changed

- `sandstone/Input` has been moved into `sandstone/Input.InputField` but is reserved and should only be used when expressly permitted

### Fixed

- `sandstone/Scroller.Scroller` to scroll not sluggish when holding keys on scroll thumb.
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` not to suddenly jump when pressing directional keys after wheeling.
- `sandstone/Scroller.Scroller` to wheel normally when `focusableScrollbar` prop is `byEnter`.

## [1.0.0-alpha.2] - 2020-03-03

### Changed

- `sandstone/Alert` visuals for updated GUI
- `sandstone/VideoPlayer` visuals for updated GUI

### Added

- `sandstone/InputPopup` component
- `sandstone/Panels.WizardPanel` component

## [1.0.0-alpha.1] - 2020-02-26

Initial alpha release.
