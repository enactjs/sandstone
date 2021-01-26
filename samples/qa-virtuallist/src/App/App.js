import Panels from '@enact/sandstone/Panels';
import React from 'react';
import MainPanel from '../views/MainPanel';
import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import compose from 'ramda/src/compose';

const App = kind({
	name: 'App',

	
	render: ({updateLocale, ...rest}) => (
		<div {...rest}>
			<Panels>
				<MainPanel updateLocale={updateLocale} />
			</Panels>
		</div>
	)
});

const AppDecorator = compose(
	ThemeDecorator,
	I18nContextDecorator({rtlProp: 'rtl', updateLocaleProp: 'updateLocale'})
);

export default AppDecorator(App);