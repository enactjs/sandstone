import Button from '@enact/sandstone/Button';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const ButtonView = () => (
	<>
		<Section title="Default">
			<Button alt="No content" />
			<Button alt="Normal">Text</Button>
			<Button alt="With color icon" color="red">Text</Button>
			<Button alt="With color icon" color="blue">Text</Button>
			<Button alt="Disabled" disabled>Text</Button>
		</Section>

		<Section className={css.marginTop} title="With only Icon">
			<Button alt="With Icon" icon="play" />
			<Button alt="With Icon" icon="+" />
			<Button alt="Disabled with Icon" disabled icon="+" />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled">
			<Button alt="Aria-labelled" aria-label="This is a Label.">Text</Button>
			<Button alt="Aria-labelled" aria-label="This is a Label." color="yellow">Text</Button>
			<Button alt="Aria-labelled and Disabled" aria-label="This is a Label." color="yellow" disabled>Text</Button>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled with only Icon">
			<Button alt="Aria-labelled" aria-label="This is an icon." icon="play" />
			<Button alt="Aria-labelled" aria-label="This is an icon." icon="+" />
			<Button alt="Aria-labelled and Disabled" aria-label="This is an icon." disabled icon="+" />
		</Section>
	</>
);

export default ButtonView;
