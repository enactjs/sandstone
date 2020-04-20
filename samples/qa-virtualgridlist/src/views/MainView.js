import React from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			horizontal: false
		};
	}

	componentDidUpdate () {
		this.scrollTo({index: 0, animate: false, focus: true});
	}

	onChangeFocusableScrollbar = () => {
		this.setState((state) => ({focusableScrollbar: !state.focusableScrollbar}));
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
		const {focusableScrollbar, horizontal, nativeScroll} = this.state;
		return (
			<div className={css.mainView}>
				<PanelHeader
					title="VirtualGridList"
					type="mini"
					onChangeDirection={this.onChangeDirection}
					onChangeFocusableScrollbar={this.onChangeFocusableScrollbar}
					onChangeScrollMode={this.onChangeScrollMode}
				/>
				<div className={css.content}>
					<ImageList
						cbScrollTo={this.getScrollTo}
						className={css.list}
						focusableScrollbar={focusableScrollbar}
						direction={horizontal ? 'horizontal' : 'vertical'}
						scrollMode={nativeScroll ? 'native' : 'translate'}
					/>
				</div>
			</div>
		);
	}
}

export default MainView;
