import React, {createContext, useState} from 'react';

import useEventListener from '../hooks/useEventListener';

const PressedKeysContext = createContext(null);

const PressedKeysProvider = ({children}) => {
	const [pressedKeys, setPressedKeys] = useState(new Set());

	const addToSet = ({code, key, type, which}) => {
		// slightly problematic because of storing objects in the Set
		const keySet = new Set(pressedKeys);
		let keyExists = false;

		// iterate keys, compare values for not only `key` but for `code`, `which` (key code), and `type` as well (type will allow to split key details to display differences between keydown/up and keypress)
		keySet.forEach((k) => {
			if (
				k.key === key &&
				k.code === code &&
				k.which === which &&
				k.type === type
			) {
				keyExists = true;
			}
		});

		if (!keyExists) {
			keySet.add({code, key, type, which});
			setPressedKeys(keySet);
		}
	};
	const removeFromSet = ({code}) => {
		const keySet = new Set(pressedKeys);
		// iterate keys, remove all matches of `code`
		keySet.forEach((k) => {
			if (k.code === code) {
				keySet.delete(k);
			}
		});
		setPressedKeys(keySet);
	};

	useEventListener(document, 'keydown', addToSet);
	useEventListener(document, 'keypress', addToSet);
	useEventListener(document, 'keyup', removeFromSet);

	return (
		<PressedKeysContext.Provider
			value={{
				pressedKeys,
				setPressedKeys
			}}
		>
			{children}
		</PressedKeysContext.Provider>
	);
};

export default PressedKeysContext;
export {PressedKeysContext, PressedKeysProvider};
