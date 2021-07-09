import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {StepsBase as Steps} from '../Steps';

describe('Steps Specs', () => {

	test('should render two steps with no props specified', () => {
		const {getByText} = render(<Steps />);
		const steps = getByText('1' && '2');

		expect(steps).toBeInTheDocument();
	});

	test('should indicate a two step process with no props specified', () => {
		const {getByRole} = render(<Steps />);
		const actual = getByRole('list').children;

		const expected = 2;

		expect(actual).toHaveLength(expected);
	});

	test('should render six steps with `total` set to 6', () => {
		const {getByText} = render(<Steps total={6} />);
		const steps = getByText('1' && '2' && '3' && '4' && '5' && '6');

		expect(steps).toBeInTheDocument();
	});

	test('should indicate a 6 step process with `total` set to 6', () => {
		const {getByRole} = render(<Steps total={6} />);
		const steps = getByRole('list').children;

		const expected = 6;

		expect(steps).toHaveLength(expected);
	});

	test('should correctly set the `size`', () => {
		const {getByRole} = render(<Steps size="medium" />);
		const firstStepElement = getByRole('list').children.item(0).className;

		const expected = 'medium'; // `size` actually comes from Icon, which we aren't accessing, so we use the bare class name.

		expect(firstStepElement).toContain(expected);
	});

	test('should correctly indicate the `current` even if that\'s the only prop set', () => {
		const {getByText} = render(<Steps current={2} />);
		const firstStepElement = getByText('✓');
		const secondStepElement = getByText('2');

		const expected = 'current';

		expect(firstStepElement.className).not.toContain(expected);
		expect(secondStepElement.className).toContain(expected);
	});

	test('should support custom `pastIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} pastIcon="bookmark" />);
		const pastStepIcon = getByRole('list').children.item(0).textContent.codePointAt();

		const expected = 983364; // decimal converted charCode of Unicode 'bookmark' character

		expect(pastStepIcon).toBe(expected);
	});

	test('should support custom `currentIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} currentIcon="edit" />);
		const currentStepIcon = getByRole('list').children.item(1).textContent.codePointAt();

		const expected = 983369; // decimal converted charCode of Unicode 'edit' character

		expect(currentStepIcon).toBe(expected);
	});

	test('should support custom `futureIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} futureIcon="arrowup" />);
		const futureStepIcon = getByRole('list').children.item(2).textContent.codePointAt();

		const expected = 8593; // decimal converted charCode of Unicode 'arrowup' character

		expect(futureStepIcon).toBe(expected);
	});

	test('should support numeric step identifier for `pastIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} pastIcon="numbers" />);
		const pastIcon = getByRole('list').children.item(0).textContent;

		const expected = '1';

		expect(pastIcon).toBe(expected);
	});

	test('should support numeric step identifier for `currentIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} currentIcon="numbers" />);
		const currentIcon = getByRole('list').children.item(1).textContent;

		const expected = '2';

		expect(currentIcon).toBe(expected);
	});

	test('should support numeric step identifier for `futureIcon`', () => {
		const {getByRole} = render(<Steps current={2} total={3} futureIcon="numbers" />);
		const futureIcon = getByRole('list').children.item(2).textContent;

		const expected = '3';

		expect(futureIcon).toBe(expected);
	});

	test('should support number for `skip` prop', () => {
		const {getByRole} = render(<Steps skip={2} current={3} total={5} />);
		const skippedStep = getByRole('list').children.item(1);

		const expected = 'skip';

		expect(skippedStep.className).toContain(expected);
	});

	test('should support custom `skipIcon`', () => {
		const {getByRole} = render(<Steps skip={2} skipIcon="skip" current={3} total={5} />);
		const skippedStepIcon = getByRole('list').children.item(1).textContent.codePointAt();

		const expected = 983017; // decimal converted charCode of Unicode 'skip' character

		expect(skippedStepIcon).toBe(expected);
	});

	test('should support number for `skip` prop', () => {
		const expected = 'testIconName';

		const {getByRole} = render(<Steps skip={2} skipIcon={expected} current={3} total={5} />);
		const skipStep = getByRole('list').children.item(1).textContent;

		expect(skipStep).toBe(expected);
	});

	test('should support array of numbers for `skip` prop', () => {
		const expected = 'testIconName';

		const {getByRole} = render(<Steps skip={[2, 4]} skipIcon={expected} current={3} total={5} />);
		const secondSkippedStep = getByRole('list').children.item(1).textContent;
		const forthSkippedStep = getByRole('list').children.item(3).textContent;

		expect(secondSkippedStep).toBe(expected);
		expect(forthSkippedStep).toBe(expected);
	});

	test('should not show a skip icon if the `current` step is in the skip list', () => {
		const {getByRole} = render(<Steps skip={[2, 3]} skipIcon="testIconName" current={3} currentIcon="numbers" total={5} />);
		const currentStep = getByRole('list').children.item(2).textContent;

		const expected = '3';

		expect(currentStep).toBe(expected);
	});
});
