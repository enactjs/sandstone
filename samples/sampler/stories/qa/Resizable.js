import Resizable from '@enact/ui/Resizable';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import SelectableItem from '@enact/sandstone/SelectableItem';

const data = [
	'a',
	'ABCDEFGHIJKLMNOPQRSTUVW12345',
	'c'
];

const ResizeButton = Resizable({resize: 'onClick'}, Button);

class NoUpdate extends React.Component {
	shouldComponentUpdate () {
		return false;
	}

	render () {
		return (
			<div>{this.props.children}</div>
		);
	}
}

class Items extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			more: false
		};
	}

	toggleRenderItems = () => {
		this.setState(({more}) => {
			return {more: !more};
		});
	}

	render () {
		const {more} = this.state;
		const amount = more ? 'Fewer' : 'More';

		return (
			<React.Fragment>
				<ResizeButton onClick={this.toggleRenderItems}>Render {amount} Items</ResizeButton>
				{more ?
					data.map((item) => {
						return <Item key={item}>{item}</Item>;
					}) :
					null
				}
			</React.Fragment>
		);
	}
}

storiesOf('Resizable', module)
	.add(
		'should recalculate long marquee when scrollbar is rendered',
		() => (
			<Scroller>
				<NoUpdate>
					<Item marqueeOn="render">MARQUEEONRENDER ABCDE</Item>
					<Item>ABCDEFGHIJKLMNOPQRST</Item>
					<SelectableItem>
						SELECTABLE ITEM ABCDEFG
					</SelectableItem>
					<Items />
					<Item>dummy</Item>
				</NoUpdate>
			</Scroller>
		)
	)
	.add(
		'should recalculate when selectable item is selected',
		() => (
			<Scroller>
				<SelectableItem>
					SELECTABLE ITEM ABCDEFGHIJ
				</SelectableItem>
			</Scroller>
		)
	);
