import React, {createContext, useState} from 'react';

import useEventListener from '../hooks/useEventListener';

const PressedKeysContext = createContext(null);

const PressedKeysProvider = ({children}) => {
	const [pressedKeys, setPressedKeys] = useState(new Map());

	const addToMap = ({code, key, which}) => {
		const keyMap = new Map(pressedKeys);

		keyMap.set(which, {code, key, which});
		setPressedKeys(keyMap);
	};
	const removeFromMap = ({which}) => {
		const keyMap = new Map(pressedKeys);

		keyMap.delete(which);
		setPressedKeys(keyMap);
	};

	useEventListener(document, 'keydown', addToMap);
	useEventListener(document, 'keyup', removeFromMap);

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
