import React from 'react';
import spotlight from '@enact/spotlight';

import TabLayout from '../../../../TabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

import {tabs} from './TabComponents';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<TabLayout
		{...props}
		id="tabLayout"
	>
		{tabs}
	</TabLayout>
);

export default UrlPropsDecorator(ThemeDecorator(app));
