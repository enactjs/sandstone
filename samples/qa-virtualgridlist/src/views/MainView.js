import {Panel, Header} from '@enact/sandstone/Panels';
import React from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			horizontal: false,
			nativeScroll: true
		};
	}

	componentDidUpdate () {
		this.scrollTo({index: 0, animate: false, focus: true});
	}

	onChangeDirection = () => {
		this.setState((state) => ({horizontal: !state.horizontal}));
	}

	onChangeScrollMode = ({selected: nativeScroll}) => {
		this.setState({nativeScroll});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render = () => {
		const {horizontal, nativeScroll} = this.state;
		return (
			<Panel>
				<Header title="VirtualGridList" type="mini">
					<PanelHeader
						nativeScroll={nativeScroll}
						onChangeDirection={this.onChangeDirection}
						onChangeScrollMode={this.onChangeScrollMode}
					/>
				</Header>
				<ImageList
					cbScrollTo={this.getScrollTo}
					direction={horizontal ? 'horizontal' : 'vertical'}
					key={nativeScroll ? 'native' : 'translate'}
					scrollMode={nativeScroll ? 'native' : 'translate'}
				/>
			</Panel>
		);
	}
}

export default MainView;
