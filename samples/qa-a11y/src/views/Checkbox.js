import Checkbox from '@enact/sandstone/Checkbox';
import ri from '@enact/ui/resolution';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const style = {marginLeft: ri.scaleToRem(36), marginTop: ri.scaleToRem(36)};

const CheckboxView = () => (
	<>
		<Section title="Default">
			<Checkbox alt="Normal" style={style} />
			<Checkbox alt="Disabled" disabled style={style} />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Checkbox alt="Aria-labelled" aria-label="This is a Text" style={style} />
			<Checkbox alt="Aria-labelled and disabled" aria-label="This is a Text" disabled style={style} />
		</Section>
	</>
);

export default CheckboxView;
