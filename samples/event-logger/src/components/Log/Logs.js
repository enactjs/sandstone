import kind from '@enact/core/kind';
import Scroller from '@enact/sandstone/Scroller';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

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
		const eventLogs = useSelector((state) => state.eventLogs);
		const logs = eventLogs.map(log => <Log className={css.log} key={log.timeoutId} log={log} />);
		return (
			<Scroller className={css.content}>
				{logs}
			</Scroller>
		);
	}
});

export default Logs;
