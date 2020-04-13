/* eslint-disable react/jsx-no-bind */
import {mount} from 'enzyme';
import React from 'react';

import {useScrollPosition, ScrollPositionDecorator} from '../useScrollPosition';

describe('useScrollPosition', () => {

	const Component = () => {
		const {collapsed, custom, onScroll} = useScrollPosition();

		// eslint-disable-next-line no-undefined
		return <div onClick={() => onScroll({y: 500})}>{custom !== undefined ? 'custom' : collapsed.toString()}</div>;
	};

	test('Initially collapsed with default decorator', () => {
		const WrappedComponent = ScrollPositionDecorator(Component);

		const subject = mount(<WrappedComponent />);

		const expected = 'false';
		const actual = subject.find('div').text();

		expect(actual).toEqual(expected);
	});

	test('Updates with default decorator props', () => {
		const WrappedComponent = ScrollPositionDecorator(Component);

		const subject = mount(<WrappedComponent />);

		subject.find('div').simulate('click');

		const expected = 'true';
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

		const expected = 'custom';
		const actual = subject.find('div').text();

		expect(actual).toEqual(expected);
	});
});
