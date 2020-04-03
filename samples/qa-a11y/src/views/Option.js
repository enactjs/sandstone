import {contextTypes} from '@enact/i18n/I18nDecorator';
import Heading from '../../../../../Heading';
import PropTypes from 'prop-types';
import React from 'react';
import ToggleButton from '../../../../../ToggleButton';

class Option extends React.Component {
	static propTypes = {
		handleDebug: PropTypes.func.isRequired,
		isDebugMode: PropTypes.bool.isRequired
	}

	static contextTypes = contextTypes

	handleLocale = () => this.context.updateLocale(this.context.rtl ? 'en-US' : 'ar-SA')

	render () {
		return (
			<div>
				<Heading showLine>Set a language direction</Heading>
				<ToggleButton size="small" onClick={this.handleLocale} selected={this.context.rtl}>RTL</ToggleButton>
				<Heading showLine>Set an aria debug mode</Heading>
				<ToggleButton size="small" onClick={this.props.handleDebug} selected={this.props.isDebugMode}>Debug aria</ToggleButton>
			</div>
		);
	}
}

export default Option;
