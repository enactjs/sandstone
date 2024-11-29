import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import ImageItem from '@enact/sandstone/ImageItem';
import Item from '@enact/sandstone/Item';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';
import PropTypes from 'prop-types';
import {Component} from 'react';

import {svgGenerator} from '../helper/svg';

const Config = mergeComponentMetadata('VirtualGridList', UiVirtualListBasic, VirtualGridList);

const defaultDataSize = 1000;

const prop = {
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate'],
	wrapOption: {
		false: false,
		true: true,
		noAnimation: 'noAnimation'
	}
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
		const source = svgGenerator(600, 600, color, 'ffffff', `Image ${i}`);

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
		const {scrollMode, ...rest} = this.props;
		delete rest.closePopup;

		return (
			<div {...rest} style={{width: ri.scaleToRem(1830), height: ri.scaleToRem(1200)}}>
				<VirtualGridList
					cbScrollTo={this.getScrollTo}
					dataSize={itemList.length}
					direction="vertical"
					itemRenderer={this.renderItem}
					itemSize={{minWidth: ri.scale(570), minHeight: ri.scale(156)}}
					key={scrollMode}
					scrollMode={scrollMode}
				/>
			</div>
		);
	}
}

MyVirtualList.propTypes = {
	scrollMode: PropTypes.string
};

class ButtonAndVirtualGridList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isPopup: false
		};
	}

	renderPopup = (rest) => {
		return <MyVirtualList {...rest} closePopup={this.closePopup} scrollMode={this.props.scrollMode} />;
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
					direction={this.props.rtl ? "left middle" : "right middle"}
					spotlightRestrict="self-only"
					onClose={this.closePopup}
				>
					Focus here
				</ContextualPopupButton>
			</div>
		);
	}
}

ButtonAndVirtualGridList.propTypes = {
	rtl: PropTypes.bool,
	scrollMode: PropTypes.string
};

const ButtonAndVirtualGridListSamples = I18nContextDecorator (
	{rtlProp: 'rtl'},
	ButtonAndVirtualGridList
);

export default {
	title: 'Sandstone/VirtualGridList',
	component: 'VirtualGridList'
};

export const HorizontalVirtualGridList = (args) => (
	<VirtualGridList
		dataSize={updateDataSize(args['dataSize'])}
		direction="horizontal"
		horizontalScrollbar={args['horizontalScrollbar']}
		hoverToScroll={args['hoverToScroll']}
		itemRenderer={renderItem}
		itemSize={{
			minWidth: ri.scale(args['minWidth']),
			minHeight: ri.scale(args['minHeight'])
		}}
		key={args['scrollMode']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={args['scrollMode']}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		style={{paddingBottom: ri.unit(ri.scale(36) + 'px', 'rem')}}
		verticalScrollbar={args['verticalScrollbar']}
		wrap={args['wrap']}
	/>
);

number('dataSize', HorizontalVirtualGridList, Config, defaultDataSize);
select('horizontalScrollbar', HorizontalVirtualGridList, prop.scrollbarOption, Config);
boolean('hoverToScroll', HorizontalVirtualGridList, Config);
number('minWidth', HorizontalVirtualGridList, Config, 688);
number('minHeight', HorizontalVirtualGridList, Config, 570);
select('scrollMode', HorizontalVirtualGridList, prop.scrollModeOption, Config);
boolean('noScrollByWheel', HorizontalVirtualGridList, Config);
number('spacing', HorizontalVirtualGridList, Config, 0);
boolean('spotlightDisabled', HorizontalVirtualGridList, Config, false);
select('verticalScrollbar', HorizontalVirtualGridList, prop.scrollbarOption, Config);
select('wrap', HorizontalVirtualGridList, prop.wrapOption, Config);

HorizontalVirtualGridList.storyName = 'Horizontal VirtualGridList';
HorizontalVirtualGridList.parameters = {
	propTables: [Config]
};

export const WithButtonSpotlightGoesToCorrectTarget = (args) => <ButtonAndVirtualGridListSamples scrollMode={args['scrollMode']} />;

select('scrollMode', WithButtonSpotlightGoesToCorrectTarget, prop.scrollModeOption, Config);

WithButtonSpotlightGoesToCorrectTarget.storyName = 'with Button, Spotlight goes to correct target';
WithButtonSpotlightGoesToCorrectTarget.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const HorizontalSquaredVirtualGridList = (args) => (
	<VirtualGridList
		dataSize={updateDataSize(args['dataSize'])}
		direction="horizontal"
		horizontalScrollbar="hidden"
		itemRenderer={renderItemWithoutLabels}
		itemSize={{
			minWidth: ri.scale(args['minSize']),
			minHeight: ri.scale(args['minSize'])
		}}
		key={args['scrollMode']}
		noScrollByWheel={args['noScrollByWheel']}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={args['scrollMode']}
		spacing={ri.scale(args['spacing'])}
		spotlightDisabled={args['spotlightDisabled']}
		style={{
			width: ri.scaleToRem(804),
			height: ri.scaleToRem(804),
			backgroundColor: 'white'
		}}
		wrap={args['wrap']}
	/>
);

number('dataSize', HorizontalSquaredVirtualGridList, Config, defaultDataSize);
number('minSize', HorizontalSquaredVirtualGridList, Config, 804);
select('scrollMode', HorizontalSquaredVirtualGridList, prop.scrollModeOption, Config);
boolean('noScrollByWheel', HorizontalSquaredVirtualGridList, Config);
number('spacing', HorizontalSquaredVirtualGridList, Config, 0);
boolean('spotlightDisabled', HorizontalSquaredVirtualGridList, Config, false);
select('wrap', HorizontalSquaredVirtualGridList, prop.wrapOption, Config);

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
		const args = this.props.args;
		return (
			<VirtualGridList
				cbScrollTo={this.getScrollTo}
				dataSize={updateDataSize(args['dataSize'])}
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(args['minWidth']),
					minHeight: ri.scale(args['minHeight'])
				}}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				snapToCenter
				spacing={ri.scale(args['spacing'])}
				spotlightDisabled={args['spotlightDisabled']}
				style={{
					width: ri.scaleToRem(2400)
				}}
				verticalScrollbar="hidden"
			/>
		);
	}
}

SnapToCenterVGL.propTypes = {
	args: PropTypes.object
};

export const SnapToCenterVirtualGridList = (args) => (
	<SnapToCenterVGL args={args} />
);

number('dataSize', SnapToCenterVirtualGridList, Config, 10);
number('minWidth', SnapToCenterVirtualGridList, Config, 1230);
number('minHeight', SnapToCenterVirtualGridList, Config, 540);
number('spacing', SnapToCenterVirtualGridList, Config, 0);
boolean('spotlightDisabled', SnapToCenterVirtualGridList, Config, false);

SnapToCenterVirtualGridList.storyName = 'Snap to center VirtualGridList';
SnapToCenterVirtualGridList.parameters = {
	propTables: [Config]
};

const numOfListsInScroller = 4;
const idOfListsInScroller = (index) => (`vgl_${index}`);

const VirtualGridListInScroller = ({args, onNext, ...rest}) => {
	const virtualGridListProps = {
		...rest,
		childProps: {onClick: onNext},
		dataSize: updateDataSize(args['dataSize']),
		direction: 'horizontal',
		itemRenderer: renderItem,
		itemSize: {
			minWidth: ri.scale(args['minWidth']),
			minHeight: ri.scale(args['minHeight'])
		},
		spacing: ri.scale(args['spacing']),
		style: {
			height: ri.scale(args['minHeight']),
			paddingBottom: ri.scaleToRem(36)
		}
	};

	const virtualGridLists = [];

	for (let i = 0; i < numOfListsInScroller; i++) {
		const id = idOfListsInScroller(i);

		virtualGridLists.push(
			<VirtualGridList
				{...virtualGridListProps}
				hoverToScroll={args['hoverToScroll']}
				id={id}
				key={id}
				noScrollByWheel={args['noScrollByWheel']}
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
	args: PropTypes.object,
	onNext: PropTypes.func
};

class VirtualGridListInScrollerSamples extends Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	componentDidMount () {
		for (let i = 0; i < numOfListsInScroller; i++) {
			Spotlight.set(idOfListsInScroller(i), {continue5WayHold: true});
		}
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
					<VirtualGridListInScroller args={this.props.args} onNext={this.onNext} />
				</Panel>
				<Panel>
					<Header noCloseButton title="Second Panel" type="compact" />
				</Panel>
			</Panels>
		);
	}
}

VirtualGridListInScrollerSamples.propTypes = {
	args: PropTypes.object
};

export const RestoreFocusInScroller = (args) => <VirtualGridListInScrollerSamples args={args} />;

number('dataSize', RestoreFocusInScroller, Config, defaultDataSize);
boolean('hoverToScroll', RestoreFocusInScroller, Config);
number('minWidth', RestoreFocusInScroller, Config, 688);
number('minHeight', RestoreFocusInScroller, Config, 570);
boolean('noScrollByWheel', RestoreFocusInScroller, Config);
number('spacing', RestoreFocusInScroller, Config, 0);

RestoreFocusInScroller.storyName = 'in Scroller with restoring focus';
