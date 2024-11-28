import hoc from '@enact/core/hoc';
import ilib from '@enact/i18n';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

import {fontOverrideGenerator} from './fontGenerator';

const I18nFontDecorator = hoc((config, Wrapped) => {
	const I18nDecorator = (props) => {
		useEffect(() => {
			fontOverrideGenerator(props.locale || ilib.getLocale());
		}, [props.locale]);

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
