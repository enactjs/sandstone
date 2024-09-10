import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import css from './Log.module.scss';

const Log = kind({
	name: 'Log',

	propTypes: {
		log: PropTypes.object
	},

	render: ({log, ...rest}) => {
		const {eventName, isDOMElement, isCapturing, eventObject} = log;
		return (
			<div
				{...rest}
			>
				<div className={css.name}>{eventName}</div>
				<div className={css.elementKind}>{isDOMElement ? 'DOM' : 'React'}</div>
				<div className={css.eventCapturing}>{isCapturing ? 'Capturing' : 'Bubbling'}</div>
				<div className={css.eventInfo}>{JSON.stringify(eventObject)}</div>
			</div>
		);
	}
});

export default Log;
