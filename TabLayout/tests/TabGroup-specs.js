import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import TabGroup from '../TabGroup';

describe('TabGroup specs', () => {

	test('should only have one icon item when collapsed and vertical orientation when there is a tab without an icon', () => {
		render(
			<TabGroup
				orientation="vertical"
				collapsed
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);

		// When one of the tabs doesn't have an icon, the role='group' is not applied to the component
		const actual = screen.queryByRole('group');

		expect(actual).toBeNull();
	});

	test('should only have 3 item tabs when 3 tabs were specified', () => {
		render(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);
		const firstTab = screen.getByRole('group').children.item(0);
		const secondTab = screen.getByRole('group').children.item(1);
		const thirdTab = screen.getByRole('group').children.item(2);
		const fourthTab = screen.queryByRole('group').children.item(3);

		expect(firstTab).toBeInTheDocument();
		expect(secondTab).toBeInTheDocument();
		expect(thirdTab).toBeInTheDocument();
		expect(fourthTab).toBeNull();
	});

	test('should render icons', () => {
		render(
			<TabGroup
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Button', icon: 'demosync'},
					{title: 'Item', icon: 'playcircle'}
				]}
			/>
		);
		const actualHomeIcon = screen.getByRole('group').children.item(0).children.item(1).children.item(0).textContent.codePointAt();
		const expectedHomeIcon = 983227; // decimal converted charCode of Unicode 'home' character
		const actualDemosyncIcon = screen.getByRole('group').children.item(1).children.item(1).children.item(0).textContent.codePointAt();
		const expectedDemosyncIcon = 983355; // decimal converted charCode of Unicode 'demosync' character
		const actualPlayCircleIcon = screen.getByRole('group').children.item(2).children.item(1).children.item(0).textContent.codePointAt();
		const expectedPlayCircleIcon = 983312; // decimal converted charCode of Unicode 'playcircle' character

		expect(actualHomeIcon).toBe(expectedHomeIcon);
		expect(actualDemosyncIcon).toBe(expectedDemosyncIcon);
		expect(actualPlayCircleIcon).toBe(expectedPlayCircleIcon);
	});

	test('should disable the list icon when collapsed and all tabs are disabled', () => {
		render(
			<TabGroup
				data-testid="tabGroup"
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: true},
					{title: 'Item', disabled: true}
				]}
			/>
		);
		const iconList = screen.getByTestId('tabGroup').children.item(0);

		expect(iconList).toHaveAttribute('aria-disabled', 'true');
	});

	test('should not disable the list icon when collapsed and all tabs are not disabled', () => {
		render(
			<TabGroup
				data-testid="tabGroup"
				collapsed
				orientation="vertical"
				tabs={[
					{title: 'Home', disabled: true},
					{title: 'Button', disabled: false},
					{title: 'Item', disabled: true}
				]}
			/>
		);
		const iconList = screen.getByTestId('tabGroup').children.item(0);

		expect(iconList).toHaveAttribute('aria-disabled', 'false');
	});
});
