import Button from '@enact/sandstone/Button';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ButtonView = () => (
	<>
		<Section title="Default">
			<Button alt="No content" />
			<Button alt="Normal">Text 0</Button>
			<Button alt="With color icon" color="red">Text 1</Button>
			<Button alt="With color icon" color="blue">Text 2</Button>
			<Button alt="Disabled" disabled>Text 3</Button>
		</Section>

		<Section className={appCss.marginTop} title="With only Icon">
			<Button alt="With Icon" icon="play" />
			<Button alt="With Icon" icon="+" />
			<Button alt="Disabled with Icon" disabled icon="+" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Button alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</Button>
			<Button alt="Aria-labelled with color icon" aria-label="This is a Label 1." color="yellow">Text 1</Button>
			<Button alt="Aria-labelled and Disabled with color icon" aria-label="This is a Label 2." color="yellow" disabled>Text 2</Button>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled with only Icon">
			<Button alt="Aria-labelled" aria-label="This is an icon 0." icon="play" />
			<Button alt="Aria-labelled" aria-label="This is an icon 1." icon="+" />
			<Button alt="Aria-labelled and Disabled" aria-label="This is an icon 2." disabled icon="+" />
		</Section>
	</>
);

export default ButtonView;
