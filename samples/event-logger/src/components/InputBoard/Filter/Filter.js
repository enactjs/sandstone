import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import SwitchItem from '@enact/sandstone/SwitchItem';

import {activateEvent, isSyntheticEventOn, setEventCapturing, setDelayMs} from '../../../actions/actions';
import eventCategory from '../../../constants/eventCategory';

import css from './Filter.module.less';
import switchItemComponent from './SwitchItemComponent.module.less';

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

	handleTimePicker = ({value}) => {
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
						key={i}
						css={switchItemComponent}
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
					showLine
					spacing="medium"
				>
					Events
				</Heading>
				<div className={css.eventGroup}>
					{eventItems}
				</div>

				<Heading
					showLine
					spacing="medium"
				>
					Other filters
				</Heading>
				<div className={css.eventGroup}>
					<SwitchItem
						css={switchItemComponent}
						onToggle={this.handleEventCapturing}
					>
						Event Capturing
					</SwitchItem>
					<SwitchItem
						css={switchItemComponent}
						onToggle={this.handleSyntheticEventOn}
					>
						React Synthetic Event
					</SwitchItem>
					<div className={css.timer}>
						Timer
						<Picker
							className={css.timerPicker}
							onChange={this.handleTimePicker}
							orientation="horizontal"
							width="medium"
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
