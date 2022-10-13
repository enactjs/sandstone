import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {useState} from 'react';

import Item from '../../Item';
import {Header, Panel} from '../../Panels';

import FixedPopupPanels from '../FixedPopupPanels';

const keyDown = (keyCode) => (elm) => fireEvent.keyDown(elm, {keyCode});
const leftKeyDown = keyDown(37);

const FloatingLayerController = FloatingLayerDecorator('div');

const CustomFixedPopupPanels = ({defaultIndex}) => {
	const [index, setIndex] = useState(defaultIndex);

	return (
		<FloatingLayerController>
			<FixedPopupPanels index={index} open rtl={false}>
				<Panel>
					<Header>
						<title>This is the first panel</title>
					</Header>
					<Item onKeyDown={() => setIndex(index + 1)}>Example Item 1</Item>
					<Item>Example Item 2</Item>
				</Panel>
				<Panel>
					<Header>
						<title>This is the second panel</title>
					</Header>
					<Item onKeyDown={() => setIndex(index - 1)}>Example Item 1 on Panel 2</Item>
				</Panel>
			</FixedPopupPanels>
		</FloatingLayerController>
	);
};

describe('FixedPopupPanels', () => {
	test('should have the default width when nothing is assigned', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have narrow width applied when width="narrow"', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="narrow" />
			</FloatingLayerController>
		);

		const expected = 'narrow';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have half width applied when width="half"', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" open width="half" />
			</FloatingLayerController>
		);

		const expected = 'half';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should correctly assign the fullHeight class', function () {
		render(
			<FloatingLayerController>
				<FixedPopupPanels data-testid="panels-id" fullHeight open />
			</FloatingLayerController>
		);

		const expected = 'fullHeight';
		const actual = screen.getByTestId('panels-id').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should close on back key', () => {
		const map = {};

		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});
		const handleClose = jest.fn();

		render(
			<FloatingLayerController>
				<FixedPopupPanels onClose={handleClose} open />
			</FloatingLayerController>
		);

		map.keyup({type: 'keyup', currentTarget: window, keyCode: 27});

		const expectedEvent = {type: 'onClose'};
		const actualEvent = handleClose.mock.calls.length && handleClose.mock.calls[0][0];

		expect(handleClose).toHaveBeenCalled();
		expect(actualEvent).toMatchObject(expectedEvent);
	});

	test('should navigate to the first panel on arrow left key',  function () {
		render(<CustomFixedPopupPanels defaultIndex={1} />);

		leftKeyDown(screen.getByText('Example Item 1 on Panel 2'));

		expect(screen.getByText('This is the first panel')).toBeInTheDocument();
	});
});
