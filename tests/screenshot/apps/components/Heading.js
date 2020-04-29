import Heading from '../../../../Heading';
import React from 'react';

const HeadingTests = [
	<Heading>tHis is a neW Heading - default</Heading>,
	<Heading spacing="auto">tHis is a neW Heading - spacing is auto</Heading>,
	<Heading spacing="small">This is a new Heading - spacing is small</Heading>,
	<Heading spacing="medium">This is a new Heading - spacing is medium</Heading>,
	<Heading spacing="large">This is a new Heading - spacing is large</Heading>,
	<Heading spacing="none">This is a new Heading - spacing is none</Heading>,
	// Heading with no children
	<Heading />,
	// With line and children -- ENYO-6076
	<Heading showLine>Heading</Heading>,
	<Heading showLine spacing="auto">tHis is a neW Heading - spacing is auto</Heading>,
	<Heading showLine spacing="small">This is a new Heading - spacing is small</Heading>,
	<Heading showLine spacing="medium">This is a new Heading - spacing is medium</Heading>,
	<Heading showLine spacing="large">This is a new Heading - spacing is large</Heading>,
	<Heading showLine spacing="none">This is a new Heading - spacing is none</Heading>,
	// With line and no children
	<Heading showLine />,
	<Heading showLine spacing="small" />,
	<Heading showLine spacing="medium" />,
	<Heading showLine spacing="large" />,
	<Heading showLine spacing="none" />,
	// With auto spacing and different sizes
	<Heading size="title" spacing="auto">Heading</Heading>,
	<Heading size="subtitle" spacing="auto">Heading</Heading>,
	<Heading size="large" spacing="auto">Heading</Heading>,
	<Heading size="medium" spacing="auto">Heading</Heading>,
	<Heading size="small" spacing="auto">Heading</Heading>,
	<Heading size="tiny" spacing="auto">Heading</Heading>,
	{
		locale: 'ar-SA',
		component: <Heading>Heading</Heading>
	},
	// With Italic (PLAT-103068)
	<Heading size="title" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="subtitle" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="large" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="medium" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="small" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="tiny" style={{fontStyle: 'italic'}}>Heading</Heading>
];
export default HeadingTests;
