import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import VirtualList from '@enact/sandstone/VirtualList';
import Spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';
import React from 'react';

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

class PanelsView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			panelIndex: 0
		};
	}

	componentWillMount () {
		Spotlight.setPointerMode(false);
	}

	nextPanel = () => this.setState({panelIndex: 1})

	prevPanel = () => this.setState({panelIndex: 0})

	customItem = ({index, ...rest}) => {
		return (
			<Item {...rest} onClick={this.nextPanel}>
				{itemList[index]}
			</Item>
		);
	};

	render () {
		return (
			<Panels index={this.state.panelIndex} onBack={this.prevPanel}>
				<Panel>
					<Header title="Panel 0" />
					<VirtualList
						spotlightId={'virtualList_$' + this.state.panelIndex}
						dataSize={itemList.length}
						direction="vertical"
						itemRenderer={this.customItem}
						itemSize={ri.scale(72)}
					/>
				</Panel>
				<Panel>
					<Header title="Panel 1" />
					<Scroller>
						{
							itemList.map((item, key) => {
								return (
									<Item onClick={this.prevPanel} key={key}>{item}</Item>
								);
							})
						}
					</Scroller>
				</Panel>
			</Panels>
		);
	}
}

export default PanelsView;
