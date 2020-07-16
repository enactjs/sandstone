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

		<Section className={css.marginTop} title="Buttons with only Icon">
			<Button alt="With Icon" icon="play" />
			<Button alt="With Icon" icon="+" />
			<Button alt="With disabled Icon" disabled icon="+" />
		</Section>

		<Section className={css.marginTop} title="Aria-labelled Buttons">
			<Button alt="Aria-labelled" aria-label="This is a text.">Text</Button>
			<Button alt="Aria-labelled" aria-label="This is a text." color="yellow">Text</Button>
			<Button alt="Aria-labelled and disabled" aria-label="This is a text." color="yellow" disabled>Text</Button>
		</Section>

		<Section className={css.marginTop} title="Aria-labelled Buttons with only Icon">
			<Button alt="With Aria-labelled Icon" aria-label="This is a play icon." icon="play" />
			<Button alt="With Aria-labelled Icon" aria-label="This is a plus icon." icon="+" />
			<Button alt="With Aria-labelled and disabled Icon" aria-label="This is a plus icon." disabled icon="+" />
		</Section>
	</>
);

export default ButtonView;
