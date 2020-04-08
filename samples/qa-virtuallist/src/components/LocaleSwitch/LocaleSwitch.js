import {contextTypes} from '@enact/i18n/I18nDecorator';
import React, {Component} from 'react';
import ToggleButton from '@enact/sandstone/ToggleButton';

class LocaleSwitch extends Component {
	constructor (props) {
		super(props);
		this.state = {
			rtl: false
		};
	}

	onClick = () => {
		this.setState((state) => {
			const rtl = !state.rtl;
			this.context.updateLocale(rtl ? 'ar-SA' : 'en-US');
			return {rtl};
		});
	}

	render () {
		return (
			<ToggleButton onClick={this.onClick} {...this.props}>RTL</ToggleButton>
		);
	}
}

LocaleSwitch.contextTypes = contextTypes;

export default LocaleSwitch;
