import React from 'react';
import handle, {call, forEventProp, forKey} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {Job} from '@enact/core/util';

const job = new Job(function (text) {
	// luna.toss({...})
	console.log(text);
}, 1000);
let activeInstance = null;

const Tossable = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'Tossable'

		componentWillUnmount () {
			if (activeInstance === this) {
				job.stop();
			}
		}

		startToss (ev) {
			activeInstance = this;
			const target = ev.target.closest('[data-webos-intent]');
			if (target) {
				const label = target.dataset.webosIntentLabel || target.textContent;
				job.start(label);
			}
		}

		stopToss () {
			job.stop();
		}

		handleKeyDown = handle(
			forKey('enter'),
			forEventProp('repeat', false),
			call('startToss')
		).bindAs(this, 'handleKeyDown')

		handleKeyUp = handle(
			call('stopToss')
		).bindAs(this, 'handleKeyUp')

		handleBlur = handle(
			call('stopToss')
		).bindAs(this, 'handleBlur')

		handleMouseDown = handle(
			call('startToss')
		).bindAs(this, 'handleMouseDown')

		handleMouseUp = handle(
			call('stopToss')
		).bindAs(this, 'handleMouseUp')

		handleMouseLeave = handle(
			call('stopToss')
		).bindAs(this, 'handleMouseLeave')

		render () {
			return (
				<Wrapped
					{...this.props}
					data-webos-intent
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					onKeyUp={this.handleKeyUp}
					onMouseDown={this.handleMouseDown}
					onMouseLeave={this.handleMouseLeave}
					onMouseUp={this.handleMouseUp}
				/>
			);
		}
	};
});

export default Tossable;
export {
	Tossable
};
