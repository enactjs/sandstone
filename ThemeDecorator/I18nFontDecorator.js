import hoc from '@enact/core/hoc';
import ilib from '@enact/i18n';
import PropTypes from 'prop-types';
import {useEffect} from 'react';

import {fontOverrideGenerator} from './fontGenerator';

const I18nFontDecorator = hoc((config, Wrapped) => {
	const I18nDecorator = (props) => {
		const ilibLocale = ilib.getLocale();

		useEffect(() => {
			fontOverrideGenerator(props.locale || ilibLocale);
		}, [ilibLocale, props.locale]);

		return <Wrapped {...props} />;
	};

	I18nDecorator.displayName = 'I18nFontDecorator';

	I18nDecorator.propTypes = {
		locale: PropTypes.string
	};

	return I18nDecorator;
});

export default I18nFontDecorator;
export {
	I18nFontDecorator
};
