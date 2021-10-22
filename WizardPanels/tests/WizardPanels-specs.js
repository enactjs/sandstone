import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Panel, WizardPanels} from '../';

describe('WizardPanel Specs', () => {
	test(
		'should have title in `Header`',
		() => {
			const title = 'WizardPanel title';
			render(
				<WizardPanels title={title}>
					<Panel />
				</WizardPanels>
			);

			const expected = 'heading title';
			const actual = screen.getByText(title).parentElement.parentElement;

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should have title overridden by title set in `View`',
		() => {
			const wizardTitle = 'WizardPanel title';
			const viewTitle = 'View title';
			render(
				<WizardPanels title={wizardTitle}>
					<Panel title={viewTitle} />
				</WizardPanels>
			);

			const headerTitle = screen.queryByText(viewTitle);

			expect(headerTitle).toBeInTheDocument();
			expect(headerTitle.parentElement.parentElement).toHaveClass('title');
		}
	);

	test(
		'should have subtitle from `View`',
		() => {
			const viewSubtitle = 'View subtitle';
			render(
				<WizardPanels>
					<Panel subtitle={viewSubtitle} />
				</WizardPanels>
			);

			const expected = 'subtitle';
			const actual = screen.getByText(viewSubtitle);

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should have View buttons rendered in footer',
		() => {
			render(
				<WizardPanels>
					<Panel>
						<footer>
							<button>Button 1</button>
							<button>Button 2</button>
						</footer>
					</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');
			const prevButtonContainer = buttons[0].parentElement;
			const nextButtonContainer = buttons[1].parentElement;

			const expected = 2;
			const actual = buttons.length;

			expect(actual).toBe(expected);
			expect(prevButtonContainer).toHaveClass('footer');
			expect(nextButtonContainer).toHaveClass('footer');
		}
	);

	test(
		'should have View contents rendered in `.content`',
		() => {
			const contentText = 'content';
			render(
				<WizardPanels>
					<Panel>
						{contentText}
					</Panel>
				</WizardPanels>
			);

			const expected = 'content';
			const actual = screen.getByText(contentText).parentElement.parentElement;

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should not hide next button on the last view when `nextButton` prop is added on the last Panel',
		async () => {
			render(
				<WizardPanels index={2}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel nextButton>Last</Panel>
				</WizardPanels>
			);

			const expected = 'Next';
			const actual = screen.getAllByRole('button')[1];

			await waitFor(() => {
				expect(actual).toHaveAttribute('aria-label', expected);
			});
		}
	);

	test(
		'should hide next button on the last view',
		() => {
			render(
				<WizardPanels index={2}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should hide previous button on the first view',
		async () => {
			render(
				<WizardPanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
			});
		}
	);

	test(
		'should show next button on the first view',
		async () => {
			render(
				<WizardPanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const nextButton = screen.getByLabelText('Next');

			await waitFor(() => {
				expect(nextButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should not hide previous button on the first view when `prevButton` prop is added on the first Panel',
		async () => {
			render(
				<WizardPanels index={0}>
					<Panel prevButton>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = screen.getByLabelText('Previous');

			await waitFor(() => {
				expect(prevButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should hide next nextButton on all the panels with `nextButtonVisibility` set to never',
		async () => {
			const {rerender} = render(
				<WizardPanels index={2} nextButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel3Buttons = screen.getAllByRole('button');

			await waitFor(() => {
				expect(panel3Buttons.length).toBe(1);
				expect(panel3Buttons[0]).not.toHaveAttribute('aria-label', 'Next');
			});

			rerender(
				<WizardPanels index={1} nextButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel2Buttons = screen.getAllByRole('button');

			await waitFor(() => {
				expect(panel2Buttons.length).toBe(1);
				expect(panel2Buttons[0]).not.toHaveAttribute('aria-label', 'Next');
			});
		}
	);

	test(
		'should hide previous button on all the panels with `prevButtonVisibility` set to never',
		async () => {
			const {rerender} = render(
				<WizardPanels index={0} prevButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel1Buttons = screen.getAllByRole('button');

			await waitFor(() => {
				expect(panel1Buttons.length).toBe(1);
				expect(panel1Buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
			});

			rerender(
				<WizardPanels index={1} prevButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel2Buttons = screen.getAllByRole('button');

			await waitFor(() => {
				expect(panel2Buttons.length).toBe(1);
				expect(panel2Buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
			});
		}
	);

	test(
		'should hide previous button on the second Panel when panel overrides',
		async () => {
			render(
				<WizardPanels defaultIndex={1}>
					<Panel>Panel 1</Panel>
					<Panel prevButton={false}>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
			});
		}
	);

	test(
		'should show previous button on the first view when `prevButtonVisibility` prop is set to always',
		async () => {
			render(
				<WizardPanels index={0} prevButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[0]).toHaveAttribute('aria-label', 'Previous');
			});
		}
	);

	test(
		'should hide previous button on the first view when `prevButtonVisibility` prop is set to always and panel overrides',
		async () => {
			render(
				<WizardPanels index={0} prevButtonVisibility="always">
					<Panel prevButton={false} >Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
			});
		}
	);

	test(
		'should show next button on the last view when `nextButtonVisibility` prop is set to always',
		async () => {
			render(
				<WizardPanels index={2} nextButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[1]).toHaveAttribute('aria-label', 'Next');
			});
		}
	);

	test(
		'should hide next button on the last view when `nextButtonVisibility` prop is set to always and panel overrides',
		async () => {
			render(
				<WizardPanels index={2} nextButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel nextButton={false}>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = screen.getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
				expect(buttons[0]).not.toHaveAttribute('aria-label', 'Next');
			});
		}
	);

	test(
		'should fire onWillTransition with target index',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<WizardPanels index={index} onWillTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<WizardPanels index={index} onWillTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			const expected = {index};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should fire onTransition with target index',
		async () => {
			const spy = jest.fn();
			let index = 0;
			const {rerender} = render(
				<WizardPanels index={index} onTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			spy.mockClear();
			index++;

			rerender(
				<WizardPanels index={index} onTransition={spy} noAnimation>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
				</WizardPanels>
			);

			const expected = {index};
			const actual = spy.mock.calls.length && spy.mock.calls[0][0];

			await waitFor(() => {
				expect(actual).toMatchObject(expected);
			});
		}
	);

	test(
		'should advance on next click',
		async () => {
			render(
				<WizardPanels index={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const nextButton = screen.getByLabelText('Next');

			await waitFor(() => {
				userEvent.click(nextButton);

				const actual = screen.getByText('2');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on prev click',
		async () => {
			render(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const prevButton = screen.getByLabelText('Previous');

			await waitFor(() => {
				userEvent.click(prevButton);

				const actual = screen.getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key',
		async () => {
			render(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = screen.getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key when prevButtonVisibility set to show never',
		async () => {
			render(
				<WizardPanels defaultIndex={1} prevButtonVisibility="never">
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = screen.getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key when onBack does not call preventDefault',
		async () => {
			const spy = jest.fn();
			render(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = screen.getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should not go back on back key when onBack calls preventDefault',
		async () => {
			const spy = jest.fn((ev) => ev.preventDefault());
			render(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = screen.getByText('2');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should support noAnimation',
		() => {
			const viewSubtitle = 'View subtitle';
			render(
				<WizardPanels noAnimation>
					<Panel subtitle={viewSubtitle} />
				</WizardPanels>
			);

			// check if animation container exists
			const notExpected = 'titleContainer';
			const actual = screen.getByText(viewSubtitle).parentElement;

			expect(actual).not.toHaveClass(notExpected);
		}
	);

	test(
		'should reflect the current index in Steps when "current" is not specified',
		async () => {
			const index = 1;
			render(
				<WizardPanels index={index}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				const actual = screen.getByText(index + 1);

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should reflect the specified index in Steps when "current" is set',
		async () => {
			const current = 3;
			render(
				<WizardPanels index={0} current={current}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				const actual = screen.getByText(current);

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should reflect the total views in Steps when "total" is not specified',
		async () => {
			render(
				<WizardPanels>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const expected = 5;
			const actual = screen.getByRole('list').children.length;

			await waitFor(() => {
				expect(actual).toBe(expected);
			});
		}
	);

	test(
		'should reflect the specified total in Steps when "total" is set',
		async () => {
			const total = 3;
			render(
				<WizardPanels index={1} current={1} total={total}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const steps = screen.getByRole('list').children.length;

			await waitFor(() => {
				expect(steps).toBe(total);
			});
		}
	);

	test(
		'should return a ref to the root Panel node',
		() => {
			const ref = jest.fn();
			render(
				<WizardPanels ref={ref}>
					<Panel />
				</WizardPanels>
			);

			const expected = 'ARTICLE';
			const actual = ref.mock.calls[0][0].nodeName;

			expect(actual).toBe(expected);
		}
	);
});
