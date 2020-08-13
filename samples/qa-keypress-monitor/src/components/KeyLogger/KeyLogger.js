import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import Scroller from '@enact/sandstone/Scroller';

import KeyItem from './KeyItem';

const KeyLogger = kind({
	name: 'KeyLogger',
	computed: {
		children: ({keys}) => {
			const children = [];
			keys.forEach((key) => {
				if (key) {
					const {code, key: keyName, which} = key;
					children.push({code, key: which, keyName, which});
				}

			});

			return children;
		}
	},
	render: ({children}) => {
		return (
			<Scroller
				direction="vertical"
			>
				<Repeater
					childComponent={KeyItem}
				>
					{children}
				</Repeater>
			</Scroller>
		);
	}
});

export default KeyLogger;
export {KeyLogger};
