import Item from '@enact/sandstone/Item';
import React from 'react';
import Scroller from '@enact/sandstone/Scroller';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import css from './App.module.less';

const
	items = [],
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	];

for (let i = 0; i < 100; i++) {
	items.push(
		<Item className={css.item} key={i}>
			{(('00' + i).slice(-3) + ' - ' + languages[i % 10])}
		</Item>
	);
}

const ScrollerSample = (props) => {
	return (
		<Scroller {...props}>
			{items}
		</Scroller>
	);
};

export default ThemeDecorator(ScrollerSample);
