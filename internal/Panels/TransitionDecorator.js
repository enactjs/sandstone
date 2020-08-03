import {forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import Pause from '@enact/spotlight/Pause';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * A higher-order component that manages spotlight pause state for both popup and panels
 * transitions, generally used within PopupDecorator.
 *
 * @class TransitionDecorator
 * @type {Function}
 * @hoc
 * @private
 * @memberof sandstone/Panels
 */
const TransitionDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'TransitionDecorator'

		static propTypes = /** @lends sandstone/Panels.TransitionDecorator.prototype */ {
			/**
			 * Called after hide transition has completed, and immediately with no transition.
			 *
			 * @type {Function}
			 * @public
			 */
			onHide: PropTypes.func,

			/**
			 * Called once when all panels have completed their transition.
			 *
			 * @type {Function}
			 * @public
			 */
			onTransition: PropTypes.func,

			/**
			 * Called once before panels begin their transition.
			 *
			 * @type {Function}
			 * @public
			 */
			onWillTransition: PropTypes.func
		}

		constructor () {
			super();
			this.paused = new Pause('TransitionDecorator');
		}

		componentWillUnmount () {
			this.resume();
		}

		pause = () => this.paused.pause();

		resume = () => this.paused.resume();

		handle = handle.bind(this);

		handleHide = this.handle(
			forward('onHide'),
			this.resume
		);

		handleTransition = this.handle(
			forward('onTransition'),
			this.resume
		);

		handleWillTransition = this.handle(
			forward('onWillTransition'),
			this.pause
		);

		render () {
			return (
				<Wrapped
					{...this.props}
					onHide={this.handleHide}
					onTransition={this.handleTransition}
					onWillTransition={this.handleWillTransition}
				/>
			);
		}
	};
});

export default TransitionDecorator;
export {TransitionDecorator};
