import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import React from 'react';

import Section from '../components/Section';

const TooltipButton = TooltipDecorator(Button);
const tooltipProps = {'aria-hidden': true};

const TooltipDecoratorView = () => (
	<Section>
		<TooltipButton
			alt="Below Right"
			aria-label="This is Below Right Tooltip."
			tooltipPosition="below right"
			tooltipProps={tooltipProps}
			tooltipText="Below Right Tooltip"
		>
			Below Right Tooltip
		</TooltipButton>

		<TooltipButton
			alt="Below Left"
			aria-label="This is Below Left Tooltip."
			tooltipPosition="below left"
			tooltipProps={tooltipProps}
			tooltipText="Below Left Tooltip"
		>
			Below Left Tooltip
		</TooltipButton>

		<TooltipButton
			alt="Above Right"
			aria-label="This is Above Right Tooltip."
			tooltipPosition="above right"
			tooltipProps={tooltipProps}
			tooltipText="Above Right Tooltip"
		>
			Above Right Tooltip
		</TooltipButton>

		<TooltipButton
			alt="Above Left"
			aria-label="This is Above Left Tooltip."
			tooltipPosition="above left"
			tooltipProps={tooltipProps}
			tooltipText="Above Left Tooltip"
		>
			Above Left Tooltip
		</TooltipButton>
	</Section>
);

export default TooltipDecoratorView;
