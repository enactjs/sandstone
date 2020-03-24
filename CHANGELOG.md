# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Fixed

- `sandstone/Slider` default for `activateOnFocus` to `true` so the slider is immediately interactive when using 5-way
- `sandstone/ProgressBar.ProgressBarTooltip` to display only "center" position when "auto" is selected

## [1.0.0-alpha.5] - 2020-03-23

### Removed

- `sandstone` LESS mixins `.sand-spotlight-resting` and `.sand-spotlight-focus`, replacing them with `.sand-spotlight-resting-color` and `.sand-spotlight-focus-color` respectively

### Changed

- `sandstone/VideoPlayer` to not hide playback controls when pressing 5way up

### Fixed

- `sandstone/Input.InputField` to show icons when focused
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList` to position overscroll effect properly when a horizontal scrollbar is displayed
- `sandstone/Scroller` to show the focused item fully when scrolling with 5way directional keys
- `sandstone/TabLayout` to select tabs when focusing them in 5-way mode
- `sandstone/ThemeDecorator` global focus+disabled rules to not double-apply opacity values

## [1.0.0-alpha.4] - 2020-03-17

### Added

- `sandstone/GridListImageItem` props `imageIconComponent` and `imageIconSource` to support an image icon
- `sandstone/Input` prop `size`
- `sandstone/Switch` support for focus state

### Fixed

- `sandstone/Button` icon sizing
- `sandstone/ContextualPopupDecorator` to correctly manage focus when changing its open state
- `sandstone/Input` and `sandstone/Popup` to correctly support marquee
- `sandstone/Picker` joined styling
- `sandstone/Scroller.Scroller` to display the `scrollbar` as the correct height
- `sandstone/Scroller.Scroller` to scroll not sluggish when holding keys on scroll thumb
- `sandstone/SwitchItem` styling
- `sandstone/VideoPlayer` to continue to display controls when user activity is detected˛

## [1.0.0-alpha.3] - 2020-03-09

### Deprecated

- `sandstone/Panels.ActivityPanels` and `sandstone/Panels.AlwaysViewingPanels`, use `sandstone/Panels.Panels` or one of the pre-defined views.
- `sandstone/DayPicker`, `sandstone/DaySelector`, `sandstone/EditableIntegerPicker`, `sandstone/ExpandableItem`, `sandstone/ExpandablePicker`, `sandstone/ToggleButton`, `sandstone/ToggleIcon` to be removed in beta.1
- `sandstone/Dialog`, use `sandstone/Popup`
- `sandstone/ExpandableInput`, `sandstone/InputPopup`, `sandstone/InputPopup.NumberInputPopup`, use `sandstone/Input`
- `sandstone/LabeledItem`, `sandstone/SlotItem`, `sandstone/ToggleItem`, use `sandstone/Item`
- `sandstone/Notification`, use `sandstone/Alert`
- `sandstone/SelectableItem`, use `sandstone/CheckboxItem`

### Changed

- `sandstone/Input` to implement a popup-style input. The old functionality was moved to `sandstone/Input.InputField`, but is reserved and should only be used when expressly permitted.

### Fixed

- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to not suddenly jump when pressing directional keys after wheeling
- `sandstone/Scroller.Scroller` to wheel normally when `focusableScrollbar` prop is `byEnter`
- `sandstone/Button` styling
- `sandstone/Heading` styling


## [1.0.0-alpha.2] - 2020-03-03

### Changed

- `sandstone/Alert` visuals for updated GUI
- `sandstone/VideoPlayer` visuals for updated GUI

### Added

- `sandstone/InputPopup` component
- `sandstone/Panels.WizardPanel` component

## [1.0.0-alpha.1] - 2020-02-26

Initial alpha release.
