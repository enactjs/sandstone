import {Cell, Column} from '@enact/ui/Layout';
import React from 'react';

import ImageList from '../components/ImageList';
import PanelHeader from '../components/PanelHeader';

import css from './MainView.module.less';

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			horizontal: false,
			inputType: 'field',
			nativeScroll: true
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

	onChangeInputType = ({selected}) => {
		this.setState({inputType: (selected ? 'popup' : 'field')});
	}

	onChangeScrollMode = ({selected: nativeScroll}) => {
		this.setState({nativeScroll});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render = () => {
		const {focusableScrollbar, horizontal, inputType, nativeScroll} = this.state;
		return (
			<Column>
				<Cell
					component={PanelHeader}
					inputType={inputType}
					nativeScroll={nativeScroll}
					onChangeDirection={this.onChangeDirection}
					onChangeFocusableScrollbar={this.onChangeFocusableScrollbar}
					onChangeInputType={this.onChangeInputType}
					onChangeScrollMode={this.onChangeScrollMode}
					shrink
					title="VirtualGridList"
					type="mini"
				/>
				<Cell className={css.content}>
					<ImageList
						cbScrollTo={this.getScrollTo}
						focusableScrollbar={focusableScrollbar}
						direction={horizontal ? 'horizontal' : 'vertical'}
						scrollMode={nativeScroll ? 'native' : 'translate'}
					/>
				</Cell>
			</Column>
		);
	}
}

export default MainView;
