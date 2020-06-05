import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {Column, Cell} from '@enact/ui/Layout';

import BodyText from '@enact/sandstone/BodyText';
import {FixedPopupPanels, Panel, Header} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';
import {VirtualList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

const Config = mergeComponentMetadata('FixedPopupPanels', FixedPopupPanels);
Config.defaultProps.position = 'right';
Config.defaultProps.scrimType = 'translucent';
Config.defaultProps.spotlightRestrict = 'self-only';
Config.defaultProps.width = 'narrow';

// eslint-disable-next-line enact/prop-types
const itemRenderer = ({index, ...rest}) => {
	return (
		<Item {...rest}>
			Item {index + 1}
		</Item>
	);
};

storiesOf('FixedPopupPanels', module)
	.add(
		'with VirtualList',
		() => (
			<div>
				<FixedPopupPanels
					index={number('index', Config, {range: true, min: 0, max: 1}, 0)}
					open={boolean('open', Config, true)}
					position={select('position', ['left', 'right'], Config)}
					width={select('width', ['narrow', 'half'], Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onBack={action('onBack')}
					onClose={action('onClose')}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config)}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config)}
				>
					<Panel>
						<Header>
							<title>
								FixedPopupPanels Title
							</title>
							<subtitle>
								A panel type for options views
							</subtitle>
						</Header>
						<Column>
							<Cell shrink>
								<BodyText>Example text inside an FixedPopupPanels Panel</BodyText>
							</Cell>
							<Cell>
								<VirtualList
									itemSize={ri.scale(156)}
									itemRenderer={itemRenderer}
									dataSize={20}
								/>
							</Cell>
						</Column>
					</Panel>
					<Panel>
						<Header>
							<title>
								Another Panel
							</title>
							<subtitle>
								This is the second page
							</subtitle>
						</Header>
						<VirtualList
							itemSize={ri.scale(156)}
							itemRenderer={itemRenderer}
							dataSize={20}
						/>
					</Panel>
				</FixedPopupPanels>
				<BodyText centered>Use KNOBS to interact with FixedPopupPanels.</BodyText>
			</div>
		),
		{
			info: {
				text: 'QA -  Basic usage of FixedPopupPanels'
			}
		}
	);
