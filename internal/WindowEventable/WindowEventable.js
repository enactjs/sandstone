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
import {useEffect} from 'react';

/*
 * Use the `globalNode` key in the config to change which node the relevant events are attached to.
 */
const defaultConfig = {
	globalNode: 'window'
};

// In config, extract all the config stuff we know about. Everything else is an event.
const WindowEventable = hoc(defaultConfig, ({globalNode, ...events}, Wrapped) => {
	// eslint-disable-next-line no-shadow
	const WindowEventable = (props) => {
		useEffect(() => {
			switch (globalNode) {
				case 'window':
					globalNode = window;
					break;
				case 'document':
					globalNode = document;
					break;
			}

			const localEvents = {};
			for (let [eventName, fn] of Object.entries(events)) {
				// Tailored event names (convert from React style to browser style naming)
				if (eventName.indexOf('on') === 0) {
					eventName = eventName.substring(2).toLowerCase();
				}

				if (typeof fn === 'function') {
					// Support functions passed directly into the config
					localEvents[eventName] = handle(eventPayload => fn(eventPayload, props));
				} else if (typeof fn === 'string') {
					// Support strings, representing a callback in the props list
					localEvents[eventName] = handle(forward(fn, props));
				}
			}

			if (typeof globalNode === 'object') {
				for (const [eventName, fn] of Object.entries(localEvents)) {
					on(eventName, fn, globalNode);
				}
			}

			return () => {
				if (typeof globalNode === 'object') {
					for (const [eventName, fn] of Object.entries(localEvents)) {
						off(eventName, fn, globalNode);
					}
				}
			};
		}, []); // eslint-disable-line react-hooks/exhaustive-deps

		const rest = Object.assign({}, props);
		for (const eventName of Object.keys(events)) {
			delete rest[eventName];
		}

		return (<Wrapped {...rest} />);
	};

	WindowEventable.displayName = 'WindowEventable';

	return WindowEventable;
});

export default WindowEventable;
