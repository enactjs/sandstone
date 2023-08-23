# Change Log

The following is a curated list of changes in the Enact sandstone module, newest changes on the top.

## [2.7.7] - 2023-08-22

### Added

- `sandstone/QuickGuidePanels` read out feature to support A11y

### Fixed

- `sandstone/Scroller` to support hiding all items when `editable` is given
- `sandstone/Scroller` to not lose focus by back key when `editable` is given

## [2.7.6] - 2023-08-10

### Changed

- `sandstone/TabLayout` enter key behavior to match the latest UX

### Fixed

- `sandstone/Dropdown' to focus properly the first option and the last option via page up and page down
- `sandstone/QuickGuidePanels` to not lose focus when the last view is displayed

## [2.7.5] - 2023-08-04

### Added

- `sandstone/Scroller` prop `editable.initialSelected` to allow start edit mode with selected item

### Changed

- `sandstone/Scroller` back key behavior to match the latest UX when `editable` is given

### Fixed

- `sandstone/Scroller` to handle focus moving properly when `editable` is given
- `sandstone/Scroller` to not select disabled item in scroller when `editable` is given
- `sandstone/VirtualList` to move focus properly by 5-way directional key hold when `spotlight/SpotlightContainerDecorator` config option `continue5WayHold` is set

## [2.7.4] - 2023-07-19

### Fixed

- `sandstone/VirtualList.VirtualGridList` to not scale DOM out of a list by wheeling when `snapToCenter`

## [2.7.3] - 2023-07-14

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to scroll properly by hovering inside a nested scroller

## [2.7.2] - 2023-06-30

### Added

- `sandstone/Icon` supported icon list, adding new icons `exclamation`, `show`, and `hide`
- `sandstone/Scroller` to support showing buttons when an item is focused and `editable` is given
- `sandstone/QuickGuidePanels` prop `onClose`

### Fixed

- `sandstone/QuickGuidePanels` to update a close button position properly in RTL locales
- `sandstone/Scroller` to focus properly when item is selected and `editable` is given
- `sandstone/VirtualList` to not lose focus when a focused item is removed by reduced `dataSize`

## [2.5.11] - 2023-06-07

### Fixed

- `sandstone/VideoPlayer` to keep showing media controls while a user is wheeling

## [2.7.1] - 2023-06-02

### Added

- `sandstone/Scroller` to support hiding items when `editable` is given
- `sandstone/QuickGuidePanels` component

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to stop scrolling by `hoverToScroll` when the pointer disappears
- `sandstone/VideoPlayer` to focus the play/pause button when the playback controls is shown using the 5-way down key
- `sandstone/VideoPlayer` to keep showing media controls while a user is wheeling
- `sandstone/WizardPanels` to read out the correct step when using `current` prop

## [2.7.0] - 2023-04-25

### Added

- `sandstone/IconItem` component

### Changed

- `sandstone/Alert` alignment of text content to be left for fullscreen type

### Fixed

- `sandstone/Picker` to include `type` in the event payload for `onChange`
- `sandstone/Scroller` and `sandstone/VirtualList` to handle focus properly via page up at the first page and page down at the last page
- `sandstone/WizardPanels` to restore focus properly after a transition

## [2.5.10] - 2023-04-13

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to handle focus properly via page up at the first page and page down at the last page

## [2.6.3] - 2023-03-17

### Added

- `sandstone/Button` and `sandstone/Panels.Header` prop `shadowed` to add shadow to text and buttons
- `sandstone/Icon` supported icon list, adding a new icon `wowcast`

## [2.5.9] - 2023-03-16

### Added

- `sandstone/Button` and `sandstone/Panels.Header` prop `shadowed` to add shadow to text and buttons
- `sandstone/Icon` supported icon list, adding a new icon `wowcast`

## [2.6.2] - 2023-03-09

### Added

- `sandstone/Button` prop `roundBorder`, to make both sides of button fully rounded

### Fixed

- `sandstone/DayPicker` to handle number typed `selected` prop properly in es-ES locale

## [2.6.1] - 2023-02-03

### Deprecated

- `sandstone/Input.InputPopupBase` prop `value`, to be removed in 3.0.0. Use `defaultValue` instead.

### Added

- `sandstone/ActionGuide` prop `buttonAriaLabel` and `sandstone/MediaControls` prop `actionGuideButtonAriaLabel` to override aria-label of `ActionGuide` button
- `sandstone/Icon` supported icon list, adding new icons `keymouse`, `keymousedis`, `camera`, `cameradis`, `gamepad`, and `gamepaddis`
- `sandstone/Input.InputPopupBase` prop `defaultValue` to provide the initial value

### Changed

- `sandstone/ActionGuide` to replace `Icon` with `Button`
- `sandstone/VideoPlayer` to not expand video player using key down via 5way
- `sandstone/Scroller` and `sandstone/VirtualList` scroll speed and hover area when `hoverToScroll` is `true` to match GUI

### Fixed

- `sandstone/Input` to read out properly after closing it in a `sandstone/PopupTabLayout`
- `sandstone/MediaPlayer.MediaControls` to disable buttons when hidden
- `sandstone/MediaPlayer.MediaControls` to show round buttons correctly in high-contrast mode
- `sandstone/TabLayout` to not cropped and apply orientation properly when `orientation` prop is vertical

## [2.5.8] - 2023-01-31

### Fixed

- `sandstone/MediaPlayer.MediaControls` to show round buttons correctly in high-contrast mode

## [2.5.7] - 2023-01-03

### Changed

- `sandstone/Scroller` and `sandstone/VirtualList` scroll speed and hover area when `hoverToScroll` is `true` to match GUI

### Fixed

- `sandstone/MediaPlayer.MediaControls` to disable buttons when hidden
- `sandstone/Scroller` to not stop scrolling by hover unexpectedly when `hoverToScroll` is `true`

## [2.0.13] - 2022-12-23

### Fixed

- `sandstone/MediaPlayer.MediaControls` to disable buttons when hidden

## [2.5.6] - 2022-12-13

### Added

- `sandstone/ActionGuide` prop `buttonAriaLabel` and `sandstone/MediaControls` prop `actionGuideButtonAriaLabel` to override aria-label of `ActionGuide` button
- `sandstone/Icon` supported icon list, adding new icons `keymouse`, `keymousedis`, `camera`, `cameradis`, `gamepad`, and `gamepaddis`

### Changed

- `sandstone/ActionGuide` to replace `Icon` with `Button`
- `sandstone/VideoPlayer` to not expand video player using key down via 5way

## [2.0.12] - 2022-12-13

### Added

- `sandstone/ActionGuide` prop `buttonAriaLabel` and `sandstone/MediaControls` prop `actionGuideButtonAriaLabel` to override aria-label of `ActionGuide` button

### Changed

- `sandstone/ActionGuide` to replace `Icon` with `Button`
- `sandstone/VideoPlayer` to not expand video player using key down via 5way

## [2.6.0] - 2022-12-05

### Removed

- `@sand-inputfield-focus-text-color-rgb`, `@sand-picker-joined-fingernail-border-color`, `@sand-progress-buffer-color`, and `--sand-progress-buffer-color` as they are not used anymore

### Added

- `sandstone/FormCheckboxItem` CSS variable `--sand-formcheckboxitem-focus-text-color` for a customization of the focused text color

### Changed

- `--sand-checkbox-disabled-selected-color` to `--sand-checkbox-disabled-selected-text-color`
- `@sand-alert-overlay-checkbox-disabled-selected-color` to `@sand-alert-overlay-checkbox-disabled-selected-text-color`

### Fixed

- `sandstone/ImageItem` to have proper size when imported with `sandstone/Dropdown` or `sandstone/VirtualList` in the same file

## [2.0.11] - 2022-10-13

### Fixed

- `sandstone/MediaPlayer.MediaControls` to focus properly when pressing up key from buttons after holding left or right keys
- `sandstone/Scroller` and `sandstone/VirtualList` to scroll properly by hover when scrollbar is hidden or `dataSize` is changed
- `sandstone/Scroller` and `sandstone/VirtualList` to scroll properly by hover when `hoverToScroll` is `true` and `scrollMode` is `translate`

## [2.5.5] - 2022-10-07

### Fixed

- `sandstone/MediaPlayer.MediaControls` to focus properly when pressing up key from buttons after holding left or right keys
- `sandstone/Scroller` and `sandstone/VirtualList` to scroll properly by hover when scrollbar is hidden or `dataSize` is changed

## [2.5.4] - 2022-09-23

### Fixed

- `sandstone/Scroller` to not show the focus effect of the body in pointer mode when `focusableScrollbar` prop is `byEnter`
- `sandstone/Slider` tooltip arrow to show properly
- `sandstone/Input` text color for number type cell when disabled to match GUI

## [2.5.3] - 2022-08-30

### Added

- `sandstone/Icon` supported icon list, adding a new icon `musicsrc`

### Fixed

- `sandstone/VideoPlayer` to not seek infinitely when pointer moves while holding left or right key

## [2.0.10] - 2022-08-30

### Added

- `sandstone/Icon` supported icon list, adding a new icon `r2rappcall`
- `sandstone/Icon` supported icon list, adding a new icon `musicsrc`

### Changed

- `sandstone/TabLayout` to eliminate the horizontal maximum number of tabs

### Fixed

- `sandstone/VideoPlayer` to not seek infinitely when pointer moves while holding left or right key

## [2.5.2] - 2022-08-17

No significant changes.

## [2.5.1] - 2022-08-03

### Added

- `sandstone/Icon` supported icon list, adding a new icon `r2rappcall`

### Fixed

- `sandstone/FixedPopupPanels` and `sandstone/PopupTabLayout` to restore scroll position when going back to the previous panel by left key
- `sandstone/Panels.Panel` to restore focus properly when it has `sandstone/Scroller` with `focusableScrollbar`

## [2.5.0] - 2022-07-19

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to scroll properly by hover when `hoverToScroll` is `true` and `scrollMode` is `translate`

## [2.5.0-rc.2] - 2022-07-06

### Fixed

- `sandstone/Alert` to show `sandstone/ProgressBar` color properly
- `sandstone/FixedPopupPanels`, `sandstone/PopupTabLayout`, and `sandstone/TabLayout` to move caret in InputField with left and right keys
- `sandstone/WizardPanels` to provide `stopPropagation` method in `onBack` event payload

## [2.5.0-rc.1] - 2022-06-23

### Added

- `sandstone/Scroller` read out feature to support A11y when `editable` is given

### Changed

- `sandstone/Scroller` scrollbar thumb to read out "press ok button to read text" additionally when `focusableScrollbar` prop is `byEnter`
- `sandstone/Scroller` scrollbar thumb to read out 'leftmost', 'rightmost', 'topmost', or 'downmost' when reaching the end of the scroll
- `sandstone/Scroller` to select item by long press when `editable` is given
- `sandstone/Picker` and `sandstone/RangePicker` to read out `title`

### Fixed

- `sandstone/Scroller` to position the focused item into scroller view

## [2.5.0-beta.1] - 2022-05-31

### Added

- `sandstone/Panels.Header` and `sandstone/WizardPanels` prop `noSubtitle` to hide subtitle area
- `sandstone/Popup`, `sandstone/PopupTabLayout`, `sandstone/FixedPopupPanels`, and `sandstone/FlexiblePopupPanels` to add `detail` property containing `inputType` in `onClose` event payload

### Changed

- `sandstone/TabLayout` to eliminate the horizontal maximum number of tabs
- `sandstone/Input` background color for number type cell, `sandstone/Picker` indicator color when joined, and `sandstone/ProgressBar` highlight color are updated for better visibility of `light` skin

### Fixed

- `sandstone/ContextualPopupDecorator` to update the position of `ContextualPopup` properly when repositioned in open
- `sandstone/FixedPopupPanels.Panel` body to be filled vertically to place the last children as intended
- `sandstone/Scroller` to focus scroll thumb initially when it is used in Panels
- `sandstone/Scroller` thresholds for swapping items by pointer when `editable` is given
- `sandstone/Scroller` to support RTL locales when `editable` is given
- `sandstone/Scroller` to scroll properly by wheel when `editable` is given
- `sandstone/TimePicker` to forward `onComplete` event in RTL countries that do not display meridiem

## [2.0.9] - 2022-05-19

### Fixed

- `sandstone/TimePicker` to forward `onComplete` event in RTL countries that do not display meridiem

## [2.5.0-alpha.2] - 2022-05-09

### Added

- `sandstone/Alert` and `sandstone/Input` support for portrait mode
- `sandstone/Icon` supported icon list, adding a new icon `wallpaper`
- `sandstone/Scroller` prop `editable` to enable editing items in the scroller

### Changed

- `sandstone/Panels.Header` and `sandstone/RadioItem` to use `onClick` instead of `onTap` for touch support

## [2.0.8] - 2022-04-25

### Added

- `sandstone/Alert` and `sandstone/Input` support for portrait mode
- `sandstone/Icon` supported icon list, adding a new icon `wallpaper`
- `sandstone/VideoPlayer` props `backButtonAriaLabel` and `onBack` to provide a way to exit video player via touch

### Changed

- `sandstone/Panels.Header` and `sandstone/RadioItem` to use `onClick` instead of `onTap` for touch support
- `sandstone/DatePicker` and `sandstone/TimePicker` to not show press effect via touch input
- `sandstone/Scroller` and `sandstone/VirtualList` to show overscroll effect when flicking

### Fixed

- `sandstone/Picker` horizontal joined behavior going to the next item by touch

## [2.5.0-alpha.1] - 2022-04-15

- Update dependencies including React 18.0.0

### Changed

- `sandstone/DatePicker` and `sandstone/TimePicker` to not show press effect on touch input
- `sandstone/ProgressBar` radial colors and `sandstone/Scroller` colors to match with `sandstone/ProgressBar`

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to focus the topmost element after scroll in pointer mode

## [2.1.4] - 2022-03-24

### Added

- `sandstone/Icon` public class name `icon`
- `sandstone/Scroller` and `sandstone/VirtualList` prop `data-webos-voice-focused`, `data-webos-voice-disabled`, and `data-webos-voice-group-label`

### Fixed

- `sandstone/WizardPanels` to provide a way to prevent focusing on Panel again by allowing preventDefault when `onTransition` and `onWillTransition`

## [2.0.7] - 2022-03-24

### Fixed

- `sandstone/WizardPanels` to provide a way to prevent focusing on Panel again by allowing preventDefault when `onTransition` and `onWillTransition`

## [2.1.3] - 2022-03-07

- Updated to use `forwardCustom` and add `type` when forwarding custom events

### Added

- `sandstone/Picker` and `sandstone/RangePicker` prop `changedBy` to provide a way to control with left and right keys in horizontal joined Picker
- `sandstone/VideoPlayer` prop `backButtonAriaLabel`
- `sandstone/VideoPlayer` prop `onBack` to provide a way to exit video player via touch

### Changed

- `sandstone/Scroller` and `sandstone/VirtualList` to show overscroll effect when flicking

### Fixed

- `sandstone/Alert` layout for overlay type when screen width is narrow
- `sandstone/BodyText` font-size for size `small` and RTL locale
- `sandstone/Input.InputField` size 'small' line-height to center text vertically
- `sandstone/Input` to show title and keypad properly when `type` is `number` and screen width is narrow
- `sandstone/Picker` horizontal joined behavior going to the next item by touch
- `sandstone/Scroller` to scroll correctly on Android Chrome 85 or higher in RTL locales
- `sandstone/VirtualList` to scroll properly by hover after changing `dataSize` when `hoverToScroll` is `true`

## [2.0.6] - 2022-02-10

### Fixed

- `sandstone/VirtualList` to scroll properly by hover after changing `dataSize` when `hoverToScroll` is `true`

## [2.1.2] - 2021-12-22

- Fixed samples build issue

## [2.1.1] - 2021-12-22

### Added

- `sandstone/VideoPlayer` props `onWillFastForward`, `onWillJumpBackward`, `onWillJumpForward`, `onWillPause`, `onWillPlay`, and `onWillRewind`

### Fixed

- `sandstone/Button` to have centered icon on RTL locale
- `sandstone/VideoPlayer` to handle media related callbacks properly
- `sandstone/FormCheckboxItem` to show correct color for the focused disabled checkbox

## [2.0.5] - 2021-12-15

### Fixed

- `sandstone/Scroller` and `sandstone/VirtualList` to focus the topmost element after scroll by voice control in pointer mode

## [2.1.0] - 2021-11-30

- Support color customization

## [2.0.4] - 2021-11-01

### Added

- `sandstone/Icon` supported icon list, adding new icons `bluetooth`, `moodmode`, and `changepassword`

### Fixed

- `sandstone` to select correct font when font-weight changes in some Indian locales

## [2.0.3] - 2021-10-21

### Fixed

- `sandstone` to support India region font correctly
- `sandstone/TimePicker` to apply disabled color to the separator

## [2.0.2] - 2021-10-07

### Added

- `sandstone/Icon` supported icon list, adding a new icon `spanner`

### Changed

- `sandstone/ProgressBar` bar color for `sandstone/Alert`

### Fixed

- `sandstone/VirtualList` to not move focus to an unexpected item when 5-way directional key hold

## [2.0.1] - 2021-09-28

### Fixed

- `samples/sampler` not to fail in sampler build

## [2.0.0] - 2021-09-28

### Fixed

- `sandstone/DatePicker` and `sandstone/TimePikcer`abnormal animation
- `sandstone/Panels` to perform transition without delay when wheeling

## [2.0.0-rc.9] - 2021-09-13

### Changed

- `sandstone/DatePicker` and `sandstone/TimePicker` styling to match updated GUI

### Fixed

- `sandstone/VirtualList` to not focus the item again if focus moved out of the list via 5way when `snapToCenter`

## [2.0.0-rc.8] - 2021-08-31

### Fixed

- `sandstone/Dropdown` to restore focus within the list when moving mouse after clicking dropdown button
- `sandstone/Scroller` to move focus via up/down keys from scroll thumb when the content is short but the scrollbar is visible
- `sandstone/TimePicker` abnormal minute animation in some locales
- `sandstone/WizardPanels` to not read out `undefined` when there is no `subtitle` prop

## [2.0.0-rc.7] - 2021-08-09

### Fixed

- `sandstone/Item` to marquee properly when `slotAfter` or `slotBefore` changed

## [2.0.0-rc.6] - 2021-08-03

### Added

- `sandstone/Input` type `tel` and `passwordtel`
- `sandstone/Slider` prop `noWheel` to disable wheel event handler

### Fixed

- `sandstone/ContextualPopupDecorator` to focus elements in `ContextualPopup` when `spotlightRestrict` is `self-first` via 5way
- `sandstone/WizardPanels` to prevent re-rendering of previous panel

## [2.0.0-rc.5] - 2021-07-22

### Added

- `sandstone/DatePicker` and `sandstone/TimePicker` prop `noLabel` to hide label
- `sandstone/ImageItem` public classname `imageIcon`
- `sandstone/Slider` prop `wheelInterval` to throttle the wheel input

### Fixed

- `sandstone/FixedPopupPanels` and `sandstone/PopupTabLayout` to not go back to the previous panel by left key on popup opened inside
- `sandstone/MediaPlayer` to work trick play via key
- `sandstone/Scroller` and `sandstone/VirtualList` to show scroll animation properly with 5-way directional keys
- `sandstone/Scroller` to not focus the body at the initial rendering when `focusableScrollbar` prop is `byEnter`

## [2.0.0-rc.4] - 2021-07-08

### Fixed

- `sandstone/WizardPanels` to revert 2.0.0-rc.3 fix that prevent re-rendering

## [2.0.0-rc.3] - 2021-07-02

### Added

- `sandstone/Input` prop `inputFieldSpotlightId` to set `spotlightId` of `InputField`
- `sandstone/Input` prop `noSubmitButton` to omit submit button of number key pad

### Changed

- `sandstone/Slider` to expand hover area

### Fixed

- `sandstone/Picker` value to not marquee when changing `title`
- `sandstone/Popup` to have proper focus when opening with `noAnimation` is `true`
- `sandstone/Scroller` and `sandstone/VirtualList` to scroll by hover when scrollbar is hidden
- `sandstone/Scroller` and `sandstone/VirtualList` to focus elements at scroll boundaries when `hoverToScroll` is `true`
- `sandstone/VideoPlayer` to handle decimal playback rate
- `sandstone/VirtualList` to scroll properly when `snapToCenter`
- `sandstone/WizardPanels` to prevent re-rendering of previous panel

## [2.0.0-rc.2] - 2021-07-01

### Fixed

- `sandstone/Popup` to revert 2.0.0-rc.1 fix that having proper focus when `noAnimation`

## [2.0.0-rc.1] - 2021-06-18

### Added

- `sandstone/Picker` props `reverse` and `type` to support for number list
- `sandstone/Picker` and `sandstone/RangePicker` public class names `title` and `inlineTitle`
- `sandstone/Scroller` and `sandstone/VirtualList` prop `hoverToScroll` to scroll by hover
- `sandstone/VirtualList` prop `snapToCenter`

### Changed

- Shadow effect to using box-shadow instead of drop-shadow for performance on embedded environment
- `sandstone/FixedPopupPanels` and `sandstone/PopupTabLayout` to disable left key handler to go to the previous panel in RTL locales
- `sandstone/MediaPlayer.MediaControls` to show more components when a user flicks on action guide
- `sandstone/Scroller` and `sandstone/VirtualList` overscroll effect style to match latest designs
- `sandstone/Slider` to interact by wheel

### Fixed

- `sandstone/FixedPopupPanels` to keep focus inside of popup when pressing 5-way after click
- `sandstone/InputField` cursor not to jump unexpectedly when mouse down
- `sandstone/MediaPlayer` to show `MediaControls` via wheel properly when isomorphic build
- `sandstone/Panels.Header` to not overlap subtitle and children when header type is `mini`
- `sandstone/Popup` to have proper focus when opening with `noAnimation` is `true`
- `sandstone/PopupTabLayout` to move focus via 5-way left in the header
- `sandstone/Scroller` to scroll correctly on Chrome 85 or higher in RTL locales via 5way

## [1.4.9] - 2021-05-26

### Added

- `sandstone/Input` type `tel` and `passwordtel`

## [2.0.0-beta.1] - 2021-05-21

- Enhanced touch support

### Added

- `sandstone/FixedPopupPanels` and `sandstone/PopupTabLayout` left key handler to go to the previous panel
- `sandstone/Input` a back button and props `backButtonAriaLabel` and `noBackButton`
- `sandstone/Input` and `sandstone/Input.InputPopup` `url` to prop `type`
- `sandstone/Picker` and `sandstone/RangePicker` props `title` and `inlineTitle`
- `sandstone/Slider` prop `keyFrequency` to control the accelerating speed when key hold

### Changed

- `sandstone/Panels.Header` to always show back button
- `sandstone/PopupTabLayout` back key behavior to match the latest UX
- `sandstone/PopupTabLayout` to collapse its tab only when a user enters a menu
- `sandstone/Scroller` focus rule to match latest UX when `focusableScrollbar` prop is `byEnter`
- `sandstone/Scroller` and `sandstone/VirtualList` to hide the scrollbar after N seconds
- `sandstone/WizardPanels.Panel` `nextButton` and `prevButton` to show labels separately to match latest designs

### Fixed

- `sandstone/FormCheckboxItem` to show correct color for `slotBefore` icon in disabled state when focused
- `sandstone/ImageItem` to resize the image properly
- `sandstone/Input` button label when default value is `0`
- `sandstone/Panels.Header` to remeasure marquee metrics when the size of slots changed
- `sandstone/Scroller` and `sandstone/VirtualList` to activate voice control intent when only scrollable
- `sandstone/Scroller` and `sandstone/VirtualList` to move focus properly via page key
- `sandstone/VideoPlayer` to show the knob when mediaSlider gets focused with 5-way
- horizontal `sandstone/VirtualList` to align items well when navigating with 5-way
- `sandstone/WizardPanels` to not show focus effect on the wrong element in `footer`

## [1.4.8] - 2021-05-06

### Fixed

- `sandstone/Panels.Header` to remeasure marquee metrics when the size of slots changed

## [2.0.0-alpha.3] - 2021-03-31

### Added

- `sandstone/Dropdown` number type `width` prop
- `sandstone/Item` public class names `itemContent`, `content`, and `label`
- `sandstone/Scroller` prop `scrollbarTrackCss` to customize scroll track and thumb style

### Fixed

- `sandstone/Dropdown` to not show console error after selecting item
- `sandstone/RangePicker` to update label when value is out of range
- `sandstone/VirtualList` to not block key down events after panel transition

## [2.0.0-alpha.2] - 2021-03-26

- Update Enact dependency

## [1.4.7] - 2021-03-03

### Added

- `sandstone/Item` public class names `itemContent`, `content`, and `label`
- `sandstone/Scroller` prop `scrollbarTrackCss` to customize scroll track and thumb style

## [2.0.0-alpha.1] - 2021-02-24

- The framework was updated to support React 17.0.1

### Added

- `sandstone/ThemeDecorator` config `rootId` to specify React DOM tree root for global event handlers

## [1.5.0] - 2021-02-09

### Added

- `sandstone/Item` prop `data-webos-voice-labels` when `label` is used

### Fixed

- `sandstone/Alert` to read out properly after closing it in a `sandstone/PopupTabLayout`
- `sandstone/FlexiblePopupPanels` padding in RTL locales
- `sandstone/Heading` `font-style` to use oblique font instead of fake `italic`
- `sandstone/Input` to not have initial focus with pointer when `type` prop is `'number'` or `'passwordnumber'`
- `sandstone/Panel` to not reset scroll position by events from others
- `sandstone/Panels.Header` to not show back button in the first panel
- `sandstone/VideoPlayer.Video` to not start a new play before another one completes

## [1.4.6] - 2021-01-29

### Fixed

- `sandstone/ContextualPopupDecorator` to update `ContextualPopup` position properly in RTL locales

## [1.4.5] - 2021-01-05

### Fixed

- `sandstone/Dropdown` title `font-style` to `normal` where a locale's fonts cannot support italic

## [1.4.4] - 2020-11-06

### Fixed

- `sandstone/ThemeDecorator` font style in non-latin locales
- `sandstone/TimePicker` to change its value with up/down key when the focus changed by enter key

## [1.4.3] - 2020-10-30

### Changed

- `sandstone/Scroller` and `sandstone/VirtualList` scrollbar to always show

### Fixed

- `sandstone/Heading` `font-style` to `normal` where a locale's fonts cannot support italic

## [1.4.2] - 2020-10-26

### Fixed

- Cambodian(km) language to be classified as a tall-glyph language
- `sandstone/Item` line-height to support tall-glyph language

## [1.4.1] - 2020-10-20

### Fixed

- `sandstone/WizardPanels` to read `steps` when neither prop `noSteps` nor `aria-label` is present

## [1.4.0] - 2020-10-16

### Added

- `sandstone/TabLayout.Tab` prop `onTabClick` to handle `onClick` event on it

### Fixed

- `sandstone/Input` to match latest designs
- `sandstone/TooltipDecorator` to marquee when `tooltipReleative` prop is true
- `sandstone/VirtualList` to not show overscroll effect when 5-way key is pressed after scrolling to the bottom by wheel
- `sandstone/WizardPanels` to read `steps` properly with `noSteps` and `aria-label` props

## [1.3.2] - 2020-09-25

### Changed

- `sandstone/WizardPanels` to read out the content of customized `nextButton` and `prevButton`

### Fixed

- `sandstone/FlexiblePopupPanels` and `sandstone/PopupTabLayout` to match latest designs
- `sandstone/Picker` to move focus on increase or decrease button properly via 5-way

## [1.3.1] - 2020-09-17

### Changed

- `sandstone/Alert` background color for fullscreen type
- `sandstone/Icon` supported icon list, adding a new icon
- `sandstone/Icon` and `sandstone/Switch` size to not enlarge when large text mode
- `sandstone/Scroller` focused body color when `focusableScrollbar` prop is `byEnter`

### Fixed

- `sandstone/TabLayout` to not handle key events from other popup components

## [1.3.0] - 2020-09-14

### Added

- `sandstone/DatePicker` and `sandstone/TimePicker` prop `onComplete` to handle enter key from the last picker

### Changed

- `sandstone/RangePicker` to read out properly when Spotlight is on the next or previous button
- `sandstone/TooltipDecorator` not to read out audio guidance when showing
- `sandstone/WizardPanels` footer to lower position

### Fixed

- `sandstone/DatePicker` and `sandstone/TimePicker` to focus the next picker with enter key
- `sandstone/DatePicker` and `sandstone/TimePicker` to show arrows when normal
- `sandstone/Scroller` to not restrict focus movement with 5-way directional keys when `focusableScrollbar` prop is `byEnter` and there is no scrollbar

## [1.2.1] - 2020-09-03

### Changed

- Primary background color to black

### Fixed

- `sandstone/WizardPanels` to revert 1.2.0 fix that render `Panel` contents within the usual render flow

## [1.2.0] - 2020-09-01

### Added

- `sandstone/FlexiblePopupPanels.Panel` `size` property to allow the selection between "auto" sized, "small", and "large" panel presets

### Changed

- `sandstone/Scroller` scrollbar thumb to prevent losing focus with 5-way directional keys when `focusableScrollbar` prop is `byEnter`
- `sandstone/Scroller` and `sandstone/VirtualList` scrollbar color and transparency

### Fixed

- `sandstone/FixedPopupPanels`, `sandstone/FlexiblePopupPanels` and `sandstone/PopupTabLayout` to match latest designs
- `sandstone/Input` number pad layout in right-to-left locales for both overlay and fullscreen `Input`
- `sandstone/PopupTabLayout` and `sandstone/TabLayout` to visibly change focus only once when focusing the tabs via 5-way
- `sandstone/TabLayout` to properly change focus when changing `index` programmatically
- `sandstone/Tooltip` arrow shape
- `sandstone/WizardPanels` to render `Panel` contents within the usual render flow allowing more predictable use of lifecycle methods

## [1.1.4] - 2020-08-24

### Fixed

- `sandstone/Dropdown` to match latest designs
- `sandstone/Input` number pad layout in right-to-left locales
- `sandstone/Item` style to match latest designs
- `sandstone/Panels.Header` style to match latest designs
- `sandstone/TabLayout` to not lose focus when changing `index` programmatically

## [1.1.3] - 2020-08-17

### Fixed

- `sandstone/Button` alignment for small icon-only buttons
- `sandstone/Panels` animation after reversing direction
- `sandstone/TooltipDecorator` to be positioned correctly over complex components
- `sandstone/WizardPanels` to favor other header components when using 5-way within the header
- `sandstone/WizardPanels` to focus a spottable component within the first `Panel` on mount
- `sandstone/WizardPanel` `noAnimation` autofocus
- Sinhala(si), Thai(th), Vietnamese(vi) languages to be classified as a tall-glyph language, with others like Arabic and Japanese to no longer be classified as tall-glyph. These languages will have new line-height settings, causing their layouts to shift slightly, which should ultimately be closer to the intended designs.

## [1.1.2] - 2020-08-10

### Fixed

- `sandstone/Button` style to match latest designs
- `sandstone/Panels` to allow key events after being unmounted
- `sandstone/Panels.Panel` to return to last focused element when reentering the `Panel`
- `sandstone/TabLayout` to correctly restore focus to the selected tab after expanding
- `sandstone/VideoPlayer.Video` to reuse video DOM node when changing `source`

## [1.1.1] - 2020-08-05

### Fixed

- `sandstone/Button`, `sandstone/InputField`, `sandstone/Item` and `sandstone/Picker` `font-weight`
- `sandstone/Button` background color opacity when opaque and disabled
- `sandstone/ContextualPopupDecorator` to include the popup in its accessibility tree
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` to correctly set focus after closing
- `sandstone/Panels` to prevent key events during view transitions
- `sandstone/Slider` to read out `value` with the hint string only once when focused

## [1.1.0] - 2020-07-29

### Added

- `sandstone/PopupTabLayout` and `sandstone/TabLayout` support for animated `Sprite` icons
- `sandstone/Scroller` prop `aria-label` to be read out instead of a body text
- `sandstone/Sprite` component for animating images
- `sandstone/TabLayout.Tab` prop `tabKey` to specify a unique key when the `title` and `icon` combination is not unique
- `sandstone/VideoPlayer` prop `onToggleMore` to notify consumers when more components are shown

### Fixed

- `sandstone/Checkbox` and `sandstone/Switch` to support `aria-disabled`
- `sandstone/DayPicker` to not read out current index and total numbers
- `sandstone/Dropdown` button margin with title
- `sandstone/Dropdown` to delegate voice props to the dropdown button
- `sandstone/FixedPopupPanels` and `sandstone/FlexiblePopupPanels` to avoid duplicate 5-way navigation when using `sandstone/Picker` or `sandstone/Input`
- `sandstone/FlexiblePopupPanels.Panel` to favor auto-focusing the content over the navigation buttons
- `sandstone/ImageItem` to support `aria-disabled`
- `sandstone/Input.InputField` to support `aria-disabled`
- `sandstone/Item` font-size for large text mode
- `sandstone/Item` to support RTL text
- `sandstone/MediaPlayer` to pause spotlight during animations
- `sandstone/Panels` animation direction for locales that use right-to-left reading order
- `sandstone/ProgressButton` icon size
- `sandstone/Scroller` and `sandstone/VirtualList` scrollbar thumb shape to not clipped
- `sandstone/Scroller` not to read out thumb audio guidance when focusing on the body
- `sandstone/TabGroup` to read out contents without button `role`
- `sandstone/TabLayout` to properly support scrolling the tabs
- `sandstone/VideoPlayer` to clear previously read string by calling announce with the `clear` property
- `sandstone/VideoPlayer` to read out action guide string after video title
- `sandstone/VirtualList` to not lose focus when entering from outside after scrolling via 5-way

## [1.0.1] - 2020-07-20

### Fixed

- `sandstone/ImageItem` to re-render properly when `data-index` prop is the same
- `sandstone/Scroller` to set its height correctly
- `sandstone/Scroller` and `sandstone/VirtualList` overscroll style to match latest designs
- `sandstone/Scroller` and `sandstone/VirtualList` to properly support `spotlightDisabled` prop
- `sandstone/VirtualList` to preserve focus in panels

## [1.0.0] - 2020-07-13

### Changed

- `sandstone/Icon` supported icon list, adding new icons

### Fixed

- `sandstone/ActionGuide` style to match latest designs
- `sandstone/Button` to animate when focused and pressed
- `sandstone/ContextualMenu` style to match latest designs
- `sandstone/DayPicker` to pass `disabled` to each child instead of applying to its container
- `sandstone/DropDown` title color
- `sandstone/FixedPopupPanels` and `sandstone/PopupTabLayout` to change `Panel` height when the contents change
- `sandstone/FixedPopupPanels`, `sandstone/Panels`, and `sandstone/PopupTabLayout` to avoid skipping panel animations when under system load
- `sandstone/FlexiblePopupPanels` navigation buttons to not be clipped when focused
- `sandstone/ImageItem` to center the label in vertical orientation when `centered` prop is true
- `sandstone/Input` text selection color
- `sandstone/Input` to close the popup with the enter key only when the VKB is activated
- `sandstone/Input` to properly read out number values
- `sandstone/MediaPlayer.MediaControls` animation when more components are rendered
- `sandstone/MediaPlayer.MediaSlider` style to match latest designs
- `sandstone/Panels.Header` spacing between title and subtitle
- `sandstone/Popup` to correctly emit the `onClose` event when focus attempts to leave the popup
- `sandstone/PopupTabLayout` padding so it's the same distance all the way around the tab buttons
- `sandstone/PopupTabLayout` and `sandstone/TabLayout` to not lose focus from tabs with 5-way
- `sandstone/Scroller` to not lose focus from scrollbar when re-rendered
- `sandstone/Slider` to readout `value` when the knob is focused
- `sandstone/VirtualList` to not clip the shadow of the last item when `wrap` prop is true or `scrollMode` is translate
- `sandstone/WizardPanels` style when using `noSteps`

## [1.0.0-rc.4] - 2020-07-09

### Fixed

- `sandstone/TabLayout` layout in RTL locales

## [1.0.0-rc.3] - 2020-07-07

### Fixed

- `sandstone/FixedPopupPanels` to use an opaque background in high-contrast mode
- `sandstone/MediaControls` margins to correctly align in RTL

## [1.0.0-rc.2] - 2020-07-07

### Removed

- `sandstone` support for `data-spotlight-container-muted`

### Added

- `sandstone/Input` event `onBeforeChange`

### Changed

- `sandstone/PopupTabLayout.TabPanels` prop `noCloseButton` to be `false` by default
- `sandstone/TooltipDecorator` prop `tooltipWidth` and `sandstone/TooltipDecorator.Tooltip` prop `width` to support either an auto-scaled number of pixels or a string CSS measurement value

### Fixed

- `sandstone/Button` style to match latest designs
- `sandstone/Button` style when using small, icon-only buttons in non-latin locales
- `sandstone/Dropdown` to read out `aria-label` without `title` when `aria-label` prop exists
- `sandstone/Dropdown` to reveal its title when scrolling up by 5-way in a scroller
- `sandstone/FixedPopupPanels` to use a translucent background
- `sandstone/FlexiblePopupPanels` to retain focus on navigation buttons when used to change panels
- `sandstone/ImageItem` to pass `role` and `aria-checked` when `showSelection` prop exists
- `sandstone/Input` to marquee the invalid tooltip
- `sandstone/Panels.Panel` to read out the title and subtitle except when used in `sandstone/WizardPanels`
- `sandstone/Picker` values position in RTL
- `sandstone/Popup` to respect paused spotlight
- `sandstone/PopupTabLayout` style to match latest designs
- `sandstone/Scroller` to stop the propagation of keydown events from a scroller thumb when it scrolls
- `sandstone/Scroller` vertical padding to prevent overlapping contained components
- `sandstone/Spinner` style to match latest designs
- `sandstone/TabLayout` to disable the collapsed list icon button when all tabs are disabled
- `sandstone/TabLayout` and `sandstone/PopupTabLayout` transition performance
- `sandstone/TimePicker` spacing between pickers in RTL
- `sandstone/WizardPanels` to read out properly

## [1.0.0-rc.1] - 2020-06-29

### Removed

- `sandstone` focus animation

### Added

- `sandstone` high-contrast support

### Changed

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
- `sandstone/VirtualList` focus when 5-way directional keys are quickly and consecutively pressed
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
- `sandstone/VideoPlayer` props `initialJumpDelay`, `jumpDelay`, and `no5WayJump` to prevent and adjust the speed of media jumping via 5-way
- `sandstone/VirtualList.VirtualGridList` prop `noAffordance` to remove the affordance effect when scrolling forward via 5-way

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

- `sandstone/VideoPlayer` to not hide playback controls when pressing 5-way up

### Fixed

- `sandstone/Input.InputField` to show icons when focused
- `sandstone/Scroller`, `sandstone/VirtualList.VirtualGridList`, and `sandstone/VirtualList` to position overscroll effect properly when a horizontal scrollbar is displayed
- `sandstone/Scroller` to show the focused item fully when scrolling with 5-way directional keys
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
