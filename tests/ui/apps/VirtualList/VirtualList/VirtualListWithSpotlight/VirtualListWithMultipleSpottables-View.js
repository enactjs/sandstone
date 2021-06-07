import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

import Button from '../../../../../../Button';
import {InputField} from '../../../../../../Input';
import ThemeDecorator from '../../../../../../ThemeDecorator';
import VirtualList from '../../../../../../VirtualList';

const ListContainer = SpotlightContainerDecorator('div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';
// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [],
	itemStyle = {margin: 0};

// eslint-disable-next-line enact/display-name
const renderItem = (ItemComponent, size) => ({index, ...rest}) => {
	const style = {height: ri.scaleToRem(size), ...itemStyle};

	return (
		<ItemComponent index={index} style={style} {...rest}>
			{items[index].item}
		</ItemComponent>
	);
};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item :'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

const ContainerItemWithControls = SpotlightContainerDecorator(({children, index, ...rest}) => {
	const itemHeight = ri.scaleToRem(156);
	const containerStyle = {display: 'flex', width: '100%', height: itemHeight};
	const textStyle = {flex: '1 1 100%', lineHeight: itemHeight};
	const switchStyle = {flex: '0 0 auto'};
	return (
		<div {...rest} style={containerStyle}>
			<div style={textStyle}>
				{children}
			</div>
			<Button id={'listIcon' + index} icon="list" data-index={index} style={switchStyle} />
			<Button id={'starIcon' + index} icon="star" data-index={index} style={switchStyle} />
			<Button id={'homeIcon' + index} icon="home" data-index={index} style={switchStyle} />
		</div>
	);
});

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			numItems: 100,
			itemSize: 156
		};
		updateDataSize(this.state.numItems);
	}

	onChangeNumItems = ({value}) => {
		this.setState({numItems: value});
		updateDataSize(value);
	};

	onChangeitemSize = ({value}) => {
		this.setState({itemSize: value});
	};

	render () {
		const inputStyle = {width: ri.scaleToRem(300)};
		const {itemSize, numItems} = this.state;
		return (
			<div {...this.props} id="list" ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<InputField id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
						<InputField id="itemSize" defaultValue={itemSize} type="number" onChange={this.onChangeitemSize} size="small" style={inputStyle} />
					</Cell>
					<Cell component={ListContainer}>
						<Row align="center">
							<Cell component={Button} shrink id="left">
								Left
							</Cell>
							<Cell align="stretch">
								<Column align="center">
									<Cell component={Button} shrink id="top">
										Top
									</Cell>
									<Cell>
										<VirtualList
											dataSize={numItems}
											itemRenderer={renderItem(ContainerItemWithControls, itemSize)}
											itemSize={ri.scale(itemSize)}
											style={{height: ri.scaleToRem(156 * 9)}}
											verticalScrollbar={getScrollbarVisibility('visible')}
										/>
									</Cell>
									<Cell component={Button} shrink id="bottom">
										Bottom
									</Cell>
								</Column>
							</Cell>
							<Cell component={Button} shrink id="right">
								Right
							</Cell>
						</Row>
					</Cell>
				</Column>
			</div>
		);
	}
}

export default ThemeDecorator(app);
