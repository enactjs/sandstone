import SwitchItem from '@enact/sandstone/SwitchItem';
import PropTypes from 'prop-types';
import {createRef, Component} from 'react';
import {connect} from 'react-redux';

import {addEventLog, removeEventLog, updateEventLog} from '../../actions';
import eventCategory from '../../constants/eventCategory';

import eventRegData from './Event/EventRegistrationData';
import Filter from './Filter';

function extractLogObjectFromEventObject (ev, type, properties) {
	let obj = Object.create(null);
	for (let p of properties) {
		if (typeof ev[p] === 'object') {
			if (type === 'touch') {
				const subType = 'touches';
				if (p === subType && ev[p].length > 0) {
					obj['touchListLength'] = ev[p].length;
					obj[p] = extractLogObjectFromEventObject(ev[p][0], subType, eventRegData.properties[subType]);
				}
			}
		} else if (typeof ev[p] !== 'function') {
			// primitive value
			obj[p] = ev[p];
		}
	}

	return obj;
}

function findLastIndexOfMatchingEvent (array, eventName, isDOMElement, isCapturing) {
	const nomatch = -1;
	for (let i = array.length - 1; i >= 0; i--) {
		if (array[i].eventName === eventName &&
			array[i].isDOMElement === isDOMElement &&
			array[i].isCapturing === isCapturing) {
			return i;
		}
	}

	return nomatch;
}

class InputBoardBase extends Component {
	static propTypes = {
		activeEvents: PropTypes.array,
		eventCapturingOn: PropTypes.bool,
		eventLogs: PropTypes.array,
		onAddEventLog: PropTypes.func,
		onRemoveEventLog: PropTypes.func,
		onUpdateEventLog: PropTypes.func,
		syntheticEventOn: PropTypes.bool,
		timerIndex: PropTypes.number
	};

	constructor (props) {
		super(props);
		this.divRef = createRef();
		this.isCapturing = true;
		this.listenersCache = {bubble: {}, capture: {}};
		this.state = {
			showFilter: true
		};
	}

	componentDidUpdate (prevProps) {
		// add/remove event
		if (prevProps.activeEvents !== this.props.activeEvents) {
			const
				prev = prevProps.activeEvents,
				curr = this.props.activeEvents,
				reactHandlers = {};

			for (let i = 0; i < curr.length; i++) {
				// manage React Event Listeners
				if (curr[i]) {
					Object.assign(
						reactHandlers,
						this.registerEventHandlerForReact(eventCategory[i], this.isCapturing)
					);
				}

				// manage DOM Event Listeners
				if (curr[i] !== prev[i]) {
					if (curr[i]) {
						this.registerEventHandlerForDOM(eventCategory[i], this.isCapturing);
					} else {
						this.unRegisterEventHandlerForDOM(eventCategory[i], this.isCapturing);
					}
				}
			}
			this.reactHandlers = reactHandlers;
		}
	}

	componentWillUnmount () {
		const {activeEvents} = this.props.activeEvents;

		for (let i = 0; i < activeEvents.length; i++) {
			if (activeEvents[i]) {
				this.unRegisterEventHandlerForDOM(eventCategory[i], this.isCapturing);
			}
		}
	}

	sendEventLog = (ev, isDOMElement, eventObject, isCapturing) => {
		const {eventCapturingOn, eventLogs, onAddEventLog, onRemoveEventLog, onUpdateEventLog, syntheticEventOn, timerIndex} = this.props;
		const timergroup = [3000, 5000, 10000];
		if (eventLogs && eventLogs.length > 0) {
			const lastLog = eventLogs[eventLogs.length - 1];

			if (lastLog.eventName === ev.type) {
				const index = findLastIndexOfMatchingEvent(eventLogs, ev.type, isDOMElement, isCapturing);

				if (index >= 0) {
					window.clearTimeout(eventLogs[index].timeoutId);
					onUpdateEventLog(
						eventLogs[index].timeoutId,
						window.setTimeout(() => onRemoveEventLog(ev.type, isDOMElement, isCapturing), timergroup[timerIndex]),
						eventObject
					);
					return;
				}
			}
		}

		// check the conditions to add new event log
		if (!isDOMElement && !syntheticEventOn) {
			return;
		}

		if (isCapturing && !eventCapturingOn) {
			return;
		}

		const timeoutId = window.setTimeout(
			() => onRemoveEventLog(ev.type, isDOMElement, isCapturing),
			timergroup[timerIndex]);
		onAddEventLog(timeoutId, ev.type, isDOMElement, isCapturing, eventObject);
	};

	handleEvent = (eventType, isDOMElement) => {
		const send = this.sendEventLog;
		return function (isCapturing) {
			return function (ev) {
				send(ev,
					isDOMElement,
					extractLogObjectFromEventObject(ev, eventType, eventRegData.properties[eventType]),
					isCapturing
				);
			};
		};
	};

	registerEventHandlerForDOM = (type, isCapturing = false) => {
		const
			handle = this.handleEvent(type, true),
			bubblingListener = handle(false),
			capturingListener = handle(true);

		this.listenersCache.bubble[type] = bubblingListener;
		if (isCapturing) {
			this.listenersCache.capture[type] = capturingListener;
		}

		for (let name of eventRegData.domEventNames[type]) {
			if (isCapturing) {
				this.divRef.current.addEventListener(name, capturingListener, true);
			}
			this.divRef.current.addEventListener(name, bubblingListener);
		}
	};

	unRegisterEventHandlerForDOM = (type, isCapturing = false) => {
		for (let name of eventRegData.domEventNames[type]) {
			this.divRef.current.removeEventListener(name, this.listenersCache.bubble[type]);
			if (isCapturing) {
				this.divRef.current.removeEventListener(name, this.listenersCache.capture[type], true);
			}
		}

		delete this.listenersCache.bubble[type];
		if (isCapturing) {
			delete this.listenersCache.capture[type];
		}
	};

	registerEventHandlerForReact = (type, isCapturing = false) => {
		const handle = this.handleEvent(type, false);
		let results = {};

		for (let name of eventRegData.reactSyntheticEventNames[type]) {
			results[name] = handle(false);
			if (isCapturing && name.match('Enter') == null && name.match('Leave') == null) {
				results[name + 'Capture'] = handle(true);
			}
		}

		return results;
	};

	handleShowFilter = ({selected}) => {
		this.setState({showFilter: selected});
	};

	render () {
		return (
			<div>
				<SwitchItem
					selected={this.state.showFilter}
					size="small"
					onToggle={this.handleShowFilter}
				>
					Filters
				</SwitchItem>
				{this.state.showFilter ? <Filter /> : null}
				<div
					className={this.props.className}
					ref={this.divRef}
					tabIndex="0"
					{...this.reactHandlers}
				>
					{'You can trigger variable events here. For detecting keyboard event, mouse click is needed on it.'}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activeEvents: state.activeEvents,
	timerIndex: state.timerIndex,
	eventCapturingOn: state.eventCapturingOn,
	eventLogs: state.eventLogs,
	syntheticEventOn: state.syntheticEventOn
});

const mapDispatchToProps = dispatch => ({
	onAddEventLog (timeoutId, eventName, isDOMElement, isCapturing, eventObject) {
		dispatch(addEventLog(timeoutId, eventName, isDOMElement, isCapturing, eventObject));
	},
	onRemoveEventLog (eventName, isDOMElement, isCapturing) {
		dispatch(removeEventLog(eventName, isDOMElement, isCapturing));
	},
	onUpdateEventLog (prevTimeoutId, postTimeoutId, eventObject) {
		dispatch(updateEventLog(prevTimeoutId, postTimeoutId, eventObject));
	}
});

const InputBoard = connect(
	mapStateToProps,
	mapDispatchToProps
)(InputBoardBase);

export default InputBoard;
