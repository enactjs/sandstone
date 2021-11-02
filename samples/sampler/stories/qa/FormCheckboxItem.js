import Button from '@enact/sandstone/Button';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import {Component} from 'react';

class FormCheckboxItemView extends Component {
	constructor (props) {
		super(props);
		this.state = {
			disabled: false
		};
	}

	handleClick = () => {
		this.setState((prevState) => ({disabled: !prevState.disabled}));
	};

	render () {
		return (
			<div>
				You can change the state by clicking the Button or FormCheckboxItem.
				<br />
				<Button size="small" onClick={this.handleClick}>
					change state
				</Button>
				<FormCheckboxItem disabled={this.state.disabled} onClick={this.handleClick}>
					FormCheckbox Item
				</FormCheckboxItem>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/FormCheckboxItem',
	component: 'FormCheckboxItem'
};

export const ThatIsFocusedAndDisabled = () => <FormCheckboxItemView />;

ThatIsFocusedAndDisabled.storyName = 'that is focused and disabled';
ThatIsFocusedAndDisabled.parameters = {
  controls: {
		hideNoControlsWarning: true
	}
};