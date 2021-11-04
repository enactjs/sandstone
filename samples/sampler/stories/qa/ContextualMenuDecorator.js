import {mergeComponentMetadata} from '@enact/storybook-utils';
import {range, select} from '@enact/storybook-utils/addons/controls';
import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

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

export default {
	title: 'Sandstone/ContextualMenuDecorator',
	component: 'ContextualMenuDecorator'
};

export const Overflows = (args) => {
	const buttonAlignment = select(
		'button alignment',
		{'': null, start: 'start', end: 'end'},
		Config
	);
	const direction = args['direction'];
	const itemCount = args['items'];
	const items = new Array(itemCount).fill().map((i, index) => `Option ${index + 1}`);
	const offset = args['offset'];
	const popupWidth = args['popupWidth'];
	return (
		<Layout
			orientation="vertical"
			align={buttonAlignment + ' space-between'}
			className="enact-fit"
			style={{
				position: 'fixed',
				padding: `${ri.unit(ri.scale(36), 'rem')} ${ri.unit(ri.scale(24), 'rem')}`
			}}
		>
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
};

select('direction', Overflows, prop.direction, Config, 'below right');
range('items', Overflows, Config, {min: 0, max: 10}, 2);
select('offset', Overflows, prop.offset, Config);
select('popupWidth', Overflows, prop.popupWidth, Config);

Overflows.storyName = 'Overflows';
