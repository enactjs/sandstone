import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import ri from '@enact/ui/resolution';
import {ScrollableBase as UiScrollableBase} from '@enact/ui/Scrollable';
import {storiesOf} from '@storybook/react';

import {ScrollableBase} from '@enact/malachite/Scrollable';
import Scroller from '@enact/malachite/Scroller';

const
	prop = {
		direction: ['both', 'horizontal', 'vertical'],
		scrollbarOption: ['auto', 'hidden', 'visible']
	};

const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollableBase, ScrollableBase, Scroller);

storiesOf('Malachite', module)
	.add(
		'Scroller',
		() => (
			<Scroller
				direction={select('direction', prop.direction, ScrollerConfig)}
				focusableScrollbar={boolean('focusableScrollbar', ScrollerConfig)}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, ScrollerConfig)}
				noScrollByWheel={boolean('noScrollByWheel', ScrollerConfig)}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				spotlightDisabled={boolean('spotlightDisabled', ScrollerConfig, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, ScrollerConfig)}
			>
				<div
					style={{
						height: ri.unit(1002, 'rem'),
						width: ri.unit(2001, 'rem')
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
					Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
					<div
						style={{
							marginTop: ri.unit(801, 'rem')
						}}
					>
						Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
					</div>
				</div>
			</Scroller>
		),
		{
			info: {
				text: 'Basic usage of Scroller'
			}
		}
	);
