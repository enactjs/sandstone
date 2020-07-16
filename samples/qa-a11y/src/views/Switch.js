import Switch from '@enact/sandstone/Switch';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const SwitchView = () => (
	<>
		<Switch />
		<Switch disabled />
		<Switch aria-label="This is a Switch" />
		<Switch aria-label="This is a Switch" disabled />
	</>
);

export default SwitchView;
