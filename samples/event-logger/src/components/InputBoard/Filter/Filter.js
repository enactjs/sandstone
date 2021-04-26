import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import SwitchItem from '@enact/sandstone/SwitchItem';

import {activateEvent, isSyntheticEventOn, setEventCapturing, setDelayMs} from '../../../actions/actions';
import eventCategory from '../../../constants/eventCategory';

import css from './Filter.module.less';

class FilterBase extends React.Component {
	static propTypes = {
		onActivateEvent: PropTypes.func,
		onIsSyntheticEventOn: PropTypes.func,
		onSetDelayMs: PropTypes.func,
		onSetEventCapturing: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	handleEventCategory = (index) => {
		const {onActivateEvent} = this.props;

		return function ({selected}) {
			onActivateEvent(index, selected);
		};
	}

	handleTimerPicker = ({value}) => {
		const timergroup = [3000, 5000, 10000];
		this.props.onSetDelayMs(timergroup[value]);
	}

	handleEventCapturing = ({selected}) => {
		this.props.onSetEventCapturing(selected);
	}

	handleSyntheticEventOn = ({selected}) => {
		this.props.onIsSyntheticEventOn(selected);
	}

	render () {
		const
			timergroup = ['3 sec', '5 sec', '10 sec'],
			eventItems = eventCategory.map((e, i) => {
				const handler = this.handleEventCategory(i);
				return (
					<SwitchItem
						className={css.switchItem}
						key={i}
						inline
						onToggle={handler}
					>
						{e}
					</SwitchItem>
				);
			});
		return (
			<div>
				<Heading
					className={css.heading}
					showLine
					size="tiny"
					spacing="small"
				>
					Events
				</Heading>
				<div className={css.eventGroup}>
					{eventItems}
				</div>

				<Heading
					className={css.heading}
					showLine
					size="tiny"
					spacing="small"
				>
					Other filters
				</Heading>
				<div className={css.eventGroup}>
					<SwitchItem
						className={css.switchItem}
						inline
						onToggle={this.handleEventCapturing}
					>
						Event Capturing
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						inline
						onToggle={this.handleSyntheticEventOn}
					>
						React Synthetic Event
					</SwitchItem>
					<div className={css.pickerItem}>
						<Picker
							className={css.timerPicker}
							inlineTitle
							onChange={this.handleTimerPicker}
							orientation="horizontal"
							title="Timer"
						>
							{timergroup}
						</Picker>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => (state);
const mapDispatchToProps = dispatch => ({
	onActivateEvent (index, selected) {
		dispatch(activateEvent(index, selected));
	},
	onIsSyntheticEventOn (value) {
		dispatch(isSyntheticEventOn(value));
	},
	onSetEventCapturing (value) {
		dispatch(setEventCapturing(value));
	},
	onSetDelayMs (delay) {
		dispatch(setDelayMs(delay));
	}
});

const Filter = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterBase);

export default Filter;
