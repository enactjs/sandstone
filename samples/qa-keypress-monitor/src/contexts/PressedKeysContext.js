import React, {createContext, useState} from 'react';

import useEventListener from '../hooks/useEventListener';

const PressedKeysContext = createContext(null);

const PressedKeysProvider = ({children}) => {
	const [pressedKeys, setPressedKeys] = useState(new Map());

	const removeFromMap = ({which}) => {
		const keyMap = new Map(pressedKeys);

		keyMap.delete(which);
		setPressedKeys(keyMap);
	};

	const addToMap = ({code, key, which}) => {
		const keyMap = new Map(pressedKeys);

		keyMap.set(which, {code, key, which});
		setPressedKeys(keyMap);
		// remove the key after some time
		setTimeout(() => {
			removeFromMap({which});
		}, 750);
	};


	useEventListener(document, 'keydown', addToMap);

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
