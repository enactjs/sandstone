import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import ri from '@enact/ui/resolution';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import {storiesOf} from '@storybook/react';

import Scroller from '@enact/sandstone/Scroller';

const
	prop = {
		direction: ['both', 'horizontal', 'vertical'],
		focusableScrollbarOption: {
			'true': true,
			'false': false,
			'byEnter': 'byEnter'
		},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	};

const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

storiesOf('Sandstone', module)
	.add(
		'Scroller',
		() => {
			const
				direction = select('direction', prop.direction, ScrollerConfig),
				fadeOut = boolean('fadeOut', ScrollerConfig, true),
				focusableScrollbar = select('focusableScrollbar', prop.focusableScrollbarOption, ScrollerConfig, 'byEnter'),
				// Need to define the content size to reserve the scrollbar area and margin width (ri.scale(108)).
				// or apply padding by RTL and direction.
				contentWidth = (fadeOut && focusableScrollbar === 'byEnter') || direction === 'horizontal' ? 'initial' : 'calc(100% - ' + ri.scale(108) + 'px)';
			return (
				<Scroller
					direction={direction}
					fadeOut={fadeOut}
					focusableScrollbar={focusableScrollbar}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, ScrollerConfig)}
					key={select('scrollMode', prop.scrollModeOption, ScrollerConfig)}
					noScrollByWheel={boolean('noScrollByWheel', ScrollerConfig)}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, ScrollerConfig)}
					spotlightDisabled={boolean('spotlightDisabled', ScrollerConfig, false)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, ScrollerConfig)}
				>
					<div
						style={{
							height: ri.scaleToRem(2004),
							width: contentWidth
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
						Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
						<div
							style={{
								marginTop: ri.scaleToRem(1602)
							}}
						>
							Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
						</div>
					</div>
				</Scroller>
			);
		},
		{
			info: {
				text: 'Basic usage of Scroller'
			}
		}
	);
