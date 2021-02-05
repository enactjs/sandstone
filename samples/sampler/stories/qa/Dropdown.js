import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import Button, {ButtonBase} from '@enact/sandstone/Button';
import Dropdown, {DropdownBase} from '@enact/sandstone/Dropdown';
import Heading from '@enact/sandstone/Heading';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';

const Config = mergeComponentMetadata(
	'Dropdown',
	UIButtonBase,
	UIButton,
	ButtonBase,
	Button,
	DropdownBase,
	Dropdown
);

const items = (itemCount, optionText = 'Option') =>
	new Array(itemCount).fill().map((i, index) => `${optionText} ${index + 1}`);

Dropdown.displayName = 'Dropdown';

const list = [
	{children: 'hello 1', key: 'key1', 'aria-label': 'aria 1'},
	{children: 'hello 2', key: 'key2', 'aria-label': 'aria 2', disabled: true},
	{children: 'hello 3', key: 'key3', 'aria-label': 'aria 3'},
];

class AutoDismissDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
		};
	}

	handleClose = () => {
		this.setState({open: false});
	};

	render() {
		return (
			<div>
			<Heading>Click in the blank area of the viewport to dismiss the Dropdown</Heading>
			<Dropdown
				onClose={this.handleClose}
				open={this.state.open} // initial value is true
			>
				{['test1', 'test2', 'test3']}
			</Dropdown>
			</div>
		);
	}
}

class DisabledDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDisabled: true,
		};
	}

	handleClick = () => {
		this.setState({isDisabled: false});
	};

	render() {
		return (
			<div>
			<Button onClick={this.handleClick}>enable dropdown</Button>
			<Dropdown title="hello" disabled={this.state.isDisabled} onFocus={this.handleFocus}>
				{['a', 'b', 'c']}
			</Dropdown>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Dropdown',
	component: 'Dropdown'
};

export const With2OptionsForTestingDirection = () => (
	<Dropdown
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
	{['Option 1', 'Option 2']}
	</Dropdown>
);

With2OptionsForTestingDirection.storyName = 'with 2 options for testing direction';

export const WithDefaultSelectedIn20Options = () => (
	<Dropdown
		defaultSelected={10}
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
	{items(30)}
	</Dropdown>
);

WithDefaultSelectedIn20Options.storyName = 'with defaultSelected in 20 options';

export const WithLongText = () => (
	<Dropdown
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
	{items(10, 'Looooooooooooooooooooooong')}
	</Dropdown>
);

WithLongText.storyName = 'with long text';

export const WithMultipleDropdowns = () => (
	<div>
	<Dropdown
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
		{items(5)}
	</Dropdown>
	<Dropdown
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
		{items(5)}
	</Dropdown>
	</div>
);

WithMultipleDropdowns.storyName = 'with multiple dropdowns';

export const WithArrayOfChildrenObjects = () => (
	<div>
	<Dropdown
		direction={select('direction', ['above', 'below'], Config)}
		disabled={boolean('disabled', Config)}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={text('placeholder', Config, 'Dropdown')}
		size={select('size', ['small', 'large'], Config)}
		style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
		title={text('title', Config, 'Dropdown')}
		width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
	>
		{list}
	</Dropdown>
	</div>
);

WithArrayOfChildrenObjects.storyName = 'with array of children objects';

export const WithAutoDismiss = () => <AutoDismissDropdown />;

WithAutoDismiss.storyName = 'with auto dismiss';

export const WithDisabled = () => <DisabledDropdown />;

WithDisabled.storyName = 'with disabled';
