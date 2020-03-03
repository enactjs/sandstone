/*
 * A keypad used to display a sequence of numbers and buttons, like a keyboard.
 */

import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import Layout from '@enact/ui/Layout';

import Key from './Key';

// import componentCss from './NumberInputPopup.module.less';

const KEY_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del'];

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
						<Key
							key={`key${rowIndex}-${keyText}`}
							onClick={keyText === 'del' ? onRemove : onAdd}
						>
							{keyText}
						</Key>
					);
				})}
			</Layout>
		);
	}
});

export default Keypad;
