import {forward, forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import platform from '@enact/core/platform';
import {setDefaultProps} from "@enact/core/util";
import Pause from '@enact/spotlight/Pause';
import spotlight from '@enact/spotlight';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import {Component, createRef, useCallback, useEffect, useRef, useState} from 'react';

import $L from '../internal/$L';

import {forwardSpotlightEvents} from './utils';

const toggleActive = ({active}) => {
	return {
		active: !active
	};
};

const defaultConfig = {
	// FIXME: This is a compromise to maintain a single decorator for Slider and IncrementSlider
	// that handles both a consolidated focus state and spotlight directional event mgmt. When this
	// is unset (for Slider), this decorator will listen to onKeyDown and fire spotlight events.
	// When set (for IncrementSlider), it specifies the event that is passed down to trigger
	// spotlight events and also doesn't remove the spotlight directional callbacks from the props
	// so the Wrapped component can fire them manually or use the callback for the default behavior.
	emitSpotlightEvents: null
};

const sliderDefaultProps = {
	max: 100,
	min: 0,
	orientation: 'horizontal'
}

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


	if (true) {


	const SliderBehavior = (props) => {
		const sliderBehaviorProps = setDefaultProps(props, sliderDefaultProps);

		console.log(props)


		const [paused] = useState(()=>new Pause());

		//const [bounds] = useState({});

		const sliderRef = useRef();
		const {componentRef} = props;

		const [active, setActive] = useState(false);
		const [dragging, setDragging] = useState(false);
		const [focused, setFocused] = useState(false);
		const [useHintText, setUseHintText] = useState(true);
		const [prevValue, setPrevValue] = useState(sliderBehaviorProps.value);



		//getDerivedStateFromProps
		useEffect(() => {
			if (sliderBehaviorProps.value !== prevValue) {
				setUseHintText(false);
				setPrevValue(sliderBehaviorProps.value);
			}
		}, [sliderBehaviorProps.value]);


		useEffect(() => {
			return () => {
				//componentWillUnmount
				// paused.resume();
				spotlight.resume();
			};
		}, []);



		const getValueText = //useCallback(
			() => {
			const {'aria-valuetext': ariaValueText, max, min, orientation, value = min} = sliderBehaviorProps;

			const valueText = (ariaValueText != null) ? ariaValueText : value;
			const verticalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with up down button')}`;
			const horizontalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with left right button')}`;

			if (useHintText) {
				return orientation === 'horizontal' ? horizontalHint : verticalHint;
			}

			return valueText;
		}//, [sliderBehaviorProps, useHintText]);

		const focusSlider = //useCallback(
			() => {
			let slider = sliderRef.current;
			// console.log(sliderRef.current)
			console.log(componentRef)
			if (slider.getAttribute('role') !== 'slider') {
				slider = slider.querySelector('[role="slider"]');
			}
			slider.focus();
		}//, []);

		const handleActivate = //useCallback(
			() => {
			forwardCustom('onActivate')(null, sliderBehaviorProps);
			setActive(prevState => !prevState);
		}//, [setActive]);

		const handleBlur = //useCallback(
			(ev) => {
			forward('onBlur', ev, sliderBehaviorProps);
			setFocused(false);
			setUseHintText(true);
		}//, [setFocused, setUseHintText, sliderBehaviorProps]);

		const handleDragStart = //useCallback(
			() => {
			// on platforms with a touchscreen, we want to focus slider when dragging begins
			if (platform.touchScreen) {
				focusSlider();
			}
			// paused.pause();
			spotlight.pause();
			setDragging(true);
		}//, [focusSlider, paused, setDragging]);

		const handleDragEnd = //useCallback(
			() => {
			// paused.resume();
			spotlight.resume();
			setDragging(false);
		}//, [paused, setDragging]);

		const handleFocus = //useCallback(
			(ev) => {
			forward('onFocus', ev, sliderBehaviorProps);
			if (!sliderBehaviorProps.activateOnSelect) {
				handleActivate();
			}
			setFocused(true);
		}//, [handleActivate, setFocused, sliderBehaviorProps]);

		const handleSpotlightEvents = //useCallback(
			(ev) => {
			if (!emitSpotlightEvents) {
				forward('onKeyDown', ev, sliderBehaviorProps);
			}

			forwardSpotlightEvents(ev, sliderBehaviorProps);
		}//, [emitSpotlightEvents, sliderBehaviorProps]);





		//render
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
				ref={sliderRef}
			/>
		);

	};

	SliderBehavior.displayName = 'SliderBehaviorDecorator';
	SliderBehavior.propTypes = {
		activateOnSelect: PropTypes.bool,
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		max: PropTypes.number,
		min: PropTypes.number,
		orientation: PropTypes.string,
		value: PropTypes.number
	};

	return SliderBehavior;




	} else {





	return class extends Component {
		static displayName = 'SliderBehaviorDecorator';

		static propTypes = {
			activateOnSelect: PropTypes.bool,
			'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			max: PropTypes.number,
			min: PropTypes.number,
			orientation: PropTypes.string,
			value: PropTypes.number
		};

		static defaultProps = {
			max: 100,
			min: 0,
			orientation: 'horizontal'
		};

		constructor (props) {
			super(props);

			console.log(props);

			this.paused = new Pause();
			this.handleActivate = this.handleActivate.bind(this);
			this.handleBlur = this.handleBlur.bind(this);
			this.handleDragEnd = this.handleDragEnd.bind(this);
			this.handleDragStart = this.handleDragStart.bind(this);
			this.handleFocus = this.handleFocus.bind(this);
			this.handleSpotlightEvents = this.handleSpotlightEvents.bind(this);
			this.bounds = {};
			// this.sliderRef = createRef();
			this.sliderRef = props.componentRef;

			this.state = {
				active: false,
				dragging: false,
				focused: false,
				useHintText: true,
				prevValue: props.value
			};
		}

		static getDerivedStateFromProps (props, state) {
			if (props.value !== state.prevValue) {
				return {
					useHintText: false,
					prevValue: props.value
				};
			}
			return null;
		}

		componentWillUnmount () {
			this.paused.resume();
		}

		getValueText () {
			const {'aria-valuetext': ariaValueText, max, min, orientation, value = min} = this.props;
			const {useHintText} = this.state;

			const valueText = (ariaValueText != null) ? ariaValueText : value;
			const verticalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with up down button')}`;
			const horizontalHint = `${new IString($L('From {startValue} to {lastValue}')).format({startValue: min, lastValue: max})} ${valueText} ${$L('change a value with left right button')}`;

			if (useHintText) {
				return orientation === 'horizontal' ? horizontalHint : verticalHint;
			}

			return valueText;
		}

		focusSlider () {
			let slider = this.sliderRef.current;
			console.log(this.sliderRef)
			if (slider.getAttribute('role') !== 'slider') {
				slider = slider.querySelector('[role="slider"]');
			}
			slider.focus();
		}

		handleActivate () {
			forwardCustom('onActivate')(null, this.props);
			this.setState(toggleActive);
		}

		handleBlur (ev) {
			forward('onBlur', ev, this.props);
			this.setState({
				focused: false,
				useHintText: true
			});
		}

		handleDragStart () {
			// on platforms with a touchscreen, we want to focus slider when dragging begins
			if (platform.touchScreen) {
				this.focusSlider();
			}
			this.paused.pause();
			this.setState({dragging: true});
		}

		handleDragEnd () {
			this.paused.resume();
			this.setState({dragging: false});
		}

		handleFocus (ev) {
			forward('onFocus', ev, this.props);
			if (!this.props.activateOnSelect) {
				this.handleActivate();
			}
			this.setState({focused: true});
		}

		handleSpotlightEvents (ev) {
			if (!emitSpotlightEvents) {
				forward('onKeyDown', ev, this.props);
			}

			forwardSpotlightEvents(ev, this.props);
		}

		render () {
			const props = Object.assign({}, this.props);

			if (!emitSpotlightEvents) {
				// Remove spotlight props before hitting spottable since we've handled them uniquely
				delete props.onSpotlightLeft;
				delete props.onSpotlightRight;
				delete props.onSpotlightUp;
				delete props.onSpotlightDown;

				props.onKeyDown = this.handleSpotlightEvents;
			} else {
				props[emitSpotlightEvents] = this.handleSpotlightEvents;
			}

			return (
				<Wrapped
					role="slider"
					{...props}
					active={this.state.active}
					aria-valuetext={this.getValueText()}
					focused={this.state.focused || this.state.dragging}
					onActivate={this.handleActivate}
					onBlur={this.handleBlur}
					onDragStart={this.handleDragStart}
					onDragEnd={this.handleDragEnd}
					onFocus={this.handleFocus}
					// ref={this.sliderRef}
				/>
			);
		}
	};

	}

});

export default SliderBehaviorDecorator;
export {
	SliderBehaviorDecorator
};
