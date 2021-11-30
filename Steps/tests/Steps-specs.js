import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {StepsBase as Steps} from '../Steps';

describe('Steps Specs', () => {

	test('should render two steps with no props specified', () => {
		render(<Steps />);
		const firstStep = screen.getByText('1');
		const secondStep = screen.getByText('2');


		expect(firstStep).toBeInTheDocument();
		expect(secondStep).toBeInTheDocument();
	});

	test('should indicate a two step process with no props specified', () => {
		render(<Steps />);
		const actual = screen.getByRole('list').children;

		const expected = 2;

		expect(actual).toHaveLength(expected);
	});

	test('should render six steps with `total` set to 6', () => {
		render(<Steps total={6} />);
		const firstStep = screen.getByText('1');
		const secondStep = screen.getByText('2');
		const thirdStep = screen.getByText('3');
		const fourthStep = screen.getByText('4');
		const fifthStep = screen.getByText('5');
		const sixthStep = screen.getByText('6');

		expect(firstStep).toBeInTheDocument();
		expect(secondStep).toBeInTheDocument();
		expect(thirdStep).toBeInTheDocument();
		expect(fourthStep).toBeInTheDocument();
		expect(fifthStep).toBeInTheDocument();
		expect(sixthStep).toBeInTheDocument();
	});

	test('should indicate a 6 step process with `total` set to 6', () => {
		render(<Steps total={6} />);
		const steps = screen.getByRole('list').children;

		const expected = 6;

		expect(steps).toHaveLength(expected);
	});

	test('should correctly set the `size`', () => {
		render(<Steps size="medium" />);
		const firstStepElement = screen.getByText('1');

		const expected = 'medium'; // `size` actually comes from Icon, which we aren't accessing, so we use the bare class name.

		expect(firstStepElement).toHaveClass(expected);
	});

	test('should correctly indicate the `current` even if that\'s the only prop set', () => {
		render(<Steps current={2} />);
		const firstStepElement = screen.getByText('✓');
		const secondStepElement = screen.getByText('2');

		const expected = 'current';

		expect(firstStepElement).not.toHaveClass(expected);
		expect(secondStepElement).toHaveClass(expected);
	});

	test('should support custom `pastIcon`', () => {
		render(<Steps current={2} total={3} pastIcon="bookmark" />);
		const pastStepIcon = screen.getByRole('list').children.item(0).textContent.codePointAt();

		const expected = 983364; // decimal converted charCode of Unicode 'bookmark' character

		expect(pastStepIcon).toBe(expected);
	});

	test('should support custom `currentIcon`', () => {
		render(<Steps current={2} total={3} currentIcon="edit" />);
		const currentStepIcon = screen.getByRole('list').children.item(1).textContent.codePointAt();

		const expected = 983369; // decimal converted charCode of Unicode 'edit' character

		expect(currentStepIcon).toBe(expected);
	});

	test('should support custom `futureIcon`', () => {
		render(<Steps current={2} total={3} futureIcon="arrowup" />);
		const futureStepIcon = screen.getByRole('list').children.item(2).textContent.codePointAt();

		const expected = 8593; // decimal converted charCode of Unicode 'arrowup' character

		expect(futureStepIcon).toBe(expected);
	});

	test('should support numeric step identifier for `pastIcon`', () => {
		render(<Steps current={2} total={3} pastIcon="numbers" />);
		const pastIcon = screen.getByRole('list').children.item(0).textContent;

		const expected = '1';

		expect(pastIcon).toBe(expected);
	});

	test('should support numeric step identifier for `currentIcon`', () => {
		render(<Steps current={2} total={3} currentIcon="numbers" />);
		const currentIcon = screen.getByRole('list').children.item(1).textContent;

		const expected = '2';

		expect(currentIcon).toBe(expected);
	});

	test('should support numeric step identifier for `futureIcon`', () => {
		render(<Steps current={2} total={3} futureIcon="numbers" />);
		const futureIcon = screen.getByRole('list').children.item(2).textContent;

		const expected = '3';

		expect(futureIcon).toBe(expected);
	});

	test('should support number for `skip` prop', () => {
		render(<Steps skip={2} current={3} total={5} />);
		const skippedStep = screen.getByRole('list').children.item(1);

		const expected = 'skip';

		expect(skippedStep.className).toContain(expected);
	});

	test('should support custom `skipIcon`', () => {
		render(<Steps skip={2} skipIcon="skip" current={3} total={5} />);
		const skippedStepIcon = screen.getByRole('list').children.item(1).textContent.codePointAt();

		const expected = 983017; // decimal converted charCode of Unicode 'skip' character

		expect(skippedStepIcon).toBe(expected);
	});

	test('should support array of numbers for `skip` prop', () => {
		const expected = 'testIconName';

		render(<Steps skip={[2, 4]} skipIcon={expected} current={3} total={5} />);
		const secondSkippedStep = screen.getByRole('list').children.item(1).textContent;
		const fourthSkippedStep = screen.getByRole('list').children.item(3).textContent;

		expect(secondSkippedStep).toBe(expected);
		expect(fourthSkippedStep).toBe(expected);
	});

	test('should not show a skip icon if the `current` step is in the skip list', () => {
		render(<Steps skip={[2, 3]} skipIcon="testIconName" current={3} currentIcon="numbers" total={5} />);
		const currentStep = screen.getByRole('list').children.item(2).textContent;

		const expected = '3';

		expect(currentStep).toBe(expected);
	});
});
