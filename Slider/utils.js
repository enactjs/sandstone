import {forKey, forProp, forwardCustom, handle, oneOf, preventDefault, stop} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import {calcProportion} from '@enact/ui/Slider/utils';

const nop = () => {};

const handleAcceleratedKeyDown = (ev, prop, {current: spotlightAccelerator}) => {
	if (!spotlightAccelerator) {
		return true;
	}

	if (!ev.repeat) {
		spotlightAccelerator.reset();
	}

	if (spotlightAccelerator.processKey(ev, nop)) {
		return false;
	}

	return true;
};

const calcStep = (knobStep, step) => {
	let s;

	if (knobStep != null) {
		s = knobStep;
	} else if (step != null) {
		s = step;
	}

	// default to a step of 1 if neither are set or are set to 0
	// otherwise, increment/decrement would be no-ops
	return s || 1;
};

const isIncrementByWheel = ({deltaY}) => {
	return deltaY < 0;
};

const isDecrementByWheel = ({deltaY}) => {
	return deltaY > 0;
};

const isIncrement = ({keyCode}, {orientation}) => {
	return orientation === 'vertical' ? is('up', keyCode) : is('right', keyCode);
};

const isDecrement = ({keyCode}, {orientation}) => {
	return orientation === 'vertical' ? is('down', keyCode) : is('left', keyCode);
};

const isNotMax = (ev, {value, max}) => {
	return value !== max;
};

const isNotMin = (ev, {min, value = min}) => {
	return value !== min;
};

const checkInterval = (ev, {wheelInterval}, context) => {
	if (ev.timeStamp - context.lastWheelTimeStamp < wheelInterval) {
		return false;
	}
	context.lastWheelTimeStamp = ev.timeStamp;
	return true;
};

const emitChange = (direction) => forwardCustom(
	'onChange',
	(ev, {knobStep, max, min, step, value = min}) => {
		const newValue = clamp(min, max, value + (calcStep(knobStep, step) * direction));

		return {
			value: newValue,
			proportion: calcProportion(min, max, newValue)
		};
	}
);

const isActive = (ev, props) => {
	return props.active || !props.activateOnSelect;
};

const handleIncrement = handle(
	isActive,
	isIncrement,
	preventDefault,
	stop,
	handleAcceleratedKeyDown,
	isNotMax,
	emitChange(1)
);

const handleDecrement = handle(
	isActive,
	isDecrement,
	preventDefault,
	stop,
	handleAcceleratedKeyDown,
	isNotMin,
	emitChange(-1)
);

const handleIncrementByWheel = handle(
	isActive,
	isIncrementByWheel,
	preventDefault,
	stop,
	isNotMax,
	checkInterval,
	emitChange(1)
);

const handleDecrementByWheel = handle(
	isActive,
	isDecrementByWheel,
	preventDefault,
	stop,
	isNotMin,
	checkInterval,
	emitChange(-1)
);

const either = (a, b) => (...args) => a(...args) || b(...args);
const atMinimum = (ev, {min, value = min}) => value <= min;
const atMaximum = (ev, {max, min, value = min}) => value >= max;

const forwardSpotlightEvents = oneOf(
	[forKey('left'), handle(
		either(forProp('orientation', 'vertical'), atMinimum),
		forwardCustom('onSpotlightLeft')
	)],
	[forKey('right'), handle(
		either(forProp('orientation', 'vertical'), atMaximum),
		forwardCustom('onSpotlightRight')
	)],
	[forKey('down'), handle(
		either(forProp('orientation', 'horizontal'), atMinimum),
		forwardCustom('onSpotlightDown')
	)],
	[forKey('up'), handle(
		either(forProp('orientation', 'horizontal'), atMaximum),
		forwardCustom('onSpotlightUp')
	)]
);

export {
	forwardSpotlightEvents,
	emitChange,
	handleDecrement,
	handleIncrement,
	handleDecrementByWheel,
	handleIncrementByWheel
};
