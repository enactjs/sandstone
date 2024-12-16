import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {useCallback, useContext} from 'react';

import eventCategory from '../../../constants/eventCategory';
import {EventLoggerContext, EventLoggerDispatchContext} from '../../../context/EventLoggerContext';
import {activateEvent as activateEventAction} from '../../../reducer/activeEventsReducer';
import {setEventCapturing as setEventCapturingAction} from '../../../reducer/eventCapturingOnReducer';
import {isSyntheticEventOn as isSyntheticEventOnAction} from '../../../reducer/syntheticEventOnReducer';
import {setTimerIndex as setTimerIndexAction} from '../../../reducer/timerIndexReducer';

import css from './Filter.module.less';

const Filter = () => {
	const dispatch = useContext(EventLoggerDispatchContext);

	const {activeEventsReducer, eventCapturingOnReducer, syntheticEventOnReducer, timerIndexReducer} = useContext(EventLoggerContext);

	const {activeEvents} = activeEventsReducer;
	const {eventCapturingOn} = eventCapturingOnReducer;
	const {syntheticEventOn} = syntheticEventOnReducer;
	const {timerIndex} = timerIndexReducer;

	const onActivateEvent = useCallback((index, selected) => dispatch(activateEventAction(index, selected)), [dispatch]);
	const onSetTimerIndex = useCallback((delay) => dispatch(setTimerIndexAction(delay)), [dispatch]);
	const onSetEventCapturing = useCallback((value) => dispatch(setEventCapturingAction(value)), [dispatch]);
	const onIsSyntheticEventOn = useCallback((value) => dispatch(isSyntheticEventOnAction(value)), [dispatch]);

	const handleEventCategory = (index) => {
		return function ({selected}) {
			onActivateEvent(index, selected);
		};
	};
	const handleTimerPicker = useCallback(({value}) => {
		onSetTimerIndex(value);
	}, [onSetTimerIndex]);
	const handleEventCapturing = useCallback(({selected}) => {
		onSetEventCapturing(selected);
	}, [onSetEventCapturing]);
	const handleSyntheticEventOn = useCallback(({selected}) => {
		onIsSyntheticEventOn(selected);
	}, [onIsSyntheticEventOn]);

	const
		timerGroup = ['3 sec', '5 sec', '10 sec'],
		eventItems = eventCategory.map((e, i) => {
			const handler = handleEventCategory(i);
			return (
				<SwitchItem
					className={css.switchItem}
					inline
					key={i}
					selected={activeEvents[i]}
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
					selected={eventCapturingOn}
					size="small"
					onToggle={handleEventCapturing}
				>
					Event Capturing
				</SwitchItem>
				<SwitchItem
					className={css.switchItem}
					inline
					selected={syntheticEventOn}
					size="small"
					onToggle={handleSyntheticEventOn}
				>
					React Synthetic Event
				</SwitchItem>
				<div className={css.pickerItem}>
					<Picker
						className={css.timerPicker}
						inlineTitle
						onChange={handleTimerPicker}
						orientation="horizontal"
						title="Timer"
						value={timerIndex}
					>
						{timerGroup}
					</Picker>
				</div>
			</div>
		</div>
	);

};

export default Filter;
