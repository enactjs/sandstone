import kind from '@enact/core/kind';
import Scroller from '@enact/sandstone/Scroller';
import PropTypes from 'prop-types';
import {useContext} from 'react';

import {EventLoggerContext} from '../../context/EventLoggerContext';

import Log from './Log';

import css from './Log.module.less';

const Logs = kind({
	name: 'LogBase',

	functional: true,

	propTypes: {
		eventLogs: PropTypes.array
	},

	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const {eventLogsReducer} = useContext(EventLoggerContext);
		const {eventLogs} = eventLogsReducer;

		const logs = eventLogs.map((log, index) => <Log className={css.log} log={log} key={index} />);
		return (
			<Scroller className={css.content}>
				{logs}
			</Scroller>
		);
	}
});

export default Logs;
