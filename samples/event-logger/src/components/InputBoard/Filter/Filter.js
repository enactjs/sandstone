import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import SwitchItem from '@enact/sandstone/SwitchItem';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connect} from 'react-redux';

import {activateEvent, isSyntheticEventOn, setTimerIndex, setEventCapturing} from '../../../actions';
import eventCategory from '../../../constants/eventCategory';

import css from './Filter.module.less';

class FilterBase extends Component {
	static propTypes = {
		activeEvents: PropTypes.array,
		eventCapturingOn: PropTypes.bool,
		onActivateEvent: PropTypes.func,
		onIsSyntheticEventOn: PropTypes.func,
		onSetEventCapturing: PropTypes.func,
		onSetTimerIndex: PropTypes.func,
		syntheticEventOn: PropTypes.bool,
		timerIndex: PropTypes.number
	};

	constructor (props) {
		super(props);
	}

	handleEventCategory = (index) => {
		const {onActivateEvent} = this.props;

		return function ({selected}) {
			onActivateEvent(index, selected);
		};
	};

	handleTimerPicker = ({value}) => {
		this.props.onSetTimerIndex(value);
	};

	handleEventCapturing = ({selected}) => {
		this.props.onSetEventCapturing(selected);
	};

	handleSyntheticEventOn = ({selected}) => {
		this.props.onIsSyntheticEventOn(selected);
	};

	render () {
		const
			timergroup = ['3 sec', '5 sec', '10 sec'],
			eventItems = eventCategory.map((e, i) => {
				const handler = this.handleEventCategory(i);
				return (
					<SwitchItem
						className={css.switchItem}
						inline
						key={i}
						selected={this.props.activeEvents[i]}
						size="small"
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
						selected={this.props.eventCapturingOn}
						size="small"
						onToggle={this.handleEventCapturing}
					>
						Event Capturing
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						inline
						selected={this.props.syntheticEventOn}
						size="small"
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
							value={this.props.timerIndex}
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
	onSetTimerIndex (delay) {
		dispatch(setTimerIndex(delay));
	}
});

const Filter = connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterBase);

export default Filter;
