/**
 * Exports the {@link sandstone/internal/DebounceDecorator.DebounceDecorator} higher-order component
 *
 * @module sandstone/internal/DebounceDecorator
 * @private
 */

import hoc from '@enact/core/hoc';
import {Job} from "@enact/core/util";
import React from 'react';

/**
 * {@link sandstone/internal/DebounceDecorator.DebounceDecorator} provides common behavior for
 * debounce an event on particular action
 *
 * @class DebounceDecorator
 * @memberof sandstone/internal/DebounceDecorator
 * @hoc
 * @private
 */

const DebounceDecorator = hoc((config, Wrapped) => {
    return class extends React.Component {
		static displayName = 'DebounceDecorator'

		constructor(props) {
			super(props);
			this.job = new Job(this.emitSelect.bind(this), 1000);
		}

		emitSelect(ev) {
			if (this.props.onSelect) {
				this.props.onSelect(ev);
			}
		}

		handleSelect(ev) {
			this.job.start(ev);
		}

		render() {
			return (
				<Wrapped {...this.props} onSelect={this.handleSelect.bind(this)} />
			);
		}
	}
});

export default DebounceDecorator;
export {DebounceDecorator};