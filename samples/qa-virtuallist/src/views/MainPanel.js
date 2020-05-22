import Button from '@enact/sandstone/Button';
import {Cell, Row} from '@enact/ui/Layout';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import {connect} from 'react-redux';
import {Header, Panel} from '@enact/sandstone/Panels';
import {InputField as Input} from '@enact/sandstone/Input';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/sandstone/VirtualList';

import ListItem from '../components/ListItem';
import LocaleSwitch from '../components/LocaleSwitch';
import ScrollModeSwitch from '../components/ScrollModeSwitch';
import {setData} from '../actions';

import css from './MainPanel.module.less';

const childProps = {text: ' child props'};

const MainPanel = class extends Component {
	static displayName = 'MainPanel';

	static propTypes = {
		changeData: PropTypes.func.isRequired,
		listItems: PropTypes.array.isRequired,
		nativeScroll: PropTypes.bool
	}

	constructor (props) {
		super(props);
		this.state = {
			hasChildProps: false,
			isDisabled: false,
			nativeScroll: true,
			value: ''
		};

		this.props.changeData(200, false);
	}

	handleChange = ({value}) => this.setState({value})

	onChangeDataSize = () => {
		const dataSize = parseInt(this.state.value) || 0;
		this.props.changeData(dataSize, this.state.isDisabled);
	}

	onChangeScrollMode = ({selected: nativeScroll}) => {
		this.setState({nativeScroll});
	}

	onToggleChildProps = () => {
		this.setState((state) => ({hasChildProps: !state.hasChildProps}));
	}

	onToggleDisabled = () => {
		this.setState((state, props) => {
			this.props.changeData(props.listItems.length, !state.isDisabled);
			return {isDisabled: !state.isDisabled};
		});
	}

	renderItem = ({index, text, ...rest}) => {
		return (
			<ListItem {...rest} index={index}>
				{this.props.listItems[index].content + (text || '')}
			</ListItem>
		);
	}

	render () {
		const {listItems, ...rest} = this.props;
		const {nativeScroll} = this.state;

		delete rest.changeData;

		return (
			<Panel {...rest}>
				<Header
					title="VirtualList"
					type="mini"
				>
					<Row>
						<Cell shrink>
							<label>DataSize:</label>
							<Input
								onChange={this.handleChange}
								placeholder={`${listItems.length}`}
								size="small"
								style={{width: '5em'}}
								type="number"
								value={this.state.value}
							/>
						</Cell>
						<Cell shrink>
							<Button size="small" onClick={this.onChangeDataSize}>Set DataSize</Button>
						</Cell>
						<Cell>
							<CheckboxItem onClick={this.onToggleDisabled}>Disabled Items</CheckboxItem>
						</Cell>
						<Cell>
							<CheckboxItem onClick={this.onToggleChildProps}>Child Props</CheckboxItem>
						</Cell>
						<Cell>
							<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={this.onChangeScrollMode} />
						</Cell>
						<Cell>
							<LocaleSwitch />
						</Cell>
					</Row>
					<hr />
				</Header>
				<VirtualList
					className={css.verticalPadding}
					childProps={this.state.hasChildProps ? childProps : null}
					dataSize={listItems.length}
					itemRenderer={this.renderItem}
					itemSize={ri.scale(156)}
					key={nativeScroll ? 'native' : 'translate'}
					scrollMode={nativeScroll ? 'native' : 'translate'}
				/>
			</Panel>
		);
	}
};

const mapStateToProps = ({listItems}) => ({
	listItems
});

const mapDispatchToProps = (dispatch) => ({
	changeData: (dataSize, isDisabled) => dispatch(setData(dataSize, isDisabled))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
