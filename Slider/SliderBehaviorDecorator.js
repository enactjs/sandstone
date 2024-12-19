import {forward, forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {setDefaultProps} from '@enact/core/util';
import Pause from '@enact/spotlight/Pause';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useMemo, useState} from 'react';

import $L from '../internal/$L';

import {forwardSpotlightEvents} from './utils';

const defaultConfig = {
	// FIXME: This is a compromise to maintain a single decorator for Slider and IncrementSlider
	// that handles both a consolidated focus state and spotlight directional event mgmt. When this
	// is unset (for Slider), this decorator will listen to onKeyDown and fire spotlight events.
	// When set (for IncrementSlider), it specifies the event that is passed down to trigger
	// spotlight events and also doesn't remove the spotlight directional callbacks from the props
	// so the Wrapped component can fire them manually or use the callback for the default behavior.
	emitSpotlightEvents: null
};

const sliderBehaviorDefaultProps = {
	max: 100,
	min: 0,
	orientation: 'horizontal'
};

// Adds sandstone-specific slider behaviors
// * aria-valuetext handling
//   * use aria-valuetext when set
//   * defaults to current value
//   * onActivate, set to hint text
//   * on value change, reset to value or aria-valuetext
// * Spotlight
//   * Pause Spotlight when dragging to prevent spotlight from leaving when pointer enters another
//     component
//   * Forward directional spotlight events from slider
// * Managing focused state to show/hide tooltip
const SliderBehaviorDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {emitSpotlightEvents} = config;

	// eslint-disable-next-line no-shadow
	const SliderBehaviorDecorator = (props) => {
		const sliderBehaviorProps = setDefaultProps(props, sliderBehaviorDefaultProps);

		const paused = useMemo(() => new Pause(), []);
		const [active, setActive] = useState(false);
		const [dragging, setDragging] = useState(false);
		const [focused, setFocused] = useState(false);
		const [useHintText, setUseHintText] = useState(true);
		const [prevValue, setPrevValue] = useState(sliderBehaviorProps.value);

		useEffect(() => {
			if (sliderBehaviorProps.value !== prevValue) {
				setUseHintText(false);
				setPrevValue(sliderBehaviorProps.value);
			}
		}, [prevValue, sliderBehaviorProps.value]);


		useEffect(() => {
			return () => {
				paused.resume();
			};
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

		const getValueText = useCallback(() => {
			const {'aria-valuetext': ariaValueText, max, min, orientation, value = min} = sliderBehaviorProps;

			const valueText = (ariaValueText != null) ? ariaValueText : value;
			const verticalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with up down button')}`;
			const horizontalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with left right button')}`;

			if (useHintText) {
				return orientation === 'horizontal' ? horizontalHint : verticalHint;
			}

			return valueText;
		}, [sliderBehaviorProps, useHintText]);

		const handleActivate = useCallback(() => {
			forwardCustom('onActivate')(null, sliderBehaviorProps);
			setActive(prevState => !prevState);
		}, [sliderBehaviorProps]);

		const handleBlur = useCallback((ev) => {
			forward('onBlur', ev, sliderBehaviorProps);
			setFocused(false);
			setUseHintText(true);
		}, [sliderBehaviorProps]);

		const handleDragStart = useCallback(() => {
			paused.pause();
			setDragging(true);
		}, [paused]);

		const handleDragEnd = useCallback(() => {
			paused.resume();
			setDragging(false);
		}, [paused]);

		const handleFocus = useCallback((ev) => {
			forward('onFocus', ev, sliderBehaviorProps);
			if (!sliderBehaviorProps.activateOnSelect) {
				handleActivate();
			}
			setFocused(true);
		}, [handleActivate, sliderBehaviorProps]);

		const handleSpotlightEvents = useCallback((ev) => {
			if (!emitSpotlightEvents) {
				forward('onKeyDown', ev, sliderBehaviorProps);
			}
			forwardSpotlightEvents(ev, sliderBehaviorProps);
		}, [sliderBehaviorProps]);

		const sliderProps = Object.assign({}, sliderBehaviorProps);

		if (!emitSpotlightEvents) {
			// Remove spotlight props before hitting spottable since we've handled them uniquely
			delete sliderProps.onSpotlightLeft;
			delete sliderProps.onSpotlightRight;
			delete sliderProps.onSpotlightUp;
			delete sliderProps.onSpotlightDown;

			sliderProps.onKeyDown = handleSpotlightEvents;
		} else {
			sliderProps[emitSpotlightEvents] = handleSpotlightEvents;
		}

		return (
			<Wrapped
				role="slider"
				{...sliderProps}
				active={active}
				aria-valuetext={getValueText()}
				focused={focused || dragging}
				onActivate={handleActivate}
				onBlur={handleBlur}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onFocus={handleFocus}
			/>
		);
	};

	SliderBehaviorDecorator.displayName = 'SliderBehaviorDecorator';

	SliderBehaviorDecorator.propTypes = {
		activateOnSelect: PropTypes.bool,
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		max: PropTypes.number,
		min: PropTypes.number,
		orientation: PropTypes.string,
		value: PropTypes.number
	};

	return SliderBehaviorDecorator;
});

export default SliderBehaviorDecorator;
export {
	SliderBehaviorDecorator
};
