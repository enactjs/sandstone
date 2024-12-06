/**
 * A component for selecting values from a list of values.
 *
 * @example
 * <Picker>
 * 	{['A', 'B', 'C']}
 * </Picker>
 *
 * @module sandstone/Picker
 * @exports Picker
 * @exports PickerBase
 */

import classnames from 'classnames';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import {Children} from 'react';

import Heading from '../Heading';
import PickerCore, {PickerItem} from '../internal/Picker';
import {validateRange} from '../internal/validators';
import {MarqueeController} from '../Marquee';

import componentCss from './Picker.module.less';

/**
 * The base `Picker` component.
 *
 * This version is not {@link spotlight/Spottable.Spottable|spottable}.
 *
 * @class PickerBase
 * @memberof sandstone/Picker
 * @ui
 * @public
 */
const PickerBase = kind({
	name: 'Picker',

	propTypes: /** @lends sandstone/Picker.PickerBase.prototype */ {
		/**
		 * Picker value list.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * The `aria-valuetext` for the picker.
		 *
		 * By default, `aria-valuetext` is set to the current selected child text.
		 *
		 * @type {String}
		 * @memberof sandstone/Picker.PickerBase.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.string,

		/**
		 * Determines which key to adjust the picker's value for the joined horizontal one.
		 *
		 *  * `'enter'` allows the user to use the enter key to adjust the picker's value
		 *  * `'arrow'` allows the user to use the left or right keys to adjust the picker's value.
		 *
		 * The default value for joined horizontal picker is `'enter'`.
		 * If {@link sandstone/Picker.PickerBase.orientation|orientation} is `'vertical'` or
		 * {@link sandstone/Picker.PickerBase.joined|joined} is undefined or is `false`, this prop is ignored.
		 *
		 * @type {('enter'|'arrow')}
		 * @public
		 */
		changedBy: PropTypes.oneOf(['enter', 'arrow']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `title` - The title component class
		 * * `inlineTitle` - The title component class when `inlineTitle` is true
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The voice control labels for the `children`.
		 *
		 * By default, `data-webos-voice-labels-ext` is generated from `children`. However, if
		 * `children` is not an array of numbers or strings, `data-webos-voice-labels-ext` should be
		 * set to an array of labels.
		 *
		 * @type {Number[]|String[]}
		 * @memberof sandstone/Picker.PickerBase.prototype
		 * @public
		 */
		'data-webos-voice-labels-ext': PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.arrayOf(PropTypes.string)]),

		/**
		 * A custom icon for the decrementer.
		 *
		 * All strings supported by {@link sandstone/Icon.Icon|Icon} are supported. Without a
		 * custom icon, the default is used, and is automatically changed when the
		 * {@link sandstone/Picker.PickerBase.orientation|orientation} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		decrementIcon: PropTypes.string,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * A custom icon for the incrementer.
		 *
		 * All strings supported by {@link sandstone/Icon.Icon|Icon} are supported. Without a
		 * custom icon, the default is used, and is automatically changed when the
		 * {@link sandstone/Picker.PickerBase.orientation|orientation} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		incrementIcon: PropTypes.string,

		/**
		 * Applies inline styling to the title.
		 *
		 * @type {Boolean}
		 * @public
		 */
		inlineTitle: PropTypes.bool,

		/**
		 * Allows the user to use the arrow keys or enter key to adjust the picker's value.
		 *
		 * Key presses are captured in the directions of the increment and decrement buttons but
		 * others are unaffected. A non-joined Picker allows navigation in any direction, but
		 * requires individual ENTER presses on the incrementer and decrementer buttons. Pointer
		 * interaction is the same for both formats.
		 *
		 * @type {Boolean}
		 * @public
		 */
		joined: PropTypes.bool,

		/**
		 * Disables marqueeing of items.
		 *
		 * By default, each picker item is wrapped by a
		 * {@link sandstone/Marquee.Marquee|Marquee}. When this is set, the items will
		 * not be wrapped.
		 *
		 * @type {Boolean}
		 * @public
		 */
		marqueeDisabled: PropTypes.bool,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the `value` changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Orientation of the picker.
		 *
		 * Controls whether the buttons are arranged horizontally or vertically around the value.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * When `true`, the picker buttons operate in the reverse direction such that pressing
		 * up/left decrements the value and down/right increments the value. This is more natural
		 * for vertical lists of text options where "up" implies a spatial change rather than
		 * incrementing the value.
		 *
		 * If this prop is omitted, it will be determined by `orientation`.
		 * For example, if `orientation` is `vertical`, `reverse` is `true`.
		 * Conversely, if `orientation` is `horizontal`, `reverse` is `false`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		reverse: PropTypes.bool,

		/**
		 * The primary text of the `Picker`.
		 *
		 * The screen readers read out the title text when the `joined` prop is false
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * The type of picker. It determines the aria-label for the next and previous buttons.
		 *
		 * Depending on the `type`, `joined`, `decrementAriaLabel`, and `incrementAriaLabel`,
		 * the screen readers read out differently when Spotlight is on the next button, the previous button,
		 * or the picker itself.
		 *
		 * For example, if Spotlight is on the next button, the `joined` prop is false,
		 * and aria label props(`decrementAriaLabel` and `incrementAriaLabel`) are not defined,
		 * then the screen readers read out as follows.
		 *	`'string'` type: `'next item'`
		 * 	`'number'` type: `'press ok button to increase the value'`
		 *
		 * @type {('number'|'string')}
		 * @default 'string'
		 * @public
		 */
		type: PropTypes.oneOf(['number', 'string']),

		/**
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number,

		/**
		 * The width of the picker.
		 *
		 * A number can be used to set the minimum number of characters to be shown. Setting a
		 * number to less than the number of characters in the longest value will cause the width to
		 * grow for the longer values.
		 *
		 * A string can be used to select from pre-defined widths:
		 * * `'small'` - numeric values
		 * * `'medium'` - single or short words
		 * * `'large'` - maximum-sized pickers taking full width of its parent
		 *
		 * By default, the picker will size according to the longest valid value.
		 *
		 * @type {('small'|'medium'|'large'|Number)}
		 * @public
		 */
		width: PropTypes.oneOfType([
			PropTypes.oneOf([null, 'small', 'medium', 'large']),
			PropTypes.number
		]),

		/**
		 * Allows picker to continue from the start of the list after it reaches the end and
		 * vice versa.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	},

	defaultProps: {
		type: 'string',
		value: 0
	},

	styles: {
		css: componentCss,
		publicClassNames: ['inlineTitle', 'title']
	},

	computed: {
		max: ({children}) => children && children.length ? children.length - 1 : 0,
		reverse: ({orientation, reverse}) => (typeof reverse === 'boolean' ? reverse : orientation === 'vertical'),
		children: ({children, disabled, joined, marqueeDisabled}) => Children.map(children, (child) => {
			const focusOrHover = !disabled && joined ? 'focus' : 'hover';
			return (
				<PickerItem
					marqueeDisabled={marqueeDisabled}
					marqueeOn={focusOrHover}
				>
					{child}
				</PickerItem>
			);
		}),
		disabled: ({children, disabled}) => Children.count(children) > 1 ? disabled : true,
		value: ({value, children}) => {
			const max = children && children.length ? children.length - 1 : 0;
			if (__DEV__) {
				validateRange(value, 0, max, 'Picker', 'value', 'min', 'max index');
			}
			return clamp(0, max, value);
		},
		voiceLabel: ({children, 'data-webos-voice-labels-ext': voiceLabelsExt}) => {
			let voiceLabel;
			if (voiceLabelsExt) {
				voiceLabel = voiceLabelsExt;
			} else {
				voiceLabel = Children.map(children, (child) => (
					(typeof child === 'number' || typeof child === 'string') ? child : '')
				);
			}
			return JSON.stringify(voiceLabel);
		}
	},

	render: ({children, css, inlineTitle, max, title, value, voiceLabel, ...rest}) => {
		delete rest.marqueeDisabled;
		return (
			<>
				{title ? <Heading className={classnames(css.title, {[css.inlineTitle]: inlineTitle})} marqueeOn="hover" size="tiny">{title}</Heading> : null}
				<PickerCore {...rest} data-webos-voice-labels-ext={voiceLabel} min={0} max={max} index={value} step={1} title={title} value={value}>
					{children}
				</PickerCore>
			</>
		);
	}
});

/**
 * A Picker component that allows selecting values from a list of values.
 *
 * By default, `Picker` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the component,
 * supply a value to `value` at creation time and update it in response to `onChange` events.
 *
 * @class Picker
 * @memberof sandstone/Picker
 * @extends sandstone/Picker.PickerBase
 * @mixes ui/Changeable.Changeable
 * @mixes sandstone/Marquee.MarqueeController
 * @ui
 * @public
 */
const Picker = Pure(
	Changeable(
		MarqueeController(
			{marqueeOnFocus: true},
			PickerBase
		)
	)
);

/**
 * Default index of the selected child.
 *
 * *Note*: Changing `defaultValue` after initial render has no effect.
 *
 * @name defaultValue
 * @memberof sandstone/Picker.Picker.prototype
 * @type {Number}
 * @public
 */

export default Picker;
export {Picker, PickerBase};
