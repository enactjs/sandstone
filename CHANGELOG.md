# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Added

- `sandstone/GridListImageItem` prop `imageIconComponent` and `imageIconSource` to support an image icon.
- `sandstone/Input` prop `size`

### Fixed

- `sandstone/Scroller.Scroller` to scroll properly to show the focused item fully.
- `sandstone/ContextualPopupDecorator` to correctly manage focus when changing its open state
- `sandstone/Scroller.Scroller` to display the `scrollbar` as the correct height.
- `sandstone/Scroller.Scroller` to scroll not sluggish when holding keys on scroll thumb.
- `sandstone/VideoPlayer` to continue to display controls when user activity is detected˛
- `sandstone/Input` and `sandstone/Popup` to correctly support marquee

## [1.0.0-alpha.3] - 2020-03-09

### Deprecated

- `sandstone/InputPopup` and `sandstone/InputPopup.NumberInputPopup` are now just `sandstone/Input`, accessible via`type="text"`, `type="password"`, `type="number"`, or `type="passwordnumber"`

### Changed

- `sandstone/Input` has been moved into `sandstone/Input.InputField` but is reserved and should only be used when expressly permitted

### Fixed

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
