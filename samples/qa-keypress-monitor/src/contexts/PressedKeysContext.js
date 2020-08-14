import React, {createContext, useEffect, useState} from 'react';

import useEventListener from '../hooks/useEventListener';

const PressedKeysContext = createContext(null);

const PressedKeysProvider = ({children, eventExpirationTime = 750}) => {
	const [pressedKeys, setPressedKeys] = useState(new Map());

	const addToMap = ({code, key, which}) => {
		const timestamp = new Date().getTime();
		const keyMap = new Map(pressedKeys);

		keyMap.set(which, {code, key, timestamp, which});
		setPressedKeys(keyMap);
	};

	const removeStaleEntries = (age = eventExpirationTime) => {
		const now = new Date().getTime();
		const keyMap = new Map(pressedKeys);
		keyMap.forEach(({timestamp, which}) => {
			if (now - timestamp >= age) {
				keyMap.delete(which);
			}
		});
		setPressedKeys(keyMap);
	};

	const expirationTimer = setInterval(removeStaleEntries, eventExpirationTime);

	useEffect(
		() => (() => {
			clearInterval(expirationTimer);
		}),
		[expirationTimer]
	);


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
