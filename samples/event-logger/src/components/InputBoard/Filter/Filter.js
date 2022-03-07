import Heading from '@enact/sandstone/Heading';
import Picker from '@enact/sandstone/Picker';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {activateEvent, isSyntheticEventOn, setTimerIndex, setEventCapturing} from '../../../actions';
import eventCategory from '../../../constants/eventCategory';

import css from './Filter.module.less';

const Filter = () => {
	const dispatch = useDispatch();

	const activeEvents = useSelector((state) => state.activeEvents);
	const eventCapturingOn = useSelector((state) => state.eventCapturingOn);
	const syntheticEventOn = useSelector((state) => state.syntheticEventOn);
	const timerIndex = useSelector((state) => state.timerIndex);

	const onActivateEvent = useCallback((index, selected) => dispatch(activateEvent(index, selected)), [dispatch]);
	const onSetTimerIndex = useCallback((delay) => dispatch(setTimerIndex(delay)), [dispatch]);
	const onSetEventCapturing = useCallback((value) => dispatch(setEventCapturing(value)), [dispatch]);
	const onIsSyntheticEventOn = useCallback((value) => dispatch(isSyntheticEventOn(value)), [dispatch]);

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
		timergroup = ['3 sec', '5 sec', '10 sec'],
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
						{timergroup}
					</Picker>
				</div>
			</div>
		</div>
	);

};

export default Filter;
