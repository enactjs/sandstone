/* eslint-disable react/jsx-no-bind */

import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import compose from 'ramda/src/compose';
import {storiesOf} from '@storybook/react';
import {Column, Cell} from '@enact/ui/Layout';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
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
		() => {
			const defaultOpen = true;
			const [open, setOpenState] = React.useState(defaultOpen);
			const toggleOpen = () => setOpenState(!open);
			const handleClose = compose(toggleOpen, action('onClose'));

			const defaultIndex = 0;
			const [index, setPanelIndexState] = React.useState(defaultIndex);

			const nextPanel = () => setPanelIndexState(Math.min(index + 1, 3));
			const prevPanel = () => setPanelIndexState(Math.max(index - 1, 0));
			const handleBack = compose(prevPanel, action('onBack'));

			const itemHeight = 156;
			const itemSize = ri.scale(itemHeight);

			return (<div>
				<FixedPopupPanels
					index={index}
					open={open}
					position={select('position', ['left', 'right'], Config)}
					fullHeight={boolean('fullHeight', Config)}
					width={select('width', ['narrow', 'half'], Config)}
					noAnimation={boolean('noAnimation', Config)}
					noAutoDismiss={boolean('noAutoDismiss', Config)}
					onBack={handleBack}
					onClose={handleClose}
					onHide={action('onHide')}
					onShow={action('onShow')}
					scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config)}
					spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config)}
				>
					<Panel>
						<Header>
							<title>
								Panel 1
							</title>
							<subtitle>
								20-Item VirtualList in a `Layout`
							</subtitle>
							<slotAfter>
								<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
							</slotAfter>
						</Header>
						<Column>
							<Cell shrink component={BodyText}>A 3-Cell Layout with 4 visible items in a VirtualList</Cell>
							<Cell
								size={itemHeight * 4}
								component={VirtualList}
								childProps={{onClick: nextPanel}}
								itemSize={itemSize}
								itemRenderer={itemRenderer}
								dataSize={20}
							/>
							<Cell shrink component={BodyText}>This text should be visible.</Cell>
						</Column>
					</Panel>
					<Panel>
						<Header>
							<title>
								Panel 2
							</title>
							<subtitle>
								3-Item VirtualList in a `Layout`
							</subtitle>
							<slotAfter>
								<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
							</slotAfter>
						</Header>
						<Column>
							<Cell shrink>
								<BodyText>A 3-Cell Layout with fixed height VirtualList</BodyText>
							</Cell>
							<Cell size={itemHeight * 3}>
								<VirtualList
									childProps={{onClick: nextPanel}}
									itemSize={itemSize}
									itemRenderer={itemRenderer}
									dataSize={3}
								/>
							</Cell>
							<Cell shrink component={BodyText}>This text should be visible.</Cell>
						</Column>
					</Panel>
					<Panel>
						<Header>
							<title>
								Panel 3
							</title>
							<subtitle>
								VirtualList filling the height of the panel
							</subtitle>
							<slotAfter>
								<Button size="small" icon="arrowlargeright" onClick={nextPanel} />
							</slotAfter>
						</Header>
						<VirtualList
							childProps={{onClick: nextPanel}}
							itemSize={itemSize}
							itemRenderer={itemRenderer}
							dataSize={20}
						/>
					</Panel>
					<Panel>
						<Header>
							<title>
								Panel 4
							</title>
							<subtitle>
								2-Item VirtualList filling just the space it needs
							</subtitle>
						</Header>
						<VirtualList
							itemSize={itemSize}
							itemRenderer={itemRenderer}
							dataSize={2}
						/>
					</Panel>
				</FixedPopupPanels>
				<Button onClick={toggleOpen}>Open FixedPopupPanels</Button>
			</div>
			);
		},
		{
			info: {
				text: 'QA -  Basic usage of FixedPopupPanels'
			}
		}
	);
