import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import React from 'react';

import Button from '../../../../../../Button';
import Item from '../../../../../../Item';
import Scroller from '../../../../../../Scroller';
import ThemeDecorator from '../../../../../../ThemeDecorator';
import VirtualList from '../../../../../../VirtualList';

const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [];
const numItems = 100;
const itemSize = 156;

// eslint-disable-next-line enact/display-name
const renderItem = (size) => ({index, ...rest}) => {
	const style = {height: '100%', width: ri.scale(size, 'rem'), writingMode: 'vertical-lr', margin: '0'};
	return (
		<Item index={index} style={style} {...rest} id={`item${index}`}>
			{items[index].item}
		</Item>
	);
};

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0;
	const headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item :'Item ' + (headingZeros + i).slice(-itemNumberDigits)});
	}

	return dataSize;
};

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			nativeScroll: true
		};
		updateDataSize(numItems);
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	};

	render () {
		const {nativeScroll} = this.state;
		const buttonDefaultProps = {minWidth: false, size: 'small'};
		const listProps = {
			dataSize: numItems,
			direction: 'horizontal',
			itemRenderer: renderItem(itemSize),
			itemSize: ri.scale(itemSize),
			spacing: 0,
			style: {height: ri.scaleToRem(800)}
		};
		const scrollMode = nativeScroll ? 'NativeScroll' : 'TranslateScroll';
		return (
			<div {...this.props}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button {...buttonDefaultProps} id="nativeScroll" onClick={this.onToggle}>{scrollMode}</Button>
					</Cell>
					<Scroller key={nativeScroll ? 'native' : 'translate'}>
						<VirtualList {...listProps} className="list 1" />
						<VirtualList {...listProps} className="list 2" />
						<VirtualList {...listProps} className="list 3" />
					</Scroller>
				</Column>
			</div>
		);
	}
}

export default ThemeDecorator(app);
