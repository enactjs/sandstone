import Spotlight from '@enact/spotlight';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TabLayout, {TabLayoutBase, Tab} from '../TabLayout';

const keyDown = (keyCode) => (tab) => fireEvent.keyDown(tab, {keyCode});
const keyUp = (keyCode) => (tab) => fireEvent.keyUp(tab, {keyCode});

const leftKeyDown = keyDown(37);
const leftKeyUp = keyUp(37);
const enterKeyDown = keyDown(13);
const enterKeyUp = keyUp(13);

describe('TabLayout specs', () => {
	test('should be able to render \'Tab\' outside \'TabLayout\'', () => {
		render(<Tab title="Single Tab" />);

		const tab = screen.getByText('Tab is only to be used in TabLayout!');
		expect(tab).toBeInTheDocument();
	});

	test('should be collapsed when collapsed is true', () => {
		render(
			<TabLayoutBase
				collapsed
				data-testid="tabLayout"
			>
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab icon="demosync" title="Button">
					<div>Button</div>
				</Tab>
				<Tab icon="playcircle" title="Item">
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
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab title="Button" icon="demosync">
					<div>Button</div>
				</Tab>
				<Tab icon="playcircle" title="Item">
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
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab icon="demosync" title="Button">
					<div>Button</div>
				</Tab>
				<Tab icon="playcircle" title="Item">
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
			<TabLayout data-testid="tabLayout" onTabAnimationEnd={spy} orientation="vertical">
				<Tab icon="home" title="Home">
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
			<TabLayout collapsed data-testid="tabLayout" onTabAnimationEnd={spy} orientation="vertical">
				<Tab icon="home" title="Home">
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
			<TabLayout data-testid="tabLayout" onTabAnimationEnd={spy} orientation="horizontal">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
			</TabLayout>
		);

		const tabs = screen.getByTestId('tabLayout').children.item(0);
		fireEvent.transitionEnd(tabs);

		expect(spy).not.toHaveBeenCalled();
	});

	test('should call \'onSelect\' with \'onSelect\' type when clicking on a tab', () => {
		const spy = jest.fn();
		render(
			<TabLayout onSelect={spy} orientation="vertical">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" icon="playcircle" title="Item">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		userEvent.click(screen.getAllByTestId('tab')[1]);

		const expected = {type: 'onSelect'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should call \'onSelect\' with \'onSelect\' type when pressing \'Enter\' on a tab', () => {
		const spy = jest.fn();
		render(
			<TabLayout onSelect={spy} orientation="vertical">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" icon="playcircle" title="Item">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		const tab = screen.getAllByTestId('tab')[1];
		enterKeyDown(tab);
		enterKeyUp(tab);

		const expected = {type: 'onSelect'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should not call \'onSelect\' when pressing directional key on a tab', () => {
		const spy = jest.fn();
		render(
			<TabLayout collapsed onSelect={spy} orientation="vertical">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" icon="playcircle" title="Item">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		const tab = screen.getAllByTestId('tab')[1];
		leftKeyDown(tab);
		leftKeyUp(tab);

		expect(spy).not.toHaveBeenCalled();
	});

	test('should call \'onSelect\' even if \'Spotlight\' is paused and pointer mode \'false\'', () => {
		Spotlight.getPointerMode = jest.fn(() => false);
		Spotlight.isPaused = jest.fn(() => false);
		const spy = jest.fn();

		render(
			<TabLayout onSelect={spy} orientation="vertical">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab data-testid="tab" icon="playcircle" title="Item">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		const tab = screen.getAllByTestId('tab')[1];
		enterKeyDown(tab);
		enterKeyUp(tab);

		const expected = {type: 'onSelect'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should call \'onTabAnimationEnd\' even if \'Spotlight\' is paused and pointer mode \'false\'', () => {
		Spotlight.getPointerMode = jest.fn(() => false);
		Spotlight.isPaused = jest.fn(() => false);
		const spy = jest.fn();

		render(
			<TabLayout data-testid="tabLayout" onTabAnimationEnd={spy} orientation="vertical">
				<Tab icon="home" title="Home">
					<div>Home</div>
				</Tab>
				<Tab icon="playcircle" title="Item">
					<div>Item</div>
				</Tab>
			</TabLayout>
		);

		fireEvent.transitionEnd(screen.getByTestId('tabLayout').children.item(0));

		const expected = {type: 'onTabAnimationEnd'};
		const actual = spy.mock.calls.length && spy.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});
});
