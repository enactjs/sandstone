//
// WindowEventable (Eventful?)
//
// DEV NOTE: These docs are just plain docs since this component is still under consideration for
// inclusion outside Input's specific use-case. True jsDoc comments will be added at a later time.
//

/*
 * Easily create and add events to the window, document, or other global node.
 *
 * This accepts an arbitrary number of events, in either function or string (referring to an
 * incoming prop) as the callback values.
 *
 * It is recommended to use {@link core/handle} to maintain a consistent event callback signature.
 */

import hoc from '@enact/core/hoc';
import {handle, forward} from '@enact/core/handle';
import {on, off} from '@enact/core/dispatcher';
import React from 'react';

/*
 * Use the `globalNode` key in the config to change which node the relevant events are attached to.
 */
const defaultConfig = {
	globalNode: 'window'
};

// In config, extract all of the config stuff we know about. Everything else is an event.
const WindowEventable = hoc(defaultConfig, ({globalNode, ...events}, Wrapped) => {
	return class extends React.Component {

		static displayName = 'WindowEventable';

		componentDidMount () {
			switch (globalNode) {
				case 'window':
					globalNode = window;
					break;
				case 'document':
					globalNode = document;
					break;
			}

			this.events = {};
			for (let [evName, fn] of Object.entries(events)) {
				// Tailored event names (convert from react style to browser style naming)
				if (evName.indexOf('on') === 0) evName = evName.substr(2).toLowerCase();

				if (typeof fn === 'function') {
					// Support functions passed directly into the config
					this.events[evName] = handle(eventPayload => fn(eventPayload, this.props));
				} else if (typeof fn === 'string') {
					// Support strings, representing a callback in the props list
					this.events[evName] = handle(forward(fn, this.props));
				}
			}

			if (typeof globalNode === 'object') {
				for (const [evName, fn] of Object.entries(this.events)) {
					on(evName, fn, globalNode);
				}
			}
		}

		componentWillUnmount () {
			if (typeof globalNode === 'object') {
				for (const [evName, fn] of Object.entries(this.events)) {
					off(evName, fn, globalNode);
				}
			}
		}

		render () {
			const {...rest} = this.props;
			for (const evName of Object.keys(events)) {
				delete rest[evName];
			}

			return (<Wrapped {...rest} />);
		}
	};
});

export default WindowEventable;
