/**
 * Exports the {@link sandstone/internal/DebounceDecorator.DebounceDecorator} higher-order component
 *
 * @module sandstone/internal/DebounceDecorator
 * @private
 */

import hoc from '@enact/core/hoc';
import {Job} from '@enact/core/util';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef} from 'react';

/**
 * Default config for {@link sandstone/internal/DebounceDecorator.DebounceDecorator}.
 *
 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator
 * @hocconfig
 */
const defaultConfig = {

	/**
	 * Event name to cancel an active debounce
	 *
	 * @type {String}
	 * @default null
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	cancel: null,

	/**
	 * Event name to debounce
	 *
	 * @type {String}
	 * @default 'onChange'
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	debounce: 'onChange',

	/**
	 * Time, in milliseconds, to wait before emitting the event
	 *
	 * @type {Number}
	 * @default 500
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	delay: 500
};

/**
 * Provides common means of delaying an event response, like throttling
 *
 * This is useful if events are flooding in too quickly to efficiently handle. This lets you ignore
 * events occurring after `delay` of milliseconds.
 *
 * @class DebounceDecorator
 * @memberof sandstone/internal/DebounceDecorator
 * @hoc
 * @private
 */
const DebounceDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {cancel, debounce, delay} = config;

	// eslint-disable-next-line no-shadow
	const DebounceDecorator = (props) => {
		let debounceProps = props;

		const emitEvent = useCallback((ev) => {
			if (props[debounce]) {
				props[debounce](ev);
			}
		}, [props]);

		const job = useRef(new Job(emitEvent, delay));

		useEffect(() => {
			return () => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				job.current.stop();
			};
		}, []);

		const handleEvent = useCallback((ev) => {
			job.current.start(ev);
		}, []);

		const handleCancel = useCallback((ev) => {
			if (props[cancel]) {
				props[cancel](ev);
			}
			job.current.stop();
		}, [props]);

		if (debounce || cancel) {
			debounceProps = {...props};

			if (debounce) debounceProps[debounce] = handleEvent;
			if (cancel) debounceProps[cancel] = handleCancel;
		}

		return (
			<Wrapped {...debounceProps} />
		);
	};

	DebounceDecorator.displayName = 'DebounceDecorator';

	DebounceDecorator.propTypes = {/** @lends sandstone/internal/DebounceDecorator.DebounceDecorator.prototype */
		/**
		 * Handler for `onChange` events
		 *
		 * `'onChange'` can be changed to a different prop name by specifying the `debounce`
		 * config option.
		 *
		 * @see {@link sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig#debounce}
		 * @name onChange
		 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.prototype
		 * @type {Function}
		 * @public
		 */
		[debounce]: PropTypes.func
	};

	return DebounceDecorator;
});

export default DebounceDecorator;
export {DebounceDecorator};
