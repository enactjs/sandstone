/*
 * A keypad used to display a sequence of numbers and buttons, like a keyboard.
 */

import kind from '@enact/core/kind';
import {add} from '@enact/core/keymap';
import {handle, oneOf, forKey, forward, adaptEvent} from '@enact/core/handle';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';

import WindowEventable from './WindowEventable';

import css from './Input.module.less';

add('number', [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]); // Establish all number keys as 'number' keyword.
add('backspace', 8);

const KEY_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace', 'x'];

/*
 * A key used inside a Keypad Layout component.
 */
const Key = kind({
	name: 'Key',

	propTypes: {
		// Event callback fired when this button is clicked. Includes the 'key' key in its event
		// payload to let the clicker know what was clicked inside their callback.
		onKeyButtonClick: PropTypes.func
	},

	styles: {
		css,
		className: 'key'
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			adaptEvent((ev, {children: key}) => ({key}), forward('onKeyButtonClick'))
		)
	},

	computed: {
		className: ({children, styler}) => styler.append(`key${children}`)
	},
	render: ({children: icon, ...rest}) => {
		switch (icon) {
			case 'backspace': { icon = 'arrowleftprevious'; break; } // TBD: arrowleftprevious should be replaced to correct one base on GUI
			case 'x': { icon = 'closex'; break; }
		}

		delete rest.onKeyButtonClick;
		return (
			<Button
				{...rest}
				size="large"
				icon={icon}
			/>
		);
	}
});

const Keypad = kind({
	name: 'Keypad',

	propTypes: {
		onAdd: PropTypes.func,
		onClose: PropTypes.func,
		onRemove: PropTypes.func
	},

	styles: {
		css,
		className: 'keypad'
	},

	render: ({onAdd, onClose, onRemove, ...rest}) => {
		return (
			<Layout align="center end" wrap {...rest} inline>
				{KEY_LIST.map((keyText, rowIndex) => {
					let onKeyButtonClick = onAdd;
					if (keyText === 'backspace') onKeyButtonClick = onRemove;
					if (keyText === 'x') onKeyButtonClick = onClose;

					return (
						<Cell
							shrink
							component={Key}
							key={`key${rowIndex}-${keyText}`}
							onKeyButtonClick={onKeyButtonClick}
						>
							{keyText}
						</Cell>
					);
				})}
			</Layout>
		);
	}
});

// Setup a keypress handler for window that monitors each of the number keys and the backspace key
const handleWindowKeyPress = handle(
	oneOf(
		[forKey('number'), forward('onAdd')],
		[forKey('backspace'), forward('onRemove')]
	)
);

export default WindowEventable({onKeyDown: handleWindowKeyPress}, Keypad);
