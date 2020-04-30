import kind from '@enact/core/kind';
import React from 'react';
import Button from '@enact/sandstone/Button';
import Item from '@enact/sandstone/Item';
import Picker from '@enact/sandstone/Picker';

// import Tossable from '../components/TossableGlobal';

import Tossable from '../components/Tossable';


const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const TossablePicker = Tossable(Picker);

const TossableButtonComponent = Tossable(Button);

const TossableItemComponent = Tossable(Item);

const View = kind({
	name: 'TossView',

	render: () => {
		return (
			<div id="toss">

				<div>Click Button to TOSS</div>
				<TossableButtonComponent>OK</TossableButtonComponent>
				<TossableButtonComponent>Cancel</TossableButtonComponent>
				<TossableButtonComponent>Refresh</TossableButtonComponent>

				<hr/>

				<div>Select TV UI</div>
				<TossableItemComponent>sandstone</TossableItemComponent>
				<TossableItemComponent>moonstone</TossableItemComponent>

				<hr/>

				<div>Select Airport</div>
				<TossablePicker wrap joined width="large">
					{airports}
				</TossablePicker>

				<hr/>

				<div>Select Apps</div>
				<TossableItemComponent>Google</TossableItemComponent>
				<TossableItemComponent>Netflix</TossableItemComponent>
				<TossableItemComponent>Apple</TossableItemComponent>
				<TossableItemComponent>Amazon</TossableItemComponent>
			</div>
		);
	}
});

export default View;
