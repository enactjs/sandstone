import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ExpandableList from '@enact/sandstone/ExpandableList';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';

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
			<Scroller style={{height: ri.unit(798, 'rem'), width: ri.unit(1002, 'rem')}}>
				<NoUpdate>
					<Item marqueeOn="render">MARQUEEONRENDER ABCDE</Item>
					<Item>ABCDEFGHIJKLMNOPQRST</Item>
					<Item>
						ITEM ABCDEFGHIJKLMNOPQRST
					</Item>
					<ExpandableList title={'ABCDEFGHIJKLMNOPQRS'}>
						{data}
					</ExpandableList>
					<Item>dummy</Item>
				</NoUpdate>
			</Scroller>
		)
	);
