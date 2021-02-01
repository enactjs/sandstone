import {addDecorator} from '@storybook/react';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {withKnobs} from '@enact/storybook-utils/addons/knobs';

import ThemeEnvironment from '../src/ThemeEnvironment'

configureActions();
addDecorator(withKnobs);
export const parameters = {
	knobs: {
		timestamps: true,
	}
};
export const decorators = [ThemeEnvironment];
