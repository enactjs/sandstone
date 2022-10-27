import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import Spotlight from '@enact/spotlight';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {select} from '@enact/storybook-utils/addons/controls';
import {Primary, Stories, Title} from '@enact/storybook-utils/addons/docs';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {useCallback, useState} from 'react';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('Panels', Panels);

const items = [];
for (let i = 0; i < 20; i++) {
	const headingZeros = Array(2).join('0');
	const count = (headingZeros + i).slice(-2);
	const text = `Item ${count}`;
	const subText = `SubItem ${count}`;
	const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
	const source = svgGenerator(600, 600, color, 'ffffff', `Image ${i}`);

	items.push({text, subText, source});
}

const renderItem = ({index, ...rest}) => {
	const {text, subText, source} = items[index];

	return (
		<ImageItem {...rest} label={subText} src={source}>
			{text}
		</ImageItem>
	);
};

renderItem.propTypes = {
	index: PropTypes.number
};

const VirtualGridListInScroller = ({onClick, ...rest}) => {
	const virtualGridListProps = {
		...rest,
		childProps: {onClick: onClick},
		dataSize: 20,
		direction: 'horizontal',
		itemRenderer: renderItem,
		itemSize: {
			minWidth: ri.scale(688),
			minHeight: ri.scale(570)
		},
		style: {
			height: ri.scale(570),
			paddingBottom: ri.scaleToRem(36)
		}
	};

	const virtualGridLists = [];

	for (let i = 0; i < 2; i++) {
		const id = `vgl_${i}`;

		virtualGridLists.push(
			<VirtualGridList
				{...virtualGridListProps}
				id={id}
				key={id}
				spotlightId={id}
			/>
		);
	}

	return (
		<Scroller>
			{virtualGridLists}
		</Scroller>
	);
};

VirtualGridListInScroller.propTypes = {
	onClick: PropTypes.func
};

export const WithAutoFocusControl = (args) => {
	const [panelIndex, setState] = useState(0);

	const forward = useCallback(() => {
		setState(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setState(panelIndex - 1);
	}, [panelIndex]);

	const handleTransition = useCallback(() => {
		setTimeout(() => {
			if (!Spotlight.getPointerMode() && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
				Spotlight.focus(`panel-container-${panelIndex}`);
			}
		}, 1000);
	}, [panelIndex]);

	const handleBack = compose(backward, action('onBack'));

	const story = (
		<Panels
			index={panelIndex}
			noCloseButton
			onBack={handleBack}
			onTransition={handleTransition}
			onWillTransition={action('onWillTransition')}
		>
			<Panel autoFocus={args['autoFocus for Panel 0']} spotlightId="panel-container-0">
				<Header title="Panel With AutoFocus Control" />
				<VirtualGridListInScroller onClick={forward} />
			</Panel>
			<Panel spotlightId="panel-container-1">
				<Header title="Second Panel" />
				<Item>Item</Item>
			</Panel>
		</Panels>
	);
	return story;
};

select('autoFocus for Panel 0', WithAutoFocusControl, ['none', 'last-focused', 'default-element'], Config, 'none');

export default {
	title: 'Sandstone/Panels',
	component: 'Panels',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
					<Stories />
				</>
			)
		}
	}
};

WithAutoFocusControl.storyName = 'with AutoFocus Control';
WithAutoFocusControl.parameters = {
	props: {
		noPanels: true
	}
};
