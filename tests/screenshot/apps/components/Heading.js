import Heading from '../../../../Heading';

import {withConfig, withProps} from './utils';

const bidirectionalHeading = [
	<Heading>Input Password for ABC جهاز, please</Heading>,
	<Heading>Input Password for <bdi>ABC جهاز</bdi>, please</Heading>,
	<Heading>الرجاء إدخال كلمة المرور لـ ABC جهاز</Heading>,
	<Heading>الرجاء إدخال كلمة المرور لـ <bdi>ABC جهاز</bdi></Heading>
];

const bidirectionalTests = [
	...withConfig({locale: 'ar-SA'}, bidirectionalHeading),
	...withConfig({locale: 'en-US'}, bidirectionalHeading)
];

const HeadingTests = [
	<Heading>This is a new Heading - default</Heading>,
	<Heading spacing="auto">This is a new Heading - spacing is auto</Heading>,
	<Heading spacing="small">This is a new Heading - spacing is small</Heading>,
	<Heading spacing="medium">This is a new Heading - spacing is medium</Heading>,
	<Heading spacing="large">This is a new Heading - spacing is large</Heading>,
	<Heading spacing="none">This is a new Heading - spacing is none</Heading>,

	// Heading with no children
	<Heading />,

	// With line and children -- ENYO-6076
	<Heading showLine>Heading</Heading>,
	<Heading showLine spacing="auto">This is a new Heading - spacing is auto</Heading>,
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
	<Heading size="large" spacing="auto">Heading</Heading>,
	<Heading size="medium" spacing="auto">Heading</Heading>,
	<Heading size="small" spacing="auto">Heading</Heading>,
	<Heading size="tiny" spacing="auto">Heading</Heading>,
	{
		locale: 'ar-SA',
		component: <Heading>Heading</Heading>
	},
	<Heading size="medium" style={{fontWeight: 700}}>Heading</Heading>,

	// With Italic (PLAT-103068)
	<Heading size="large" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="medium" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="small" style={{fontStyle: 'italic'}}>Heading</Heading>,
	<Heading size="tiny" style={{fontStyle: 'italic'}}>Heading</Heading>,
	{
		locale: 'ko-KR',
		component: <Heading size="medium" style={{fontStyle: 'italic'}}>Heading</Heading>
	},
	<Heading size="medium" style={{fontStyle: 'italic', fontWeight: 700}}>Heading</Heading>,

	...bidirectionalTests,
	...withProps({forceDirection: 'locale'}, bidirectionalTests)
];

export default HeadingTests;
