import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TabLayout, {TabLayoutBase, Tab} from '../TabLayout';

describe('TabLayout specs', () => {
	test('should be collapsed when collapsed is true', () => {
		render(
			<TabLayoutBase
				data-testid="tabLayout"
				collapsed
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'collapsed';
		const actual = screen.getByTestId('tabLayout');

		expect(actual).toHaveClass(expected);
	});

	test('should have default orientation of vertical', () => {
		render(
			<TabLayoutBase data-testid="tabLayout">
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'vertical';
		const actual = screen.getByTestId('tabLayout');

		expect(actual).toHaveClass(expected);
	});

	test('should have orientation of horizontal when orientation is set to horizontal', () => {
		render(
			<TabLayoutBase
				data-testid="tabLayout"
				orientation="horizontal"
			>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayoutBase>
		);

		const expected = 'horizontal';
		const actual = screen.getByTestId('tabLayout');

		expect(actual).toHaveClass(expected);
	});

	test('should call onTabAnimationEnd for vertical tabs', () => {
		const spy = jest.fn();
		render(
			<TabLayout data-testid="tabLayout" orientation="vertical" onTabAnimationEnd={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = screen.getByTestId('tabLayout').children.item(0);
		fireEvent.transitionEnd(tabs);

		expect(spy).toHaveBeenCalledTimes(1);
	});

	test('should include expected payload in onTabAnimationEnd', () => {
		const spy = jest.fn();
		render(
			<TabLayout data-testid="tabLayout" orientation="vertical" onTabAnimationEnd={spy} collapsed>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = screen.getByTestId('tabLayout').children.item(0);
		fireEvent.transitionEnd(tabs);

		const expected = {
			type: 'onTabAnimationEnd',
			collapsed: true
		};
		const actual = spy.mock.calls[0][0];

		expect(actual).toEqual(expected);
	});

	test('should not call onTabAnimationEnd for horizontal tabs', () => {
		const spy = jest.fn();
		render(
			<TabLayout data-testid="tabLayout" orientation="horizontal" onTabAnimationEnd={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = screen.getByTestId('tabLayout').children.item(0);
		fireEvent.transitionEnd(tabs);

		expect(spy).not.toHaveBeenCalled();
	});

	test('should call `onSelect` with `onSelect` type when clicking on a tab', () => {
		const spy = jest.fn();
		render(
			<TabLayout orientation="vertical" onSelect={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		userEvent.click(screen.getAllByTestId('tab')[1]);

		const expected = {type: 'onSelect'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should call `onSelect` with `onSelect` type when pressing \`Enter\` on a tab', () => {
		const spy = jest.fn();
		render(
			<TabLayout orientation="vertical" onSelect={spy}>
				<Tab title="Home" icon="home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" title="Item" icon="playcircle">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		fireEvent.keyDown(screen.getAllByTestId('tab')[1], {key: 'Enter', keyCode: 13});
		fireEvent.keyUp(screen.getAllByTestId('tab')[1], {key: 'Enter', keyCode: 13});

		const expected = {type: 'onSelect'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});
});
