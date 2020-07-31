import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Repeater from '@enact/ui/Repeater';

import KeyItem from './KeyItem';
import PressedKeysContext from '../../contexts/PressedKeysContext';

const modifierKeys = ['alt', 'control', 'shift', 'meta'];

const KeyLoggerBase = kind({
	name: 'KeyLogger',
	computed: {
		children: ({children}) => {
			const keys = [];
			children.forEach(({code, key: keyName, which}) => {
				keys.push({code, key: which, keyName, which});
			});

			return keys;
		}
	},
	render: ({children}) => {
		return <Repeater childComponent={KeyItem}>{children}</Repeater>;
	}
});

const KeyLogger = ({modifiers = false}) => {
	const {pressedKeys} = useContext(PressedKeysContext);
	const keys = [];
	for (const value of pressedKeys.values()) {
		keys.push(value);
	}
	const isModifier = ({key}) => modifierKeys.includes(key.toLowerCase());
	const keyFilter = modifiers
		? (key) => isModifier(key)
		: (key) => !isModifier(key);

	return <KeyLoggerBase>{keys.filter(keyFilter)}</KeyLoggerBase>;
};

KeyLogger.propTypes = {
	modifiers: PropTypes.bool
};

export default KeyLogger;
export {KeyLogger, KeyLoggerBase};
