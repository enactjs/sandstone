/*
 * A key used inside a Keypad Layout component.
 */

import React from 'react';
import kind from '@enact/core/kind';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import {Cell} from '@enact/ui/Layout';

import Button from '../Button';

import css from './NumberInputPopup.module.less';

// Cell also has a `size` prop which gets confused when the two are stacked together into one component, so we set up a Button that is pre-baked with this prop.
const LargeButton = (props) => <Button size="large" {...props} />;

const Key = kind({
	name: 'Key',

	styles: {
		css,
		className: 'keypadItem'
	},

	handlers: {
		onClick: handle(
			adaptEvent((ev, {children: value}) => ({value}), forward('onClick'))
		)
	},

	render: ({children, ...rest}) => {
		const content = (children === 'del') ? 'arrowleftprevious' : children; // TBD: arrowleftprevious should be replaced to correct one base on GUI
		return (
			<Cell
				{...rest}
				component={LargeButton}
				shrink
				icon={content}
			/>
		);
	}
});

export default Key;
