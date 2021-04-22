import PropTypes from 'prop-types';
import React from 'react';

import css from './Log.module.less';

class Log extends React.Component {
	static propTypes = {
		log: PropTypes.object
	}

	render () {
		const {eventName, isDOMElement, isCapturing, eventObject} = this.props.log;
		return (
			<div
				{...this.props}
			>
				<div className={css.name}>{eventName}</div>
				<div className={css.elementKind}>{isDOMElement ? 'DOM' : 'React'}</div>
				<div className={css.eventCapturing}>{isCapturing ? 'Capturing' : 'Bubbling'}</div>
				<div className={css.eventInfo}>{JSON.stringify(eventObject)}</div>
			</div>
		);
	}
}

export default Log;
