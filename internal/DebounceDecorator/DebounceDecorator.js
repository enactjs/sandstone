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
	 * Event to debounce
	 *
	 * @type {String}
	 * @required
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	debounce: null,

	/**
	 * Time, in ms, to wait to emit the event
	 *
	 * @type {Number}
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	delay: 300
};

/**
 * {@link sandstone/internal/DebounceDecorator.DebounceDecorator} provides common behavior for
 * debounce an event on particular action
 *
 * @class DebounceDecorator
 * @memberof sandstone/internal/DebounceDecorator
 * @hoc
 * @private
 */

const DebounceDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {debounce, delay} = config;

	return class extends React.Component {
		static displayName = 'DebounceDecorator'

		static propTypes = /** @lends sandstone/internal/DebounceDecorator.DebounceDecorator.prototype */ {
			/**
			 * Handler for `onSelect` events
			 *
			 * @type {Function}
			 * @public
			 */
			[debounce]: PropTypes.func
		}

		constructor (props) {
			super(props);
			this.job = new Job(this.emitEvent.bind(this), delay);
		}

		emitEvent (ev) {
			if (this.props[debounce]) {
				this.props[debounce](ev);
			}
		}

		handleEvent = (ev) => {
			this.job.start(ev);
		}

		render () {
			let props = this.props;

			if (debounce) {
				props = {
					...props,
					[debounce]: this.handleEvent
				};
			}

			return (
				<Wrapped {...props} />
			);
		}
	};
});

export default DebounceDecorator;
export {DebounceDecorator};
