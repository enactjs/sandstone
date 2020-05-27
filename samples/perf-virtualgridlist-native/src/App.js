import ImageItem from '@enact/sandstone/ImageItem';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

const items = [];
const ImageItemContext = React.createContext({text: '', subText: ''});

for (let i = 0; i < 1000; i++) {
	const count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count
	});
}

const ItemWrapper = ({item, rest}) => {
	const element = React.useRef(null);

	element.current = element.current || (
		<ImageItem
			{...rest}
			context={ImageItemContext}
			label={item.subText}
		>
			{item.text}
		</ImageItem>
	);

	return element.current;
}

class VirtualGridListNativeSample extends Component {
	componentDidMount () {
		const scrollTo = this.scrollTo;
		let timerCount = 0;

		const setintervalId = setInterval(function () {
			// Wait 5 seconds
			timerCount++;

			// Execute scrollTo for 5 seconds
			if (timerCount >= 5 && (timerCount < 10)) {
				scrollTo({animate: true, focus: false, index: 100 * (timerCount - 4)});
			}

			// Wait for 10 Sec (10~19)

			// Stop and show result
			if (timerCount === 20) {
				clearInterval(setintervalId);

				console.log(window.performanceData);
				console.log('Average JS execution time: ' + window.performanceData.reduce((cur, sum) => (sum += cur)) / window.performanceData.length);
			}
		}, 1000);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItemContext.Provider value={{
				...items[index]
			}}>
				<ItemWrapper {...rest} item={items[index]} />
			</ImageItemContext.Provider>
		);
	}

	render () {
		return (
			<VirtualGridList
				{...this.props}
				cbScrollTo={this.getScrollTo}
				dataSize={items.length}
				horizontalScrollbar="hidden"
				verticalScrollbar="hidden"
				itemRenderer={this.renderItem}
				itemSize={{minWidth: ri.scale(642), minHeight: ri.scale(600)}} // FHD: 312 x 300, UHD: 624 x 600
			/>
		);
	}
}

export default ThemeDecorator(VirtualGridListNativeSample);
