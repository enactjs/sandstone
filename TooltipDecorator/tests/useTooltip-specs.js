import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';

import Button from '../../Button';

import {defaultScreenEdgeKeepout, useTooltip} from "../useTooltip";

const FloatingLayerController = FloatingLayerDecorator('div');

describe('useTooltip', () => {
	const TooltipButton = ({
		screenEdgeKeepout = defaultScreenEdgeKeepout,
		children,
		...rest
	}) => {
		const {tooltip, handlers, restProps} = useTooltip({screenEdgeKeepout, ...rest});

		if (tooltip) {
			restProps.children = [children, tooltip];
		}

		return <Button {...restProps} {...handlers} />;
	};

	describe('Tooltip', () => {
		beforeEach(() => {
			global.Element.prototype.getBoundingClientRect = jest.fn(() => {
				return {
					width: 501,
					height: 501,
					top: 99,
					left: 99,
					bottom: 0,
					right: 0
				};
			});
		});

		test('should render a tooltip if hovered', async () => {
			const tooltipText = 'Tooltip';
			render(
				<FloatingLayerController>
					<TooltipButton tooltipDelay={0} tooltipText={tooltipText}>Label</TooltipButton>
				</FloatingLayerController>
			);

			const button = screen.getByRole('button');
			act(() => button.focus());
			fireEvent.mouseOver(button);

			await waitFor(() => {
				expect(screen.getByText('Tooltip')).toBeInTheDocument();
			});
		});

		test('should hide tooltip if not hovered', async () => {
			const tooltipText = 'Tooltip';
			render(
				<FloatingLayerController>
					<TooltipButton tooltipDelay={0} tooltipText={tooltipText}>Label</TooltipButton>
				</FloatingLayerController>
			);

			const button = screen.getByRole('button');
			act(() => button.focus());
			fireEvent.mouseOver(button);

			await waitFor(() => {
				expect(screen.getByText('Tooltip')).toBeInTheDocument();
			});

			act(() => button.blur());
			fireEvent.mouseOut(button);

			await waitFor(() => {
				expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();
			});
		});

		test('should hide tooltip if not hovered (disabled)', async () => {
			const tooltipText = 'Tooltip';
			render(
				<FloatingLayerController>
					<TooltipButton tooltipDelay={0} tooltipText={tooltipText} disabled>Label</TooltipButton>
				</FloatingLayerController>
			);

			const button = screen.getByRole('button');

			expect(button).toHaveAttribute('disabled');

			act(() => button.focus());
			fireEvent.mouseOver(button);

			await waitFor(() => {
				expect(screen.getByText('Tooltip')).toBeInTheDocument();
			});

			act(() => button.blur());
			fireEvent.mouseOut(button);

			await waitFor(() => {
				expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();
			});
		});

		test('should render a tooltip if keydown', async () => {
			const tooltipText = 'Tooltip';
			render(
				<FloatingLayerController>
					<TooltipButton tooltipDelay={0} tooltipText={tooltipText}>Label</TooltipButton>
				</FloatingLayerController>
			);

			const button = screen.getByRole('button');
			act(() => button.focus());
			fireEvent.keyDown(button);

			await waitFor(() => {
				expect(screen.getByText('Tooltip')).toBeInTheDocument();
			});
		});

		test('should render a tooltip if hovered for \'tooltipRelative\'', async () => {
			console.error = jest.fn();	// eslint-disable-line no-console
			const tooltipText = 'Tooltip';
			render(
				<FloatingLayerController>
					<TooltipButton tooltipDelay={0} tooltipRelative tooltipText={tooltipText}>Label</TooltipButton>
				</FloatingLayerController>
			);

			const button = screen.getByRole('button');
			act(() => button.focus());
			fireEvent.mouseOver(button);

			await waitFor(() => {
				expect(screen.getByText('Tooltip')).toBeInTheDocument();
			});
		});

		describe('Tooltip position', () => {
			test('should have \'above\' className when tooltipPosition is set to \'above\'', async () => {
				const tooltipText = 'Tooltip';
				render(
					<FloatingLayerController>
						<TooltipButton tooltipDelay={0} tooltipPosition="above" tooltipText={tooltipText}>Label</TooltipButton>
					</FloatingLayerController>
				);

				const button = screen.getByRole('button');

				button.getBoundingClientRect = jest.fn(() => {
					return {
						width: 300,
						height: 300,
						top: 600,
						left: 600,
						bottom: 0,
						right: 0
					};
				});

				act(() => button.focus());
				fireEvent.mouseOver(button);

				await waitFor(() => {
					const tooltipArrow = screen.getByText('Tooltip').parentElement.parentElement;
					const expected = 'tooltip above';

					expect(tooltipArrow).toHaveClass(expected);
				});
			});

			test('should have \'below\' className when tooltipPosition is set to \'below\'', async () => {
				const tooltipText = 'Tooltip';
				render(
					<FloatingLayerController>
						<TooltipButton tooltipDelay={0} tooltipPosition="below" tooltipText={tooltipText}>Label</TooltipButton>
					</FloatingLayerController>
				);

				const button = screen.getByRole('button');

				button.getBoundingClientRect = jest.fn(() => {
					return {
						width: 300,
						height: 300,
						top: 600,
						left: 600,
						bottom: 0,
						right: 0
					};
				});

				act(() => button.focus());
				fireEvent.mouseOver(button);

				await waitFor(() => {
					const tooltipArrow = screen.getByText('Tooltip').parentElement.parentElement;

					const expected = 'tooltip below';

					expect(tooltipArrow).toHaveClass(expected);
				});
			});

			test('should have \'left middle\' className when tooltipPosition is set to \'left middle\'', async () => {
				const tooltipText = 'Tooltip';
				render(
					<FloatingLayerController>
						<TooltipButton tooltipDelay={0} tooltipPosition="left middle" tooltipText={tooltipText}>Label</TooltipButton>
					</FloatingLayerController>
				);

				const button = screen.getByRole('button');
				act(() => button.focus());
				fireEvent.mouseOver(button);

				await waitFor(() => {
					const tooltipArrow = screen.getByText('Tooltip').parentElement.parentElement;
					const expected = 'tooltip left middleArrow';

					expect(tooltipArrow).toHaveClass(expected);
				});
			});

			test('should have \'right middle\' className when tooltipPosition is set to \'right middle\'', async () => {
				const tooltipText = 'Tooltip';
				render(
					<FloatingLayerController>
						<TooltipButton tooltipDelay={0} tooltipPosition="right middle" tooltipText={tooltipText}>Label</TooltipButton>
					</FloatingLayerController>
				);

				const button = screen.getByRole('button');
				act(() => button.focus());
				fireEvent.mouseOver(button);

				await waitFor(() => {
					const tooltipArrow = screen.getByText('Tooltip').parentElement.parentElement;
					const expected = 'tooltip right middleArrow';

					expect(tooltipArrow).toHaveClass(expected);
				});
			});
		});
	});
});
