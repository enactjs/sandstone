import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Scroller from '@enact/ui/Scroller';

import Log from './Log';

import css from './Log.module.less';

const LogsBase = kind({
	name: 'LogBase',
	propTypes: {
		eventLogs: PropTypes.array
	},
	render: ({eventLogs}) => {
		const logs = eventLogs.map(log => <Log key={log.timeoutId} className={css.log} log={log} />);
		return (
			<div className={css.content}>
				<Scroller className={css.content}>
					{logs}
				</Scroller>
			</div>
		);
	}
});

const mapStateToProps = ({eventLogs}) => ({
	eventLogs
});

const Logs = connect(mapStateToProps)(LogsBase);

export default Logs;
