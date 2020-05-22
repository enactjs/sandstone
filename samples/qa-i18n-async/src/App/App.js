import Button from '@enact/sandstone/Button';
import Dropdown from '@enact/sandstone/Dropdown';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import PropTypes from 'prop-types';
import React from 'react';
import $L from '@enact/i18n/$L';
import Text, {TextDecorator} from '@enact/i18n/Text';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

const TextButton = TextDecorator(Button);

const locales = ['en-US', 'ko-KR'];

const AsyncILib = I18nContextDecorator(
	{localeProp: 'locale', updateLocaleProp: 'updateLocale'},

	// eslint-disable-next-line enact/display-name
	class extends React.Component {
		static propTypes = {
			locale: PropTypes.string,
			updateLocale: PropTypes.func
		};

		onSelect = ({data: locale}) => this.props.updateLocale(locale);

		render () {
			const {locale, ...rest} = this.props;

			delete rest.updateLocale;

			return (
				<div {...rest}>
					<Dropdown
						direction="below"
						onSelect={this.onSelect}
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
		}
	}
);

export default ThemeDecorator({i18n: {sync: false}}, AsyncILib);
