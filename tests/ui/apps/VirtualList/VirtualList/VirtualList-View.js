import {Button} from '../../../../../Button';
import ri from '@enact/ui/resolution';
import {Row, Column, Cell} from '@enact/ui/Layout';
import SwitchItem from '../../../../../SwitchItem';
import VirtualList from '../../../../../VirtualList';
import ThemeDecorator from '../../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {InputField} from '../../../../../Input';

const ListContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [],
	itemStyle = {margin: 0};

const renderItem = (size) => ({index, ...rest}) => {
	const style = {height: ri.scaleToRem(size), ...itemStyle};
	return (
		<StatefulSwitchItem index={index} style={style} {...rest} id={`item${index}`}>
			{items[index].item}
		</StatefulSwitchItem>
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

class StatefulSwitchItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			prevIndex: props.index,
			selected: items[props.index].selected
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevIndex !== props.index) {
			return {
				prevIndex: props.index,
				selected: items[props.index].selected
			};
		}

		return null;
	}

	onToggle = () => {
		items[this.props.index].selected = !items[this.props.index].selected;
		this.setState(({selected}) => ({
			selected: !selected
		}));
	}

	render () {
		const props = Object.assign({}, this.props);
		delete props.index;

		return (
			<SwitchItem {...props} onToggle={this.onToggle} selected={this.state.selected}>
				{this.props.children}
			</SwitchItem>
		);
	}
}

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			hideScrollbar: false,
			numItems: 100,
			spacing: 0,
			itemSize: 156,
			wrap: false
		};
		this.rootRef = React.createRef();
		this.scrollingRef = React.createRef();
		updateDataSize(this.state.numItems);
	}

	onKeyDown = () => {
		if (this.rootRef.current.dataset.keydownEvents) {
			this.rootRef.current.dataset.keydownEvents = Number(this.rootRef.current.dataset.keydownEvents) + 1;
		} else {
			this.rootRef.current.dataset.keydownEvents = 1;
		}
	}

	onScrollStart = () => {
		this.scrollingRef.current.innerHTML = 'Scrolling';
	}

	onScrollStop = () => {
		this.scrollingRef.current.innerHTML = 'Not Scrolling';
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	jumpTo = () => {
		this.scrollTo({animate: false, focus: true, index: 10});
	}

	onToggle = ({currentTarget}) => {
		const key = currentTarget.getAttribute('id');
		this.setState((state) => ({[key]: !state[key]}));
	}

	onChangeNumItems = ({value}) => {
		this.setState({numItems: value});
		updateDataSize(value);
	}

	onChangeSpacing = (obj) => {
		this.setState({spacing: obj.value});
	}

	onChangeitemSize = ({value}) => {
		this.setState({itemSize: value});
	}

	render () {
		const
			inputStyle = {width: ri.scaleToRem(300)},
			{hideScrollbar, numItems, itemSize, spacing, wrap} = this.state;
		return (
			<div {...this.props} id="list" ref={this.rootRef}>
				<Column>
					<Cell component={OptionsContainer} shrink>
						<Button id="hideScrollbar" onClick={this.onToggle} selected={hideScrollbar}>hide scrollbar</Button>
						<Button id="wrap" onClick={this.onToggle} selected={wrap}>wrap</Button>
						<Button id="jumpTo" onClick={this.jumpTo}>JumpToItem10</Button>
						<InputField id="numItems" defaultValue={numItems} type="number" onChange={this.onChangeNumItems} size="small" style={inputStyle} />
						<InputField id="spacing" defaultValue={spacing} type="number" onChange={this.onChangeSpacing} size="small" style={inputStyle} />
						<InputField id="itemSize" defaultValue={itemSize} type="number" onChange={this.onChangeitemSize} size="small" style={inputStyle} />
						<span id="scrolling" ref={this.scrollingRef}>Not Scrolling</span>
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
											cbScrollTo={this.getScrollTo}
											dataSize={numItems}
											itemRenderer={renderItem(itemSize)}
											itemSize={ri.scale(itemSize)}
											onKeyDown={this.onKeyDown}
											onScrollStart={this.onScrollStart}
											onScrollStop={this.onScrollStop}
											spacing={ri.scale(spacing)}
											style={{height: ri.scaleToRem(156 * 9)}}
											verticalScrollbar={getScrollbarVisibility(hideScrollbar)}
											wrap={wrap}
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
