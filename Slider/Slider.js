/**
 * Provides Sandstone-themed slider components and behaviors.
 *
 * @example
 * <Slider
 *   defaultValue={-30}
 *   max={100}
 *   min={-100}
 *   step={10}
 *   tooltip
 * />
 *
 * @module sandstone/Slider
 * @exports Slider
 * @exports SliderBase
 * @exports SliderDecorator
 * @exports SliderTooltip
 */

import {forKey, forProp, forward, forwardWithPrevent, handle, not} from '@enact/core/handle';
import useHandlers from '@enact/core/useHandlers';
import {setDefaultProps} from '@enact/core/util';
import {usePublicClassNames} from '@enact/core/usePublicClassNames';
import Accelerator from '@enact/spotlight/Accelerator';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ComponentOverride from '@enact/ui/ComponentOverride';
import ProgressBar from '@enact/ui/ProgressBar';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import UiSlider from '@enact/ui/Slider';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import anyPass from 'ramda/src/anyPass';
import compose from 'ramda/src/compose';
import {useEffect, useLayoutEffect, useRef} from 'react';

import {ProgressBarTooltip} from '../ProgressBar';
import Skinnable from '../Skinnable';
import {validateSteppedOnce} from '../internal/validators';

import SliderBehaviorDecorator from './SliderBehaviorDecorator';
import {
	handleDecrement,
	handleIncrement,
	handleDecrementByWheel,
	handleIncrementByWheel
} from './utils';

import componentCss from './Slider.module.less';

const sliderDefaultProps = {
	activateOnSelect: false,
	active: false,
	disabled: false,
	keyFrequency: [1],
	max: 100,
	min: 0,
	step: 1,
	wheelInterval: 0
};

/**
 * Range-selection input component.
 *
 * @class SliderBase
 * @extends ui/Slider.SliderBase
 * @omit progressBarComponent
 * @memberof sandstone/Slider
 * @ui
 * @public
 */
const SliderBase = (props) => {
	const sliderProps = setDefaultProps(props, sliderDefaultProps);
	const {active, className, css, disabled, focused, keyFrequency, showAnchor, sliderRef, ...rest} = sliderProps;

	validateSteppedOnce(p => p.knobStep, {
		component: 'Slider',
		stepName: 'knobStep',
		valueName: 'max'
	})(sliderProps);

	const step = validateSteppedOnce(p => p.step, {
		component: 'Slider',
		valueName: 'max'
	})(sliderProps);

	const tooltip = sliderProps.tooltip === true ? ProgressBarTooltip : sliderProps.tooltip;

	const spotlightAccelerator = useRef();
	const {current: context} = useRef({lastWheelTimeStamp: 0});

	const handlers = useHandlers({
		onBlur: handle(
			forward('onBlur'),
			forProp('active', true),
			forward('onActivate')
		),

		onKeyDown: handle(
			forProp('disabled', false),
			forwardWithPrevent('onKeyDown'),
			anyPass([
				handleIncrement,
				handleDecrement
			])
		),

		onKeyUp: handle(
			forProp('disabled', false),
			forwardWithPrevent('onKeyUp'),
			forProp('activateOnSelect', true),
			forKey('enter'),
			forward('onActivate')
		)
	}, sliderProps, spotlightAccelerator);

	const nativeEventHandlers = useHandlers({
		onWheel: handle(
			forProp('disabled', false),
			not(forProp('noWheel', true)),
			forwardWithPrevent('onWheel'),
			anyPass([
				handleIncrementByWheel,
				handleDecrementByWheel
			])
		)
	}, sliderProps, context);

	// if the props includes a css map, merge them together
	let mergedCss = usePublicClassNames({componentCss, customCss: css, publicClassNames: true});

	const componentClassName = classnames(
		componentCss.slider,
		className,
		{
			[mergedCss.active]: active,
			[mergedCss.showAnchor]: showAnchor
		},
		css && css.slider
	);

	useEffect(() => {
		spotlightAccelerator.current = new Accelerator(keyFrequency);
	}, [keyFrequency]);

	useLayoutEffect(() => {
		if (sliderRef) {
			sliderRef.current.addEventListener('wheel', nativeEventHandlers.onWheel, {passive: false});
		}
		return () => {
			if (sliderRef) {
				sliderRef.current.removeEventListener('wheel', nativeEventHandlers.onWheel, {passive: false});
			}
		};

	}, [sliderRef, nativeEventHandlers.onWheel]);

	delete rest.activateOnSelect;
	delete rest.knobStep;
	delete rest.noWheel;
	delete rest.onActivate;
	delete rest.step;
	delete rest.tooltip;
	delete rest.wheelInterval;

	return (
		<UiSlider
			{...rest}
			{...handlers}
			aria-disabled={disabled}
			className={componentClassName}
			css={mergedCss}
			disabled={disabled}
			progressBarComponent={
				<ProgressBar css={mergedCss} />
			}
			ref={sliderRef}
			step={step}
			tooltipComponent={
				<ComponentOverride
					component={tooltip}
					css={mergedCss}
					visible={focused}
				/>
			}
		/>
	);
};

SliderBase.displayName = 'Slider';

SliderBase.propTypes = /** @lends sandstone/Slider.SliderBase.prototype */ {
	/**
	 * Activates the component when selected so that it may be manipulated via the directional
	 * input keys.
	 *
	 * @type {Boolean}
	 * @public
	 */
	activateOnSelect: PropTypes.bool,

	/**
	 * Sets the knob to selected state and allows it to move via 5-way controls.
	 *
	 * @type {Boolean}
	 * @public
	 */
	active: PropTypes.bool,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `slider` - The root component class
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * Disables component and does not generate events.
	 *
	 * @type {Boolean}
	 * @public
	 */
	disabled: PropTypes.bool,

	/**
	 * Indicates that the slider has gained focus and if the tooltip is present, it will be
	 * shown.
	 *
	 * @type {Boolean}
	 * @public
	 */
	focused: PropTypes.bool,

	/**
	 * Controls the keydown frequency with which the acceleration will "freeze".
	 * While frozen, the value of the slider is not changed via arrow key.
	 *
	 * To customize the key acceleration speed, pass an array for {@link spotlight/Accelerator.Accelerator|frequency}.
	 * Each number represents a number of an event for sampling.
	 * For example, 1 means to process all events while 3 means to process one of the three events.
	 * If the number is large, the slider value changes slowly.
	 * Example for accelerating:
	 * ```
	 * keyFrequency={[3, 3, 3, 2, 2, 2, 1]}
	 * ```
	 *
	 * @type {Number[]}
	 * @default [1]
	 * @public
	 */
	keyFrequency: PropTypes.arrayOf(PropTypes.number),

	/**
	 * The amount to increment or decrement the position of the knob via 5-way controls.
	 *
	 * It must evenly divide into the range designated by `min` and `max`. If not specified,
	 * `step` is used for the default value.
	 *
	 * @type {Number}
	 * @public
	 */
	knobStep: PropTypes.number,

	/**
	 * The maximum value of the slider.
	 *
	 * The range between `min` and `max` should be evenly divisible by
	 * {@link sandstone/Slider.SliderBase.step|step}.
	 *
	 * @type {Number}
	 * @default 100
	 * @public
	 */
	max: PropTypes.number,

	/**
	 * The minimum value of the slider.
	 *
	 * The range between `min` and `max` should be evenly divisible by
	 * {@link sandstone/Slider.SliderBase.step|step}.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	min: PropTypes.number,

	/**
	 * Disable wheel event.
	 *
	 * @type {Boolean}
	 * @public
	 */
	noWheel: PropTypes.bool,

	/**
	 * The handler when the knob is activated or deactivated by selecting it via 5-way
	 *
	 * @type {Function}
	 * @public
	 */
	onActivate: PropTypes.func,

	/**
	 * Called when a key is pressed down while the slider is focused.
	 *
	 * When a directional key is pressed down and the knob is active (either by first
	 * pressing enter or when `activateOnSelect` is disabled), the Slider will increment or
	 * decrement the current value and emit an `onChange` event. This default behavior can be
	 * prevented by calling `preventDefault()` on the event passed to this callback.
	 *
	 * @type {Function}
	 * @public
	 */
	onKeyDown: PropTypes.func,

	/**
	 * Called when a key is released while the slider is focused.
	 *
	 * When the enter key is released and `activateOnSelect` is enabled, the slider will be
	 * activated to enable incrementing or decrementing the value via directional keys. This
	 * default behavior can be prevented by calling `preventDefault()` on the event passed to
	 * this callback.
	 *
	 * @type {Function}
	 * @public
	 */
	onKeyUp: PropTypes.func,

	/**
	 * Displays an anchor at `progressAnchor`.
	 *
	 * @type {Boolean}
	 * @public
	 */
	showAnchor: PropTypes.bool,

	/**
	 * The amount to increment or decrement the value.
	 *
	 * It must evenly divide into the range designated by `min` and `max`.
	 *
	 * @type {Number}
	 * @default 1
	 * @public
	 */
	step: PropTypes.number,

	/**
	 * Enables the built-in tooltip
	 *
	 * To customize the tooltip, pass either a custom tooltip component or an instance of
	 * {@link sandstone/Slider.SliderTooltip|SliderTooltip} with additional props configured.
	 *
	 * ```
	 * <Slider
	 *   tooltip={
	 *     <SliderTooltip percent side="after" />
	 *   }
	 * />
	 * ```
	 *
	 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
	 * {@link ui/Slottable|Slottable} for more information on how slots can be used.
	 *
	 * ```
	 * <Slider>
	 *   <SliderTooltip percent side="after" />
	 * </Slider>
	 * ```
	 *
	 * If a custom tooltip is provided, it will receive the following props:
	 *
	 * * `children` - The `value` prop from the slider
	 * * `visible` - `true` if the tooltip should be displayed
	 * * `orientation` - The value of the `orientation` prop from the slider
	 * * `proportion` - A number between 0 and 1 representing the proportion of the `value` in
	 *   terms of `min` and `max`
	 *
	 * @type {Boolean|Element|Function}
	 * @public
	 */
	tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),

	/**
	 * The value of the slider.
	 *
	 * Defaults to the value of `min`.
	 *
	 * @type {Number}
	 * @public
	 */
	value: PropTypes.number,

	/**
	 * The interval (in milliseconds) between valid wheel events.
	 *
	 * For example, 200 means to ignore wheel events occurred within 200ms
	 * of the last processed wheel event while 0 means to process all wheel events.
	 * If the number is large, the slider value changes slowly.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	wheelInterval: PropTypes.number
};

/**
 * Sandstone-specific slider behaviors to apply to {@link sandstone/Slider.SliderBase|SliderBase}.
 *
 * @hoc
 * @memberof sandstone/Slider
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes sandstone/Skinnable.Skinnable
 * @mixes ui/Slottable.Slottable
 * @mixes ui/Slider.SliderDecorator
 * @public
 */
const SliderDecorator = compose(
	Pure,
	Changeable,
	SliderBehaviorDecorator,
	Spottable,
	Slottable({slots: ['knob', 'tooltip']}),
	Skinnable
);

/**
 * Slider input with Sandstone styling, {@link spotlight/Spottable.Spottable|Spottable},
 * {@link ui/Touchable|Touchable} and {@link sandstone/Slider.SliderDecorator|SliderDecorator}
 * applied.
 *
 * By default, `Slider` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the
 * component, supply a value to `value` at creation time and update it in response to `onChange`
 * events.
 *
 * @class Slider
 * @memberof sandstone/Slider
 * @mixes sandstone/Slider.SliderDecorator
 * @ui
 * @public
 */

/**
 * Overrides the `aria-valuetext` for the slider.
 *
 * By default, `aria-valuetext` is set to the current value. This should only be used when
 * the parent controls the value of the slider directly through the props.
 *
 * @name aria-valuetext
 * @memberof sandstone/Slider.Slider.prototype
 * @type {String|Number}
 * @public
 */

const Slider = SliderDecorator(SliderBase);

Slider.defaultPropValues = sliderDefaultProps;

/**
 * A {@link sandstone/TooltipDecorator.Tooltip|Tooltip} specifically adapted for use with
 * {@link sandstone/ProgressBar.ProgressBar|ProgressBar} or
 * {@link sandstone/Slider.Slider|Slider}.
 *
 * @see {@link sandstone/ProgressBar.ProgressBarTooltip}
 * @class SliderTooltip
 * @memberof sandstone/Slider
 * @ui
 * @public
 */

export default Slider;
export {
	Slider,
	SliderBase,
	SliderDecorator,
	ProgressBarTooltip as SliderTooltip
};
