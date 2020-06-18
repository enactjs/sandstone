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
		window.elapsedTimes = [];
		let timerCount = 0;

		const setIntervalId = setInterval(function () {
			timerCount++;

			// Wait for 5 Sec (1~10)

			// Execute scrollTo for 10 seconds
			if (timerCount > 10 && (timerCount <= 30)) {
				// Make wheel event
				const evt = document.createEvent('MouseEvents');
				evt.initEvent('wheel', true, true);
				evt.deltaY = 2000;

				// Send wheel event to Scroller div
				document.querySelector('#root div div').dispatchEvent(evt);
			} else if (timerCount === 41) {
				// Wait for 5 Sec (31~40)
				// Stop and show result
				clearInterval(setIntervalId);

				// Show FPS Result
				if (window.elapsedTimes) {
					const avgElapsedTimePerFrame = window.elapsedTimes[window.elapsedTimes.length - 1] / window.elapsedTimes.length;
					console.log(window.elapsedTimes);
					console.log('Average Elapsed Time per 1 frame : ' + avgElapsedTimePerFrame);
					console.log('Average FPS : ' + (1000 / avgElapsedTimePerFrame));
				}
			}
		}, 500);

		function onRAF (timestamp) {
			// During wheel
			if (timestamp > 5000 && timestamp < 15000) {
				if (!this.startTime) {
					this.startTime = timestamp;
				}
				window.elapsedTimes.push(timestamp - this.startTime);
				window.requestAnimationFrame(onRAF);
			}
		}

		window.requestAnimationFrame(onRAF);
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
