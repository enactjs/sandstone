import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import {ImageItem} from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';

import css from './VirtualGridList.module.less';

const prop = {
		direction: {horizontal: 'horizontal', vertical: 'vertical'},
		scrollbarOption: ['auto', 'hidden', 'visible'],
		scrollModeOption: ['native', 'translate'],
		wrapOption: {
			false: false,
			true: true,
			noAnimation: 'noAnimation'
		}
	},
	items = [],
	defaultDataSize = 1000,
	longContent = 'Lorem ipsum dolor sit amet',
	shouldAddLongContent = ({index, modIndex}) => (index % modIndex === 0 ? ` ${longContent}` : ''),
	// eslint-disable-next-line enact/prop-types
	renderItem = ({index, ...rest}) => {
		const {text, subText, source} = items[index];

		return (
			<ImageItem {...rest} label={subText} src={source}>
				{text}
			</ImageItem>
		);
	};

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' class='img-fluid rounded mx-auto d-block' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='4rem' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const count = (headingZeros + i).slice(-itemNumberDigits),
			text = `Item ${count}${shouldAddLongContent({index: i, modIndex: 2})}`,
			subText = `SubItem ${count}${shouldAddLongContent({index: i, modIndex: 3})}`,
			color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
			source = {
				hd: svgGenerator(200, 200, color, 'ffffff', `Image ${i}`),
				fhd: svgGenerator(300, 300, color, 'ffffff', `Image ${i}`),
				uhd: svgGenerator(600, 600, color, 'ffffff', `Image ${i}`)
			};

		items.push({text, subText, source});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

const VirtualGridListConfig = mergeComponentMetadata(
	'VirtualGridList',
	UiVirtualListBasic,
	VirtualGridList
);

export default {
	title: 'Sandstone/VirtualList.VirtualGridList',
	component: 'VirtualGridList'
};

export const _VirtualGridList = (args) => (
	<VirtualGridList
		className={
			args['direction'] === 'vertical' ?
				css.verticalPadding :
				css.horizontalPadding
		}
		dataSize={updateDataSize(args['dataSize'])}
		direction={args['direction']}
		horizontalScrollbar={args['horizontalScrollbar']}
		hoverToScroll={args['hoverToScroll']}
		itemRenderer={renderItem}
		itemSize={{
			minWidth: ri.scale(args['itemSize.minWidth']),
			minHeight: ri.scale(args['itemSize.minHeight'])
		}}
		key={args['scrollMode']}
		noScrollByWheel={args['noScrollByWheel']}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={args['scrollMode']}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		verticalScrollbar={args['verticalScrollbar']}
		wrap={args['wrap']}
	/>
);

select('direction', _VirtualGridList, prop.direction, VirtualGridListConfig);
number('dataSize', _VirtualGridList, VirtualGridListConfig, defaultDataSize);
select('direction', _VirtualGridList, prop.direction, VirtualGridListConfig);
select('horizontalScrollbar', _VirtualGridList, prop.scrollbarOption, VirtualGridListConfig);
boolean('hoverToScroll', _VirtualGridList, VirtualGridListConfig);
number('itemSize.minWidth', _VirtualGridList, VirtualGridListConfig, 688);
number('itemSize.minHeight', _VirtualGridList, VirtualGridListConfig, 570);
boolean('noScrollByWheel', _VirtualGridList, VirtualGridListConfig);
select('scrollMode', _VirtualGridList, prop.scrollModeOption, VirtualGridListConfig);
number('spacing', _VirtualGridList, VirtualGridListConfig, 0);
boolean('spotlightDisabled', _VirtualGridList, VirtualGridListConfig, false);
select('verticalScrollbar', _VirtualGridList, prop.scrollbarOption, VirtualGridListConfig);
select('wrap', _VirtualGridList, prop.wrapOption, VirtualGridListConfig);

_VirtualGridList.storyName = 'VirtualList.VirtualGridList';
_VirtualGridList.parameters = {
	info: {
		text: 'Basic usage of VirtualGridList'
	}
};
