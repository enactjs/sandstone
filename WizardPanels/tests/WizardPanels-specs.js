import '@testing-library/jest-dom';
import {getByLabelText, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Panel, WizardPanels} from '../';

describe('WizardPanel Specs', () => {
	test(
		'should have title in `Header`',
		() => {
			const title = 'WizardPanel title';
			const {getByText} = render(
				<WizardPanels title={title}>
					<Panel />
				</WizardPanels>
			);

			const expected = 'heading title';
			const actual = getByText(title).parentElement.parentElement;

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should have title overridden by title set in `View`',
		() => {
			const wizardTitle = 'WizardPanel title';
			const viewTitle = 'View title';
			const {getByLabelText} = render(
				<WizardPanels title={wizardTitle}>
					<Panel title={viewTitle} />
				</WizardPanels>
			);

			const headerTitle = getByLabelText('step 1 View title undefined');

			expect(headerTitle).toHaveClass('wizard');
		}
	);

	test(
		'should have subtitle from `View`',
		() => {
			const viewSubtitle = 'View subtitle';
			const {getByText} = render(
				<WizardPanels>
					<Panel subtitle={viewSubtitle} />
				</WizardPanels>
			);

			const expected = 'subtitle';
			const actual = getByText(viewSubtitle);

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should have View buttons rendered in footer',
		() => {
			const {getAllByRole} = render(
				<WizardPanels>
					<Panel>
						<footer>
							<button>Button 1</button>
							<button>Button 2</button>
						</footer>
					</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');
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
			const {getByText} = render(
				<WizardPanels>
					<Panel>
						{contentText}
					</Panel>
				</WizardPanels>
			);

			const expected = 'content';
			const actual = getByText(contentText).parentElement.parentElement;

			expect(actual).toHaveClass(expected);
		}
	);

	test(
		'should not hide next button on the last view when `nextButtonVisibility` prop is set to "always"',
		() => {
			const {getAllByRole} = render(
				<WizardPanels index={2} nextButtonVisibility="always">
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last</Panel>
				</WizardPanels>
			);

			const expected = 'Next';
			const actual = getAllByRole('button')[1];

			expect(actual).toHaveAttribute('aria-label', expected);
		}
	);

	test(
		'should hide next button on the last view',
		() => {
			const {getAllByRole} = render(
				<WizardPanels index={2}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should hide previous button on the first view',
		() => {
			const {getAllByRole, unmount} = render(
				<WizardPanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should show next button on the first view',
		async () => {
			const {getByLabelText} = render(
				<WizardPanels index={0}>
					<Panel>I gots contents</Panel>
					<Panel>I gots contents2</Panel>
					<Panel>Last!</Panel>
				</WizardPanels>
			);

			const nextButton = getByLabelText('Next');

			await waitFor(() => {
				expect(nextButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should not hide previous button on the first view when `prevButton` prop is added on the first Panel',
		async () => {
			const {getByLabelText} = render(
				<WizardPanels index={0}>
					<Panel prevButton>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const prevButton = getByLabelText('Previous');

			await waitFor(() => {
				expect(prevButton).toBeInTheDocument();
			});
		}
	);

	test(
		'should hide next nextButton on all the panels with `nextButtonVisibility` set to never',
		() => {
			const {getAllByRole, rerender, unmount} = render(
				<WizardPanels index={2} nextButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel3Buttons = getAllByRole('button');

			unmount();
			expect(panel3Buttons.length).toBe(1);
			expect(panel3Buttons[0]).not.toHaveAttribute('aria-label', 'Next');

			rerender(
				<WizardPanels index={1} nextButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel2Buttons = getAllByRole('button');

			unmount();
			expect(panel2Buttons.length).toBe(1);
			expect(panel2Buttons[0]).not.toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should hide previous button on all the panels with `prevButtonVisibility` set to never',
		() => {
			const {getAllByRole, rerender, unmount} = render(
				<WizardPanels index={0} prevButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel1Buttons = getAllByRole('button');

			unmount();
			expect(panel1Buttons.length).toBe(1);
			expect(panel1Buttons[0]).not.toHaveAttribute('aria-label', 'Previous');

			rerender(
				<WizardPanels index={1} prevButtonVisibility="never">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const panel2Buttons = getAllByRole('button');

			unmount();
			expect(panel2Buttons.length).toBe(1);
			expect(panel2Buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should hide previous button on the second Panel when panel overrides',
		() => {
			const {getAllByRole, unmount} = render(
				<WizardPanels defaultIndex={1}>
					<Panel>Panel 1</Panel>
					<Panel prevButton={false}>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should show previous button on the first view when `prevButtonVisibility` prop is set to always',
		() => {
			const {getAllByRole, unmount} = render(
				<WizardPanels index={0} prevButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[0]).toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should hide previous button on the first view when `prevButtonVisibility` prop is set to always and panel overrides',
		() => {
			const {getAllByRole, unmount} = render(
				<WizardPanels index={0} prevButtonVisibility="always">
					<Panel prevButton={false} >Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Previous');
		}
	);

	test(
		'should show next button on the last view when `nextButtonVisibility` prop is set to always',
		async () => {
			const {getAllByRole, unmount} = render(
				<WizardPanels index={2} nextButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 2;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[1]).toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should hide next button on the last view when `nextButtonVisibility` prop is set to always and panel overrides',
		async () => {
			const {getAllByRole, unmount} = render(
				<WizardPanels index={2} nextButtonVisibility="always">
					<Panel>Panel 1</Panel>
					<Panel>Panel 2</Panel>
					<Panel nextButton={false}>Panel 3</Panel>
				</WizardPanels>
			);

			const buttons = getAllByRole('button');

			const expected = 1;
			const actual = buttons.length;

			unmount();
			expect(actual).toBe(expected);
			expect(buttons[0]).not.toHaveAttribute('aria-label', 'Next');
		}
	);

	test(
		'should fire onWillTransition with target index',
		() => {
			const spy = jest.fn();
			let index = 0;
			const {rerender, unmount} = render(
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

			unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should fire onTransition with target index',
		() => {
			const spy = jest.fn();
			let index = 0;
			const {rerender, unmount} = render(
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

			unmount();
			expect(actual).toMatchObject(expected);
		}
	);

	test(
		'should advance on next click',
		async () => {
			const {getByLabelText, getByText} = render(
				<WizardPanels index={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const nextButton = getByLabelText('Next');

			await waitFor(() => {
				userEvent.click(nextButton);

				const actual = getByText('2');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on prev click',
		async () => {
			const {getByLabelText, getByText} = render(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const prevButton = getByLabelText('Previous');

			await waitFor(() => {
				userEvent.click(prevButton);

				const actual = getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key',
		async () => {
			const {getByText} = render(
				<WizardPanels defaultIndex={1}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key when prevButtonVisibility set to show never',
		async () => {
			const {getByText} = render(
				<WizardPanels defaultIndex={1} prevButtonVisibility="never">
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should go back on back key when onBack does not call preventDefault',
		async () => {
			const spy = jest.fn();
			const {getByText} = render(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = getByText('1');

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should not go back on back key when onBack calls preventDefault',
		async () => {
			const spy = jest.fn((ev) => ev.preventDefault());
			const {getByText} = render(
				<WizardPanels defaultIndex={1} onBack={spy}>
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				userEvent.keyboard('{esc}');

				const actual = getByText('2');

				expect(actual).toHaveClass('current');
			});
		}
	);

	// test(
	// 	'should support noAnimation',
	// 	() => {
			// const {getByText, debug} = render(
			// 	<WizardPanelsBase noAnimation>
			// 		<Panel />
			// 	</WizardPanelsBase>
			// );

			// debug()
		// 	// FIXME: Temporary selector until our components have corrected display names
		// 	const viewManager = '.content > *';
		// 	const wizardPanel = shallow(
		// 		<WizardPanelsBase>
		// 			<Panel />
		// 		</WizardPanelsBase>
		// 	);
		//
		// 	let actual = wizardPanel.find(viewManager).prop('noAnimation');
		// 	expect(actual).toBeFalsy();
		//
		// 	wizardPanel.setProps({noAnimation: true});
		//
		// 	actual = wizardPanel.find(viewManager).prop('noAnimation');
		// 	expect(actual).toBe(true);
		// }
	// );

	test(
		'should reflect the current index in Steps when "current" is not specified',
		async () => {
			const index = 1;
			const {getByText} = render(
				<WizardPanels index={index}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				const actual = getByText(index + 1);

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should reflect the specified index in Steps when "current" is set',
		async () => {
			const current = 3;
			const {getByText} = render(
				<WizardPanels index={0} current={current}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			await waitFor(() => {
				const actual = getByText(current);

				expect(actual).toHaveClass('current');
			});
		}
	);

	test(
		'should reflect the total views in Steps when "total" is not specified',
		async () => {
			const {getByText} = render(
				<WizardPanels>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const steps = getByText('1' && '2' && '3' && '4' && '5')

			await waitFor(() => {
				expect(steps).toBeInTheDocument();
			});
		}
	);

	test(
		'should reflect the specified total in Steps when "total" is set',
		async () => {
			const total = 3;
			const {getByText} =  render(
				<WizardPanels index={1} current={1} total={total}>
					<Panel />
					<Panel />
					<Panel />
					<Panel />
					<Panel />
				</WizardPanels>
			);

			const steps = getByText('1' && '2' && '3')

			await waitFor(() => {
				expect(steps).toBeInTheDocument();
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
