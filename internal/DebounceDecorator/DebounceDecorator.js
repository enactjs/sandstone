/**
 * Exports the {@link sandstone/internal/DebounceDecorator.DebounceDecorator} higher-order component
 *
 * @module sandstone/internal/DebounceDecorator
 * @private
 */

import hoc from '@enact/core/hoc';
import {Job} from '@enact/core/util';
import PropTypes from 'prop-types';
import React from 'react';

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

	return class extends React.Component {
		static displayName = 'DebounceDecorator';

		static propTypes = /** @lends sandstone/internal/DebounceDecorator.DebounceDecorator.prototype */ {
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

		constructor (props) {
			super(props);
			this.job = new Job(this.emitEvent.bind(this), delay);
		}

		componentWillUnmount () {
			this.job.stop();
		}

		emitEvent (ev) {
			if (this.props[debounce]) {
				this.props[debounce](ev);
			}
		}

		handleEvent = (ev) => {
			this.job.start(ev);
		};

		handleCancel = (ev) => {
			if (this.props[cancel]) {
				this.props[cancel](ev);
			}
			this.job.stop();
		};

		render () {
			let props = this.props;

			if (debounce || cancel) {
				props = {...props};

				if (debounce) props[debounce] = this.handleEvent;
				if (cancel) props[cancel] = this.handleCancel;
			}

			return (
				<Wrapped {...props} />
			);
		}
	};
});

export default DebounceDecorator;
export {DebounceDecorator};
