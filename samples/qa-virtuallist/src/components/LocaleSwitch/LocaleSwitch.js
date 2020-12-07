import CheckboxItem from '@enact/sandstone/CheckboxItem';
import React, {useCallback} from 'react';
import {useI18nContext} from '@enact/i18n/I18nDecorator';

const LocaleSwitch = (props) => {
	const {rtl, updateLocale} = useI18nContext();
	const onClick = useCallback(() => {
		updateLocale(!rtl ? 'ar-SA' : 'en-US');
	}, [rtl, updateLocale]);

	return (
		<CheckboxItem {...props} onClick={onClick}>RTL</CheckboxItem>
	);
};

export default LocaleSwitch;
