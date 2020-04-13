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

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render = () => {
		return (
			<div className={css.mainView}>
				<PanelHeader
					title="VirtualGridList Native"
					type="mini"
					onChangeDirection={this.onChangeDirection}
					onChangeFocusableScrollbar={this.onChangeFocusableScrollbar}
				/>
				<div className={css.content}>
					<ImageList
						cbScrollTo={this.getScrollTo}
						className={css.list}
						focusableScrollbar={this.state.focusableScrollbar}
						direction={this.state.horizontal ? 'horizontal' : 'vertical'}
					/>
				</div>
			</div>
		);
	}
}

export default MainView;
