import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import PropTypes from 'prop-types';
import $L from '@enact/i18n/$L';
import Text, {TextDecorator} from '@enact/i18n/Text';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useCallback} from 'react';

const TextButton = TextDecorator(Button);

const locales = ['en-US', 'ko-KR'];

const Decorator = ({locale, updateLocale, ...rest}) => {
	const onSelect = useCallback(({data: selLocale}) => updateLocale(selLocale), [updateLocale]);
	return (
		<div {...rest}>
			<Dropdown
				direction="below"
				onSelect={onSelect}
				selected={locales.indexOf(locale)}
				size="large"
				title={$L('select locale')}
				width="large"
			>
				{locales}
			</Dropdown>
			<Button>
				<Text>hi</Text>
			</Button>
			<TextButton>hi</TextButton>
			<Button>{$L('hi')}</Button>
		</div>
	);
};
Decorator.propTypes = {
	locale: PropTypes.string,
	updateLocale: PropTypes.func
};
const AsyncILib = I18nContextDecorator(
	{localeProp: 'locale', updateLocaleProp: 'updateLocale'},
	Decorator
);

export default ThemeDecorator({i18n: {sync: false}}, AsyncILib);
