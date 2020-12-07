import ri from '@enact/ui/resolution';
import React from 'react';

import {ImageItem} from '../../../../../../ImageItem';
import {Panels, Panel} from '../../../../../../Panels';
import ThemeDecorator from '../../../../../../ThemeDecorator';
import {VirtualGridList} from '../../../../../../VirtualList';

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			dataSize: 50
		};
	}

	componentDidUpdate () {
		if (this.state.dataSize === 0) {
			// Intend to receive data asynchronously.
			setTimeout(() => {
				this.setState({dataSize: 50});
				this.scrollTo({index: 0, focus: true, animate: false});
			}, 10);
		}
	}

	renderItem = ({index, ...rest}) => {
		return (
			<ImageItem
				{...rest}
				id={`item${index}`}
				onClick={this.handleClick}
			>
				{index === 20 ? 'Click Me' : `Item ${index}`}
			</ImageItem>
		);
	};

	handleClick = (ev) => {
		if (ev.currentTarget.dataset.index === '20') {
			this.setState({dataSize: 0});
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
						dataSize={this.state.dataSize}
						itemSize={{
							minWidth: ri.scale(600),
							minHeight: ri.scale(600)
						}}
						itemRenderer={this.renderItem}
						style={{width: ri.scale(2400) + 'px', height: ri.scale(1520) + 'px'}}
					/>
				</Panel>
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
