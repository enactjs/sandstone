import {Column, Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Component} from 'react';

import {Button} from '../../../../../../Button';
import {InputField} from '../../../../../../Input';
import Item from '../../../../../../Item';
import {Header, Panel, Panels} from '../../../../../../Panels';
import ThemeDecorator from '../../../../../../ThemeDecorator';
import VirtualList from '../../../../../../VirtualList';

const ListContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [];
const itemSize = 156;
const listSize = itemSize * 9;
const itemStyle = {margin: 0};

// eslint-disable-next-line enact/prop-types, enact/display-name
const renderItem = (size, onClick) => ({index, ...rest}) => {
	const style = {height: ri.scaleToRem(size), ...itemStyle};
	return (
		<Item index={index} style={style} onClick={onClick} {...rest} id={`item${index}`}>
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

class app extends Component {
	constructor (props) {
		super(props);
		this.state = {
			headerChildren: false,
			index: 0,
			numItems: 100
		};
		updateDataSize(this.state.numItems);
	}

	handleSelectItem = () => {
		return this.state.index === 0 ? this.setState({index: 1}) : this.setState({index: 0});
	};

	onChangeNumItems = ({value}) => {
		this.setState({numItems: value});
		updateDataSize(value);
	};

	onToggleHeaderChildren = () => {
		this.setState((state) => ({headerChildren: !state.headerChildren}));
	};

	render () {
		const {headerChildren, index, numItems} = this.state;
		const inputStyle = {width: ri.scaleToRem(300)};
		return (
			<div {...this.props}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<InputField id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
					</Cell>
					<Cell>
						<Panels index={index}>
							<Panel>
								<Header
									slot="header"
									title={'VirtualList in Panel 0'}
									type="compact"
									slotAfter={<Button id="headerChildrenButton" onClick={this.onToggleHeaderChildren} size="small">{`${headerChildren ? 'Hide' : 'Show'} Header Children`}</Button>}
								>
									{headerChildren ? <Item id="headerChildrenItem">Header Item</Item> : null}
								</Header>
								<Cell component={ListContainer}>
									<VirtualList
										dataSize={this.state.numItems}
										itemRenderer={renderItem(itemSize, this.handleSelectItem)}
										itemSize={ri.scale(itemSize)}
										spacing={0}
										style={{height: ri.scaleToRem(listSize)}}
									/>
								</Cell>
							</Panel>
							<Panel>
								<Header title={'VirtualList in Panel 1'} type="compact" />
								<Item onClick={this.handleSelectItem}>Go Back</Item>
							</Panel>
						</Panels>
					</Cell>
				</Column>
			</div>
		);
	}
}

export default ThemeDecorator(app);
