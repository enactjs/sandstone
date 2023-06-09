import kind from '@enact/core/kind';
import React from 'react';
import Picker from '@enact/sandstone/Picker';

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const PickerView = kind({
	name: 'PickerView',

	render: () => (
		<Picker
			wrap
			joined
			width="large"
		>
			{airports}
		</Picker>
	)
});

export default PickerView;
