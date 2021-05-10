import kind from '@enact/core/kind';
import Scroller from '@enact/sandstone/Scroller';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Log from './Log';

import css from './Log.module.less';

const LogsBase = kind({
	name: 'LogBase',

	propTypes: {
		eventLogs: PropTypes.array
	},

	render: ({eventLogs}) => {
		const logs = eventLogs.map(log => <Log className={css.log} key={log.timeoutId} log={log} />);
		return (
			<Scroller className={css.content}>
				{logs}
			</Scroller>
		);
	}
});

const mapStateToProps = ({eventLogs}) => ({
	eventLogs
});

const Logs = connect(mapStateToProps)(LogsBase);

export default Logs;
