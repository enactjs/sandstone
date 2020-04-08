import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ImageItem from '@enact/sandstone/ImageItem';
import {scale} from '@enact/ui/resolution';
import TabGridListLayout, {TabGridListItem} from '@enact/sandstone/TabGridListLayout';
import Button from '@enact/sandstone/Button';
import {Header} from '@enact/sandstone/Panels';

TabGridListLayout.displayName = 'TabGridListLayout';
const Config = mergeComponentMetadata('TabGridListLayout', TabGridListLayout);

// Set up some defaults for info and knobs
const items = [],
	defaultDataSize = 1000,
	longContent = 'Lorem ipsum dolor sit amet',
	prop = {
		buttons: {
			'no buttons': null,
			'1 button': <Button icon="ellipsis" />,
			'2 buttons': <React.Fragment>
				<Button icon="search" />
				<Button icon="ellipsis" />
			</React.Fragment>
		},
		buttonsSelection: ['no buttons', '1 button', '2 buttons'],
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	shouldAddLongContent = ({index, modIndex}) => (
		index % modIndex === 0 ? ` ${longContent}` : ''
	),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {children, label, src} = items[index];

		return (
			<ImageItem
				{...rest}
				label={label}
				src={src}
			>{children}</ImageItem>
		);
	};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			count = (headingZeros + i).slice(-itemNumberDigits),
			children = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			label = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			src = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

		items.push({children, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

//
//
//
//
// Header doesn't collapse properly when the buttons are showing. It only moves a little bit, likely because the margins are getting in the way.
//
//
//
//

storiesOf('Sandstone', module)
	.add(
		'TabGridListLayout',
		() => {
			const childrenSelection = select('children', prop.buttonsSelection, Config);
			const children = prop.buttons[childrenSelection];

			const HeaderWithChildren = (props) => (
				<Header {...props}>
					{children}
				</Header>
			);

			return (
				<TabGridListLayout
					onSelect={action('onSelect')}
					// leaving this knob out for now until we build out horizontal tabs
					// orientation={select('orientation', ['vertical', 'horizontal'], TabGridListLayout, 'vertical')}
					title={text('title', Config, 'The Matrix')}
					subtitle={text('subtitle', Config, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')}
					headerComponent={HeaderWithChildren}
				>
					<TabGridListItem
						dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
						direction={select('direction', prop.direction, Config)}
						icon="circle"
						title="List one"
						itemRenderer={renderItem}
						itemSize={{
							minWidth: scale(number('minWidth', Config, 640)),
							minHeight: scale(number('minHeight', Config, 540))
						}}
					/>
					<TabGridListItem
						dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
						direction={select('direction', prop.direction, Config)}
						icon="star"
						title="List two"
						itemRenderer={renderItem}
						itemSize={{
							minWidth: scale(number('minWidth', Config, 640)),
							minHeight: scale(number('minHeight', Config, 540))
						}}
					/>
				</TabGridListLayout>
			);
		},
		{
			props: {
				noPanel: true
			}
		}
	);
