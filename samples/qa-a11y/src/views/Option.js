import {useI18nContext} from '@enact/i18n/I18nDecorator';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import Heading from '@enact/sandstone/Heading';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';

const Option = (props) => {
	const {handleDebug, isDebugMode} = props;
	const {rtl, updateLocale} = useI18nContext();
	const handleClick = useCallback(() => {
		updateLocale(rtl ? 'en-US' : 'ar-SA');
	}, [rtl, updateLocale]);

	return (
		<>
			<Heading showLine>Set a language direction</Heading>
			<CheckboxItem onClick={handleClick} selected={rtl}>RTL</CheckboxItem>

			<Heading showLine>Set an aria debug mode</Heading>
			<CheckboxItem onClick={handleDebug} selected={isDebugMode}>Debug aria</CheckboxItem>
		</>
	);
};

Option.propTypes = {
	handleDebug: PropTypes.func.isRequired,
	isDebugMode: PropTypes.bool.isRequired
};

export default Option;
