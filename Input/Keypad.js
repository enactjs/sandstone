/*
 * A keypad used to display a sequence of numbers and buttons, like a keyboard.
 */

import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {add} from '@enact/core/keymap';
import {handle, oneOf, forKey, forward, adaptEvent} from '@enact/core/handle';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import css from './Input.module.less';

add('number', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]); // Establish all number keys as 'number' keyword.
add('backspace', 8);

const KEY_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'];

/*
 * A key used inside a Keypad Layout component.
 */
const Key = kind({
	name: 'Key',

	styles: {
		css,
		className: 'key'
	},

	handlers: {
		onClick: handle(
			adaptEvent((ev, {children: key}) => ({key}), forward('onClick'))
		)
	},

	render: ({children, ...rest}) => {
		const content = (children === 'backspace') ? 'arrowleftprevious' : children; // TBD: arrowleftprevious should be replaced to correct one base on GUI
		return (
			<Button
				{...rest}
				size="large"
				icon={content}
			/>
		);
	}
});

const Keypad = kind({
	name: 'Keypad',

	propTypes: {
		onAdd: PropTypes.func,
		onRemove: PropTypes.func
	},

	render: ({onAdd, onRemove, ...rest}) => {
		return (
			<Layout align="center end" wrap {...rest}>
				{KEY_LIST.map((keyText, rowIndex) => {
					return (
						<Cell
							shrink
							component={Key}
							key={`key${rowIndex}-${keyText}`}
							onClick={keyText === 'backspace' ? onRemove : onAdd}
						>
							{keyText}
						</Cell>
					);
				})}
			</Layout>
		);
	}
});

const defaultConfig = {
	globalNode: null
};



//
// WindowEventable (Eventful?)
//
import {on, off} from '@enact/core/dispatcher';

// In config, extract all of the config stuff we know about. Everything else is an event.
const WindowEventable = hoc(defaultConfig, ({globalNode, ...events}, Wrapped) => {
	return class extends React.Component {

		static displayName = 'WindowEventable';

		constructor (props) {
			super(props);

			if (globalNode == null) globalNode = window;

			this.events = {};
			for (let [evName, fn] of Object.entries(events)) {
				// Tailored event names (convert from react style to browser style naming)
				if (evName.indexOf('on') === 0) evName = evName.substr(2).toLowerCase();

				if (typeof fn === 'function') {
					// Support functions passed directly into the config
					this.events[evName] = handle(eventPayload => fn(eventPayload, props));
				} else if (typeof fn === 'string') {
					// Support strings, representing a callback in the props list
					this.events[evName] = handle(forward(fn, props));
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

// Setup a keypress handler for window that monitors each of the number keys and the backspace key
const handleWindowKeyPress = handle(
	oneOf(
		[forKey('number'), forward('onAdd')],
		[forKey('backspace'), forward('onRemove')]
	)
);

export default WindowEventable({onKeyDown: handleWindowKeyPress}, Keypad);
