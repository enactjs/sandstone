import Button, {ButtonBase} from '@enact/sandstone/Button';
import Dropdown, {DropdownBase} from '@enact/sandstone/Dropdown';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Heading from '@enact/sandstone/Heading';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import PropTypes from 'prop-types';
import {Component, useEffect, useState} from 'react';

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
	{children: 'hello 3', key: 'key3', 'aria-label': 'aria 3'}
];

class AutoDismissDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			open: true
		};
	}

	handleClose = () => {
		this.setState({open: false});
	};

	render () {
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

class DisabledDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isDisabled: true
		};
	}

	handleClick = () => {
		this.setState({isDisabled: false});
	};

	render () {
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

class PositionChangingDropdown extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isShow: true
		};
	}

	handleSelect = () => {
		this.setState({
			isShow: false
		});
	};

	render () {
		const testProps = this.props.args['open'] ? {key: 0, open: true} : {key: 1}; // To prevent to reuse Dropdown, use key.
		const {key, ...rest} = testProps;

		return (
			<div style={{display: 'flex'}}>
				<Dropdown title="first" onSelect={this.handleSelect}>{['a', 'b', 'c']}</Dropdown>
				{this.state.isShow ? <Dropdown title="second">{['a', 'b', 'c']}</Dropdown> : null}
				<Dropdown title="third" key={key} onSelect={this.handleSelect} {...rest}>{['a', 'b', 'c']}</Dropdown>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Dropdown',
	component: 'Dropdown'
};

export const With2OptionsForTestingDirection = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={args['placeholder']}
		size={args['size']}
		style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
		title={args['title']}
		width={args['width']}
	>
		{['Option 1', 'Option 2']}
	</Dropdown>
);

select('direction', With2OptionsForTestingDirection, ['above', 'below'], Config);
boolean('disabled', With2OptionsForTestingDirection, Config);
text('placeholder', With2OptionsForTestingDirection, Config, 'Dropdown');
select('size', With2OptionsForTestingDirection, ['small', 'large'], Config);
text('title', With2OptionsForTestingDirection, Config, 'Dropdown');
select('width', With2OptionsForTestingDirection, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

With2OptionsForTestingDirection.storyName = 'with 2 options for testing direction';

export const WithDefaultSelectedIn20Options = (args) => (
	<Dropdown
		defaultSelected={10}
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={args['placeholder']}
		size={args['size']}
		title={args['title']}
		width={args['width']}
	>
		{items(30)}
	</Dropdown>
);

select('direction', WithDefaultSelectedIn20Options, ['above', 'below'], Config);
boolean('disabled', WithDefaultSelectedIn20Options, Config);
text('placeholder', WithDefaultSelectedIn20Options, Config, 'Dropdown');
select('size', WithDefaultSelectedIn20Options, ['small', 'large'], Config);
text('title', WithDefaultSelectedIn20Options, Config, 'Dropdown');
select('width', WithDefaultSelectedIn20Options, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithDefaultSelectedIn20Options.storyName = 'with defaultSelected in 20 options';

export const WithLongText = (args) => (
	<Dropdown
		direction={args['direction']}
		disabled={args['disabled']}
		onClose={action('onClose')}
		onOpen={action('onOpen')}
		onSelect={action('onSelect')}
		placeholder={args['placeholder']}
		size={args['size']}
		title={args['title']}
		width={args['width']}
	>
		{items(10, 'Looooooooooooooooooooooong')}
	</Dropdown>
);

select('direction', WithLongText, ['above', 'below'], Config);
boolean('disabled', WithLongText, Config);
text('placeholder', WithLongText, Config, 'Dropdown');
select('size', WithLongText, ['small', 'large'], Config);
text('title', WithLongText, Config, 'Dropdown');
select('width', WithLongText, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithLongText.storyName = 'with long text';

export const WithMultipleDropdowns = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			placeholder={args['placeholder']}
			size={args['size']}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			placeholder={args['placeholder']}
			size={args['size']}
			title={args['title']}
			width={args['width']}
		>
			{items(5)}
		</Dropdown>
	</div>
);

select('direction', WithMultipleDropdowns, ['above', 'below'], Config);
boolean('disabled', WithMultipleDropdowns, Config);
text('placeholder', WithMultipleDropdowns, Config, 'Dropdown');
select('size', WithMultipleDropdowns, ['small', 'large'], Config);
text('title', WithMultipleDropdowns, Config, 'Dropdown');
select('width', WithMultipleDropdowns, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithMultipleDropdowns.storyName = 'with multiple dropdowns';

export const WithArrayOfChildrenObjects = (args) => (
	<div>
		<Dropdown
			direction={args['direction']}
			disabled={args['disabled']}
			onClose={action('onClose')}
			onOpen={action('onOpen')}
			onSelect={action('onSelect')}
			placeholder={args['placeholder']}
			size={args['size']}
			style={{position: 'absolute', top: 'calc(50% - 4rem)'}}
			title={args['title']}
			width={args['width']}
		>
			{list}
		</Dropdown>
	</div>
);

select('direction', WithArrayOfChildrenObjects, ['above', 'below'], Config);
boolean('disabled', WithArrayOfChildrenObjects, Config);
text('placeholder', WithArrayOfChildrenObjects, Config, 'Dropdown');
select('size', WithArrayOfChildrenObjects, ['small', 'large'], Config);
text('title', WithArrayOfChildrenObjects, Config, 'Dropdown');
select('width', WithArrayOfChildrenObjects, ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config);

WithArrayOfChildrenObjects.storyName = 'with array of children objects';
WithArrayOfChildrenObjects.parameters = {
	docs: {
		source: {
			code: '() => <WithArrayOfChildrenObjects />'
		}
	}
};

export const WithAutoDismiss = () => <AutoDismissDropdown />;

WithAutoDismiss.storyName = 'with auto dismiss';
WithAutoDismiss.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithDisabled = () => <DisabledDropdown />;

WithDisabled.storyName = 'with disabled';
WithDisabled.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

PositionChangingDropdown.propTypes = {
	args: PropTypes.object
};

export const WithChangingPosition = (args) => <PositionChangingDropdown args={args} />;

boolean('open', WithChangingPosition, Config);

WithChangingPosition.storyName = 'with changing position';
WithChangingPosition.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const InScroller = () => (
	<Scroller
		overscrollEffectOn={{
			arrowKey: true,
			drag: true,
			pageKey: true,
			track: true,
			wheel: true
		}}
	>
		<Item>Scroll down to see Dropdown</Item>
		<Item disabled />
		<Item>Scroller has an overscroll effect intentionally</Item>
		<Item disabled />
		<Item disabled />
		<Dropdown>
			{['a', 'b', 'c', 'd', 'e', 'f', 'g']}
		</Dropdown>
		<Item disabled />
		<Item disabled />
		<Item>Scroller has an overscroll effect intentionally</Item>
		<Item disabled />
		<Item>Scroll up to see Dropdown</Item>
	</Scroller>
);

InScroller.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

InScroller.storyName = 'in Scroller (PLAT-137855)';

export const WithChaningPositionWhileDropdownOpen = () => {
    const [isRemoved, remove] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            remove(true);
        }, 2000);
    }, []);

    return (
		<div>
			{!isRemoved && (
				<div style={{margin: '20px'}}>
					<div>This is the line that will be removed.</div>
				</div>
			)}
			<div>
				<Dropdown open>{['a', 'b', 'c']}</Dropdown>
			</div>
		</div>
    );
};

WithChaningPositionWhileDropdownOpen.storyName = 'with changing position while dropdown open';
