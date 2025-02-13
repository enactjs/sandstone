import {forward, forwardCustom} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import Pause from '@enact/spotlight/Pause';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import {Component} from 'react';

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

			this.paused = new Pause();
			this.handleActivate = this.handleActivate.bind(this);
			this.handleBlur = this.handleBlur.bind(this);
			this.handleDragEnd = this.handleDragEnd.bind(this);
			this.handleDragStart = this.handleDragStart.bind(this);
			this.handleFocus = this.handleFocus.bind(this);
			this.handleSpotlightEvents = this.handleSpotlightEvents.bind(this);
			this.bounds = {};

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
				/>
			);
		}
	};
});

export default SliderBehaviorDecorator;
export {
	SliderBehaviorDecorator
};
