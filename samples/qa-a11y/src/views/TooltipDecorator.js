import Button from '@enact/sandstone/Button';
import TooltipDecorator from '@enact/sandstone/TooltipDecorator';
import React from 'react';

import Section from '../components/Section';

const TooltipButton = TooltipDecorator(Button);
const tooltipProps = {'aria-hidden': true};

const TooltipDecoratorView = () => (<>
	<Section title="Default">
		<div alt="Normal">DO NOT USE the component wrapped with TooltipDecorator without `aria-label`.</div>
	</Section>

	<Section title="Aria-labelled">
		<TooltipButton
			alt="Below Right"
			aria-label="This is Below Right Tooltip."
			tooltipPosition="below right"
			tooltipProps={tooltipProps}
			tooltipText="Below Right Tooltip"
		>
			Text 0
		</TooltipButton>

		<TooltipButton
			alt="Below Left"
			aria-label="This is Below Left Tooltip."
			tooltipPosition="below left"
			tooltipProps={tooltipProps}
			tooltipText="Below Left Tooltip"
		>
			Text 1
		</TooltipButton>

		<TooltipButton
			alt="Above Right"
			aria-label="This is Above Right Tooltip."
			tooltipPosition="above right"
			tooltipProps={tooltipProps}
			tooltipText="Above Right Tooltip"
		>
			Text 2
		</TooltipButton>

		<TooltipButton
			alt="Above Left"
			aria-label="This is Above Left Tooltip."
			tooltipPosition="above left"
			tooltipProps={tooltipProps}
			tooltipText="Above Left Tooltip"
		>
			Text 3
		</TooltipButton>
	</Section>
</>);

export default TooltipDecoratorView;
