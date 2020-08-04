import {useI18nContext} from '@enact/i18n/I18nDecorator';
import Checkbox from '@enact/sandstone/CheckboxItem';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const Option = (props) => {
	const {handleDebug, isDebugMode} = props;
	const {rtl, updateLocale} = useI18nContext();
	const handleClick = useCallback(() => {
		updateLocale(rtl ? 'en-US' : 'ar-SA');
	}, [rtl, updateLocale]);

	return (
		<>
			<Section title="Set a language direction">
				<Checkbox alt="RTL" onClick={handleClick} selected={rtl} />
			</Section>

			<Section className={appCss.marginTop} title="Set an aria debug mode">
				<Checkbox alt="Debug aria" onClick={handleDebug} selected={isDebugMode} />
			</Section>
		</>
	);
};

Option.propTypes = {
	handleDebug: PropTypes.func.isRequired,
	isDebugMode: PropTypes.bool.isRequired
};

export default Option;
