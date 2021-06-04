import {Panel} from '@enact/sandstone/Panels';
import {Component} from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

class MainView extends Component {
	constructor (props) {
		super(props);
		this.state = {
			horizontal: false,
			nativeScroll: true
		};
	}

	componentDidUpdate () {
		//this.scrollTo({index: 2, animate: false, focus: true});
	}

	onChangeDirection = () => {
		this.setState((state) => ({horizontal: !state.horizontal}));
	};

	onChangeScrollMode = ({selected: nativeScroll}) => {
		this.setState({nativeScroll});
	};

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	};

	render = () => {
		const {horizontal, nativeScroll} = this.state;
		return (
			<Panel>
				<ImageList
					//cbScrollTo={this.getScrollTo}
					direction={horizontal ? 'horizontal' : 'vertical'}
					key={nativeScroll ? 'native' : 'translate'}
					scrollMode={nativeScroll ? 'native' : 'translate'}
				/>
			</Panel>
		);
	};
}

export default MainView;
