import Button from '@enact/sandstone/Button';
import {Fragment} from 'react';

// Button's prop `minWidth` defaults to true and we only want to show `minWidth={false}` in the JSX. In order to hide `minWidth` when `true`, we use the normal storybook boolean control and return `void 0` when `true`.
Button.displayName = 'Button';

export default {
	title: 'Sandstone/Button',
	component: 'Button'
};

export const _Button = (args) => (
	<Fragment>
		<Button>
			test
		</Button>
	</Fragment>
);

_Button.storyName = 'Button';
_Button.parameters = {
	info: {
		text: 'The basic Button'
	}
};
