import React from 'react';
import {storiesOf} from '@storybook/react';

import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Button from '@enact/sandstone/Button';

class FormCheckboxItemView extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			disabled: false
		};
	}

	handleClick = () => {
		this.setState(prevState => ({disabled: !prevState.disabled}));
	}

	render () {
		return (
			<div>
				You can change the state by clicking the Button or FormCheckboxItem.
				<br />
				<Button size="small" onClick={this.handleClick}>change state</Button>
				<FormCheckboxItem disabled={this.state.disabled} onClick={this.handleClick}>FormCheckbox Item</FormCheckboxItem>
			</div>
		);
	}
}

storiesOf('FormCheckboxItem', module)
	.add(
		'that is focused and disabled',
		() => (
			<FormCheckboxItemView />
		)
	);
