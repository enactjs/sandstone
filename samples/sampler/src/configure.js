import {configure, addDecorator} from '@storybook/react';
import {loadStories} from '@enact/storybook-utils';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {withKnobs} from '@enact/storybook-utils/addons/knobs';

import Malachite from '../src/MalachiteEnvironment';

function config (stories, mod) {
	configureActions();
	addDecorator(withKnobs());

	// Set malachite environment defaults
	addDecorator(Malachite);

	configure(loadStories(stories), mod);
}

export default config;
