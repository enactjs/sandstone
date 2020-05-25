import ImageItem from '@enact/sandstone/ImageItem';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

const items = [];

for (let i = 0; i < 1000; i++) {
	const count = ('00' + i).slice(-3);
	items.push({
		text: 'Item ' + count,
		subText: 'SubItem ' + count
	});
}

class VirtualGridListNativeSample extends Component {
	componentDidMount () {
		const scrollTo = this.scrollTo;
		let timerCount = 0;

		const setintervalId = setInterval(function () {
			// Wait 3 sec
			timerCount++;

			if (timerCount >= 10 && (timerCount < 13)) {
				scrollTo({animate: true, focus: true, index: 100 * timerCount});
			}

			if (timerCount > 33) {
				// Wait 6 Sec
				clearInterval(setintervalId);

				console.log(window.performanceData);
				console.log(window.performanceData.reduce((cur, sum) => sum += cur) / window.performanceData.length);
			}
		}, 300);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItem
				{...rest}
				label={items[index].subText}
			>
				{items[index].text}
			</ImageItem>
		);
	}

	render () {
		return (
			<VirtualGridList
				{...this.props}
				cbScrollTo={this.getScrollTo}
				dataSize={items.length}
				itemRenderer={this.renderItem}
				itemSize={{minWidth: ri.scale(642), minHeight: ri.scale(600)}} // FHD: 312 x 300, UHD: 624 x 600
			/>
		);
	}
}

export default ThemeDecorator(VirtualGridListNativeSample);
