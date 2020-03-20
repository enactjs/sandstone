import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {Header, HeaderBase, Panels, Panel} from '@enact/sandstone/Panels';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

storiesOf('Sandstone', module)
	.add(
		'Panels',
		() => {
			const story = (
				<Panels index={number('index', 0)}>
					<Panel>
						<Header title="hi!" />
						<div>panel 1</div>
					</Panel>
					<Panel>
						<Header title="hi!" />
						<div>panel 2</div>
					</Panel>
					<Panel>
						<Header title="hi!" />
						<div>panel 3</div>
					</Panel>
				</Panels>
			);
			return story;
		},
		{
			props: {
				noPanels: true
			}
		}
	);
