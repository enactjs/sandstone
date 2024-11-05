import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import Slider from '../Slider';

const focus = (slider) => fireEvent.focus(slider);
const blur = (slider) => fireEvent.blur(slider);
const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);
const upKeyDown = keyDown(38);
const downKeyDown = keyDown(40);

const getElementClientCenter = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	return {x: left + width / 2, y: top + height / 2};
};

const drag = async (element, {delta, steps = 1}) => {
	const from = getElementClientCenter(element);
	const to = {x: from.x + delta.x, y: from.y + delta.y};
	const step = {x: (to.x - from.x) / steps, y: (to.y - from.y) / steps};
	const current = {clientX: from.x, clientY: from.y};

	fireEvent.mouseEnter(element, current);
	fireEvent.mouseOver(element, current);
	fireEvent.mouseMove(element, current);
	fireEvent.mouseDown(element, current);
	for (let i = 0; i < steps; i++) {
		current.clientX += step.x;
		current.clientY += step.y;
		act(() => jest.advanceTimersByTime(1000 / steps));
		fireEvent.mouseMove(element, current);
	}
	fireEvent.mouseUp(element, current);
};

describe('Slider', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test('should set "aria-valuetext" to hint string for the first render when vertical is false', () => {
		render(<Slider />);
		const slider = screen.getByRole('slider');

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = 'From 0 to 100 0 change a value with left right button';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set "aria-valuetext" to hint string for the first render when vertical is true', () => {
		render(<Slider orientation="vertical" />);
		const slider = screen.getByRole('slider');

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = 'From 0 to 100 0 change a value with up down button';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should set "aria-valuetext" to value when value is changed', () => {
		render(<Slider defaultValue={10} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '11';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should activate the slider on enter keyup', () => {
		render(<Slider activateOnSelect />);
		const slider = screen.getByRole('slider');

		activate(slider);

		const expected = 'active';

		expect(slider).toHaveClass(expected);
	});

	test('should change value of slider on drag', async () => {
		render(<Slider activateOnSelect defaultValue={50} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		await drag(slider, {delta: {x: 50, y: 0}});

		const expectedAttribute = 'aria-valuetext';
		const unexpectedValue = '50 change a value with left right button';

		expect(slider).not.toHaveAttribute(expectedAttribute, unexpectedValue);
	});

	test('should deactivate the slider on blur', () => {
		render(<Slider activateOnSelect />);
		const slider = screen.getByRole('slider');

		const notExpected = 'active';

		activate(slider);

		expect(slider).toHaveClass(notExpected);

		blur(slider);

		expect(slider).not.toHaveClass(notExpected);
	});

	test('should not activate the slider on enter', () => {
		render(<Slider />);
		const slider = screen.getByRole('slider');

		activate(slider);

		const notExpected = 'active';

		expect(slider).not.toHaveClass(notExpected);
	});

	test('should fire `onChange` with `onChange` type when value changed', () => {
		const handleChange = jest.fn();

		render(<Slider activateOnSelect defaultValue={50} onChange={handleChange} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		leftKeyDown(slider);

		const expected = {type: 'onChange'};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should decrement the value of horizontal slider on key left when active', () => {
		render(<Slider activateOnSelect defaultValue={50} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		leftKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value of horizontal slider on key left', () => {
		render(<Slider defaultValue={50} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		leftKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value of horizontal slider on wheel down when active', () => {
		render(<Slider activateOnSelect defaultValue={50} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		fireEvent.wheel(slider, {deltaY: 10});

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value of vertical slider on key down when active', () => {
		render(<Slider activateOnSelect defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		activate(slider);
		downKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value of vertical slider on key down', () => {
		render(<Slider defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		focus(slider);
		downKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value of vertical slider on wheel down when active', () => {
		render(<Slider activateOnSelect defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		activate(slider);
		fireEvent.wheel(slider, {deltaY: 10});

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '49';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of horizontal slider on key right when active', () => {
		render(<Slider activateOnSelect defaultValue={50} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of horizontal slider on key right', () => {
		render(<Slider defaultValue={50} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of vertical slider on key up when active', () => {
		render(<Slider activateOnSelect defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		activate(slider);
		upKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of horizontal slider on wheel up when active', () => {
		render(<Slider activateOnSelect defaultValue={50} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		fireEvent.wheel(slider, {deltaY: -10});

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of vertical slider on key up', () => {
		render(<Slider defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		focus(slider);
		upKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value of vertical slider on wheel up when active', () => {
		render(<Slider activateOnSelect defaultValue={50} orientation="vertical" />);
		const slider = screen.getByRole('slider');

		activate(slider);
		fireEvent.wheel(slider, {deltaY: -10});

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '51';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value by \'knobStep\' on key left when active', () => {
		render(<Slider activateOnSelect defaultValue={50} knobStep={5} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		leftKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '45';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value by \'knobStep\' on key right when active', () => {
		render(<Slider activateOnSelect defaultValue={50} knobStep={5} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '55';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should decrement the value by \'step\' on key left when active', () => {
		render(<Slider activateOnSelect defaultValue={50} step={5} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		leftKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '45';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should increment the value by \'step\' on key right when active', () => {
		render(<Slider activateOnSelect defaultValue={50} step={5} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '55';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	// these tests validate behavior relating to `value` defaulting to `min`
	test('should not emit onChange when decrementing at the lower bound when value is unset', () => {
		const handleChange = jest.fn();
		render(<Slider activateOnSelect min={0} max={10} onChange={handleChange} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		leftKeyDown(slider);

		expect(handleChange).not.toBeCalled();
	});

	test('should increment from the lower bound when value is unset', () => {
		const handleChange = jest.fn();
		render(<Slider activateOnSelect min={0} max={10} onChange={handleChange} />);
		const slider = screen.getByRole('slider');

		activate(slider);
		rightKeyDown(slider);

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '1';

		expect(slider).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should call onSpotlightLeft on horizontal slider at min value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={0} onSpotlightLeft={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		leftKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightLeft on vertical slider at any value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={50} orientation="vertical" onSpotlightLeft={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		leftKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should not call onSpotlightLeft on horizontal slider at greater than min value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={1} onSpotlightLeft={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		leftKeyDown(slider);

		expect(handleSpotlight).not.toBeCalled();
	});

	test('should call onSpotlightDown on vertical slider at min value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={0} orientation="vertical" onSpotlightDown={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		downKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightDown on horizontal slider at any value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={50} onSpotlightDown={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		downKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should not call onSpotlightDown on vertical slider at greater than min value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={1} orientation="vertical" onSpotlightDown={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		downKeyDown(slider);

		expect(handleSpotlight).not.toBeCalled();
	});

	test('should call onSpotlightRight on horizontal slider at max value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={100} onSpotlightRight={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		rightKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightRight on vertical slider at any value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={50} orientation="vertical" onSpotlightRight={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		rightKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should not call onSpotlightRight on horizontal slider at less than max value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={99} onSpotlightRight={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		rightKeyDown(slider);

		expect(handleSpotlight).not.toBeCalled();
	});

	test('should call onSpotlightUp on vertical slider at max value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={100} max={100} orientation="vertical" onSpotlightUp={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		upKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should call onSpotlightUp on horizontal slider at any value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={50} onSpotlightUp={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		upKeyDown(slider);

		const expected = 1;

		expect(handleSpotlight).toBeCalledTimes(expected);
	});

	test('should not call onSpotlightUp on vertical slider at less than max value', () => {
		const handleSpotlight = jest.fn();
		render(<Slider defaultValue={99} orientation="vertical" onSpotlightUp={handleSpotlight} />);
		const slider = screen.getByRole('slider');

		focus(slider);
		upKeyDown(slider);

		expect(handleSpotlight).not.toBeCalled();
	});

	test('should set the tooltip to visible when focused', () => {
		render(<Slider tooltip />);
		const slider = screen.getByRole('slider');

		focus(slider);

		const actual = screen.getByText('0');
		const expected = 'tooltipLabel';

		expect(actual).toHaveClass(expected);
	});

	test('should set the tooltip to not visible when unfocused', () => {
		render(<Slider tooltip />);

		const tooltip = screen.queryByText('0');

		expect(tooltip).toBeNull();
	});
});
