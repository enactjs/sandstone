# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Removed

- `sandstone` support for `data-spotlight-container-muted`

### Added

- `sandstone/Input` event `onBeforeChange`

### Changed

- `sandstone/TooltipDecorator` prop `tooltipWidth` and `sandstone/TooltipDecorator.Tooltip` prop `width` to support either an auto-scaled number of pixels or a string CSS measurement value
- `sandstone/PopupTabLayout.TabPanels` prop `noCloseButton` to be `false` by default

### Fixed

- `sandstone/Scroller` to stop propagation of keydown event from a scroller thumb when it scrolls
- `sandstone/Button` style when using small, icon-only buttons in non-latin locales
- `sandstone/Dropdown` to read out `aria-label` without `title` when `aria-label` prop exists
- `sandstone/FlexiblePopupPanels` to retain focus on navigation buttons when used to change panels
- `sandstone/Scroller` to prevent overlapping with `sandstone/BodyText` when `focusableScrollbar` prop is `true` or `byEnter`
- `sandstone/Panels.Panel` to read out only a title and a subtitle except a panel in `sandstone/WizardPanels`
- `sandstone/Picker` values position in RTL
- `sandstone/ImageItem` to pass `role` and `aria-checked` when `showSelection` prop exists
- `sandstone/Input` to marquee the invalid tooltip
- `sandstone/Popup` to respect paused spotlight
- `sandstone/PopupTabLayout` style to match latest designs
- `sandstone/Spinner` to update to the latest design
- `sandstone/TabLayout` to disable the collapsed list icon button when all tabs are disabled
- `sandstone/TimePicker` spacing between pickers in RTL
- `sandstone/WizardPanels` read out properly

## [1.0.0-rc.1] - 2020-06-29

### Removed

- `sandstone` focus animation

### Added

- `sandstone` high-contrast support

### Changed

- `sandstone/Scroller` and `sandstone/VirtualList` to not show a scroll thumb when focus is moving without scrolling
- `sandstone/Input` prop `size` default value to small

### Fixed

- `sandstone/ActionGuide`, `sandstone/Alert`, `sandstone/Checkbox`, `sandstone/CheckboxItem`, and `sandstone/FormCheckboxItem`, `sandstone/Input`, `sandstone/MediaPlayer`, `sandstone/Picker`, and `sandstone/VideoPlayer` style to match latest designs
- `sandstone/Dropdown` margins to correctly align with other components
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` to allow clicking near, but outside, the Panels to dismiss them
- `sandstone/FixedPopupPanels` to not read out a title twice
- `sandstone/FlexiblePopupPanels` and `sandstone/PopupTabLayout` shadow effects
- `sandstone/Input` submit button positioning
- `sandstone/Item` to prevent unnecessary re-rendering
- `sandstone/PopupTabLayout` to read out properly
- `sandstone/Scroller` and `sandstone/VirtualList` to not show a scroll thumb when focus is moving without scrolling
- `sandstone/Tooltip` arrow rendering to eliminate a vertical gap
- `sandstone/WizardPanels` direction of buttons and transition in RTL locales
- `sandstone/Button` style to match latest designs

## [1.0.0-beta.8] - 2020-06-22

### Added

- `sandstone` LESS mixin `.sand-spotlight-focus-text-colors` to support focused font style
- `sandstone/ImageItem` prop `centered` to center the primary caption in vertical orientation

### Changed

- `sandstone` LESS mixins `.sand-spotlight-resting-colors` and `.sand-spotlight-focus-colors` to `.sand-spotlight-resting-bg-colors` and `.sand-spotlight-focus-bg-colors` respectively
- `sandstone/Button` to include a small top and bottom margin to avoid clipping the expanded focus state
- `sandstone/Dropdown` to prevent focus on the outer area
- `sandstone/Icon` supported icon list
- `sandstone/Input` `disabled` prop to not close an open input
- `sandstone/MediaControls` to show more components via wheel down

### Fixed

- `sandstone/Dropdown` to support readout placeholder string
- `sandstone/Button`, `sandstone/DatePicker`, `sandstone/FormCheckboxItem`, `sandstone/ImageItem`, `sandstone/Item`, and `sandstone/MediaOverlay` font style when focused
- `sandstone/Checkbox` to center the icon
- `sandstone/ContextualMenuDecorator` to match the latest style guide
- `sandstone/DatePicker` to read out 'day', 'month', or 'year' when it is focused or its value is changed
- `sandstone/Dropdown` to match the latest design
- `sandstone/Dropdown` to not expand the button activator when focused
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` to respect `spotlightRestrict`
- `sandstone/FixedPopupPanels` padding in RTL locales
- `sandstone/FormCheckboxItem` to not have a focusable inner part
- `sandstone/Input` to display the submit button when the number input field is used
- `sandstone/Input` to support accessibility features
- `sandstone/Item` style to match latest designs
- `sandstone/KeyGuide` to position on the right in RTL
- `sandstone/MediaOverlay` style to match latest designs
- `sandstone/Panels` to properly restore focus after a transition
- `sandstone/Popup` to correctly emit the `onClose` event when focus leaves the popup
- `sandstone/PopupTabLayout` to position on the left in RTL
- `sandstone/ProgressButton` to match the latest design
- `sandstone/Scroller` and `sandstone/VirtualList` to not show the scrollbar on every re-render
- `sandstone/Switch` and `sandstone/SwitchItem` accessibility read out
- `sandstone/TabLayout` to center tab icons when collapsed
- `sandstone/TimePicker` to read out 'hour' or 'minute' when it is focused or its value is changed
- `sandstone/TooltipDecorator` to center text when `tooltipMarquee` is used with centered alignment

## [1.0.0-beta.7] - 2020-06-16

### Added

- `sandstone/Dropdown` prop `title` to optionally display a heading above the component
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` prop `fullHeight` to force these components to always stretch to the screen edges
- `sandstone/Icon` prop `flip` value `"auto"` to automatically flip the icon horizontally for RTL locales
- `sandstone/TooltipDecorator` prop `tooltipType` to support new transparent label-style tooltips
- `sandstone/TooltipDecorator` prop `tooltipMarquee` to support marquee

### Changed

- `sandstone/Dropdown` prop `title` to `placeholder` to display a value within the component when no selection has been made
- `sandstone/Input` to highlight activated number cells
- `sandstone/Panel` and `sandstone/WizardPanels` support for reference forwarding to obtain a reference to each component's root node

### Fixed

- `sandstone/Alert` to center its content when `type="fullscreen"`
- `sandstone/Button` flashing when switching `selected` on and off
- `sandstone/CheckboxItem`, `sandstone/FormCheckboxItem`, `sandstone/RadioItem`, and `sandstone/SwitchItem` slots margins
- `sandstone/ContextualMenuDecorator` to not be read as an alert when rendered
- `sandstone/ContextualPopupDecorator` to position itself correctly when `direction` is changed
- `sandstone/DayPicker` format for locales that do not start the week on Sunday
- `sandstone/Dropdown` to properly read the focused item
- `sandstone/FixedPopupPanels` layout in RTL locales
- `sandstone/FixedPopupPanels` to support accessibility properly
- `sandstone/FixedPopupPanels` to flex to the content size and invoke scrolling (when using `sandstone/Scroller`) when the content is too big
- `sandstone/Input` to update `invalidTooltip` to the latest design
- `sandstone/Panel` and `sandstone/WizardPanels` to not read out the Panel title after closing a dropdown
- `sandstone/TabLayout` to restore focus to the selected tab when expanding without icons
- `sandstone/TabLayout` performance when focusing items in the layout
- `sandstone/ThemeDecorator.AccessibilityDecorator` not to overwrite its `skinVariants` prop
- `sandstone/VirtualList` focus when 5way directional keys are quickly and consecutively pressed
- `sandstone/WizardPanels` to use `sandstone/Skinnable`

## [1.0.0-beta.6] - 2020-06-08

### Removed

- `sandstone/Alert` prop `subtitle`

### Added

- `sandstone/KeyGuide` support for color keys
- `sandstone/Scroller` props `horizontalScrollThumbAriaLabel` and `verticalScrollThumbAriaLabel` to provide customization of the hint string read when a scroll thumb is focused

### Changed

- `sandstone/Icon` supported icon list, adding new icons and removing unused ones

### Fixed

- `sandstone/Alert` to use multi-line content when `"fullscreen"`
- `sandstone/Checkbox`, `sandstone/CheckboxItem`, `sandstone/Switch`, `sandstone/SwitchItem`, `sandstone/RadioItem` and `sandstone/FormCheckboxItem` to read out as selected value
- `sandstone/Dropdown` to retain correct focus when `selected` or `children` change
- `sandstone/Dropdown` to show an item fully when the item gets focus
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` to properly respond to back button presses
- `sandstone/Panels.Header` style to match latest designs
- `sandstone/Popup` to always remove the scrim when closed
- `sandstone/Scroller` and `sandstone/VirtualList` to show the scrollbar initially
- `sandstone/Scroller` and `sandstone/VirtualList` to show the horizontal overscroll effect properly in RTL locales
- `sandstone/TabLayout` button sizes to match the latest designs
- `sandstone/WizardPanels` to respect using `spotlight/SpotlightContainerDecorator.spotlightDefaultClass` to determine the default focus

## [1.0.0-beta.5] - 2020-06-01

### Removed

- `sandstone/MediaPlayer.MediaControls` props `backwardIcon`, `forwardIcon`, `noRateButtons`, `onBackwardButtonClick`, `onForwardButtonClick`, `rateButtonsDisabled`

### Added

- `sandstone/FlexiblePopupPanels.Panel` props `prevButton` and `nextButton` to provide customization of the navigational buttons on each `Panel`
- `sandstone/FlexiblePopupPanels` props `onChange`, `onNextClick`, and `onPrevClick` to notify consumers of navigational events
- `sandstone/FlexiblePopupPanels` props `prevButtonVisibility` and `nextButtonVisibility` for assigning the default visibility of the navigational buttons
- `sandstone/MediaPlayer.MediaControls` prop `rateChangeDisabled` to prevent playback rate control via rewind and fast-forward keys
- `sandstone/PopupTabLayout` panel transition animation

### Changed

- `sandstone/FlexiblePopupPanels` to provide a close button on the first panel and navigational buttons on each panel

### Fixed

- `sandstone/Alert` to support the use of any component in the children area
- `sandstone/DatePicker` and `sandstone/TimePicker` to handle locale changes
- `sandstone/DatePicker` and `sandstone/TimePicker` to format locale labels on-demand for v8 snapshot compatibility
- `sandstone/Dropdown` to center scrolling to selected index
- `sandstone/Item` to properly accept numbers for `label`
- `sandstone/PopupTabLayout` tall-content scrolling capability
- `sandstone/PopupTabLayout` and `sandstone/FixedPopupPanels` bottom padding
- `sandstone/Scroller` and `sandstone/VirtualList` scrollbar height
- `sandstone/Slider` bar style to match latest designs
- `sandstone/VideoPlayer` to show a scrim behind the media controls
- `sandstone/VirtualList` to properly set the scroll position after focus changes

## [1.0.0-beta.4] - 2020-05-26

### Removed

- `sandstone/Panels` prop `featureContent`
- `sandstone/Panels.FixedPopupPanels`, `sandstone/Panels.FlexiblePopupPanels`, `sandstone/Panels.View`, and `sandstone/Panels.WizardPanels` aliases
- `sandstone/Scroller` and `sandstone/VirtualList` prop `initialHiddenHeight`
- `sandstone/WizardPanels` prop `buttons`, put buttons inside `footer` instead
- `sandstone/WizardPanels` props `noPrevButton`,`noNextButton`, `nextButtonAriaLabel`, `nextButtonText`, `prevButtonAriaLabel`, and `prevButtonText`, replacing them with simpler `nextButton` and `prevButton` props

### Added

- `sandstone/DatePicker` function `dateToLocaleString` to create locale-aware date strings
- `sandstone/DayPicker` component
- `sandstone/Icon` feature to support arbitrary icon sizes via the existing `size` prop
- `sandstone/ImageItem` public class names `fullImage`, `horizontal`, and `vertical`
- `sandstone/Input` props `invalid` and `invalidMessage` to mirror the API of `InputField`
- `sandstone/Input` props `maxLength`, `minLength`, and `numberInputField` to support arbitrary number lengths
- `sandstone/PopupTabLayout` and `sandstone/TabLayout` prop `onTabAnimationEnd` to notify consumers when the animation to collapse or expand the tabs completes
- `sandstone/TimePicker` function `timeToLocaleString` to create locale-aware time strings
- `sandstone/WizardPanels` props `prevButtonVisibility` and `nextButtonVisibility` for assigning the default visibility of the navigational buttons
- `sandstone/WizardPanels.Panel` props `prevButton` and `nextButton` to provide customization of the navigational buttons on each `Panel`

### Fixed

- `sandstone/Panels` to not fire transition events when initially rendered
- `sandstone/Scroller` and `sandstone/VirtualList` to properly handle keydown events
- `sandstone/TabLayout` default focus rules
- `sandstone/Tooltip` style to match latest designs
- `sandstone/VideoPlayer` to jump back when using the 5-way left key
- `sandstone/VirtualList` to support navigation with spottable children inside an item

## [1.0.0-beta.3] - 2020-05-11

### Removed

- `sandstone/VideoPlayer.MediaControls` component. Use `sandstone/MediaPlayer.MediaControls` instead.

### Added

- `sandstone/FixedPopupPanels` `width` prop, which now includes "half" to support larger content
- `sandstone/MediaPlayer` submodule which provides `MediaControls`, `MediaSlider`, and `Times` components for use in custom media player components
- `sandstone/TabLayout` support for `horizontal` orientation
- `sandstone/WizardPanels` props `current` and `total` to configure the `Steps` component directly when the number of `Panel` instances do not match the number of steps
- `sandstone/WizardPanels` prop `onBack` to allow developers to handle back button presses
- `sandstone/WizardPanels` support for animating changes to title and subtitle

### Changed

- `sandstone/Scroller` and `sandstone/VirtualList` to adjust padding area
- `sandstone/Scroller` and `sandstone/VirtualList` clickable scrollbar area
- `sandstone/WizardPanels` to automatically handle back key when `noPrevButton` is not set
- `sandstone/WizardPanels` to support multi-line subtitles

### Fixed

- `sandstone/Panels.Header` to match latest designs

## [1.0.0-beta.2] - 2020-05-04

### Deprecated

- `sandstone/Panels.WizardPanel` and `sandstone/Panels.View`, replaced with `sandstone/WizardPanels` and `sandstone/WizardPanels.Panel` respectively
- `sandstone/Panels.FlexiblePopupPanels`, replaced with `sandstone/FlexiblePopupPanels`
- `sandstone/Panels.FixedPopupPanels`, replaced with `sandstone/FixedPopupPanels`

### Added

- `sandstone/WizardPanels` props `nextButtonAriaLabel`, `prevButtonAriaLabel`, `noNextButton`, `noPrevButton`, and `noSteps`
- `sandstone/Scroller` and `sandstone/VirtualList` prop `initialHiddenHeight` to provide the height of the vertical scrollbar when the `featureContent` prop in the panel is set to true
- `sandstone/Input.InputPopup` component

### Fixed

- `sandstone/Header` centering
- `sandstone/Input.InputField` disabled colors
- `sandstone/WizardPanels` to hide previous and next buttons appropriately
- `sandstone/TabLayout` to support disabled tabs

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

- `sandstone/BodyText` font weight
- `sandstone/BodyText` line-wrap and `noWrap` capabilities
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
