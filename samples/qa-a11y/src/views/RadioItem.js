import RadioItem from '@enact/sandstone/RadioItem';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const RadioItemView = () => (
	<>
		<RadioItem>Radio item</RadioItem>
		<RadioItem disabled>Radio item</RadioItem>
	</>
);

export default RadioItemView;
