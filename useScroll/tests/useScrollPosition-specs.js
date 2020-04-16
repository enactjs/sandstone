/* eslint-disable react/jsx-no-bind */
import {mount} from 'enzyme';
import React from 'react';

import {useScrollPosition, ScrollPositionDecorator} from '../useScrollPosition';

describe('useScrollPosition', () => {

	const scrollPayload = {y: 500};

	const Component = () => {
		const {value, custom, onScroll} = useScrollPosition();

		// eslint-disable-next-line no-undefined
		return <div onClick={() => onScroll(scrollPayload)}>{custom !== undefined ? 'custom' : JSON.stringify(value)}</div>;
	};

	test('Initial value with default decorator', () => {
		const WrappedComponent = ScrollPositionDecorator(Component);

		const subject = mount(<WrappedComponent />);

		const expected = '';
		const actual = subject.find('div').text();

		expect(actual).toEqual(expected);
	});

	test('Updates with default decorator props', () => {
		const WrappedComponent = ScrollPositionDecorator(Component);

		const subject = mount(<WrappedComponent />);

		subject.find('div').simulate('click');

		const expected = JSON.stringify(scrollPayload);
		const actual = subject.find('div').text();

		expect(actual).toEqual(expected);
	});

	test('Custom transform config', () => {
		const transform = jest.fn(() => false);
		const WrappedComponent = ScrollPositionDecorator({transform}, Component);

		const subject = mount(<WrappedComponent />);

		subject.find('div').simulate('click');

		const expected = 1;
		const actual = transform.mock.calls.length;

		expect(actual).toEqual(expected);
	});

	test('Custom output prop', () => {
		const WrappedComponent = ScrollPositionDecorator({valueProp: 'custom'}, Component);

		const subject = mount(<WrappedComponent />);

		subject.find('div').simulate('click');

		const expected = 'custom';
		const actual = subject.find('div').text();

		expect(actual).toEqual(expected);
	});
});
