/**
 * Provides components and methods to delay rendering.
 *
 * @module sandstone/Delayable
 * @exports Delayable
 */

import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

/**
 * Default config for {@link sandstone/Delayable.Delayable}
 *
 * @memberof sandstone/Delayable.Delayable
 * @hocconfig
 */
const defaultConfig = {
	/**
	 * The time to delay rendering.
	 *
	 * @type {Number}
	 * @default 0
	 * @memberof sandstone/Delayable.Delayable.defaultConfig
	 */
	delay: 0
};

/**
 * A higher-order component that renders a component after a given time.
 *
 * @class Delayable
 * @memberof sandstone/Delayable
 * @hoc
 * @public
 */
const Delayable = hoc(defaultConfig, (config, Wrapped) => {
	const {
		delay
	} = config;

	const DelayableComponent = ({instant, ...rest}) => {
		const [timed, setTimed] = useState(instant);

		useEffect(() => {
			const timeoutId = timed ? null : setTimeout(() => {
				setTimed(true);
			}, delay);

			return () => {
				if (!timed) {
					clearTimeout(timeoutId); // need to clear if this is unmounted before timeout
				}
			};
		}, [timed]);

		return timed ? (
			<Wrapped {...rest} />
		) : null;
	};

	DelayableComponent.propTypes = {
		instant: PropTypes.bool
	};

	DelayableComponent.displayName = 'Delayable';

	return DelayableComponent;
});

export default Delayable;
export {
	Delayable
};
