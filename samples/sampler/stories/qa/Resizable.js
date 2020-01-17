import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ExpandableList from '../../../../ExpandableList';
import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import SelectableItem from '../../../../SelectableItem';

const data = [
	'a',
	'ABCDEFGHIJKLMNOPQRSTUVW12345',
	'c'
];

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

storiesOf('Resizable', module)
	.add(
		'should recalculate long marquee when scrollbar is rendered',
		() => (
			<Scroller style={{height: ri.unit(399, 'rem'), width: ri.unit(501, 'rem')}}>
				<NoUpdate>
					<Item marqueeOn="render">MARQUEEONRENDER ABCDE</Item>
					<Item>ABCDEFGHIJKLMNOPQRST</Item>
					<SelectableItem>
						SELECTABLE ITEM ABCDEFG
					</SelectableItem>
					<ExpandableList title={'ABCDEFGHIJKLMNOPQRS'}>
						{data}
					</ExpandableList>
					<Item>dummy</Item>
				</NoUpdate>
			</Scroller>
		)
	)
	.add(
		'should recalculate when selectable item is selected',
		() => (
			<Scroller style={{height: ri.unit(399, 'rem'), width: ri.unit(501, 'rem')}}>
				<SelectableItem>
					SELECTABLE ITEM ABCDEFGHIJ
				</SelectableItem>
			</Scroller>
		)
	);
