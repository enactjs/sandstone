import Button from '@enact/sandstone/Button';
import ContextualMenuDecorator from '@enact/sandstone/ContextualMenuDecorator';
import ImageItem from '@enact/sandstone/ImageItem';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {range, select} from '@enact/storybook-utils/addons/controls';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';

import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

const Config = mergeComponentMetadata('ContextualMenuDecorator', ContextualMenuDecorator);
const MenuButton = ContextualMenuDecorator({tooltipDestinationProp: 'decoration'}, Button);

Config.defaultProps = {
	direction: 'below right',
	offset: 'overlap',
	popupWidth: 'auto'
};

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
	const buttonAlignment = args['button alignment'];
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

select('button alignment', Overflows, {'': null, start: 'start', end: 'end'}, Config);
select('direction', Overflows, prop.direction, Config, 'below right');
range('items', Overflows, Config, {min: 0, max: 10}, 2);
select('offset', Overflows, prop.offset, Config);
select('popupWidth', Overflows, prop.popupWidth, Config);

Overflows.storyName = 'Overflows';

const MenuItem = (props) => {
	const {type, ...rest} = props;

	const style = () => {
		if (type === 'vertical') {
			return {height: '12.25rem', width: '16rem'};
		}
		return {width: '20rem'};
	};

	return (
		<ImageItem
			{...rest}
			style={style()}
			label="ImageItem"
			orientation={type}
		/>
	);
};

MenuItem.propTypes = {
	type: PropTypes.string.isRequired
};

const Menu = ContextualMenuDecorator(MenuItem);

export const WithChangingComponent = () => {
	const [type, setType] = useState('vertical');

	const handleClick = useCallback(() => {
		setType(state => (state === 'vertical' ? 'horizontal' : 'vertical'));
	}, []);

	return (
		<div style={{textAlign: 'center', marginTop: ri.scaleToRem(260)}}>
			<Button onClick={handleClick}>Change Type</Button>
			<Menu type={type} menuItems={['Option1', 'Option2']} />
		</div>
	);
};

WithChangingComponent.storyName = 'with changing component';
