import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import A11yDecorator from '@enact/ui/A11yDecorator/A11yDecorator.js';
import React from 'react';

import css from '../App/App.module.less';

const A11yButton = A11yDecorator(Button);

const A11yDecoratorView = () => (
	<>
		<Heading showLine>accessibilityPreHint=This is a PreHint.</Heading>
		<A11yButton accessibilityPreHint="This is a PreHint.">Easy</A11yButton>

		<Heading showLine className={css.marginTop}>accessibilityHint=This is a Hint.</Heading>
		<A11yButton accessibilityHint="This is a Hint.">Medium</A11yButton>

		<Heading showLine className={css.marginTop}>aria-label=This is a aria label.</Heading>
		<A11yButton aria-label="This is a aria label.">Hard</A11yButton>
	</>
);

export default A11yDecoratorView;
