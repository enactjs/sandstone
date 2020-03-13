/**
 * Exports the {@link sandstone/internal/DebounceDecorator.DebounceDecorator} higher-order component
 *
 * @module sandstone/internal/DebounceDecorator
 * @private
 */

import handle, {call} from '@enact/core/handle';
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
	 * @type {String[]}
	 * @required
	 * @memberof sandstone/internal/DebounceDecorator.DebounceDecorator.defaultConfig
	 */
	debounce: null,

	/**
	 * Time, in ms, to wait to emit the event
	 *
	 * @type {String[]}
	 * @required
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

		handleEvent (ev) {
			this.job.start(ev);
		}

		handleKeyEvent = handle (
			call('handleEvent')
		).bindAs(this, 'handleKeyEvent')

		render () {
			const props = {
				...this.props,
				[debounce]: this.handleKeyEvent
			};

			return (
				<Wrapped {...props} />
			);
		}
	};
});

export default DebounceDecorator;
export {DebounceDecorator};
