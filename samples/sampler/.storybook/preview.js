import {addDecorator} from '@storybook/react';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {DocsPage, DocsContainer} from '@enact/storybook-utils/addons/docs';
import {themes} from '@storybook/theming';
import {withKnobs} from '@enact/storybook-utils/addons/knobs';

import ThemeEnvironment from '../src/ThemeEnvironment'

configureActions();
addDecorator(withKnobs);
export const parameters = {
	knobs: {
		timestamps: true
	},
	docs: {
		container: DocsContainer,
		page: DocsPage,
		iframeHeight: 360,
		theme: themes.light
	},
	options: {
		storySort: {
			method: 'alphabetical'
		}
	}
};
export const decorators = [ThemeEnvironment];
