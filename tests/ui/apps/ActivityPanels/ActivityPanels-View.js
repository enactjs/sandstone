import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

import PropTypes from 'prop-types';
import ThemeDecorator from '../../../../ThemeDecorator';
import {ActivityPanels, Panel, Header} from '../../../../Panels';
import Item from '../../../../Item';
import Button from '../../../../Button';

class App extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

	static defaultProps = {
		index: 0
	}

	constructor (props) {
		super(props);
		this.state = {
			index: this.props.index
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})

	render () {
		return (
			<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
				<MainPanel title="First" onClick={this.handleClick} />
				<ItemPanel title="Second" onClick={this.handleClick} />
				<ButtonPanel title="Third" autoFocus="default-element" onClick={this.handleClick} />
				<MainPanel title="None" autoFocus="none" onClick={this.handleClick} />
				<ItemPanel title="Last focused" autoFocus="last-focused" />
			</ActivityPanels>
		);
	}
}

const ButtonPanel = ({title, onClick, ...rest}) => (
	<Panel {...rest}>
		<Header title={title}>
			<Button id="button3" onClick={onClick}>Button 3</Button>
			<Button id="button4" onClick={onClick}>Button 4</Button>
		</Header>
	</Panel>
);

const ItemPanel = ({title, onClick, ...rest}) => (
	<Panel {...rest}>
		<Header title={title} />
		<Item id="item5" onClick={onClick}>Item 5</Item>
		<Item id="item6" onClick={onClick}>Item 6</Item>
		<Item id="item7" onClick={onClick}>Item 7</Item>
		<Item id="item8" onClick={onClick}>Item 8</Item>
	</Panel>
);

const MainPanel = ({title, onClick, ...rest}) => (
	<Panel {...rest}>
		<Header title={title}>
			<Button id="button1" onClick={onClick}>Button 1</Button>
			<Button id="button2" onClick={onClick}>Button 2</Button>
		</Header>
		<Item id="item1" onClick={onClick}>Item 1</Item>
		<Item id="item2" onClick={onClick}>Item 2</Item>
		<Item id="item3" onClick={onClick}>Item 3</Item>
		<Item id="item4" onClick={onClick}>Item 4</Item>
	</Panel>
);

export default ThemeDecorator(App);
