import A11yDecorator from '@enact/ui/A11yDecorator/A11yDecorator.js';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import React from 'react';

const A11yButton = A11yDecorator(Button);

const A11yDecoratorView = () => (
	<>
		<Heading showLine>Button Examples</Heading>
		<p><strong>accessibilityPreHint=Button Examples</strong></p>
		<A11yButton accessibilityPreHint="Button Examples">Easy</A11yButton>
		<p><strong>accessibilityHint=Hint</strong></p>
		<A11yButton accessibilityHint="Hint" backgroundOpacity="transparent">Medium</A11yButton>
		<p><strong>aria-label=accessibility</strong></p>
		<A11yButton aria-label="accessibility" backgroundOpacity="transparent">Hard</A11yButton>
	</>
);

export default A11yDecoratorView;
