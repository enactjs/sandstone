# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [unreleased]

### Fixed

- `sandstone/VirtualList.VirtualList`, `sandstone/VirtualList.VirtualGridList` add `data-webos-voice-disabled` prop for disable voice control

- `sandstone/LabeledIconButton` add props to change voice control in IconButton

- `sandstone/VirtualList.VirtualList` to render properly without error when `itemSizes` is given and `dataSize` is 0

## [3.2.5] - 2019-11-14

### Fixed

- `sandstone/Notification` to support 3 max-width buttons in a single line

## [3.2.4] - 2019-11-07

### Fixed

- `sandstone/Notification` line height for non-latin locales
- `sandstone/Notification` to show all buttons in one line

## [3.2.3] - 2019-11-01

### Changed

- `sandstone/Panels.Header` prop `marqueeOn` default value to `'render'` to improve usability on systems without a pointer

## [3.2.2] - 2019-10-24

### Fixed

- `sandstone/Marquee` text shake when restarting

## [3.2.1] - 2019-10-22

### Fixed

- `sandstone/VirtualList` horizontal scrolling in RTL locales
- `sandstone/EditableIntegerPicker` to include the `unit` in the ARIA read out

## [3.2.0] - 2019-10-18

### Added

- `sandstone/Icon` icons

### Changed

- `ilib` peer dependency to `^14.4.0 || ^14.4.0-webostv1` baseline to target support for caching improvements

### Fixed

- `sandstone/Icon` icon sizes
- `sandstone/InputSpotlightDecorator` to not focus when Spotlight is paused

## [3.1.3] - 2019-10-09

### Added

- `sandstone/Icon` icons

### Fixed

- `sandstone/Button` `color` bar height
- `sandstone/Slider` to show `tooltip` when disabled
- `sandstone/TooltipDecorator` to keep showing when changing from pointer mode to 5-way mode
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll correctly when clicking on paging controls during a scroll event
- `sandstone/FormCheckbox` and `sandstone/RadioItem` high contrast colors

## [3.1.2] - 2019-09-30

### Fixed

- `sandstone` language-specific (`LG Smart UI AR HE TH`) and Indian font assignment

## [3.1.1] - 2019-09-23

### Fixed

- `sandstone` internationalization resource loading
- `sandstone/Dropdown` to only call `onOpen` when closed
- `sandstone/Input` text color
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to correctly set focus to items scrolling into the viewport
- `sandstone/VirtualList.VirtualList` to scroll properly when a different sized item gains focus

## [3.1.0] - 2019-09-16

### Deprecated

- `sandstone/ProgressBar.ProgressBarTooltip` and `sandstone/Slider.SliderTooltip` prop `side`, will be replaced by `position` in 4.0.0

### Added

- `sandstone/Dropdown` to add new size `x-large`
- `sandstone/ProgressBar.ProgressBarTooltip` and `sandstone/Slider.SliderTooltip` prop `position`, replacing `side`
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` prop `role` to set the ARIA `role`

### Fixed

- `sandstone/Header` to fix font size of `titleBelow` and `subTitleBelow`
- `sandstone/Dropdown` to apply `tiny` width
- `sandstone/Dropdown` to include selected `data` in the `onSelect` handler
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` spotlight behavior to focus the last item when reaching the bounds after scroll by page up or down
- `sandstone/VirtualList.VirtualList` to allow a dynamically resized item to scroll into view properly
- `sandstone/Dropdown` accessibility read out when an item is focused
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll properly when page key is pressed on a horizontal list or scroller inside a vertical list or scroller

## [3.0.1] - 2019-09-09

### Fixed

- `sandstone/Button` text alignment when `color` is set
- `sandstone/FormCheckboxItem` opacity of `itemIcon` value when focused and disabled
- `sandstone/Notification` to shrink to fit small content
- `sandstone/Scroller` to restore focus properly when pressing page up after holding 5-way down
- `sandstone/Switch` colors to improve visibility
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to properly navigate from paging controls to items by 5-way key when `focusableScrollbar` is false

## [3.0.0] - 2019-09-03

### Fixed

- `sandstone/ContextualPopupDecorator` layout in large text mode in RTL locales
- `sandstone/Dropdown` performance when using many options
- `sandstone/ProgressBar` fill color when `highlighted` is set
- `sandstone/Scroller` to correctly handle horizontally scrolling focused elements into view when using a `direction` value of `'both'`
- `sandstone/Skinnable` TypeScript signature
- `sandstone/Slider` progress bar fill color when focused with `noFill` set
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to render the first item properly when the `dataSize` prop is updated and the function as a parameter of the `cbScrollTo` prop is called

## [3.0.0-rc.4] - 2019-08-22

### Fixed

- `sandstone/ContextualPopupDecorator` arrow rendering issue in Chromium
- `sandstone/EditableIntegerPicker` to properly rerender when the edited value is invalid
- `sandstone/FormCheckboxItem` to marquee its contents
- `sandstone/VideoPlayer` to have correct jump forward/backward icon
- Language-specific fonts so they always use the correct typeface for their locale

## [3.0.0-rc.3] - 2019-08-15

### Fixed

- `sandstone/Header` input highlight positioning
- `sandstone/MediaOverlay` to not mute media playback
- `sandstone/Panels` animation performance issues on low powered hardware
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to correctly scroll to a selected component when focused via 5way

## [3.0.0-rc.2] - 2019-08-08

### Added

- `sandstone/Icon.icons` entries for new icons

### Fixed

- `sandstone` to support custom font for simplified Chinese
- `sandstone` disabled focus appearance to match the latest designs
- `sandstone/DatePicker`, `sandstone/DayPicker`, `sandstone/ExpandableList`, and `sandstone/TimePicker` disabled opacity in high contrast mode
- `sandstone/Picker` to avoid overlapping items on render
- `sandstone/Scroller` and other scrolling components to properly scroll via remote page up/down buttons when nested within another scrolling component
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll via a page up or down key when focus is on any vertical paging control while in pointer mode
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to correctly set focus after scrolling by page up/down keys
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` not to scroll via a page up or down key when focus is on any horizontal paging control

## [3.0.0-rc.1] - 2019-07-31

### Added

- `sandstone/LabeledIconButton` prop `flip` to flip the icon horizontally, vertically, or both
- `sandstone/Popup` public class names `body` and `closeContainer`

### Changed

- `sandstone/Dialog` appearance to match the latest designs
- `sandstone/Scroller` and other scrolling components to scroll via remote page up/down buttons when the scrollbar is hidden

### Fixed

- `sandstone` fonts be consolidated under "Sandstone" font-family to properly display all localized fonts when representing glyphs from any locale
- `sandstone/Input` text color when focused and disabled
- `sandstone/Panels` to allow 5-way navigation to components within `controls` when used with a `Header` with `headerInput`
- `sandstone/Panels` to treat all components within `controls` as part of the active panel for the purposes of accessibility
- `sandstone/Scroller` to not jump to the top when right key is pressed in the right most item of a vertical scroller
- `sandstone/Scroller` to not scroll horizontally via 5-way down in horizontal scroller
- `sandstone/Tooltip` arrow gap
- `sandstone/VideoPlayer` feedback tooltip to overlap in non-latin locale
- `sandstone/VideoPlayer` more button tooltip to not clip or reverse text in RTL locales
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to navigate items properly in RTL languages
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to properly navigate from paging controls to controls out of the list

## [3.0.0-beta.2] - 2019-07-23

### Added

- `sandstone/Panels.Header` prop `hideLine` to hide the bottom separator line
- `sandstone/Panels.Header` type "dense" for "AlwaysViewing" Panels types

### Fixed

- `sandstone/Dropdown` button to not animate
- `sandstone/FormCheckboxItem` so it doesn't change size between normal and large text mode
- `sandstone/Heading` to have a bit more space between the text and the line, when the line is present
- `sandstone/LabeledItem` to pass `marqueeOn` prop to its contents
- `sandstone/Panels.Header` to use the latest designs with better spacing between the titles below
- `sandstone/Picker` accessibility read out when a button becomes disabled
- `sandstone/ProgressBar`, `sandstone/Slider`, and `sandstone/IncrementSlider` to use the latest set of design colors
- `sandstone/RadioItem` to have a much prettier dot in dark and light skins
- `sandstone/Spinner` to use the latest designs
- `sandstone/Tooltip` layer order so it doesn't interfere with other positioned elements, like `ContextualPopup`
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to properly respond to 5way directional key presses

## [3.0.0-beta.1] - 2019-07-15

### Removed

- `small` prop in `sandstone/Input`, `sandstone/ToggleButton`, `sandstone/Button`, `sandstone/Icon`, `sandstone/IconButton`, and `sandstone/LabeledIcon`, replaced by `size` prop, which accepts `"small"` or `"large"`
- `sandstone/Divider`, replaced by `sandstone/Heading`

### Added

- `ilib@^14.2.0` as a package peer dependency, which apps will need to include
- `sandstone/Dropdown` widths `tiny`, and `huge`

### Fixed

- Fonts to use the updated names of global fonts available in the system
- `sandstone/Popup` to properly handle closing in mid-transition
- `sandstone/Scroller` to properly move focus out of the container
- `sandstone/VirtualList` to allow keydown events to bubble up when not handled by the component
- `sandstone/IncrementSlider` to support aria-label when disabled
- `sandstone/LabeledItem` to not clip the bottom of descender glyphs in large text mode
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` not to scroll too far by page up/down keys
- `sandstone/VirtualList.VirtualGridList` scrolling when navigating to an adjacent item
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to focus an item properly after an update

## [3.0.0-alpha.7] - 2019-06-24

### Fixed

- `sandstone/Dropdown` to scroll to and focus the selected item when opened
- `sandstone/ExpandableItem.ExpandableItemBase` to not error if `onClose` or `onOpen` was not supplied
- `sandstone/GridListImageItem` to support overriding the `image` CSS class name
- `sandstone/Scroller` to scroll and to move focus to the paging control properly if the current item sticking to the top is only spottable
- `sandstone/VirtualList` to scroll to the focused item when navigating out of the viewport via 5-way

## [3.0.0-alpha.6] - 2019-06-17

### Removed

- `sandstone/Divider`, `sandstone/Dialog`, and `sandstone/Heading` prop `casing`

### Fixed

- `sandstone/Dropdown` to support voice readout
- `sandstone/Dropdown` remaining open after it becomes `disabled`

## [3.0.0-alpha.5] - 2019-06-10

### Added

- `sandstone/Dropdown` property `width` to support `'small'`, `'medium'`, and `'large'` sizes

### Fixed

- `sandstone/Panels.Header` to center text when `centered` is used and additional controls are included by `sandstone/Panels`
- Fonts for non-Latin to not intermix font weights for bold when using a combination of Latin and non-Latin glyphs
- `sandstone/VirtualList` to restore focus to an item when scrollbars are visible

## [3.0.0-alpha.4] - 2019-06-03

### Changed

- `sandstone/Dropdown` to prevent spotlight moving out of the popup
- `sandstone/Dropdown` to use radio selection which allows only changing the selection but not deselection

### Fixed

- Non-Latin locale font assignments to match the new font family support in `LG Smart UI`
- `sandstone/Checkbox`, `sandstone/FormCheckbox`, `sandstone/Panels.Header`, `sandstone/RadioItem`, `sandstone/Slider`, and `sandstone/Switch` to render correctly in high contrast
- `sandstone/VideoPlayer` to hide scrim for high contrast if bottom controls are hidden

## [3.0.0-alpha.3] - 2019-05-29

### Added

- `sandstone/Panels` support for managing share state of contained components
- `sandstone/Scroller` and `sandstone/VirtualList` support for restoring scroll position when within a `sandstone/Panels.Panel`

### Changed

- `sandstone/Scroller` to scroll when no spottable child exists in the pressed 5-way key direction and, when `focusableScrollbar` is set, focus the scrollbar button

### Fixed

- Fonts to correctly use the new font files and updated the international font name from "Sandstone LG Display" to "Sandstone Global"
- `sandstone/Dropdown` `children` propType so it supports the same format as `ui/Group` (an array of strings or an array of objects with props)
- `sandstone/FormCheckbox`, `sandstone/Input`, `sandstone/ProgressBar`, `sandstone/RadioItem`, `sandstone/SwitchItem`, and `sandstone/Tooltip` light skin colors.
- `sandstone/VideoPlayer` to have correct sized control buttons

## [3.0.0-alpha.2] - 2019-05-20

### Added

- `sandstone/Heading` prop `spacing` with default value `'small'`

### Fixed

- `sandstone/Button` background colors for translucent and lightTranslucent
- `sandstone/Checkbox` by updating colors for both dark and light skins
- `sandstone/DaySelector` item text size in large-text mode
- `sandstone/Dropdown` popup scroller arrows showing in non-latin locales and added large-text mode support
- `sandstone/FormCheckboxItem` to match the designs
- `sandstone/Panels.Header` with `Input` to not have a distracting white background color
- `sandstone/Input` caret color to match the designs (black bar on white background, white bar on black background, standard inversion)
- `sandstone/Item` height in non-latin locales
- `sandstone/RadioItem` and `sandstone/SelectableItem` icon size in large-text mode

## [3.0.0-alpha.1] - 2019-05-15

### Removed

- `sandstone/Button` and `sandstone/Panels.Header` prop `casing` which is no longer supported
- `sandstone/Input.InputBase` prop `focused` which was used to indicate when the internal input field had focused but was replaced by the `:focus-within` pseudo-selector
- `sandstone/VirtualList` and `sandstone/VirtualList.VirtualGridList` property `isItemDisabled`

### Added

- `sandstone/BodyText` prop `size` to offer a new "small" size
- `sandstone/Button` prop `iconPosition`
- `sandstone/ContextualPopup` config `noArrow`
- `sandstone/Dropdown` component
- `sandstone/Panels.Header` prop `centered` to support immersive apps with a completely centered design
- `sandstone/Heading` component, an improved version of `sandstone/Divider` with additional features
- `sandstone/Panels` slot `<controls>` to easily add custom controls next to the Panels' "close" button
- `sandstone/Spinner` prop `size` to support a new "small" size for use inside `SlotItem` components
- `sandstone/TooltipDecorator` prop `tooltipRelative` and `sandstone/TooltipDecorator.Tooltip` prop `relative` to support relative positioning. This is an advanced feature and requires a container with specific rules. See documentation for details.

### Changed

- `sandstone/Button.ButtonDecorator` to remove `i18n/Uppercase` HOC
- `sandstone/Button`, `sandstone/Checkbox`, `sandstone/CheckboxItem`, `sandstone/ContextualPopupDecorator`, `sandstone/FormCheckbox`, `sandstone/FormCheckboxItem`, `sandstone/Panels.Header`, `sandstone/Notification`, `sandstone/RadioItem`, and `sandstone/Tooltip` appearance to match the latest designs
- `sandstone/Button`, `sandstone/Dropdown`, `sandstone/Icon`, `sandstone/IconButton`, `sandstone/Input`, and `sandstone/ToggleButton` default size to "small", which unifies their initial heights
- `sandstone/DaySelector` to have squared check boxes to match the rest of the checkmark components
- `sandstone/LabeledIcon` and `sandstone/LabeledIconButton` text size to be smaller
- `sandstone/Panel` and `sandstone/Panels` now allocate slightly more screen edge space for a cleaner look
- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` scrollbar button to gain focus when pressing a page up or down key if `focusableScrollbar` is true
- global styling rules affecting standard font-weight, disabled opacity, and LESS color variable definitions

### Fixed

- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll by page up/down keys without focus in pointer mode

## [2.6.0] - ???

### Deprecated

- `sandstone/Divider` which will be replaced by `sandstone/Heading`
- `sandstone/Input.InputBase` prop `focused` which will be handled by CSS in 3.0
- `small` prop in `sandstone/Input` and `sandstone/ToggleButton`, which will be replaced by `size="small"` in 3.0

### Added

- `sandstone/Input` and `sandstone/ToggleButton` prop `size`
- `sandstone/Button`, `sandstone/IconButton`, and `sandstone/LabeledIconButton` public class name `large` to support customizing the style for the new `size` prop on `ui/Button`

### Fixed

- `sandstone/EditableIntegerPicker`, `sandstone/Picker`, and `sandstone/RangePicker` to not error when the `min` prop exceeds the `max` prop

## [2.5.3] - 2019-06-06

### Fixed

- `sandstone/ContextualPopupDecorator` imperative methods to be correctly bound to the instance
- `sandstone/ExpandableInput` to retain focus when touching within the input field on touch platforms
- `sandstone/ExpandableList` to not error if `selected` is passed as an array to a non-multi-select list
- `sandstone/Scroller` to allow changing spotlight focus to opposite scroll button when switching to 5way mode
- `sandstone/ExpandableInput` to retain focus when touching within the input field on touch platforms
- `sandstone/Input` refocusing on touch on iOS
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to change spotlight focus due to touch events
- `sandstone/Slider` to not scroll the viewport when dragging on touch platforms
- `sandstone/VideoPlayer` to correctly handle touch events while moving slider knobs
- `sandstone/VirtualList` and `sandstone/Scroller` to animate with 5-way navigation by default

## [2.5.2] - 2019-04-23

### Fixed

- `sandstone/EditableIntegerPicker` text alignment when not editing the value
- `sandstone/Scroller` to scroll via dragging when the platform has touch support
- `sandstone/VideoPlayer` to continue to display the thumbnail image while the slider is focused

## [2.5.1] - 2019-04-09

### Fixed

- `sandstone/ExpandableInput` to close on touch platforms when tapping another component

## [2.5.0] - 2019-04-01

### Fixed

- `sandstone/ContextualPopupDecorator` method `positionContextualPopup()` to correctly reposition the popup when invoked from app code
- `sandstone/Tooltip` to better support long tooltips
- `sandstone/Popup` to resume spotlight pauses when closing with animation
- `sandstone/Panels` to correctly ignore `null` children

## [2.4.1] - 2019-03-11

### Changed

- `sandstone/Picker` to display more of the selected value in wide instances

### Fixed

- `sandstone/Checkbox`, `sandstone/FormCheckbox`, `sandstone/RadioItem`, `sandstone/SelectableIcon`, and `sandstone/Slider` spotlight muted colors
- `sandstone/Spinner` animation synchronization after a rerender
- `sandstone/TooltipDecorator` to position `Tooltip` correctly when the wrapped component moves or resizes
- `sandstone/VideoPlayer` to continue to show thumbnail when playback control keys are pressed
- `sandstone/VideoPlayer` to stop seeking by remote key when it loses focus
- `sandstone/VirtualList` to only resume spotlight pauses it initiated
- `sandstone/ExpandableItem` to be better optimized on mount

## [2.4.0] - 2019-03-04

### Added

- `line-height` rule to base text CSS for both latin and non-latin locales
- Support for high contrast colors in dark and light `sandstone`
- `sandstone/BodyText` prop `noWrap` which automatically adds `sandstone/Marquee` support as well as limits the content to only display one line of text

### Changed

- `sandstone/Spinner` visuals from 3 spinning balls to an energetic flexing line

### Fixed

- `sandstone/Panels` to set child's `autoFocus` prop to `default-element` when `index` increases
- `sandstone/Slider` to prevent gaining focus when clicked when disabled
- `sandstone/Slider` to prevent default browser scroll behavior when 5-way directional key is pressed on an active knob
- `sandstone/DatePicker` and `sandstone/TimePicker` to close with back/ESC
- `sandstone/DatePicker` and `sandstone/TimePicker` value handling when open on mount
- `sandstone/ContextualPopupDecorator` to correctly focus on popup content when opened

## [2.3.0] - 2019-02-11

### Added

- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` property `childProps` to support additional props included in the object passed to the `itemsRenderer` callback
- `sandstone/Skinnable` support for `skinVariants`, to enable features like high contrast mode and large text mode
- Support for 8k (UHD2) displays

### Changed

- All content-containing LESS stylesheets (not within a `styles` directory) extensions to be `*.module.less` to retain modular context with CLI 2.x.

### Fixed

- `sandstone/VirtualList` to focus an item properly by `scrollTo` API immediately after a prior call to the same position
- `sandstone/Popup` to close floating layer when the popup closes without animation

## [2.2.9] - 2019-01-11

### Fixed

- `sandstone/Scroller` scrolling to boundary behavior for short scrollers

## [2.2.8] - 2018-12-06

### Fixed

- `sandstone/ExpandableInput` to focus labeled item on close
- `sandstone/ExpandableItem` to disable its spotlight container when the component is disabled
- `sandstone/Scroller` to correctly handle scrolling focused elements and containers into view

## [2.2.7] - 2018-11-21

### Fixed

- `sandstone/Picker`, `sandstone/ExpandablePicker`, `sandstone/ExpandableList`, `sandstone/IncrementSlider` to support disabling voice control

## [2.2.6] - 2018-11-15

### Fixed

- `sandstone/VideoPlayer` to blur slider when hiding media controls
- `sandstone/VideoPlayer` to disable pointer mode when hiding media controls via 5-way
- `sandstone/VirtualList` and `sandstone/Scroller` to not to animate with 5-way navigation by default

## [2.2.5] - 2018-11-05

### Fixed

- `sandstone/ExpandableItem` to not steal focus after closing

## [2.2.4] - 2018-10-29

### Fixed

- `sandstone/ThemeDecorator` to apply both Latin and non-Latin rules to the root element so all children inherit the correct default font rules.
- `sandstone/Marquee`, `sandstone/MediaOverlay` to display locale-based font
- `sandstone/DayPicker` separator character used between selected days in the label in fa-IR locale
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` scrolling by voice commands in RTL locales

## [2.2.3] - 2018-10-22

### Fixed

- `sandstone/Scroller` to respect the disabled spotlight container status when handling pointer events
- `sandstone/Scroller` to scroll to the boundary when focusing the first or last element with a minimal margin in 5-way mode
- `sandstone/VideoPlayer` to position the slider knob correctly when beyond the left or right edge of the slider

## [2.2.2] - 2018-10-15

### Fixed

- `sandstone/Scroller` stuttering when page up/down key is pressed

## [2.2.1] - 2018-10-09

### Fixed

- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to notify user when scrolling is not possible via voice command
- `sandstone/TimePicker` to not read out meridiem label when changing the value

## [2.2.0] - 2018-10-02

### Added

- `sandstone/GridListImageItem` voice control feature support

### Fixed

- `sandstone/DayPicker` to prevent closing when selecting days via voice control
- `sandstone/VideoPlayer` to unfocus media controls when hidden
- `sandstone/Scroller` to set correct scroll position when an expandable child is closed
- `sandstone/Scroller` to prevent focusing children while scrolling

## [2.1.4] - 2018-09-17

### Fixed

- `sandstone/Button` and `sandstone/IconButton` to style image-based icons correctly when focused and disabled
- `sandstone/FormCheckboxItem` styling when focused and disabled
- `sandstone/Panels` to always blur breadcrumbs when transitioning to a new panel
- `sandstone/Scroller` to correctly set scroll position when nested item is focused
- `sandstone/Scroller` to not adjust `scrollTop` when nested item is focused
- `sandstone/VideoPlayer` to show correct playback rate feedback on play or pause
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to handle 5way navigation properly when `focusableScrollbar` is true

## [2.1.3] - 2018-09-10

### Fixed

- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to show overscroll effects properly on repeating wheel input
- `sandstone/TooltipDecorator` to handle runtime error when setting `tooltipText` to an empty string
- `sandstone/VideoPlayer` timing to read out `infoComponents` accessibility value when `moreButton` or `moreButtonColor` is pressed

## [2.1.2] - 2018-09-04

### Fixed

- `sandstone/ExpandableItem` to prevent default browser scroll behavior when 5-way key is pressed on the first item or the last item
- `sandstone/Scroller` scrolling behavior for focused items in 5-way mode
- `sandstone/Scroller` to scroll container elements into view
- `sandstone/TooltipDecorator` to update position when `tooltipText` is changed
- `sandstone/VideoPlayer` to prevent default browser scroll behavior when navigating via 5-way
- `sandstone/VirtualList` to allow `onKeyDown` events to bubble
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` scrolling via page up or down keys

## [2.1.1] - 2018-08-27

### Changed

- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to show overscroll effects only by wheel input

### Fixed

- `sandstone/VideoPlayer` so that activity is detected and the `autoCloseTimeout` timer is reset when using 5-way to navigate from the media slider

### Fixed

- `sandstone/Picker` to fire onChange events, due to a hold, consistently across pointer and 5-way navigation

## [2.1.0] - 2018-08-20

### Added

- `sandstone/VideoPlayer` property `noMediaSliderFeedback`
- `sandstone/VideoPlayer.MediaControls` property `playPauseButtonDisabled`

### Changed

- `sandstone/Picker` key down hold threshold to 800ms before firing the `onChange` event

### Fixed

- `sandstone/GridListImageItem` to properly vertically align when the content varies in size
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to not scroll by dragging
- `sandstone/Slider` to not emit `onChange` event when `value` has not changed
- `sandstone/VideoPlayer` to focus on available media buttons if the default spotlight component is disabled
- `sandstone/VideoPlayer` to keep media controls visible when interacting with popups
- `sandstone/VideoPlayer` to read out `infoComponents` accessibility value when `moreButtonColor` is pressed
- `sandstone/VideoPlayer` to round the time displayed down to the nearest second
- `sandstone/VirtualList` to restore last focused item correctly

## [2.0.2] - 2018-08-13

### Fixed

- `sandstone/DatePicker` to correctly change year when `minYear` and `maxYear` aren't provided
- `sandstone/EditableIntegerPicker` management of spotlight pointer mode
- `sandstone/LabeledIcon` and `sandstone/LabeledIconButton` to have proper spacing and label-alignment with all label positions
- `sandstone/Popup` to prevent duplicate 5-way navigation when `spotlightRestrict="self-first"`
- `sandstone/Scroller` not to scroll to wrong position via 5way navigation in RTL languages
- `sandstone/Scroller` not to scroll when focusing in pointer mode
- `sandstone/Slider` to forward `onActivate` event
- `sandstone/VideoPlayer` to reset key down hold when media becomes unavailable

## [2.0.1] - 2018-08-01

### Fixed

- `sandstone/Dialog` read order of dialog contents
- `sandstone/Scroller` to go to next page properly via page up/down keys

## [2.0.0] - 2018-07-30

### Added

- `sandstone/LabeledIcon` and `sandstone/LabeledIconButton` components for a lightweight `Icon` or `IconButton` with a label
- `sandstone/VideoPlayer` property `noAutoShowMediaControls`

### Fixed

- `sandstone/Scroller` to prevent scrolling via page up/down keys if there is no spottable component in that direction
- `sandstone/Dialog` to hide `titleBelow` when `title` is not set
- `sandstone/Image` to suppress drag and drop support by default
- `sandstone/VideoPlayer` audio guidance behavior of More button
- `sandstone/VirtualList.VirtualGridList` and `sandstone/VirtualList.VirtualList` to handle focus properly via page up/down keys when switching to 5-way mode
- `sandstone/Popup` to spot the content after it's mounted
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll properly via voice control in RTL locales

## [2.0.0-rc.3] - 2018-07-23

### Changed

- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` overscroll effect color more recognizable on the focused element

### Fixed

- `sandstone/ContextualPopup` to refocus its activator on close when the popup lacks spottable children
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll properly when holding down paging control buttons
- `sandstone/ExpandableItem` spotlight behavior when leaving the component via 5-way
- `sandstone/RadioItem` circle thickness to be 2px, matching the design
- `sandstone/Slider` to correctly prevent 5-way actions when activated
- `sandstone/ExpandableItem` and other expandable components to spotlight correctly when switching from pointer mode to 5-way with `closeOnSelect`

## [2.0.0-rc.2] - 2018-07-16

### Fixed

- `sandstone/Input` to not focus by *tab* key
- `sandstone/Picker` to properly set focus when navigating between buttons
- `sandstone/Popup` to set correct open state while transitioning
- `sandstone/ProgressBar.ProgressBarTooltip` unknown props warning
- `sandstone/Scrollable` to disable spotlight container during flick events only when contents can scroll
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to scroll properly when `animate` is false via `scrollTo`
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` page controls to stop propagating an event when the event is handled
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to hide overscroll effect when focus is moved from a disabled paging control button to the opposite button
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to show overscroll effect when reaching the edge for the first time by wheel
- `sandstone/VideoPlayer` to display feedback tooltip when pointer leaves slider while playing
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to restore focus on items focused by pointer

## [2.0.0-rc.1] - 2018-07-09

### Added

- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` support `data-webos-voice-focused` and `data-webos-voice-group-label`

### Removed

- `sandstone/Button` built-in support for tooltips

### Changed

- `sandstone/Spinner` to blur Spotlight when the spinner is active

### Fixed

- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to handle direction, page up, and page down keys properly on page controls them when `focusableScrollbar` is false
- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` to handle a page up or down key in pointer mode
- `sandstone/VideoPlayer.MediaControls` to correctly handle more button color when the prop is not specified
- `VirtualList.VirtualList` to handle focus properly when switching to 5-way mode

## [2.0.0-beta.9] - 2018-07-02

### Added

- `sandstone/ContextualPopupDecorator` instance method `positionContextualPopup()`
- `sandstone/ThemeDecorator` config property `disableFullscreen` to prevent the decorator from filling the entire screen
- `sandstone/Scroller` prop `onUpdate`

### Fixed

- `sandstone/Scrollable` to update scroll properly on pointer click
- `sandstone/TooltipDecorator` to prevent unnecessary re-renders when losing focus
- `sandstone/TooltipDecorator` to not dismiss the tooltip on pointer click

## [2.0.0-beta.8] - 2018-06-25

### Added

- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` support for scrolling via voice control on webOS
- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` overscroll effect when the edges are reached

### Changed

- `sandstone/Divider` property `marqueeOn` default value to `render`
- `sandstone/Scroller.Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList.VirtualList` scrollbar button to move a previous or next page when pressing a page up or down key instead of releasing it

### Fixed

- `sandstone/VideoPlayer` to prevent updating state when the source is changed to the preload source, but the current preload source is the same
- `sandstone/MediaOverlay` to marquee correctly
- `sandstone/MediaOverlay` to match UX guidelines

## [2.0.0-beta.7] - 2018-06-11

### Removed

- `sandstone/Dialog` properties `preserveCase` and `showDivider`, replaced by `casing` and `noDivider` respectively
- `sandstone/Divider` property `preserveCase`, replaced by `casing`
- `sandstone/ExpandableInput` property `onInputChange`, replaced by `onChange`
- `sandstone/ThemeDecorator.TextSizeDecorator`, replaced by `sandstone/ThemeDecorator.AccessibilityDecorator`
- `sandstone/Panels.Header` property `preserveCase`, replaced by `casing`
- `sandstone/Panels.Panel` property `noAutoFocus`, replaced by `autoFocus`
- `sandstone/TooltipDecorator` property `tooltipPreserveCase`, replaced by `tooltipCasing`

### Changed

- `sandstone/VideoPlayer` to allow spotlight focus to move left and right from `MediaControls`
- `sandstone/VideoPlayer` to disable bottom controls when loading until it's playable

### Fixed

- `sandstone/EditableIntegerPicker` to disable itself when on a range consisting of a single static value
- `sandstone/Picker` to disable itself when containing fewer than two items
- `sandstone/Popup` to spot its content correctly when `open` by default
- `sandstone/RangePicker` to disable itself when on a range consisting of a single static value
- `sandstone/TooltipDecorator` to hide when `onDismiss` has been invoked
- `sandstone/VideoPlayer` to show media controls when pressing down in pointer mode
- `sandstone/VideoPlayer` to provide a more natural 5-way focus behavior
- `sandstone/VideoPlayer.MediaControls` to handle left and right key to jump when `sandstone/VideoPlayer` is focused

## [2.0.0-beta.6] - 2018-06-04

### Removed

- `sandstone/IncrementSlider` prop `children` which was no longer supported for setting the tooltip (since 2.0.0-beta.1)

### Fixed

- `sandstone/ContextualPopupDecorator` to allow focusing components under a popup without any focusable components
- `sandstone/Scroller` ordering of logic for Scroller focus to check focus possibilities first then go to fallback at the top of the container
- `sandstone/Scroller` to check focus possibilities first then go to fallback at the top of the container of focused item
- `sandstone/Scroller` to scroll by page when focus was at the edge of the viewport
- `sandstone/ToggleButton` padding and orientation for RTL
- `sandstone/VideoPlayer` to not hide title and info section when showing more components
- `sandstone/VideoPlayer` to select a position in slider to seek in 5-way mode
- `sandstone/VideoPlayer` to show thumbnail only when focused on slider

## [2.0.0-beta.5] - 2018-05-29

### Removed

- `sandstone/Popup`, `sandstone/Dialog` and `sandstone/Notification` property `spotlightRestrict` option `'none'`
- `sandstone/VideoPlayer` prop `preloadSource`, to be replaced by `sandstone/VideoPlayer.Video` prop `preloadSource`
- `sandstone/Button` and `sandstone/IconButton` allowed value `'opaque'` from prop `backgroundOpacity` which was the default and therefore has the same effect as omitting the prop

### Added

- `sandstone/VideoPlayer` props `selection` and `onSeekOutsideRange` to support selecting a range and notification of interactions outside of that range
- `sandstone/VideoPlayer.Video` component to support preloading video sources

### Changed

- `sandstone/VideoPlayer.videoComponent` prop to default to `ui/Media.Media` instead of `'video'`. As a result, to use a custom video element, one must pass an instance of `ui/Media` with its `mediaComponent` prop set to the desired element.

### Fixed

- `sandstone/ContextualPopupDecorator` to properly stop propagating keydown event if fired from the popup container
- `sandstone/Slider` to read when knob gains focus or for a change in value
- `sandstone/Scroller` to not cut off Expandables when scrollbar appears
- `sandstone/VideoPlayer` to correctly read out when play button is pressed
- `sandstone/Divider` to always use a fixed height, regardless of locale

## [2.0.0-beta.4] - 2018-05-21

### Added

- `sandstone/Button` and `sandstone/IconButton` class name `small` to the list of allowed `css` overrides
- `sandstone/VideoPlayer.MediaControls` property `onClose` to handle back key
- `sandstone/ProgressBar` prop `highlighted` for when the UX needs to call special attention to a progress bar

### Changed

- `sandstone/VideoPlayer` to disable media slider when source is unavailable

### Fixed

- `sandstone/ContextualPopupDecorator` to not set focus to activator when closing if focus was set elsewhere
- `sandstone/IconButton` to allow external customization of vertical alignment of its `Icon` by setting `line-height`
- `sandstone/Marquee.MarqueeController` to not cancel valid animations
- `sandstone/VideoPlayer` feedback and feedback icon to hide properly on play/pause/fast forward/rewind
- `sandstone/VideoPlayer` to correctly focus to default media controls component
- `sandstone/VideoPlayer` to close opened popup components when media controls hide
- `sandstone/VideoPlayer` to show controls on mount and when playing next preload video

## [2.0.0-beta.3] - 2018-05-14

### Added

- `sandstone/SelectableItem.SelectableItemDecorator`

### Changed

- `sandstone/ToggleItem` to forward native events on `onFocus` and `onBlur`
- `sandstone/Input` and `sandstone/ExpandableInput` to support forwarding valid `<input>` props to the contained `<input>` node
- `sandstone/ToggleButton` to fire `onToggle` when toggled

### Fixed

- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to scroll properly with all enabled items via a page up or down key
- `sandstone/VirtualList.VirtualList`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/Scroller.Scroller` to ignore any user key events in pointer mode
- `sandstone/VirtualList.VirtualList`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/Scroller.Scroller` to pass `data-spotlight-container-disabled` prop to their outer DOM element
- `sandstone/Image` so it automatically swaps the `src` to the appropriate resolution dynamically as the screen resizes
- `sandstone/Popup` to support all `spotlightRestrict` options
- `sandstone` component `disabled` colors to match the most recent design guidelines (from 30% to 60% opacity)
- `sandstone/ExpandableInput` spotlight behavior when leaving the component via 5-way

## [2.0.0-beta.2] - 2018-05-07

### Fixed

- `sandstone/IconButton` to allow theme-style customization, like it claimed was possible
- `sandstone/ExpandableItem` and related expandables to deal with disabled items and the `autoClose`, `lockBottom` and `noLockBottom` props
- `sandstone/Slider` not to fire `onChange` event when 5-ways out of boundary
- `sandstone/ToggleButton` layout for RTL locales
- `sandstone/Item`, `sandstone/SlotItem`, `sandstone/ToggleItem` to not apply duplicate `className` values
- `sandstone/VirtualList.VirtualList`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/Scroller.Scroller` scrollbar button's aria-label in RTL
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to scroll properly with all disabled items
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to not scroll on focus when jumping

## [2.0.0-beta.1] - 2018-04-29

### Removed

- `sandstone/IncrementSlider` and `sandstone/Slider` props `tooltipAsPercent`, `tooltipSide`, and `tooltipForceSide`, to be replaced by `sandstone/IncrementSlider.IncrementSliderTooltip` and `sandstone/Slider.SliderTooltip` props `percent`, and `side`
- `sandstone/IncrementSlider` props `detachedKnob`, `onDecrement`, `onIncrement`, and `scrubbing`
- `sandstone/ProgressBar` props `tooltipSide` and `tooltipForceSide`, to be replaced by `sandstone/ProgressBar.ProgressBarTooltip` prop `side`
- `sandstone/Slider` props `detachedKnob`, `onDecrement`, `onIncrement`, `scrubbing`, and `onKnobMove`
- `sandstone/VideoPlayer` property `tooltipHideDelay`
- `sandstone/VideoPlayer` props `backwardIcon`, `forwardIcon`, `initialJumpDelay`, `jumpBackwardIcon`, `jumpButtonsDisabled`, `jumpDelay`, `jumpForwardIcon`, `leftComponents`, `moreButtonCloseLabel`, `moreButtonColor`, `moreButtonDisabled`, `moreButtonLabel`, `no5WayJump`, `noJumpButtons`, `noRateButtons`, `pauseIcon`, `playIcon`, `rateButtonsDisabled`, and `rightComponents`, replaced by corresponding props on `sandstone/VideoPlayer.MediaControls`
- `sandstone/VideoPlayer` props `onBackwardButtonClick`, `onForwardButtonClick`, `onJumpBackwardButtonClick`, `onJumpForwardButtonClick`, and `onPlayButtonClick`, replaced by `onRewind`, `onFastForward`, `onJumpBackward`, `onJumpForward`, `onPause`, and `onPlay`, respectively

### Added

- `sandstone/DatePicker` props `dayAriaLabel`, `dayLabel`, `monthAriaLabel`, `monthLabel`, `yearAriaLabel` and `yearLabel` to configure the label set on date pickers
- `sandstone/DayPicker` and `sandstone/DaySelector` props `dayNameLength`, `everyDayText`, `everyWeekdayText`, and `everyWeekendText`
- `sandstone/ExpandablePicker` props `checkButtonAriaLabel`, `decrementAriaLabel`, `incrementAriaLabel`, and `pickerAriaLabel` to configure the label set on each button and picker
- `sandstone/MediaOverlay` component
- `sandstone/Picker` props `aria-label`, `decrementAriaLabel`, and `incrementAriaLabel` to configure the label set on each button
- `sandstone/Popup` property `closeButtonAriaLabel` to configure the label set on popup close button
- `sandstone/ProgressBar.ProgressBarTooltip` props `percent` to format the value as a percent and `visible` to control display of the tooltip
- `sandstone/TimePicker` props `hourAriaLabel`, `hourLabel`, `meridiemAriaLabel`, `meridiemLabel`, `minuteAriaLabel`, and `minuteLabel` to configure the label set on time pickers
- `sandstone/VideoPlayer.MediaControls` component to support additional customization of the playback controls
- `sandstone/VideoPlayer` props `mediaControlsComponent`, `onRewind`, `onFastForward`, `onJumpBackward`, `onJumpForward`, `onPause`, `onPlay`, and `preloadSource`
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` `role="list"`
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` prop `wrap` to support wrap-around spotlight navigation
- `sandstone/VirtualList`, `sandstone/VirtualGridList` and `sandstone/Scroller` props `scrollRightAriaLabel`, `scrollLeftAriaLabel`, `scrollDownAriaLabel`, and `scrollUpAriaLabel` to configure the aria-label set on scroll buttons in the scrollbars

### Changed

- `sandstone/IncrementSlider` and `sandstone/Slider` prop `tooltip` to support either a boolean for the default tooltip or an element or component for a custom tooltip
- `sandstone/Input` to prevent pointer actions on other component when the input has focus
- `sandstone/ProgressBar.ProgressBarTooltip` prop `side` to support either locale-aware or locale-independent positioning
- `sandstone/ProgressBar.ProgressBarTooltip` prop `tooltip` to support custom tooltip components
- `sandstone/Scroller`, `sandstone/Picker`, and `sandstone/IncrementSlider` to retain focus on `sandstone/IconButton` when it becomes disabled

### Fixed

- `sandstone/ExpandableItem` and related expandable components to expand smoothly when used in a scroller
- `sandstone/GridListImageItem` to show proper `placeholder` and `selectionOverlay`
- `sandstone/ThemeDecorator` to optimize localized font loading performance
- `sandstone/Scroller` and `sandstone/VirtualList` navigation via 5-way from paging controls
- `sandstone/VideoPlayer` to render bottom controls at idle after mounting
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to give initial focus
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to have the default value for `dataSize`, `pageScroll`, and `spacing` props

## [2.0.0-alpha.8] - 2018-04-17

### Added

- `sandstone/Panels` property `closeButtonAriaLabel` to configure the label set on application close button

### Changed

- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` to set its ARIA `role` to `"list"`
- `sandstone/VideoPlayer` property `title` to accept node type

### Fixed

- `sandstone/TimePicker` to show `meridiem` correctly in all locales
- `sandstone/Scrollable` scroll buttons to read out out audio guidance when button pressed down
- `sandstone/ExpandableItem` to show label properly when open and disabled
- `sandstone/Notification` to position properly in RTL locales
- `sandstone/VideoPlayer` to show controls when pressing 5-way select

## [2.0.0-alpha.7] - 2018-04-03

### Removed

- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` prop `data` to eliminate the misunderstanding caused by the ambiguity of `data`

### Added

- `sandstone/VideoPlayer` property `noSpinner` to allow apps to show/hide spinner while loading video

### Changed

- `sandstone/VideoPlayer` to disable play/pause button when media controls are disabled
- `sandstone/VideoPlayer` property `moreButtonColor` to allow setting underline colors for more button
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` prop `isItemDisabled`, which accepts a function that checks if the item at the supplied index is disabled
- `sandstone/Panels.Header` support for `headerInput` so the Header can be used as an Input. See documentation for usage examples.
- `sandstone/ProgressBar` property `tooltipSide` to configure tooltip position relative to the progress bar
- `sandstone/ProgressBar` colors (affecting `sandstone/Slider` as well) for light and dark theme to match the latest designs and make them more visible when drawn over arbitrary background colors

### Fixed

- `sandstone/VideoPlayer` to correctly adjust spaces when the number of components changes in `leftComponents` and `rightComponents`
- `sandstone/VideoPlayer` to read out audio guidance every time `source` changes
- `sandstone/VideoPlayer` to display custom thumbnail node
- `sandstone/VideoPlayer` to hide more icon when right components are removed
- `sandstone/Picker` to correctly update pressed state when dragging off buttons
- `sandstone/Notification` to display when it's opened
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to show Spotlight properly while navigating with page up and down keys
- `sandstone/Input` to allow navigating via left or right to other components when the input is active and the selection is at start or end of the text, respectively
- `sandstone/Panels.ActivityPanels` to correctly lay out the existing panel after adding additional panels

## [2.0.0-alpha.6] - 2018-03-22

### Removed

- `sandstone/Slider` exports `SliderFactory` and `SliderBaseFactory`
- `sandstone/IncrementSlider` exports `IncrementSliderFactory` and `IncrementSliderBaseFactory`
- `sandstone/ProgressBar`, `sandstone/Slider`, `sandstone/Slider.SliderTooltip`, `sandstone/IncrementSlider` components' `vertical` property and replaced it with `orientation`

### Added

- `sandstone/VideoPlayer` property `component` to handle custom video element
- `sandstone/IncrementSlider` properties `incrementAriaLabel` and `decrementAriaLabel` to configure the label set on each button
- `sandstone/Input` support for `small` prop
- `sandstone/ProgressBar` support for `tooltip` and `tooltipForceSide`
- `sandstone/ProgressBar`, `sandstone/Slider`, `sandstone/Slider.SliderTooltip`, `sandstone/IncrementSlider` property `orientation` to accept orientation strings like "vertical" and "horizontal" (replaced old `vertical` prop)

### Changed

- `sandstone/Input` input `height`, `vertical-align`, and `margins`. Please verify your layouts to ensure everything lines up correctly; this change may require removal of old sizing and positioning CSS which is no longer necessary.
- `sandstone/FormCheckbox` to have a small border around the circle, according to new GUI designs
- `sandstone/RadioItem` dot size and added an inner-dot to selected-focused state, according to new GUI designs
- `sandstone/ContextualPopup` prop `popupContainerId` to `popupSpotlightId`
- `sandstone/Popup` prop `containerId` to `spotlightId`
- `sandstone/VideoPlayer` prop `containerId` to `spotlightId`
- `sandstone/VirtualList.VirtualList` and `sandstone/VirtualList.VirtualGridList` prop `component` to be replaced by `itemRenderer`

### Fixed

- `sandstone/ExpandableItem` to be more performant when animating
- `sandstone/GridListImageItem` to hide overlay checkmark icon on focus when unselected
- `sandstone/GridListImageItem` to use `ui/GridListImageItem`
- `sandstone/VirtualList`, `sandstone/VirtualGridList` and `sandstone/Scroller` components to use their base UI components
- `sandstone/VirtualList` to show the selected state on hovered paging controls properly
- `sandstone/Slider` to highlight knob when selected
- `sandstone/Slider` to handle updates to its `value` prop correctly
- `sandstone/ToggleItem` to accept HTML DOM node tag names as strings for its `component` property
- `sandstone/Popup` to properly pause and resume spotlight when animating

## [2.0.0-alpha.5] - 2018-03-07

### Removed

- `sandstone/Marquee.MarqueeText`, replaced by `sandstone/Marquee.Marquee`
- `sandstone/VirtualGridList.GridListImageItem`, replaced by `sandstone/GridListImageItem`

### Changed

- `sandstone/Marquee.Marquee` to be `sandstone/Marquee.MarqueeBase`
- `sandstone/ContextualPopupDecorator` to not restore last-focused child
- `sandstone/ExpandableList` to restore focus to the first selected item after opening

### Fixed

- `sandstone/Slider` to correctly show localized percentage value in tooltip when `tooltipAsPercent` is true
- `sandstone/VirtualGridList` to show or hide its scrollbars properly
- `sandstone/Button` text to be properly centered
- `sandstone/Input` to not clip some glyphs at the start of the value

## [2.0.0-alpha.4] - 2018-02-13

### Added

- `sandstone/SlotItem` replacing `sandstone/Item.ItemOverlay`

### Removed

- `sandstone/VirtualFlexList` to be replaced by `ui/VirtualFlexList`
- `sandstone/Button` and `sandstone/IconButton` prop `noAnimation`
- `sandstone/Item.OverlayDecorator`, `sandstone/Item.Overlay`, and `sandstone/Item.ItemOverlay` to be replaced by `sandstone/SlotItem`

### Changed

- `sandstone/Marquee` to do less-costly calculations during measurement and optimized the applied styles
- `sandstone/ExpandableList` to require a unique key for each object type data

### Fixed

- `sandstone/VirtualList` to render properly with fiber reconciler
- `sandstone/VirtualList` focus option in scrollTo api
- `sandstone/ExpandableSpotlightDecorator` to not spot the title upon collapse when in `pointerMode`
- `sandstone/Spinner` to not unpause Spotlight unless it was the one to pause it
- `sandstone/Marquee` to stop when becoming disabled
- `sandstone/Input`, `sandstone/MarqueeDecorator`, and `sandstone/Slider` to prevent unnecessary focus-based updates

## [2.0.0-alpha.3] - 2018-01-18

### Removed

- `sandstone/Scroller` and `sandstone/VirtualList` option `indexToFocus` in `scrollTo` method which is deprecated from 1.2.0
- `sandstone/Scroller` props `horizontal` and `vertical` which are deprecated from 1.3.0 and replaced with `direction` prop
- `sandstone/Button` exports `ButtonFactory` and `ButtonBaseFactory`
- `sandstone/IconButton` exports `IconButtonFactory` and `IconButtonBaseFactory`

### Fixed

- `sandstone/ThemeDecorator` root node to fill the entire space available, which simplifies positioning and sizing for child elements (previously always measured 0 in height)
- `sandstone/VirtualList` to prevent infinite function call when a size of contents is slightly longer than a client size without a scrollbar
- `sandstone/VirtualList` to sync scroll position when clientSize changed

## [2.0.0-alpha.2] - 2017-08-29

No significant changes.

## [2.0.0-alpha.1] - 2017-08-27

### Changed

- `sandstone/Button`, `sandstone/Checkbox`, `sandstone/FormCheckbox`, `sandstone/IconButton`, `sandstone/IncrementSlider`, `sandstone/Item`, `sandstone/Picker`, and `sandstone/RangePicker`, `sandstone/Switch` and `sandstone/VideoPlayer` to use `ui/Touchable`

## [1.15.0] - 2018-02-28

### Deprecated

- `sandstone/Marquee.Marquee`, to be moved to `sandstone/Marquee.MarqueeBase` in 2.0.0
- `sandstone/Marquee.MarqueeText`, to be moved to `sandstone/Marquee.Marquee` in 2.0.0

### Fixed

- `sandstone/GridListImageItem` to display correctly

## [1.14.0] - 2018-02-23

### Deprecated

- `sandstone/VirtualFlexList`, to be replaced by `ui/VirtualFlexList` in 2.0.0
- `sandstone/VirtualGridList.GridListImageItem`, to be replaced by `sandstone/GridListImageItem` in 2.0.0
- `sandstone/Button` and `sandstone/IconButton` prop `noAnimation`, to be removed in 2.0.0
- `sandstone/Button.ButtonFactory`, `sandstone/Button.ButtonBaseFactory`, `sandstone/IconButton.IconButtonFactory`, `sandstone/IconButton.IconButtonBaseFactory`, `sandstone/IncrementSlider.IncrementSliderFactory`, `sandstone/IncrementSlider.IncrementSliderBaseFactory`, `sandstone/Slider.SliderFactory`, and `sandstone/Slider.SliderBaseFactory`, to be removed in 2.0.0
- `sandstone/Item.ItemOverlay`, to be replaced by `ui/SlotItem` in 2.0.0
- `sandstone/Item.Overlay` and `sandstone/Item.OverlayDecorator`, to be removed in 2.0.0

### Added

- `sandstone/DaySelector` component
- `sandstone/EditableIntegerPicker` component
- `sandstone/GridListImageItem` component

## [1.13.4] - 2018-07-30

### Fixed

- `sandstone/DatePicker` to calculate min and max year in the current calender

## [1.13.3] - 2018-01-16

### Fixed

- `sandstone/TimePicker` to not read out meridiem label when meridiem picker gets a focus
- `sandstone/Scroller` to correctly update scrollbars when the scroller's contents change

## [1.13.2] - 2017-12-14

### Fixed

- `sandstone/Panels` to maintain spotlight focus when `noAnimation` is set
- `sandstone/Panels` to not accept back key presses during transition
- `sandstone/Panels` to revert 1.13.0 fix that blurred Spotlight when transitioning panels
- `sandstone/Scroller` and other scrolling components to not show scroll thumb when only child item is updated
- `sandstone/Scroller` and other scrolling components to not hide scroll thumb immediately after scroll position reaches the top or the bottom
- `sandstone/Scroller` and other scrolling components to show scroll thumb properly when scroll position reaches the top or the bottom by paging controls

## [1.13.1] - 2017-12-06

### Fixed

- `sandstone/Slider` to not unnecessarily fire `onChange` if the initial value has not changed

## [1.13.0] - 2017-11-28

### Added

- `sandstone/VideoPlayer` props `disabled`, `loading`, `miniFeedbackHideDelay`, and `thumbnailComponent` as well as new APIs: `areControlsVisible`, `getVideoNode`, `showFeedback`, and `toggleControls`

### Fixed

- `sandstone/VirtualList` to render items from a correct index on edge cases at the top of a list
- `sandstone/VirtualList` to handle focus properly via page up at the first page and via page down at the last page
- `sandstone/Expandable` and derivatives to use the new `ease-out-quart` animation timing function to better match the aesthetic of Enyo's Expandables
- `sandstone/TooltipDecorator` to correctly display tooltip direction when locale changes
- `sandstone/Marquee` to restart animation on every resize update
- `sandstone/LabeledItem` to start marquee when hovering while disabled
- `sandstone/Marquee` to correctly start when hovering on disabled spottable components
- `sandstone/Marquee.MarqueeController` to not abort marquee when moving among components
- `sandstone/Picker` marquee issues with disabled buttons or Picker
- `sandstone/Panels` to prevent loss of spotlight issue when moving between panels
- `sandstone/VideoPlayer` to bring it in line with real-world use-cases
- `sandstone/Slider` by removing unnecessary repaints to the screen
- `sandstone/Slider` to fire `onChange` events when the knob is pressed near the boundaries
- `sandstone/VideoPlayer` to correctly position knob when interacting with media slider
- `sandstone/VideoPlayer` to not read out the focused button when the media controls hide
- `sandstone/MarqueeDecorator` to stop when unhovering a disabled component using `marqueeOn` `'focus'`
- `sandstone/Slider` to not forward `onChange` when `disabled` on `mouseUp/click`
- `sandstone/VideoPlayer` to defer rendering playback controls until needed

## [1.12.2] - 2017-11-15

### Fixed

- `sandstone/VirtualList` to scroll and focus properly by pageUp and pageDown when disabled items are in it
- `sandstone/Button` to correctly specify minimum width when in large text mode
- `sandstone/Scroller` and other scrolling components to restore last focused index when panel is changed
- `sandstone/VideoPlayer` to display time correctly in RTL locale
- `sandstone/VirtualList` to scroll correctly using page down key with disabled items
- `sandstone/Scroller` and other scrolling components to not cause a script error when scrollbar is not rendered
- `sandstone/Picker` incrementer and decrementer to not change size when focused
- `sandstone/Panels.Header` to use a slightly smaller font size for `title` in non-latin locales and a line-height for `titleBelow` and `subTitleBelow` that better meets the needs of tall-glyph languages like Tamil and Thai, as well as latin locales
- `sandstone/Scroller` and `sandstone/VirtualList` to keep spotlight when pressing a 5-way control while scrolling
- `sandstone/Panels` to prevent user interaction with panel contents during transition
- `sandstone/Slider` and related components to correctly position knob for `detachedKnob` on mouse down and fire value where mouse was positioned on mouse up
- `sandstone/DayPicker` to update day names when changing locale
- `sandstone/ExpandableItem` and all other `Expandable` components to revert 1.12.1 change to pull down from the top

## [1.12.1] - 2017-11-07

### Fixed

- `sandstone/ExpandableItem` and all other `Expandable` components to now pull down from the top instead of being revealed from the bottom, matching Enyo's design
- `sandstone/VirtualListNative` to scroll properly with page up/down keys if there is a disabled item
- `sandstone/RangePicker` to display negative values correctly in RTL
- `sandstone/Scroller` and other scrolling components to not blur scroll buttons when wheeling
- `sandstone/Scrollbar` to hide scroll thumb immediately without delay after scroll position reaches min or max
- `sandstone/Divider` to pass `marqueeOn` prop
- `sandstone/Slider` to fire `onChange` on mouse up and key up
- `sandstone/VideoPlayer` to show knob when pressed
- `sandstone/Panels.Header` to layout `titleBelow` and `subTitleBelow` correctly
- `sandstone/Panels.Header` to use correct font-weight for `subTitleBelow`
- `sandstone/VirtualList` to restore focus correctly for lists only slightly larger than the viewport

## [1.12.0] - 2017-10-27

### Fixed

- `sandstone/Scroller` and other scrolling components to prevent focusing outside the viewport when pressing a 5-way key during wheeling
- `sandstone/Scroller` to called scrollToBoundary once when focus is moved using holding child item
- `sandstone/VideoPlayer` to apply skin correctly
- `sandstone/Popup` from `last-focused` to `default-element` in `SpotlightContainerDecorator` config
- `sandstone/Panels` to retain focus when back key is pressed on breadcrumb
- `sandstone/Input` to correctly hide VKB when dismissing

## [1.11.0] - 2017-10-24

### Added

- `sandstone/VideoPlayer` properties `seekDisabled` and `onSeekFailed` to disable seek function

### Changed

- `sandstone/ExpandableList` to become `disabled` if there are no children

### Fixed

- `sandstone/Picker` to read out customized accessibility value when picker prop has `joined` and `aria-valuetext`
- `sandstone/Scroller` to apply scroll position on vertical or horizontal Scroller when child gets a focus
- `sandstone/Scroller` and other scrolling components to scroll without animation when panel is changed
- `sandstone/ContextualPopup` padding to not overlap close button
- `sandstone/Scroller` and other scrolling components to change focus via page up/down only when the scrollbar is visible
- `sandstone/Picker` to only increment one value on hold
- `sandstone/ItemOverlay` to remeasure when focused

## [1.10.1] - 2017-10-16

### Fixed

- `sandstone/Scroller` and other scrolling components to scroll via page up/down when focus is inside a Spotlight container
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to scroll by 5-way keys right after wheeling
- `sandstone/VirtualList` not to move focus when a current item and the last item are located at the same line and pressing a page down key
- `sandstone/Slider` knob to follow while dragging for detached knob
- `sandstone/Panels.Header` to layout header row correctly in `standard` type
- `sandstone/Input` to not dismiss on-screen keyboard when dragging cursor out of input box
- `sandstone/Panels.Header` RTL `line-height` issue
- `sandstone/Panels` to render children on idle
- `sandstone/Scroller` and other scrolling components to limit muted spotlight container scrims to their bounds
- `sandstone/Input` to always forward `onKeyUp` event

## [1.10.0] - 2017-10-09

### Added

- `sandstone/VideoPlayer` support for designating components with `.spottable-default` as the default focus target when pressing 5-way down from the slider
- `sandstone/Slider` property `activateOnFocus` which when enabled, allows 5-way directional key interaction with the `Slider` value without pressing [Enter] first
- `sandstone/VideoPlayer` property `noMiniFeedback` to support controlling the visibility of mini feedback
- `ui/Layout`, which provides a technique for laying-out components on the screen using `Cells`, in rows or columns

### Changed

- `sandstone/Popup` to focus on mount if it’s initially opened and non-animating and to always pass an object to `onHide` and `onShow`
- `sandstone/VideoPlayer` to emit `onScrub` event and provide audio guidance when setting focus to slider

### Fixed

- `sandstone/ExpandableItem` and derivatives to restore focus to the Item if the contents were last focused when closed
- `sandstone/Slider` toggling activated state when holding enter/select key
- `sandstone/TimePicker` picker icons shifting slightly when focusing an adjacent picker
- `sandstone/Icon` so it handles color the same way generic text does, by inheriting from the parent's color. This applies to all instances of `Icon`, `IconButton`, and `Icon` inside `Button`.
- `sandstone/fonts` Museo Sans font to correct "Ti" kerning
- `sandstone/VideoPlayer` to correctly position knob on mouse click
- `sandstone/Panels.Header` to show an ellipsis for long titles with RTL text
- `sandstone/Marquee` to restart when invalidated by a prop change and managed by a `sandstone/Marquee.MarqueeController`
- `spotlight.Spotlight` method `focus()` to verify that the target element matches its container's selector rules prior to setting focus
- `sandstone/Picker` to only change picker values `onWheel` when spotted
- `sandstone/VideoPlayer` to hide descendant floating components (tooltips, contextual popups) when the media controls hide

## [1.9.3] - 2017-10-03

### Added

- `sandstone/Button` property value to `backgroundOpacity` called "lightTranslucent" to better serve colorful image backgrounds behind Buttons. This also affects `sandstone/IconButton` and `sandstone/Panels/ApplicationCloseButton`.
- `sandstone/Panels` property `closeButtonBackgroundOpacity` to support `sandstone/Panels/ApplicationCloseButton`'s `backgroundOpacity` prop

### Changed

- `Sandstone Icons` font file to include the latest designs for several icons
- `sandstone/Panels/ApplicationCloseButton` to expose its `backgroundOpacity` prop

### Fixed

- `sandstone/VirtualList` to apply "position: absolute" inline style to items
- `sandstone/Picker` to increment and decrement normally at the edges of joined picker
- `sandstone/Icon` not to read out image characters
- `sandstone/Scroller` and other scrolling components to not accumulate paging scroll by pressing page up/down in scrollbar
- `sandstone/Icon` to correctly display focused state when using external image
- `sandstone/Button` and `sandstone/IconButton` to be properly visually muted when in a muted container

## [1.9.2] - 2017-09-26

### Fixed

- `sandstone/ExpandableList` preventing updates when its children had changed

## [1.9.1] - 2017-09-25

### Fixed

- `sandstone/ExpandableList` run-time error when using an array of objects as children
- `sandstone/VideoPlayer` blocking pointer events when the controls were hidden

## [1.9.0] - 2017-09-22

### Added

- `sandstone/styles/mixins.less` mixins: `.sand-spotlight-margin()` and `.sand-spotlight-padding()`
- `sandstone/Button` property `noAnimation` to support non-animating pressed visual

### Changed

- `sandstone/TimePicker` to use "AM/PM" instead of "meridiem" for label under meridiem picker
- `sandstone/IconButton` default style to not animate on press. NOTE: This behavior will change back to its previous setting in release 2.0.0.
- `sandstone/Popup` to warn when using `scrimType` `'none'` and `spotlightRestrict` `'self-only'`
- `sandstone/Scroller` to block spotlight during scroll
- `sandstone/ExpandableItem` and derivatives to always pause spotlight before animation

### Fixed

- `sandstone/VirtualGridList` to not move focus to wrong column when scrolled from the bottom by holding the "up" key
- `sandstone/VirtualList` to focus an item properly when moving to a next or previous page
- `sandstone/Scroller` and other scrolling components to move focus toward first or last child when page up or down key is pressed if the number of children is small
- `sandstone/VirtualList` to scroll to preserved index when it exists within dataSize for preserving focus
- `sandstone/Picker` buttons to not change size
- `sandstone/Panel` to move key navigation to application close button on holding the "up" key.
- `sandstone/Picker` to show numbers when changing values rapidly
- `sandstone/Popup` layout in large text mode to show close button correctly
- `sandstone/Picker` from moving scroller when pressing 5-way keys in `joined` Picker
- `sandstone/Input` so it displays all locales the same way, without cutting off the edges of characters
- `sandstone/TooltipDecorator` to hide tooltip when 5-way keys are pressed for disabled components
- `sandstone/Picker` to not tremble in width when changing values while using a numeric width prop value
- `sandstone/Picker` to not overlap values when changing values in `vertical`
- `sandstone/ContextualPopup` pointer mode focus behavior for `spotlightRestrict='self-only'`
- `sandstone/VideoPlayer` to prevent interacting with more components in pointer mode when hidden
- `sandstone/Scroller` to not repaint its entire contents whenever partial content is updated
- `sandstone/Slider` knob positioning after its container is resized
- `sandstone/VideoPlayer` to maintain focus when media controls are hidden
- `sandstone/Scroller` to scroll expandable components into view when opening when pointer has moved elsewhere

## [1.8.0] - 2017-09-07

### Deprecated

- `sandstone/Dialog` property `showDivider`, will be replaced by `noDivider` property in 2.0.0

### Added

- `sandstone/Popup` callback property `onShow` which fires after popup appears for both animating and non-animating popups

### Changed

- `sandstone/Popup` callback property `onHide` to run on both animating and non-animating popups
- `sandstone/VideoPlayer` state `playbackRate` to media events
- `sandstone/VideoPlayer` support for `spotlightDisabled`
- `sandstone/VideoPlayer` thumbnail positioning and style
- `sandstone/VirtualList` to render when dataSize increased or decreased
- `sandstone/Dialog` style
- `sandstone/Popup`, `sandstone/Dialog`, and `sandstone/Notification` to support `node` type for children
- `sandstone/Scroller` to forward `onKeyDown` events

### Fixed

- `sandstone/Scroller` and other scrolling components to enable focus when wheel scroll is stopped
- `sandstone/VirtualList` to show scroll thumb when a preserved item is focused in a Panel
- `sandstone/Scroller` to navigate properly with 5-way when expandable child is opened
- `sandstone/VirtualList` to stop scrolling when focus is moved on an item from paging controls or outside
- `sandstone/VirtualList` to move out with 5-way navigation when the first or the last item is disabled
- `sandstone/IconButton` Tooltip position when disabled
- `sandstone/VideoPlayer` Tooltip time after unhovering
- `sandstone/VirtualList` to not show invisible items
- `sandstone/IconButton` Tooltip position when disabled
- `sandstone/VideoPlayer` to display feedback tooltip correctly when navigating in 5-way
- `sandstone/MarqueeDecorator` to work with synchronized `marqueeOn` `'render'` and hovering as well as `marqueOn` `'hover'` when moving rapidly among synchronized marquees
- `sandstone/Input` aria-label for translation
- `sandstone/Marquee` to recalculate inside `sandstone/Scroller` and `sandstone/SelectableItem` by bypassing `shouldComponentUpdate`
- `sandstone/Picker` to marquee when incrementing and decrementing values with the prop `noAnimation`

## [1.7.0] - 2017-08-23

### Deprecated

- `sandstone/TextSizeDecorator` and it will be replaced by `sandstone/AccessibilityDecorator`
- `sandstone/MarqueeDecorator` property `marqueeCentered` and `sandstone/Marquee` property `centered` will be replaced by `alignment` property in 2.0.0

### Added

- `sandstone/TooltipDecorator` config property to direct tooltip into a property instead of adding to `children`
- `sandstone/VideoPlayer` prop `thumbnailUnavailable` to fade thumbnail
- `sandstone/AccessibilityDecorator` with `highContrast` and `textSize`
- `sandstone/VideoPlayer` high contrast scrim
- `sandstone/MarqueeDecorator`and `sandstone/Marquee` property `alignment` to allow setting  alignment of marquee content

### Changed

- `sandstone/Scrollbar` to disable paging control down button properly at the bottom when a scroller size is a non-integer value
- `sandstone/VirtualList`, `sandstone/VirtualGridList`, and `sandstone/Scroller` to scroll on `keydown` event instead of `keyup` event of page up and page down keys
- `sandstone/VirtualGridList` to scroll by item via 5 way key
- `sandstone/VideoPlayer` to read target time when jump by left/right key
- `sandstone/IconButton` to not use `MarqueeDecorator` and `Uppercase`

### Fixed

- `sandstone/VirtualList` and `sandstone/VirtualGridList` to focus the correct item when page up and page down keys are pressed
- `sandstone/VirtualList` to not lose focus when moving out from the first item via 5way when it has disabled items
- `sandstone/Slider` to align tooltip with detached knob
- `sandstone/FormCheckbox` to display correct colors in light skin
- `sandstone/Picker` and `sandstone/RangePicker` to forward `onKeyDown` events when not `joined`
- `sandstone/SelectableItem` to display correct icon width and alignment
- `sandstone/LabeledItem` to always match alignment with the locale
- `sandstone/Scroller` to properly 5-way navigate from scroll buttons
- `sandstone/ExpandableList` to display correct font weight and size for list items
- `sandstone/Divider` to not italicize in non-italic locales
- `sandstone/VideoPlayer` slider knob to follow progress after being selected when seeking
- `sandstone/LabeledItem` to correctly position its icon. This affects all of the `Expandables`, `sandstone/DatePicker` and `sandstone/TimePicker`.
- `sandstone/Panels.Header` and `sandstone/Item` to prevent them from allowing their contents to overflow unexpectedly
- `sandstone/Marquee` to recalculate when vertical scrollbar appears
- `sandstone/SelectableItem` to recalculate marquee when toggled

### Removed

- `sandstone/Input` large-text mode

## [1.6.1] - 2017-08-07

### Changed

- `sandstone/Icon` and `sandstone/IconButton` to no longer fit image source to the icon's boundary

## [1.6.0] - 2017-08-04

### Added

- `sandstone/VideoPlayer` ability to seek when holding down the right and left keys. Sensitivity can be adjusted using throttling options `jumpDelay` and `initialJumpDelay`.
- `sandstone/VideoPlayer` property `no5WayJump` to disable jumping done by 5-way
- `sandstone/VideoPlayer` support for the "More" button to use tooltips
- `sandstone/VideoPlayer` properties `moreButtonLabel` and `moreButtonCloseLabel` to allow customization of the "More" button's tooltip and Aria labels
- `sandstone/VideoPlayer` property `moreButtonDisabled` to disable the "More" button
- `sandstone/Picker` and `sandstone/RangePicker` prop `aria-valuetext` to support reading custom text instead of value
- `sandstone/VideoPlayer` methods `showControls` and `hideControls` to allow external interaction with the player
- `sandstone/Scroller` support for Page Up/Page Down keys in pointer mode when no item has focus

### Changed

- `sandstone/VideoPlayer` to handle play, pause, stop, fast forward and rewind on remote controller
- `sandstone/Marquee` to also start when hovered if `marqueeOnRender` is set

### Fixed

- `sandstone/IconButton` to fit image source within `IconButton`
- `sandstone` icon font sizes for wide icons
- `sandstone/ContextualPopupDecorator` to prefer setting focus to the appropriate popup instead of other underlying controls when using 5-way from the activating control
- `sandstone/Scroller` not scrolled via 5 way when `sandstone/ExpandableList` is opened
- `sandstone/VirtualList` to not let the focus move outside of container even if there are children left when navigating with 5way
- `sandstone/Scroller` and other scrolling components to update disability of paging controls when the scrollbar is set to `visible` and the content becomes shorter
- `sandstone/VideoPlayer` to focus on hover over play/pause button when video is loading
- `sandstone/VideoPlayer` to update and display proper time while moving knob when video is paused
- `sandstone/VideoPlayer` long title overlap issues
- `sandstone/Panels.Header` to apply `marqueeOn` prop to `subTitleBelow` and `titleBelow`
- `sandstone/Picker` wheeling in `sandstone/Scroller`
- `sandstone/IncrementSlider` and `sandstone/Picker` to read value changes when selecting buttons

## [1.5.0] - 2017-07-19

### Added

- `sandstone/Slider` and `sandstone/IncrementSlider` prop `aria-valuetext` to support reading custom text instead of value
- `sandstone/TooltipDecorator` property `tooltipProps` to attach props to tooltip component
- `sandstone/Scroller` and `sandstone/VirtualList` ability to scroll via page up and page down keys
- `sandstone/VideoPlayer` tooltip-thumbnail support with the `thumbnailSrc` prop and the `onScrub` callback to fire when the knob moves and a new thumbnail is needed
- `sandstone/VirtualList` ability to navigate via 5way when there are disabled items
- `sandstone/ContextualPopupDecorator` property `popupContainerId` to support configuration of the popup's spotlight container
- `sandstone/ContextualPopupDecorator` property `onOpen` to notify containers when the popup has been opened
- `sandstone/ContextualPopupDecorator` config option `openProp` to support mapping the value of `open` property to the chosen property of wrapped component

### Changed

- `sandstone/ExpandableList` to use 'radio' as the default, and adapt 'single' mode to render as a `sandstone/RadioItem` instead of a `sandstone/CheckboxItem`
- `sandstone/VideoPlayer` to not hide pause icon when it appears
- `sandstone/ContextualPopupDecorator` to set accessibility-related props onto the container node rather than the popup node
- `sandstone/ExpandableItem`, `sandstone/ExpandableList`, `sandstone/ExpandablePicker`, `sandstone/DatePicker`, and `sandstone/TimePicker` to pause spotlight when animating in 5-way mode
- `sandstone/Spinner` to position the text content under the spinner, rather than to the right side
- `sandstone/VideoPlayer` to include hour when announcing the time while scrubbing
- `sandstone/GridListImageItem` to require a `source` prop and not have a default value

### Fixed

- `sandstone/Input` ellipsis to show if placeholder is changed dynamically and is too long
- `sandstone/Marquee` to re-evaluate RTL orientation when its content changes
- `sandstone/VirtualList` to restore focus on short lists
- `sandstone/ExpandableInput` to expand the width of its contained `sandstone/Input`
- `sandstone/Input` support for `dismissOnEnter`
- `sandstone/Input` focus management to prevent stealing focus when programmatically moved elsewhere
- `sandstone/Input` 5-way spot behavior
- `sandstone` international fonts to always be used, even when unsupported font-weights or font-styles are requested
- `sandstone/Panels.Panel` support for selecting components with `.spottable-default` as the default focus target
- `sandstone/Panels` layout in RTL locales
- `sandstone` spottable components to support `onSpotlightDown`, `onSpotlightLeft`, `onSpotlightRight`, and `onSpotlightUp` event property
- `sandstone/VirtualList` losing spotlight when the list is empty
- `sandstone/FormCheckbox` in focused state to have the correct "check" color
- `sandstone/Scroller` and other scrolling components' bug in `navigableFilter` when passed a container id

## [1.4.1] - 2017-07-05

### Changed

- `sandstone/Popup` to only call `onKeyDown` when there is a focused item in the `Popup`
- `sandstone/Scroller`, `sandstone/Picker`, and `sandstone/IncrementSlider` to automatically move focus when the currently focused `sandstone/IconButton` becomes disabled

### Fixed

- `sandstone/ContextualPopupDecorator` close button to account for large text size
- `sandstone/ContextualPopupDecorator` to not spot controls other than its activator when navigating out via 5-way
- `sandstone/Panels.Header` to set the value of `marqueeOn` for all types of headers

## [1.4.0] - 2017-06-29

### Deprecated

- `sandstone/Input` prop `noDecorator` is being replaced by `autoFocus` in 2.0.0

### Added

- `sandstone/Scrollbar` property `corner` to add the corner between vertical and horizontal scrollbars
- `sandstone/ScrollThumb` for a thumb of `sandstone/Scrollbar`
- `sandstone/styles/text.less` mixin `.locale-japanese-line-break()` to apply the correct  Japanese language line-break rules for the following multi-line components: `sandstone/BodyText`, `sandstone/Dialog`, `sandstone/Notification`, `sandstone/Popup`, and `sandstone/Tooltip`
- `sandstone/ContextualPopupDecorator` property `popupProps` to attach props to popup component
- `sandstone/VideoPlayer` property `pauseAtEnd` to control forward/backward seeking
- `sandstone/Panels/Header` prop `marqueeOn` to control marquee of header

### Changed

- `sandstone/Panels/Header` to expose its `marqueeOn` prop
- `sandstone/VideoPlayer` to automatically adjust the width of the allocated space for the side components so the media controls have more space to appear on smaller screens
- `sandstone/VideoPlayer` properties `autoCloseTimeout` and `titleHideDelay` default value to `5000`
- `sandstone/VirtualList` to support restoring focus to the last focused item
- `sandstone/Scroller` and other scrolling components to call `onScrollStop` before unmounting if a scroll is in progress
- `sandstone/Scroller` to reveal non-spottable content when navigating out of a scroller

### Fixed

- `sandstone/Dialog` to properly focus via pointer on child components
- `sandstone/VirtualList`, `sandstone/VirtualGridList`, and `sandstone/Scroller` not to be slower when scrolled to the first or the last position by wheeling
- `sandstone` component hold delay time
- `sandstone/VideoPlayer` to show its controls when pressing down the first time
- `sandstone/Panel` autoFocus logic to only focus on initial render
- `sandstone/Input` text colors
- `sandstone/ExpandableInput` to focus its decorator when leaving by 5-way left/right

## [1.3.1] - 2017-06-14

### Fixed

- `sandstone/Picker` support for large text
- `sandstone/Scroller` support for focusing paging controls with the pointer
- `sandstone` CSS rules for unskinned spottable components

## [1.3.0] - 2017-06-12

### Deprecated

- `sandstone/Scroller` props `horizontal` and `vertical`. Deprecated props are replaced with `direction` prop. `horizontal` and `vertical` will be removed in 2.0.0.
- `sandstone/Panel` prop `noAutoFocus` in favor of `autoFocus="none"`

### Added

- `sandstone/Image` support for `children` prop inside images
- `sandstone/Scroller` prop `direction` which replaces `horizontal` and `vertical` props
- `sandstone/VideoPlayer` property `tooltipHideDelay` to hide tooltip with a given amount of time
- `sandstone/VideoPlayer` property `pauseAtEnd` to pause when it reaches either the start or the end of the video
- `sandstone/VideoPlayer` methods `fastForward`, `getMediaState`, `jump`, `pause`, `play`, `rewind`, and `seek` to allow external interaction with the player. See docs for example usage.

### Changed

- `sandstone/Skinnable` to support context and allow it to be added to any component to be individually skinned. This includes a further optimization in skinning which consolidates all color assignments into a single block, so non-color rules aren't unnecessarily duplicated.
- `sandstone/Skinnable` light and dark skin names ("sandstone-light" and "sandstone") to "light" and "dark", respectively
- `sandstone/VideoPlayer` to set play/pause icon to display "play" when rewinding or fast forwarding
- `sandstone/VideoPlayer` to rewind or fast forward when previous command is slow-forward or slow-rewind respectively
- `sandstone/VideoPlayer` to fast forward when previous command is slow-forward and it reaches the last of its play rate
- `sandstone/VideoPlayer` to not play video on reload when `noAutoPlay` is `true`
- `sandstone/VideoPlayer` property `feedbackHideDelay`'s default value to `3000`
- `sandstone/Notification` to break line in characters in ja and zh locale
- `sandstone/Notification` to align texts left in LTR locale and right in RTL locale
- `sandstone/VideoPlayer` to simulate rewind functionality on non-webOS platforms only

### Fixed

- `sandstone/ExpandableItem` to correct the `titleIcon` when using `open` and `disabled`
- `sandstone/GridListImageItem` to center its selection icon on the image instead of the item
- `sandstone/Input` to have correct `Tooltip` position in `RTL`
- `sandstone/SwitchItem` to not unintentionally overflow `Scroller` containers, causing them to jump to the side when focusing
- `sandstone/VideoPlayer` to fast forward properly when video is at paused state
- `sandstone/VideoPlayer` to correctly change sources
- `sandstone/VideoPlayer` to show or hide feedback tooltip properly
- `sandstone/DateTimeDecorator` to work properly with `RadioControllerDecorator`
- `sandstone/Picker` in joined, large text mode so the arrows are properly aligned and sized
- `sandstone/Icon` to reflect the same proportion in relation to its size in large-text mode

## [1.2.0] - 2017-05-17

### Deprecated

- `sandstone/Scroller` and other scrolling components option `indexToFocus` in `scrollTo` method to be removed in 2.0.0

### Added

- `sandstone/Slider` and `sandstone/IncrementSlider` prop `noFill` to support a style without the fill
- `sandstone/Marquee` property `rtl` to set directionality to right-to-left
- `sandstone/VirtualList.GridListImageItem` property `selectionOverlay` to add custom component for selection overlay
- `sandstone/ThemeDecorator` property `skin` to let an app choose its skin: "sandstone" and "sandstone-light" are now available
- `sandstone/FormCheckboxItem`
- `sandstone/FormCheckbox`, a standalone checkbox, to support `sandstone/FormCheckboxItem`
- `sandstone/Input` props `invalid` and `invalidMessage` to display a tooltip when input value is invalid
- `sandstone/Scroller` and other scrolling components option `focus` in `scrollTo()` method
- `sandstone/Scroller` and other scrolling components property `spottableScrollbar`
- `sandstone/Icon.IconList` icons: `arrowshrinkleft` and `arrowshrinkright`

### Changed

- `sandstone/Picker` arrow icon for `joined` picker: small when not spotted, hidden when it reaches the end of the picker
- `sandstone/Checkbox` and `sandstone/CheckboxItem` to reflect the latest design
- `sandstone/ThemeDecorator/fontGenerator` was refactored to use the browser's FontFace API to dynamically load locale fonts
- `sandstone/VideoPlayer` space allotment on both sides of the playback controls to support 4 buttons; consequently the "more" controls area has shrunk by the same amount
- `sandstone/VideoPlayer` to not disable media button (play/pause)
- `sandstone/Scroller` and other scrolling components so that paging controls are not spottable by default with 5-way
- `sandstone/VideoPlayer`'s more/less button to use updated arrow icon

### Fixed

- `sandstone/MarqueeDecorator` to properly stop marquee on items with `'marqueeOnHover'`
- `sandstone/ExpandableList` to work properly with object-based children
- `sandstone/styles/fonts.less` to restore the Sandstone Icon font to request the local system font by default. Remember to update your webOS build to get the latest version of the font so you don't see empty boxes for your icons.
- `sandstone/Picker` and `sandstone/RangePicker` to now use the correct size from Enyo (60px v.s. 84px) for icon buttons
- `sandstone/Scroller` and other scrolling components to apply ri.scale properly
- `sandstone/Panel` to not cover a `Panels`'s `ApplicationCloseButton` when not using a `Header`
- `sandstone/IncrementSlider` to show tooltip when buttons focused

## [1.1.0] - 2017-04-21

### Deprecated

- `sandstone/ExpandableInput` property `onInputChange`

### Added

- `sandstone/Panels.Panel` prop and `sandstone/ThemeDecorator` config option: `noAutoFocus` to support prevention of setting automatic focus after render
- `sandstone/VideoPlayer` props: `backwardIcon`, `forwardIcon`, `jumpBackwardIcon`, `jumpForwardIcon`, `pauseIcon`, and `playIcon` to support icon customization of the player
- `sandstone/VideoPlayer` props `jumpButtonsDisabled` and `rateButtonsDisabled` for disabling the pairs of buttons when it's inappropriate for the playing media
- `sandstone/VideoPlayer` property `playbackRateHash` to support custom playback rates
- `sandstone/VideoPlayer` callback prop `onControlsAvailable` which fires when the players controls show or hide
- `sandstone/Image` support for `onLoad` and `onError` events
- `sandstone/VirtualList.GridListImageItem` prop `placeholder`
- `sandstone/Divider` property `preserveCase` to display text without capitalizing it

### Changed

- `sandstone/Slider` colors and sizing to match the latest designs
- `sandstone/ProgressBar` to position correctly with other components nearby
- `sandstone/Panels` breadcrumb to no longer have a horizontal line above it
- `sandstone/Transition` to measure itself when the CPU is idle
- style for disabled opacity from 0.4 to 0.3
- `sandstone/Button` colors for transparent and translucent background opacity when disabled
- `sandstone/ExpandableInput` property `onInputChange` to fire along with `onChange`. `onInputChange` is deprecated and will be removed in a future update.
- `Sandstone.ttf` font to include new icons
- `sandstone/Icon` to reference additional icons

### Fixed

- `sandstone/Popup` and `sandstone/ContextualPopupDecorator` 5-way navigation behavior
- `sandstone/Input` to not spot its own input decorator on 5-way out
- `sandstone/VideoPlayer` to no longer render its `children` in multiple places
- `sandstone/Button` text color when used on a neutral (light) background in some cases
- `sandstone/Popup` background opacity
- `sandstone/Marquee` to recalculate properly when its contents change
- `sandstone/TimePicker` to display time in correct order
- `sandstone/Scroller` to prefer spotlight navigation to its internal components

## [1.0.0] - 2017-03-31

> NOTE: We have also modified most form components to be usable in a controlled (app manages component
> state) or uncontrolled (Enact manages component state) manner. To put a component into a
> controlled state, pass in `value` (or other appropriate state property such as `selected` or
> `open`) at component creation and then respond to events and update the value as needed. To put a
> component into an uncontrolled state, do not set `value` (or equivalent), at creation. From this
> point on, Enact will manage the state and events will be sent when the state is updated. To
> specify an initial value, use the `defaultValue` (or, `defaultSelected, `defaultOpen, etc.)
> property.  See the documentation for individual components for more information.

### Added

- `sandstone/Button` property `icon` to support a built-in icon next to the text content. The Icon supports everything that `sandstone/Icon` supports, as well as a custom icon.
- `sandstone/ThemeDecorator` property `textSize` to resize several components to requested CMR sizes. Simply add `textSize="large"` to your `App` and the new sizes will automatically take effect.

### Changed

- `sandstone/Slider` to use the property `tooltip` instead of `noTooltip`, so the built-in tooltip is not enabled by default
- `sandstone/IncrementSlider` to include tooltip documentation
- `sandstone/ExpandableList` to accept an array of objects as children which are spread onto the generated components
- `sandstone/CheckboxItem` style to match the latest designs, with support for the `sandstone/Checkbox` to be on either the left or the right side by using the `iconPosition` property
- `sandstone/VideoPlayer` to supply every event callback-method with an object representing the VideoPlayer's current state, including: `currentTime`, `duration`, `paused`, `proportionLoaded`, and `proportionPlayed`

### Fixed

- `sandstone/Panels.Panel` behavior for remembering focus on unmount and setting focus after render
- `sandstone/VirtualList.VirtualGridList` showing empty items when items are continuously added dynamically
- `sandstone/Picker` to marquee on focus once again

## [1.0.0-beta.4] - 2017-03-10

### Added

- `sandstone/VirtualList` `indexToFocus` option to `scrollTo` method to focus on item with specified index
- `sandstone/IconButton` and `sandstone/Button` `color` property to add a remote control key color to the button
- `sandstone/Scrollbar` property `disabled` to disable both paging controls when it is true
- `sandstone/VirtualList` parameter `moreInfo` to pass `firstVisibleIndex` and `lastVisibleIndex` when scroll events are firing
- Accessibility support to UI components
- `sandstone/VideoPlayer` property `onUMSMediaInfo` to support the custom webOS “umsmediainfo” event
- `sandstone/Region` component which encourages wrapping components for improved accessibility rather than only preceding the components with a `sandstone/Divider`
- `sandstone/Slider` tooltip. It's enabled by default and comes with options like `noTooltip`, `tooltipAsPercent`, and `tooltipSide`. See the component docs for more details.
- `sandstone/Panels.Panel` property `hideChildren` to defer rendering children
- `sandstone/Spinner` properties `blockClickOn` and `scrim` to block click events behind spinner
- `sandstone/VirtualList` property `clientSize` to specify item dimensions instead of measuring them

### Changed

- `sandstone/VirtualGridImageItem` styles to reduce redundant style code app side
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to add essential CSS for list items automatically
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to not add `data-index` to their item DOM elements directly, but to pass `data-index` as the parameter of their `component` prop like the `key` parameter of their `component` prop
- `sandstone/ExpandableItem` and derivatives to defer focusing the contents until animation completes
- `sandstone/LabeledItem`, `sandstone/ExpandableItem`, `sandstone/ExpandableList` to each support the `node` type in their `label` property. Best used with `ui/Slottable`.

### Fixed

- `sandstone/VirtualList.GridListImageItem` to have proper padding size according to the existence of caption/subcaption
- `sandstone/Scroller` and other scrolling components to display scrollbars with proper size
- `sandstone/VirtualGridList` to not be truncated

### Removed

- `sandstone/Scroller` and other scrolling components property `hideScrollbars` and replaced it with `horizontalScrollbar` and `verticalScrollbar`

## [1.0.0-beta.3] - 2017-02-21

### Added

- `sandstone/VideoPlayer` support for 5-way show/hide of media playback controls
- `sandstone/VideoPlayer` property `feedbackHideDelay`
- `sandstone/Slider` property `onKnobMove` to fire when the knob position changes, independently from the `sandstone/Slider` value
- `sandstone/Slider` properties `active`, `disabled`, `knobStep`, `onActivate`, `onDecrement`, and `onIncrement` as part of enabling 5-way support to `sandstone/Slider`, `sandstone/IncrementSlider` and the media slider for `sandstone/VideoPlayer`
- `sandstone/Slider` now supports `children` which are added to the `Slider`'s knob, and follow it as it moves
- `sandstone/ExpandableInput` properties `iconAfter` and `iconBefore` to display icons after and before the input, respectively
- `sandstone/Dialog` property `preserveCase`, which affects `title` text

### Changed

- `sandstone/IncrementSlider` to change when the buttons are held down
- `sandstone/Marquee` to allow disabled marquees to animate
- `sandstone/Dialog` to marquee `title` and `titleBelow`
- `sandstone/Marquee.MarqueeController` config option `startOnFocus` to `marqueeOnFocus`. `startOnFocus` is deprecated and will be removed in a future update.
- `sandstone/Button`, `sandstone/IconButton`, `sandstone/Item` to not forward `onClick` when `disabled`

### Fixed

- `sandstone/Marquee.MarqueeController` to start marquee on newly registered components when controller has focus and to restart synced marquees after completion
- `sandstone/Scroller` to recalculate when an expandable child opens
- `spotlightDisabled` property support for spottable sandstone components
- `sandstone/Popup` and `sandstone/ContextualPopupDecorator` so that when the popup is closed, spotlight focus returns to the control that had focus prior to the popup opening
- `sandstone/Input` to not get focus when disabled

## [1.0.0-beta.2] - 2017-01-30

### Added

- `sandstone/Panels.Panel` property `showChildren` to support deferring rendering the panel body until animation completes
- `sandstone/MarqueeDecorator` property `invalidateProps` that specifies which props cause the marquee distance to be invalidated
- developer-mode warnings to several components to warn when values are out-of-range
- `sandstone/Divider` property `spacing` which adjusts the amount of empty space above and below the `Divider`. `'normal'`, `'small'`, `'medium'`, `'large'`, and `'none'` are available.
- `sandstone/Picker` when `joined` the ability to be incremented and decremented by arrow keys
- `onSpotlightDisappear` event property support for spottable sandstone components
- `sandstone/VideoPlayer` property `titleHideDelay`

### Changed

- `sandstone/Panels.Panels` and variations to defer rendering the children of contained `Panel` instances until animation completes
- `sandstone/ProgressBar` properties `progress` and `backgroundProgress` to accept a number between 0 and 1
- `sandstone/Slider` and `sandstone/IncrementSlider` property `backgroundPercent` to `backgroundProgress` which now accepts a number between 0 and 1
- `sandstone/Slider` to not ignore `value` prop when it is the same as the previous value
- `sandstone/Picker` component's buttons to reverse their operation such that 'up' selects the previous item and 'down' the next
- `sandstone/Picker` and derivatives may now use numeric width, which represents the amount of characters to use for sizing. `width={4}` represents four characters, `2` for two characters, etc. `width` still accepts the size-name strings.
- `sandstone/Divider` to now behave as a simple horizontal line when no text content is provided
- `sandstone/Scroller` and other scrolling components to not display scrollbar controls by default
- `sandstone/DatePicker` and `sandstone/TimePicker` to emit `onChange` event whenever the value is changed, not just when the component is closed

### Removed

- `sandstone/ProgressBar` properties `min` and `max`

### Fixed

- `sandstone/IncrementSlider` so that the knob is spottable via pointer, and 5-way navigation between the knob and the increment/decrement buttons is functional
- `sandstone/Slider` and `sandstone/IncrementSlider` to not fire `onChange` for value changes from props

## [1.0.0-beta.1] - 2016-12-30

### Added

- `sandstone/VideoPlayer` and `sandstone/TooltipDecorator` components and samples
- `sandstone/Panels.Panels` property `onBack` to support `ui/Cancelable`
- `sandstone/VirtualFlexList` Work-In-Progress component to support variably sized rows or columns
- `sandstone/ExpandableItem` properties `autoClose` and `lockBottom`
- `sandstone/ExpandableList` properties `noAutoClose` and `noLockBottom`
- `sandstone/Picker` property `reverse`
- `sandstone/ContextualPopup` property `noAutoDismiss`
- `sandstone/Dialog` property `scrimType`
- `sandstone/Popup` property `spotlightRestrict`

### Changed

- `sandstone/Panels.Routable` to require a `navigate` configuration property indicating the event callback for back or cancel actions
- `sandstone/MarqueeController` focus/blur handling to start and stop synchronized `sandstone/Marquee` components
- `sandstone/ExpandableList` property `autoClose` to `closeOnSelect` to disambiguate it from the added `autoClose` on 5-way up
- `sandstone/ContextualPopupDecorator.ContextualPopupDecorator` component's `onCloseButtonClick` property to `onClose`
- `sandstone/Dialog` component's `onCloseButtonClicked` property to `onClose`
- `sandstone/Spinner` component's `center` and `middle` properties to a single `centered` property
	that applies both horizontal and vertical centering
- `sandstone/Popup.PopupBase` component's `onCloseButtonClicked` property to `onCloseButtonClick`
- `sandstone/Item.ItemOverlay` component's `autoHide` property to remove the `'no'` option. The same
	effect can be achieved by omitting the property or passing `null`.
- `sandstone/VirtualGridList` to be scrolled by page when navigating with a 5-way direction key
- `sandstone/Scroller`, `sandstone/VirtualList`, `sandstone/VirtualGridList` to no longer respond to mouse down/move/up events
- all Expandables to include a state arrow UI element
- `sandstone/LabeledItem` to support a `titleIcon` property which positions just after the title text
- `sandstone/Button` to include `sandstone/TooltipDecorator`
- `sandstone/Expandable` to support being managed, radio group-style, by a component wrapped with `RadioControllerDecorator` from `ui/RadioDecorator`
- `sandstone/Picker` to animate `sandstone/Marquee` children when any part of the `sandstone/Picker` is focused
- `sandstone/VirtualList` to mute its container instead of disabling it during scroll events
- `sandstone/VirtualList`, `sandstone/VirtualGridList`, and `sandstone/Scroller` to continue scrolling when holding down the paging controls
- `sandstone/VirtualList` to require a `component` prop and not have a default value
- `sandstone/Picker` to continuously change when a button is held down by adding `ui/Holdable`.

### Fixed

- `sandstone/Popup` and `sandstone/ContextualPopup` 5-way navigation behavior using spotlight.
- Bug where a synchronized marquee whose content fit the available space would prevent restarting of the marquees
- `sandstone/Input` to show an ellipsis on the correct side based on the text directionality of the `value` or `placeholder` content.
- `sandstone/VirtualList` and `sandstone/VirtualGridList` to prevent unwanted scrolling when focused with the pointer
- `sandstone/Picker` to remove fingernail when a the pointer is held down, but the pointer is moved off the `joined` picker.
- `sandstone/LabeledItem` to include marquee on both `title` and `label`, and be synchronized

## [1.0.0-alpha.5] - 2016-12-16

No changes.

## [1.0.0-alpha.4] - 2016-12-2

### Added

- `sandstone/Popup`, `sandstone/ContextualPopupDecorator`, `sandstone/Notification`, `sandstone/Dialog` and `sandstone/ExpandableInput` components
- `ItemOverlay` component to `sandstone/Item` module
- `marqueeCentered` prop to `sandstone/MarqueeDecorator` and `sandstone/MarqueeText`
- `placeholder` prop to `sandstone/Image`
- `sandstone/MarqueeController` component to synchronize multiple `sandstone/Marquee` components
- Non-latin locale support to all existing Sandstone components
- Language-specific font support
- `sandstone/IncrementSlider` now accepts customizable increment and decrement icons, as well as `sandstone/Slider` being more responsive to external styling

### Changed

- `sandstone/Input` component's `iconStart` and `iconEnd` properties to be `iconBefore` and `iconAfter`, respectively, for consistency with `sandstone/Item.ItemOverlay` naming
- `sandstone/Icon` and `sandstone/IconButton` so the `children` property supports both font-based icons and images
- the `checked` property to `selected` for consistency across the whole framework. This allows better interoperability when switching between various components.  Affects the following: `CheckboxItem`, `RadioItem`, `SelectableItem`, `Switch`, `SwitchItem`, and `ToggleItem`. Additionally, these now use `sandstone/Item.ItemOverlay` to position and handle their Icons.
- `sandstone/Slider` and `sandstone/IncrementSlider` to be more performant. No changes were made to
	the public API.
- `sandstone/GridListImageItem` so that a placeholder image displays while loading the image, and the caption and subcaption support marqueeing
- `sandstone/ThemeDecorator` to add `FloatingLayerDecorator`
- `sandstone/IncrementSlider` in vertical mode looks and works as expected.

### Removed

- LESS mixins that belong in `@enact/ui`, so that only sandstone-specific mixins are contained in
this module. When authoring components and importing mixins, only the local mixins need to be
imported, as they already import the general mixins.
- the `src` property from `sandstone/Icon` and `sandstone/IconButton`. Use the support for URLs in
	the `children` property as noted above.
- the `height` property from `sandstone/IncrementSlider` and `sandstone/Slider`

### Fixed

- Joined picker so that it now has correct animation when using the mouse wheel
- Bug in DatePicker/TimePicker that prevented setting of value earlier than 1969

## [1.0.0-alpha.3] - 2016-11-8

### Added

- `sandstone/BodyText`, `sandstone/DatePicker`, `sandstone/DayPicker`, `sandstone/ExpandableItem`, `sandstone/Image`, and `sandstone/TimePicker` components
- `fullBleed` prop to `sandstone/Panels/Header`. When `true`, the header content is indented and the header lines are removed.
- Application close button to `sandstone/Panels`. Fires `onApplicationClose` when clicked. Can be omitted with the `noCloseButton` prop.
- `marqueeDisabled` prop to `sandstone/Picker`
- `padded` prop to `sandstone/RangePicker`
- `forceDirection` prop to `sandstone/Marquee`. Forces the direction of `sandstone/Marquee`. Useful for when `RTL` content cannot be auto detected.

### Changed

- `data` parameter passed to `component` prop of `VirtualList`.
- `sandstone/Expandable` into a submodule of `sandstone/ExpandableItem`
- `ExpandableList` to properly support selection
- `sandstone/Divider`'s `children` property to be optional
- `sandstone/ToggleItem`'s `inline` version to have a `max-width` of `240px`
- `sandstone/Input` to use `<div>` instead of `<label>` for wrapping components. No change to
	functionality, only markup.

### Removed

- `sandstone/ExpandableCheckboxItemGroup` in favor of `ExpandableList`

## [1.0.0-alpha.2] - 2016-10-21

This version includes a lot of refactoring from the previous release. Developers need to switch to the new enact-dev command-line tool.

### Added

- New components and HOCs: `sandstone/Scroller`, `sandstone/VirtualList`, `sandstone/VirtualGridList`, `sandstone/MarqueeText`, `sandstone/Spinner`, `sandstone/ExpandableCheckboxItemGroup`, `sandstone/MarqueeDecorator`
- New options for `ui/Toggleable` HOC
- Marquee support to many components
- Image support to `sandstone/Icon` and `sandstone/IconButton`
- `dismissOnEnter` prop for `sandstone/Input`
- Many more unit tests

### Changed

- Some props for UI state were renamed to have `default` prefix where state was managed by the component. (e.g. `defaultOpen`)

### Fixed

- Many components were fixed, polished, updated and documented
- Inline docs updated to be more consistent and comprehensive
