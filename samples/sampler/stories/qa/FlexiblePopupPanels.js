/* eslint-disable react/jsx-no-bind */

import React from 'react';
import {storiesOf} from '@storybook/react';

import {FlexiblePopupPanels, Panel, Header} from '@enact/sandstone/FlexiblePopupPanels';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import Item from '@enact/sandstone/Item';

storiesOf('FlexiblePopupPanels', module)
	.add(
		'with changing height',
		() => {

			const defaultIndex = 0;
			const [index, setIndex] = React.useState(defaultIndex);

			const [count, setCount] = React.useState(4);
			React.useEffect(() => {
				const i = setInterval(() => setCount(Math.ceil(Math.random() * 5)), 1000);
				return () => clearInterval(i);
			}, [setCount]);

			return (
				<div>
					<FlexiblePopupPanels open index={index} onChange={(ev) => setIndex(ev.index)}>
						<Panel>
							<Header title="Panel 1" />
							<Scroller style={{width: ri.scaleToRem(900)}}>
								{Array.from({length: count}, (n, i) => <Item key={String(i)}>Item {i}</Item>)}
							</Scroller>
						</Panel>
						<Panel>
							<Header title="Panel 2" />
							<Scroller style={{width: ri.scaleToRem(900)}}>
								{Array.from({length: count}, (n, i) => <Item key={String(i)}>Item {i}</Item>)}
							</Scroller>
						</Panel>
					</FlexiblePopupPanels>
				</div>
			);
		},
		{
			info: {
				text: 'Intended for use with a single "control" at a time, to maximize the amount of background visible.'
			}
		}
	);
