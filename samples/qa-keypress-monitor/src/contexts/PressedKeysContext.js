import React, {createContext, useEffect, useState} from 'react';

import useEventListener from '../hooks/useEventListener';

const PressedKeysContext = createContext(null);

const PressedKeysProvider = ({children}) => {
	const [pressedKeys, setPressedKeys] = useState(new Map());

	const addToMap = ({code, key, which}) => {
		const timestamp = new Date().getTime();
		const keyMap = new Map(pressedKeys);

		keyMap.set(which, {code, key, timestamp, which});
		setPressedKeys(keyMap);
	};


	useEventListener(document, 'keydown', addToMap);

	useEffect(() => {

		const removeStaleEntries = (age = 750) => {
			const now = new Date().getTime();
			const keyMap = new Map(pressedKeys);
			keyMap.forEach(({timestamp, which}) => {
				if (now - timestamp >= age) {
					keyMap.delete(which);
				}
			});
			setPressedKeys(keyMap);
		};

		const staleEntryRemovalTimer = setTimeout(removeStaleEntries, 750);

		return (() => {
			clearTimeout(staleEntryRemovalTimer);
		});
	}, [pressedKeys]);

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
