import ri from '@enact/ui/resolution';
import React from 'react';

import {ImageItem} from '../../../../../../ImageItem/ImageItem';
import {Panels, Panel} from '../../../../../../Panels';
import ThemeDecorator from '../../../../../../ThemeDecorator/ThemeDecorator';
import {VirtualGridList} from '../../../../../../VirtualList/VirtualList';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			size: 50
		};
	}

	componentDidUpdate () {
		if (this.state.size === 0) {
			// Intend to receive data asynchronously.
			setTimeout(() => {
				this.setState({size: 50});
				this.scrollTo({index: 0, focus: true, animate: false});
			}, 10);
		}
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItem
				onClick={this.handleClick}
				{...rest}
				id={`item${index}`}
			>
				{index === 20 ? 'Click Me' : `Item ${index}`}
			</ImageItem>
		);
	};

	handleClick = (ev) => {
		if (ev.currentTarget.dataset.index === '20') {
			this.setState({size: 0});
		}
	};

	cbScrollTo = (fn) => {
		this.scrollTo = fn;
	};

	render () {
		return (
			<Panels {...this.props} >
				<Panel>
					<VirtualGridList
						cbScrollTo={this.cbScrollTo}
						dataSize={this.state.size}
						itemSize={{
							minWidth: ri.scale(600),
							minHeight: ri.scale(600)
						}}
						itemRenderer={this.renderItem}
						style={{width: ri.scale(2400) + 'px	', height: ri.scale(1520) + 'px	'}}
					/>
				</Panel>
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
