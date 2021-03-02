import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/sandstone/BodyText';
import Heading, {HeadingBase} from '@enact/sandstone/Heading';
import UiHeading from '@enact/ui/Heading';
import {Fragment} from 'react';

Heading.displayName = 'Heading';
const Config = mergeComponentMetadata('Heading', UiHeading, HeadingBase, Heading);

// Set up some defaults for info and knobs
const prop = {
	marqueeOn: ['hover', 'render'],
	size: ['large', 'medium', 'small', 'tiny'],
	spacing: ['auto', 'large', 'medium', 'small', 'none'],
};

export default {
	title: 'Sandstone/Heading',
	component: 'Heading'
};

export const _Heading = () => (
	<Fragment>
		<Heading
			marqueeOn={select('marqueeOn', prop.marqueeOn, Config)}
			showLine={boolean('showLine', Config)}
			size={select('size', prop.size, Config)}
			spacing={select('spacing', prop.spacing, Config)}
		>
			{text('children', Config, 'Heading text')}
		</Heading>
		<BodyText style={{marginTop: 0}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam dapibus imperdiet. Morbi
			diam ex, vulputate eget luctus eu, gravida at ligula. Sed tristique eros sit amet iaculis
			varius. Phasellus rutrum augue id nulla consectetur, a vulputate velit dictum. Vestibulum
			ultrices tellus ac cursus condimentum. Aliquam sit amet consectetur nulla, viverra bibendum
			metus.
		</BodyText>
	</Fragment>
);

_Heading.storyName = 'Heading';
_Heading.parameters = {
	info: {
		text: 'A component for initiating a section of content.'
	}
};
