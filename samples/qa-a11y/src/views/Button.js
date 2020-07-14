import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import React from 'react';

const ButtonView = () => (
	<>
		<Heading showLine>Default</Heading>
		<Button />
		<Button>Button</Button>
		<Button color="red">Red Button</Button>
		<Button color="blue">Blue Button</Button>
		<Button disabled>Disabled Button</Button>
		<Heading showLine>Buttons with Icon</Heading>
		<Button icon="play" />
		<Button icon="+" />
		<Heading showLine>Aria-labelled Buttons</Heading>
		<Button color="yellow" aria-label="color button">yellow Button</Button>
		<Button aria-label="plug icon button">plug</Button>
	</>
);

export default ButtonView;
