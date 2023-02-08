import Item from '@enact/sandstone/Item';
import Slider from '@enact/sandstone/Slider';
import VirtualList from '@enact/sandstone/VirtualList';
import {number} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component} from 'react';

Slider.displayName = 'Slider';

class SliderList extends Component {
	static propTypes = {
		itemSize: PropTypes.number
	};

	constructor (props) {
		super(props);
		this.state = {
			selectedItems: [],
			value: 50
		};
		this.items = [
			{item: 'Apple', count: 10},
			{item: 'Orange', count: 5},
			{item: 'Banana', count: 20},
			{item: 'Mango', count: 60},
			{item: 'Apricot', count: 15},
			{item: 'Peach', count: 92},
			{item: 'Pineapple', count: 67},
			{item: 'Strawberry', count: 70},
			{item: 'Grapes', count: 44},
			{item: 'Watermelon', count: 55}
		];
	}

	componentDidMount () {
		this.fillItems(this.state.value);
	}

	fillItems = (value) => {
		let selected = this.items.filter((item) => {
			if (item.count <= value) {
				return true;
			}
		});

		this.setState({
			selectedItems: selected,
			value: value
		});
	};

	handleChange = (e) => {
		this.fillItems(e.value);
	};

	renderItem = (size, items) => ({index, ...rest}) => {
		const itemStyle = {
			height: size + 'px',
			borderBottom: ri.scaleToRem(6) + ' solid #202328',
			boxSizing: 'border-box'
		};

		return (
			<Item {...rest} style={itemStyle}>
				{items[index].item + ': ' + items[index].count}
			</Item>
		);
	};

	render () {
		return (
			<div>
				<Slider
					backgroundProgress={0}
					disabled={false}
					max={100}
					min={0}
					onChange={this.handleChange}
					step={1}
					tooltip={false}
					value={this.state.value}
				/>
				<VirtualList
					dataSize={this.state.selectedItems.length}
					itemRenderer={this.renderItem(this.props.itemSize, this.items)}
					itemSize={this.props.itemSize}
					style={{
						height: ri.scaleToRem(1104)
					}}
				/>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/Slider',
	component: 'Slider'
};

export const AddAndRemove = (args) => {
	const itemSize = ri.scale(args['itemSize']);
	return <SliderList itemSize={itemSize} />;
};

number('itemSize', AddAndRemove, Slider, 144);

AddAndRemove.storyName = 'Add and Remove ';
