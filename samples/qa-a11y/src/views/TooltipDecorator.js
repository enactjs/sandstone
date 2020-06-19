import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import React from 'react';

const
	TooltipButton = TooltipDecorator(Button),
	tooltipProps = {'aria-hidden': true};

const TooltipDecoratorView = () => (
	<div>
		<TooltipButton
			aria-label="Below Right Tooltip"
			size="small"
			tooltipPosition="below right"
			tooltipProps={tooltipProps}
			tooltipText="Below Right Tooltip"
		>
			Below Right Tooltip
		</TooltipButton>

		<TooltipButton
			aria-label="Below Left Tooltip"
			size="small"
			tooltipPosition="below left"
			tooltipProps={tooltipProps}
			tooltipText="Below Left Tooltip"
		>
			Below Left Tooltip
		</TooltipButton>

		<TooltipButton
			aria-label="Above Right Tooltip"
			size="small"
			tooltipPosition="above right"
			tooltipProps={tooltipProps}
			tooltipText="Above Right Tooltip"
		>
			Above Right Tooltip
		</TooltipButton>

		<TooltipButton
			aria-label="Above Left Tooltip"
			size="small"
			tooltipPosition="above left"
			tooltipProps={tooltipProps}
			tooltipText="Above Left Tooltip"
		>
			Above Left Tooltip
		</TooltipButton>
	</div>
);

export default TooltipDecoratorView;
