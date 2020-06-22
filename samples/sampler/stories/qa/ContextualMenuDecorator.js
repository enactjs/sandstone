import {number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';

const Config = mergeComponentMetadata('ContextualMenuDecorator', ContextualMenuDecorator);
const MenuButton = ContextualMenuDecorator({tooltipDestinationProp: 'decoration'}, Button);

const prop = {
	direction: [
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left bottom',
		'left middle',
		'left top',
		'right bottom',
		'right middle',
		'right top'
	],
	offset: ['none', 'overlap', 'small'],
	popupWidth: ['auto', 'small', 'large']
};

storiesOf('ContextualMenuDecorator', module)
	.add(
		'Overflows',
		() => {
			const buttonAlignment = select('button alignment', {'': null, start: 'start', end: 'end'}, Config);
			const direction = select('direction', prop.direction, Config, 'below right');
			const itemCount = number('items', Config, {range: true, min: 0, max: 10}, 2);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
			const offset = select('offset', prop.offset, Config);
			const popupWidth = select('popupWidth', prop.popupWidth, Config);
			return (
				<Layout orientation="vertical" align={buttonAlignment + ' space-between'} className="enact-fit" style={{position: 'fixed', padding: `${ri.unit(ri.scale(36), 'rem')} ${ri.unit(ri.scale(24), 'rem')}`}}>
					<Cell shrink>
						<Layout align="center space-between">
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Top Left
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Top
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Top Right
								</MenuButton>
							</Cell>
						</Layout>
					</Cell>
					<Cell shrink>
						<Layout align="center space-between">
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Left
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Center
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Right
								</MenuButton>
							</Cell>
						</Layout>
					</Cell>
					<Cell shrink>
						<Layout align="center space-between">
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Bottom Left
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Bottom
								</MenuButton>
							</Cell>
							<Cell shrink>
								<MenuButton
									direction={direction}
									menuItems={items}
									offset={offset}
									popupWidth={popupWidth}
								>
									Bottom Right
								</MenuButton>
							</Cell>
						</Layout>
					</Cell>
				</Layout>
			);
		}
	);
