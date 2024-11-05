import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react';

import Scroller from '../Scroller';

const focus = (elm) => fireEvent.focus(elm);

const keyDownUp = (keyCode) => (elm) => {
	fireEvent.keyDown(elm, {keyCode});
	return fireEvent.keyUp(elm, {keyCode});
};

const pressEnterKey = keyDownUp(14);
const pressDownKey = keyDownUp(40);

describe('Scroller', () => {
	let contents;

	beforeEach(() => {
		contents = (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
				Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
			</div>
		);
	});

	afterEach(() => {
		contents = null;
	});

	describe('Scrollbar visibility', () => {
		test(
			'should render both horizontal and vertical scrollbars when \'horizontalScrollbar\' and \'verticalScrollbar\' are "visible"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const verticalScrollbar = screen.getByLabelText('scroll up or down with up down button');
				const horizontalScrollbar = screen.getByLabelText('scroll left or right with left right button');

				expect(verticalScrollbar).toBeInTheDocument();
				expect(horizontalScrollbar).toBeInTheDocument();
			}
		);

		test(
			'should render only vertical scrollbar when \'verticalScrollbar\' is "visible" and \'horizontalScrollbar\' is "hidden"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const verticalScrollbar = screen.getByLabelText('scroll up or down with up down button');
				const horizontalScrollbar = screen.queryByLabelText('scroll left or right with left right button');

				expect(verticalScrollbar).toBeInTheDocument();
				expect(horizontalScrollbar).toBeNull();
			}
		);

		test(
			'should not render any scrollbar when \'horizontalScrollbar\' and \'verticalScrollbar\' are "hidden"',
			() => {
				render(
					<Scroller
						horizontalScrollbar="hidden"
						verticalScrollbar="hidden"
					>
						{contents}
					</Scroller>
				);

				const verticalScrollbar = screen.queryByLabelText('scroll up or down with up down button');
				const horizontalScrollbar = screen.queryByLabelText('scroll left or right with left right button');

				expect(verticalScrollbar).toBeNull();
				expect(horizontalScrollbar).toBeNull();
			}
		);
	});

	describe('focusable Scrollbar', () => {
		test('should have focuable body and thumb when \'focusableScrollbar\' is "byEnter"',
			() => {
				const id = 'scroller';

				render(
					<Scroller
						data-testid={id}
						focusableScrollbar="byEnter"
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const scroller = screen.getByTestId(id);
				const scrollBody = scroller.children.item(0);
				const verticalScrollbar = screen.getByLabelText("scroll up or down with up down button press ok button to read text");

				const expected = "spottable";

				// dispatching key event to increase code coverage
				focus(verticalScrollbar);
				pressDownKey(verticalScrollbar);
				pressEnterKey(verticalScrollbar);

				expect(scrollBody).toHaveClass(expected);
				expect(verticalScrollbar).toHaveClass(expected);
			}
		);

		test('should have focuable scroll thumb when \'focusableScrollbar\' is true',
			() => {
				const id = 'scroller';

				render(
					<Scroller
						data-testid={id}
						focusableScrollbar
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const scroller = screen.getByTestId(id);
				const scrollBody = scroller.children.item(0);
				const verticalScrollbar = screen.getByLabelText("scroll up or down with up down button");

				const expected = "spottable";

				expect(scrollBody).not.toHaveClass(expected);
				expect(verticalScrollbar).toHaveClass(expected);
			}
		);
	});

	describe('Scrollbar accessibility', () => {
		test(
			'should set a custom "aria-label" to the scroll thumb in the horizontal scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						horizontalScrollThumbAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const horizontalScrollbarLabel = screen.getByLabelText(label);
				const horizontalScrollbar = screen.getByLabelText(label).parentElement.parentElement;

				expect(horizontalScrollbarLabel).toBeInTheDocument();
				expect(horizontalScrollbar).toHaveClass('horizontal');
			}
		);

		test(
			'should set a custom "aria-label" to the scroll thumb in the vertical scroll bar',
			() => {
				const label = 'custom button aria label';
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollThumbAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const verticalScrollbarLabel = screen.getByLabelText(label);
				const verticalScrollbar = screen.getByLabelText(label).parentElement.parentElement;

				expect(verticalScrollbarLabel).toBeInTheDocument();
				expect(verticalScrollbar).toHaveClass('vertical');
			}
		);

		test(
			'should set a null string "aria-label" to the scroll thumb in the horizontal scroll bar',
			() => {
				const label = '';
				render(
					<Scroller
						horizontalScrollbar="visible"
						horizontalScrollThumbAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const horizontalScrollbarLabel = screen.getByLabelText(label);
				const horizontalScrollbar = screen.getByLabelText(label).parentElement.parentElement;

				expect(horizontalScrollbarLabel).toBeInTheDocument();
				expect(horizontalScrollbar).toHaveClass('horizontal');
			}
		);

		test(
			'should set a null string "aria-label" to the scroll thumb in the vertical scroll bar',
			() => {
				const label = '';
				render(
					<Scroller
						horizontalScrollbar="visible"
						verticalScrollThumbAriaLabel={label}
						verticalScrollbar="visible"
					>
						{contents}
					</Scroller>
				);

				const verticalScrollbarLabel = screen.getByLabelText(label);
				const verticalScrollbar = screen.getByLabelText(label).parentElement.parentElement;

				expect(verticalScrollbarLabel).toBeInTheDocument();
				expect(verticalScrollbar).toHaveClass('vertical');
			}
		);
	});
});
