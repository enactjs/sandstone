import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import React from 'react';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Scroller as UiScroller, ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import {VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList/VirtualListBasic';

import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import VirtualList from '@enact/sandstone/VirtualList';

const VirtualListConfig = mergeComponentMetadata('VirtualList', UiVirtualListBasic, VirtualList);
const Config = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	focusableScrollbarOption: {
		false: false,
		true: true,
		'&quot;byEnter&quot;': 'byEnter'
	},
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};
const listProp = {
	direction: ['horizontal', 'vertical'],
	wrapOption: {
		false: false,
		true: true,
		'&quot;noAnimation&quot;': 'noAnimation'
	}
};

class ScrollerResizableItem extends React.Component {
	static propTypes = {
		max: PropTypes.number,
		min: PropTypes.number,
		more: PropTypes.bool,
		toggleMore: PropTypes.func
	};

	render () {
		const {max = 3000, min = 504, more, toggleMore} = this.props;
		const height = ri.scaleToRem(more ? max : min);
		const text = more ? 'less' : 'more';
		const style = {
			border: 'solid yellow',
			position: 'relative',
			width: '90%'
		};
		return (
			<div style={{...style, height}}>
				<Button onClick={toggleMore} size="small" style={{position: 'absolute', bottom: 0}}>{text}</Button>
			</div>
		);
	}
}

class ScrollerWithLongItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			more: false
		};
	}

	handleClick = () => {
		this.setState(prevState => ({more: !prevState.more}));
	};

	render () {
		return (
			<Scroller
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			>
				<Item>Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text</Item>
				<ScrollerResizableItem min={100} more={this.state.more} toggleMore={this.handleClick} />
			</Scroller>
		);
	}
}

class ScrollerWithResizable extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			more: false
		};
	}

	handleClick = () => {
		this.setState(prevState => ({more: !prevState.more}));
	};

	render () {
		return (
			<Scroller
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				verticalScrollbar="visible"
			>
				<Item>Item</Item>
				<Item>Item</Item>
				<ScrollerResizableItem more={this.state.more} toggleMore={this.handleClick} />
			</Scroller>
		);
	}
}

const Container = SpotlightContainerDecorator('div');

class ScrollerWithLargeContainer extends React.Component {
	componentDidMount () {
		setTimeout(() => {
			Spotlight.focus('scroller');
		}, 50);
	}

	render () {
		return (
			<Scroller
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spotlightId="scroller"
				style={{height: ri.scaleToRem(600)}}
			>
				<Container>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
					<Item>Hello</Item>
				</Container>
			</Scroller>
		);
	}
}

class ScrollerInVirtualList extends React.Component {
	constructor (props) {
		super(props);
	}

	renderScroller = ({index}) => {
		const listDirection = select('direction', listProp.direction, VirtualListConfig);
		const isListVertical = listDirection === 'vertical';
		const listItemStyle = {
			horizontal: {
				height: '85%',
				width: ri.scaleToRem(639)
			},
			vertical: {
				width: '100%'
			}
		};
		const scrollerContentStyle = {
			horizontal: {
			},
			vertical: {
				height: ri.scaleToRem(198),
				width: 'max-content'
			}
		};
		return (
			<div data-index={index} style={listItemStyle[listDirection]}>
				<Heading showLine>{'Scroller ' + index}</Heading>
				<Scroller
					id={'scroller' + index}
					spotlightId={'container-scroller-' + index}
					direction={isListVertical ? 'horizontal' : 'vertical'}
					focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
					horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					noScrollByWheel={boolean('noScrollByWheel', Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
				>
					<div
						style={scrollerContentStyle[listDirection]}
					>
						{[...Array(20)].map((x, i) => (
							<Button key={i + 1}>
								Button {i + 1}
							</Button>
						))}
					</div>
				</Scroller>
			</div>
		);
	};

	render = () => {
		const direction = select('direction', listProp.direction, VirtualListConfig);
		return (
			<VirtualList
				dataSize={number('dataSize', VirtualListConfig, 100)}
				direction={direction}
				itemSize={direction === 'vertical' ? ri.scale(315) : ri.scale(639)}
				key={select('scrollMode', prop.scrollModeOption, VirtualListConfig)}
				noScrollByWheel={boolean('noScrollByWheel', VirtualListConfig)}
				scrollMode={select('scrollMode', prop.scrollModeOption, VirtualListConfig)}
				spacing={ri.scale(number('spacing', VirtualListConfig))}
				spotlightDisabled={boolean('spotlightDisabled', VirtualListConfig, false)}
				style={direction === 'vertical' ? {paddingRight: ri.scaleToRem(36)} : {paddingBottom: ri.scaleToRem(36)}}
				wrap={listProp.wrapOption[select('wrap', ['false', 'true', '"noAnimation"'], VirtualListConfig)]}
				itemRenderer={this.renderScroller}
			/>
		);
	};
}

storiesOf('Scroller', module)
	.add(
		'List of things',
		() => (
			<Scroller
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
			>
				<Group childComponent={Item}>
					{itemData}
				</Group>
			</Scroller>
		)
	)
	.add(
		'Horizontal scroll',
		() => (
			<Scroller
				direction={select('direction', prop.direction, Config, 'horizontal')}
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
			>
				<div
					style={{
						width: ri.scaleToRem(14400, 'rem'),
						padding: '1px'
					}}
				>
					{[...Array(20)].map((x, i) => (
						<Button key={i + 1}>
							Button {i + 1}
						</Button>
					))}
				</div>
			</Scroller>
		)
	)
	.add(
		'With Spottable Components',
		() => (
			<Scroller
				direction={select('direction', prop.direction, Config)}
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				noScrollByWheel={boolean('noScrollByWheel', Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spotlightDisabled={boolean('spotlightDisabled', Config, false)}
				verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
			>
				<div
					style={{
						width: ri.scaleToRem(8802),
						height: ri.scaleToRem(8004),
						padding: '1px'
					}}
				>
					{[...Array(10)].map((y, j) => <div key={j + 1}>{(
						[...Array(10)].map((x, i) => (
							<Button key={i + 1} style={{width: ri.scaleToRem(402), height: ri.scaleToRem(102), margin: ri.scaleToRem(51)}}>
								Button {j * 10 + i + 1}
							</Button>
						))
					)}</div>)}
				</div>
			</Scroller>
		)
	)
	.add(
		'With Resizable',
		() => (
			<ScrollerWithResizable />
		)
	)
	.add(
		'With Two ui:Scroller',
		() => (
			<div style={{display: 'flex', height: ri.scaleToRem(798)}}>
				<UiScroller
					key={select('scrollMode', prop.scrollModeOption, Config) + '1'}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				>
					<Group childComponent={Item}>
						{itemData}
					</Group>
				</UiScroller>
				<UiScroller
					key={select('scrollMode', prop.scrollModeOption, Config) + '2'}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				>
					<Group childComponent={Item}>
						{itemData}
					</Group>
				</UiScroller>
			</div>
		)
	)
	.add(
		'With Large Container',
		() => (
			<ScrollerWithLargeContainer />
		)
	)
	.add(
		'With Focus outside Container',
		() => (
			<div style={{display: 'flex'}}>
				<Button>focus to me</Button>
				<Scroller
					focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.scaleToRem(840), width: ri.scaleToRem(600), display:'inline-block'}}
				>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
					<Item>Item 3</Item>
					<Item>Item 4</Item>
					<Item>Item 5</Item>
					<Item>Item 6</Item>
					<Item>Item 7</Item>
					<Item>Item 8</Item>
					<Item>Item 9</Item>
					<div>Test Test Test Test Test Test </div>
				</Scroller>
			</div>
		)
	)
	.add(
		'Test scrolling to boundary with small overflow',
		() => {
			const size = number('Spacer size', Config, {max: 600, min: 0, range: true}, 200);
			return (
				<Scroller
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.scaleToRem(480)}}
				>
					<Item>1</Item>
					<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>{size}px Spacer</div>
					<Item style={{marginBottom: ri.scaleToRem(36)}}>3</Item>
				</Scroller>
			);
		}
	)
	.add(
		'Test scrolling to boundary with long overflow',
		() => {
			const size = number('Spacer size', Config, {max: 600, min: 0, range: true}, 402);
			return (
				<Scroller
					focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.scaleToRem(402)}}
				>
					<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>{size}px Spacer</div>
					<Item>1</Item>
					<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>{size}px Spacer</div>
					<Item>3</Item>
					<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>{size}px Spacer</div>
				</Scroller>
			);
		}
	).add(
		'With Spotlight Target Calculation',
		() => (
			<div>
				<Button>hello</Button>
				<Scroller
					focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.scaleToRem(804)}}
				>
					<Group childComponent={Item}>
						{itemData}
					</Group>
				</Scroller>
			</div>
		)
	)
	.add(
		'With Long Item',
		() => (
			<ScrollerWithLongItem />
		)
	)
	.add(
		'With One Long Height Item',
		() => (
			<Scroller
				focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			>
				<div style={{height: ri.scaleToRem(2442)}}>
					<Item style={{height: ri.scaleToRem(2400)}}>Long Height Item</Item>
				</div>
			</Scroller>
		)
	)
	.add(
		'With Nested Scroller',
		() => {
			let noScrollByWheel = boolean('noScrollByWheel', Config);
			return (
				<Scroller
					direction="vertical"
					focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
					key={select('scrollMode', prop.scrollModeOption, Config) + '1'}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					verticalScrollbar="visible"
				>
					<Scroller
						direction="horizontal"
						focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
						horizontalScrollbar="visible"
						key={select('scrollMode', prop.scrollModeOption, Config) + '2'}
						noScrollByWheel={noScrollByWheel}
						onKeyDown={action('onKeyDown (Nested 1st Scroller)')}
						onScrollStart={action('onScrollStart (Nested 1st Scroller)')}
						onScrollStop={action('onScrollStop (Nested 1st Scroller)')}
						scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
						style={{
							height: 'auto',
							width: '90%'
						}}
					>
						<div
							style={{
								backgroundColor: '#444',
								width: ri.scaleToRem(4800)
							}}
						>
							<Item>The first nested scroller.</Item>
							<br />
							<br />
							<Item>This is the upper horizontal scroller. If noScrollByWheel is not specified, this scroller will be scrolled by wheel and the outer scroller will not be scrolled.</Item>
							<br />
							<br />
							<Item>If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the outer scroller will be scrolled.</Item>
							<br />
							<br />
							<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
						</div>
					</Scroller>
					<Scroller
						direction="horizontal"
						horizontalScrollbar="visible"
						key={select('scrollMode', prop.scrollModeOption, Config) + '3'}
						noScrollByWheel={noScrollByWheel}
						onKeyDown={action('onKeyDown (Nested 2nd Scroller)')}
						onScrollStart={action('onScrollStart (Nested 2nd Scroller)')}
						onScrollStop={action('onScrollStop (Nested 2nd Scroller)')}
						scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
						style={{
							height: 'auto',
							width: '90%'
						}}
					>
						<div
							style={{
								backgroundColor: '#444',
								width: ri.scaleToRem(4800)
							}}
						>
							<Item>The second nested scroller.</Item>
							<br />
							<br />
							<Item>This is the lower horizontal scroller. If noScrollByWheel is not specified, this scroller will be scrolled by wheel and the outer scroller will not be scrolled.</Item>
							<br />
							<br />
							<Item>If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the outer scroller will be scrolled.</Item>
							<br />
							<br />
							<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
						</div>
					</Scroller>
				</Scroller>
			);
		}
	)
	.add(
		'Horizontal Scroller in VirtualList',
		() => (
			<ScrollerInVirtualList />
		)
	);
