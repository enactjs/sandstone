# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Added
- `sandstone/Scroller` and `sandstone/VirtualList` prop `initialHiddenHeight` to provide the initially hidden height of the vertical scrollbar when `featureContent` prop in the panel set to true.

## [1.0.0-beta.1] - 2020-04-27

### Removed

- `sandstone/Item` prop `selected`
- `sandstone/Panels.Header` props `headerInput` and `showInput`
- `sandstone/TabLayout` prop `tabs`
- `sandstone/DayPicker`, `sandstone/DaySelector`, `sandstone/Dialog`, `sandstone/EditableIntegerPicker`, `sandstone/ExpandableInput`, `sandstone/ExpandableItem`, `sandstone/ExpandableList`, `sandstone/ExpandablePicker`, `sandstone/FormCheckbox`, `sandstone/GridListImageItem`, `sandstone/IconButton`, `sandstone/IncrementSlider`, `sandstone/InputPopup`, `sandstone/LabeledIcon`, `sandstone/LabeledIconButton`, `sandstone/LabeledItem`, `sandstone/Notification`, `sandstone/Panels.ActivityPanels`, `sandstone/Panels.AlwaysViewingPanels`, `sandstone/Panels.Breadcrumb`, `sandstone/SelectableItem`, `sandstone/SlotItem`, `sandstone/ToggleButton`, `sandstone/ToggleIcon`, and `sandstone/ToggleItem`

### Added

- `sandstone/Heading` support for `size` type of `'tiny'`
- `sandstone/Item` prop `centered`
- `sandstone/Panels` and `sandstone/Panels.WizardPanel` props `onTransition` and `onWillTransition`
- `sandstone/Panels.WizardPanel` prop `noAnimation` to suppress view transition animation
- `sandstone/PopupTabLayout` component
- `sandstone/Scroller` prop `fadeOut` to show fade-out effect
- `sandstone/Slider` and `sandstone/ProgressBar` prop `showAnchor` to display anchor based on `progressAnchor` value
- `sandstone/VideoPlayer` props `initialJumpDelay`, `jumpDelay`, and `no5WayJump` to prevent and adjust the speed of media jumping via 5way
- `sandstone/VirtualList.VirtualGridList` prop `noAffordance` to remove the affordance effect when scrolling forward via 5way

### Changed

- `sandstone/ImageItem` focus effect when in a vertical orientation

### Fixed

- `sandstone/DatePicker` and `sandstone/TimePicker` to match current designs
- `sandstone/Dropdown` to focus on selected option
- `sandstone/Picker` horizontal joined height in large text mode
- `sandstone/Scroller` focus behavior of the scroll thumb

## [1.0.0-alpha.9] - 2020-04-20

### Deprecated

- `sandstone/TabLayout` prop `tabs`, to be removed in beta.1. Use `sandstone/TabLayout.Tab` instead.

### Added

- `sandstone/Panels.Panel` prop `featureContent` to minimize the panel visuals to feature the content more prominently
- `sandstone/TabLayout.Tab` for configuring `TabLayout` tab contents

### Fixed

- `sandstone/Button` styles for `selected`
- `sandstone/Switch` sizing and positioning in large text mode
- `sandstone/Checkbox` and `sandstone/RadioItem` styling when disabled and focused

## [1.0.0-alpha.8] - 2020-04-14

### Deprecated

- `sandstone/Panels.Header` props `headerInput` and `showInput`, to be removed in 1.0.0-beta.1

### Added

- `sandstone/Panels.FlexiblePopupPanels` for a flexible size pop-up Panels experience
- `sandstone/Panels` and `sandstone/Panels.Header` props `backButtonAriaLabel`, `backButtonBackgroundOpacity`, `closeButtonAriaLabel`, `closeButtonBackgroundOpacity`, `noBackButton`, `noCloseButton`, `onBack`, and `onClose`

### Changed

- `sandstone/Panels.OptionPanels` to `sandstone/Panels.FixedPopupPanels`
- `sandstone/Scroller` and `sandstone/VirtualList` overscroll effect to bounce
- `sandstone/Picker` horizontal joined behavior and style for updated GUI

### Fixed

- `sandstone/TabLayout` to not select a previously focused tab after switching from 5-way to pointer mode

## [1.0.0-alpha.7] - 2020-04-06

### Added

- `sandstone/Tooltip` public class names `tooltip` and `tooltipLabel`

### Changed

- `sandstone/Picker`, `sandstone/ProgressBar.ProgressBarTooltip`, and `sandstone/Steps` to use a number font for numeric content

### Fixed

- `sandstone/Panels.Header` to always vertically center the input field
- `sandstone/ImageItem` to not have a truncated label in RTL locales
- `sandstone/VirtualList.VirtualGridList` to position items correctly at the bottom when scrolling via down key
- `sandstone/Switch` styling when disabled and focused

## [1.0.0-alpha.6] - 2020-03-30

### Removed

- `sandstone/Panels` support for `controls` and the application close button

### Deprecated

- `sandstone/FormCheckbox`, use `sandstone/Checkbox` instead
- `sandstone/GridListImageItem`, use `sandstone/ImageItem` instead
- `sandstone/Panels.Breadcrumb`, to be removed in beta.1

### Added

- `sandstone/ImageItem` component
- `sandstone/ProgressButton` component
- `sandstone/Checkbox` standalone interactive capability
- `sandstone/Checkbox`, `sandstone/CheckboxItem`, and `sandstone/FormCheckboxItem` props `indeterminate` and `indeterminateIcon`, for representing a half or mixed state of a checkbox
- `sandstone/FromCheckboxItem` and `sandstone/Item` styling

### Changed

- `sandstone/FeedbackTooltip` visuals for updated GUI
- `sandstone/MediaOverlay` styling
- `sandstone/Panels` to default to `SlideLeftArranger`
- `sandstone/Panels` styling to match updated GUI

### Fixed

- `sandstone/Button` and `sandstone/Item` (and their derivatives) disabled colors
- `sandstone/Button` icon-only sizing so it is square once again
- `sandstone/Input` overlay number type keypad to lay-out its buttons correctly, in a 3x4 grid
- `sandstone/Scroller` and `sandstone/VirtualList` to scroll by wheel on the scrollbar
- `sandstone/Scroller` and `sandstone/VirtualList` to hide the scrollbar after N seconds
- `sandstone/Slider` default behavior to activate by focus, so the slider is immediately interactive when using 5-way
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
