import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ImageItem from '@enact/sandstone/ImageItem';
import {scale} from '@enact/ui/resolution';
import {Panel} from '@enact/sandstone/Panels';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Button from '@enact/sandstone/Button';
import {Header} from '@enact/sandstone/Panels';

import iconNames from './icons';

Panel.displayName = 'Panel';
Header.displayName = 'Header';
const HeaderConfig = mergeComponentMetadata('Header', Header);
Tab.displayName = 'Tab';
const TabConfig = mergeComponentMetadata('Tab', Tab);
VirtualGridList.displayName = 'VirtualGridList';
const VGLConfig = mergeComponentMetadata('VirtualGridList', VirtualGridList);

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

storiesOf('Sandstone', module)
	.add(
		'Panels.Panel',
		() => {
			return (
				<Panel>
					<Header
						title={text('title', HeaderConfig, 'The Matrix')}
						subtitle={text('subtitle', HeaderConfig, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.')}
					>
						{prop.buttons[select('children', prop.buttonsSelection, HeaderConfig)]}
					</Header>
					<TabLayout
						onSelect={action('onSelect')}
						// leaving this knob out for now until we build out horizontal tabs
						// orientation={select('orientation', ['vertical', 'horizontal'], TabGridListLayout, 'vertical')}
					>
						<Tab
							icon={select('First View icon', iconNames, TabConfig, 'circle')}
							title={text('First View title', TabConfig, 'List one')}
						>
							<VirtualGridList
								dataSize={updateDataSize(number('dataSize', VGLConfig, defaultDataSize))}
								direction={select('direction', prop.direction, VGLConfig)}
								itemRenderer={renderItem}
								itemSize={{
									minWidth: scale(number('minWidth', VGLConfig, 640)),
									minHeight: scale(number('minHeight', VGLConfig, 540))
								}}
							/>
						</Tab>
						<Tab
							icon={select('Second View icon', iconNames, TabConfig, 'star')}
							title={text('Second View title', TabConfig, 'List two')}
						>
							<VirtualGridList
								dataSize={updateDataSize(number('dataSize', VGLConfig, defaultDataSize))}
								direction={select('direction', prop.direction, VGLConfig)}
								itemRenderer={renderItem}
								itemSize={{
									minWidth: scale(number('minWidth', VGLConfig, 640)),
									minHeight: scale(number('minHeight', VGLConfig, 540))
								}}
							/>
						</Tab>
					</TabLayout>
				</Panel>
			);
		},
		{
			props: {
				noPanel: true
			}
		}
	);
