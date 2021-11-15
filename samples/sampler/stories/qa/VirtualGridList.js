import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';
import PropTypes from 'prop-types';
import {Component} from 'react';

const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

const defaultDataSize = 1000;

const prop = {
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

const wrapOption = {
	false: false,
	true: true,
	'&quot;noAnimation&quot;': 'noAnimation'
};

const items = [];

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {text, subText, source} = items[index];

	return (
		<ImageItem {...rest} label={subText} src={source}>
			{text}
		</ImageItem>
	);
};

// eslint-disable-next-line enact/prop-types
const renderItemWithoutLabels = ({index, ...rest}) => {
	const {source} = items[index];

	return (
		<ImageItem {...rest} src={source} />
	);
};

const updateDataSize = (dataSize) => {
	const itemNumberDigits = dataSize > 0 ? (dataSize - 1 + '').length : 0;
	const headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const count = (headingZeros + i).slice(-itemNumberDigits);
		const text = `Item ${count}`;
		const subText = `SubItem ${count}`;
		const color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16);
		const source = `http://placehold.it/600x600/${color}/ffffff&text=Image ${i}`;

		items.push({text, subText, source});
	}

	return dataSize;
};

updateDataSize(defaultDataSize);

let itemList = [];
for (let i = 0; i < 60; i++) {
	itemList.push('item' + i);
}

const ContextualPopupButton = ContextualPopupDecorator(Button);

let lastIndex = 0;

class MyVirtualList extends Component {
	componentDidMount () {
		this.scrollTo({index: lastIndex, animate: false, focus: true});
	}

	closePopup (index) {
		lastIndex = index;
		// eslint-disable-next-line enact/prop-types
		this.props.closePopup();
	}

	renderItem = ({index, ...rest}) => {
		return (
			/* eslint-disable react/jsx-no-bind */
			<Item {...rest} onClick={() => this.closePopup(index)}>
				{itemList[index]}
			</Item>
		);
	};

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	};

	render () {
		let props = {...this.props};
		delete props.closePopup;

		return (
			<div {...props} style={{width: ri.scaleToRem(1830), height: ri.scaleToRem(1200)}}>
				<VirtualGridList
					cbScrollTo={this.getScrollTo}
					dataSize={itemList.length}
					direction="vertical"
					itemRenderer={this.renderItem}
					itemSize={{minWidth: ri.scale(570), minHeight: ri.scale(156)}}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				/>
			</div>
		);
	}
}

class ButtonAndVirtualGridList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isPopup: false
		};
	}

	renderPopup = (rest) => {
		return <MyVirtualList {...rest} closePopup={this.closePopup} />;
	};

	openPopup = () => {
		this.setState({isPopup: true});
	};

	closePopup = () => {
		this.setState({isPopup: false});
	};

	render () {
		return (
			<div>
				<ContextualPopupButton
					open={this.state.isPopup}
					popupComponent={this.renderPopup}
					onClick={this.openPopup}
					direction="right middle"
					spotlightRestrict="self-only"
					onClose={this.closePopup}
				>
					Focus here
				</ContextualPopupButton>
			</div>
		);
	}
}

export default {
	title: 'Sandstone/VirtualGridList',
	component: 'VirtualGridList'
};

export const HorizontalVirtualGridList = () => (
	<VirtualGridList
		dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
		direction="horizontal"
		horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
		hoverToScroll={boolean('hoverToScroll', Config)}
		itemRenderer={renderItem}
		itemSize={{
			minWidth: ri.scale(number('minWidth', Config, 688)),
			minHeight: ri.scale(number('minHeight', Config, 570))
		}}
		key={select('scrollMode', prop.scrollModeOption, Config)}
		noScrollByWheel={boolean('noScrollByWheel', Config)}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
		spacing={ri.scale(number('spacing', Config, 0))}
		spotlightDisabled={boolean('spotlightDisabled', Config, false)}
		style={{paddingBottom: ri.unit(ri.scale(36) + 'px', 'rem')}}
		verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
		wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
	/>
);

HorizontalVirtualGridList.storyName = 'Horizontal VirtualGridList';
HorizontalVirtualGridList.parameters = {
	propTables: [Config]
};

export const WithButtonSpotlightGoesToCorrectTarget = () => <ButtonAndVirtualGridList />;

WithButtonSpotlightGoesToCorrectTarget.storyName = 'with Button, Spotlight goes to correct target';

export const HorizontalSquaredVirtualGridList = () => (
	<VirtualGridList
		dataSize={updateDataSize(number('dataSize', Config, defaultDataSize))}
		direction="horizontal"
		horizontalScrollbar="hidden"
		itemRenderer={renderItemWithoutLabels}
		itemSize={{
			minWidth: ri.scale(number('minSize', Config, 804)),
			minHeight: ri.scale(number('minSize', Config, 804))
		}}
		key={select('scrollMode', prop.scrollModeOption, Config)}
		noScrollByWheel={boolean('noScrollByWheel', Config)}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
		spacing={ri.scale(number('spacing', Config, 0))}
		spotlightDisabled={boolean('spotlightDisabled', Config, false)}
		style={{
			width: ri.scaleToRem(804),
			height: ri.scaleToRem(804),
			backgroundColor: 'white'
		}}
		wrap={wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], Config)]}
	/>
);

HorizontalSquaredVirtualGridList.storyName = 'Horizontal Squared VirtualGridList';
HorizontalSquaredVirtualGridList.parameters = {
	propTables: [Config]
};

class SnapToCenterVGL extends Component {
	componentDidMount () {
		this.scrollTo({index: 1, animate: false, focus: true, stickTo: 'center'});
	}

	renderItem = ({index, ...rest}) => {
		const {source} = items[index];
		let customProps = {};
		if (index === 0 || index === items.length - 1) {
			customProps = {
				style: {
					visibility: 'hidden'
				},
				spotlightDisabled: true
			};
		}

		return (
			<ImageItem
				{...rest}
				src={source}
				style={{
					paddingLeft: ri.scaleToRem(240),
					paddingRight: ri.scaleToRem(240)
				}}
				{...customProps}
			/>
		);
	};

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	};

	render () {
		return (
			<VirtualGridList
				cbScrollTo={this.getScrollTo}
				dataSize={updateDataSize(number('dataSize', Config, 10))}
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(number('minWidth', Config, 1230)),
					minHeight: ri.scale(number('minHeight', Config, 540))
				}}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				snapToCenter
				spacing={ri.scale(number('spacing', Config, 0))}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				style={{
					width: ri.scaleToRem(2400)
				}}
				verticalScrollbar="hidden"
			/>
		);
	}
}

export const SnapToCenterVirtualGridList = () => (
	<SnapToCenterVGL />
);

SnapToCenterVirtualGridList.storyName = 'Snap to center VirtualGridList';
SnapToCenterVirtualGridList.parameters = {
	propTables: [Config]
};

const VirtualGridListInScroller = ({onNext, ...rest}) => {
	const virtualGridListProps = {
		...rest,
		childProps: {onClick: onNext},
		dataSize: updateDataSize(number('dataSize', Config, defaultDataSize)),
		direction: 'horizontal',
		itemRenderer: renderItem,
		itemSize: {
			minWidth: ri.scale(number('minWidth', Config, 688)),
			minHeight: ri.scale(number('minHeight', Config, 570))
		},
		spacing: ri.scale(number('spacing', Config, 0)),
		style: {
			height: ri.scale(number('minHeight', Config, 570)),
			paddingBottom: ri.scaleToRem(36)
		}
	};

	const virtualGridLists = [];

	for (let i = 0; i < 4; i++) {
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
	onNext: PropTypes.func
};

class VirtualGridListInScrollerSamples extends Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	onBack = () => {
		this.setState(prevState => ({
			index: prevState.index - 1
		}));
	};

	onNext = () => {
		this.setState(prevState => ({
			index: prevState.index + 1
		}));
	};

	render () {
		return (
			<Panels index={this.state.index} onBack={this.onBack}>
				<Panel>
					<VirtualGridListInScroller onNext={this.onNext} />
				</Panel>
				<Panel>
					<Header noCloseButton title="Second Panel" type="compact" />
				</Panel>
			</Panels>
		);
	}
}

export const RestoreFocusInScroller = () => <VirtualGridListInScrollerSamples />;

RestoreFocusInScroller.storyName = 'in Scroller with restoring focus';
