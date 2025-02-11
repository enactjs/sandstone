import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import {Header, Panel} from '@enact/sandstone/Panels';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select, text} from '@enact/storybook-utils/addons/controls';
import {scale} from '@enact/ui/resolution';
import {Fragment} from 'react';

import iconNames from '../helper/icons';
import {svgGenerator} from '../helper/svg';

Panel.displayName = 'Panel';
Header.displayName = 'Header';
const HeaderConfig = mergeComponentMetadata('Header', Header);
Tab.displayName = 'Tab';
const TabConfig = mergeComponentMetadata('Tab', Tab);
VirtualGridList.displayName = 'VirtualGridList';
const VGLConfig = mergeComponentMetadata('VirtualGridList', VirtualGridList);

// Set up some defaults for info and controls
const items = [],
	defaultDataSize = 1000,
	longContent = 'Lorem ipsum dolor sit amet',
	prop = {
		buttons: {
			'no buttons': null,
			'1 button': <Button icon="ellipsis" />,
			'2 buttons': (
				<Fragment>
					<Button icon="search" />
					<Button icon="ellipsis" />
				</Fragment>
			)
		},
		buttonsSelection: ['no buttons', '1 button', '2 buttons'],
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate']
	},
	shouldAddLongContent = ({index, modIndex}) => (index % modIndex === 0 ? ` ${longContent}` : ''),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {children, label, src} = items[index];

		return (
			<ImageItem {...rest} label={label} src={src}>
				{children}
			</ImageItem>
		);
	};

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const count = (headingZeros + i).slice(-itemNumberDigits),
			children = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			label = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
			src = svgGenerator(300, 300, color, 'ffffff', `Image ${i}`);

		items.push({children, label, src});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

export default {
	title: 'Sandstone/Panels.Panel',
	component: 'Panel'
};

export const PanelsPanel = (args) => (
	<Panel>
		<Header
			title={args['title']}
			subtitle={args['subtitle']}
		>
			{prop.buttons[args['children']]}
		</Header>
		<TabLayout
			onSelect={action('onSelect')}
			// leaving this control out for now until we build our horizontal tabs
			// orientation={select('orientation', ['vertical', 'horizontal'], TabGridListLayout, 'vertical')}
		>
			<Tab
				icon={args['First View icon']}
				title={args['First View title']}
			>
				<VirtualGridList
					dataSize={updateDataSize(args['dataSize'])}
					direction={args['direction']}
					itemRenderer={renderItem}
					itemSize={{
						minWidth: scale(args['minWidth']),
						minHeight: scale(args['minHeight'])
					}}
				/>
			</Tab>
			<Tab
				icon={args['Second View icon']}
				title={args['Second View title']}
			>
				<VirtualGridList
					dataSize={updateDataSize(args['dataSize'])}
					direction={args['direction']}
					itemRenderer={renderItem}
					itemSize={{
						minWidth: scale(args['minWidth']),
						minHeight: scale(args['minHeight'])
					}}
				/>
			</Tab>
		</TabLayout>
	</Panel>
);

text('title', PanelsPanel, HeaderConfig, 'The Matrix');
text(
	'subtitle',
	PanelsPanel,
	HeaderConfig,
	'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
);
select('children', PanelsPanel, prop.buttonsSelection, HeaderConfig, 'no buttons');
select('First View icon', PanelsPanel, iconNames, TabConfig, 'circle');
text('First View title', PanelsPanel, TabConfig, 'List one');
number('dataSize', PanelsPanel, VGLConfig, defaultDataSize);
select('direction', PanelsPanel, prop.direction, VGLConfig);
number('minWidth', PanelsPanel, VGLConfig, 640);
number('minHeight', PanelsPanel, VGLConfig, 540);
select('Second View icon', PanelsPanel, iconNames, TabConfig, 'star');
text('Second View title', PanelsPanel, TabConfig, 'List two');
number('dataSize', PanelsPanel, VGLConfig, defaultDataSize);
select('direction', PanelsPanel, prop.direction, VGLConfig);
number('minWidth', PanelsPanel, VGLConfig, 640);
number('minHeight', PanelsPanel, VGLConfig, 540);

PanelsPanel.storyName = 'Panels.Panel';
PanelsPanel.parameters = {
	props: {
		noPanel: true
	}
};
