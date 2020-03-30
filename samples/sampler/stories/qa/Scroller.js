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

import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import {Item as ThemeItem} from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';

const Item = ({style, ...rest}) => (<ThemeItem {...rest} style={{margin: 0, ...style}} />);

const Config = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	focusableScrollbarOption: {
		'true': true,
		'false': false,
		'byEnter': 'byEnter'
	},
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

class ScrollerResizableItem extends React.Component {
	static propTypes = {
		max: PropTypes.number,
		min: PropTypes.number,
		more: PropTypes.bool,
		toggleMore: PropTypes.func
	}

	render () {
		const {max = 3000, min = 800, more, toggleMore} = this.props;
		const height = ri.unit(more ? max : min, 'rem');
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
	}

	render () {
		return (
			<Scroller
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
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
	}

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
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
				spotlightId="scroller"
				style={{height: 400}}
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

storiesOf('Scroller', module)
	.add(
		'List of things',
		() => (
			<Scroller
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
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
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
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
						width: ri.unit(8400, 'rem'),
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
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
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
						width: ri.unit(8800, 'rem'),
						height: ri.unit(8000, 'rem'),
						padding: '1px'
					}}
				>
					{[...Array(10)].map((y, j) => <div key={j + 1}>{(
						[...Array(10)].map((x, i) => (
							<Button key={i + 1} style={{width: '400px', height: '100px', margin: '50px'}}>
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
			<div style={{display: 'flex', height: ri.unit(798, 'rem')}}>
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
			<div>
				<Button>focus to me</Button>
				<Scroller
					focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.unit(ri.scale(840), 'rem'), width: ri.unit(ri.scale(600), 'rem'), display:'inline-block'}}
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
					style={{height: ri.scaleToRem(400)}}
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
			const size = number('Spacer size', Config, {max: 600, min: 0, range: true}, 400);
			return (
				<Scroller
					focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: ri.scaleToRem(400)}}
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
					focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
					key={select('scrollMode', prop.scrollModeOption, Config)}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					style={{height: 400}}
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
				focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			>
				<div style={{height: '1220px'}}>
					<Item style={{height: '1200px'}}>Long Height Item</Item>
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
					focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
					key={select('scrollMode', prop.scrollModeOption, Config) + '1'}
					onKeyDown={action('onKeyDown')}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
					verticalScrollbar="visible"
				>
					<Scroller
						direction="horizontal"
						focusableScrollbar={select('focusableScrollbar', prop.focusableScrollbarOption, Config)}
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
								width: ri.unit(4800, 'rem')
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
								width: ri.unit(4800, 'rem')
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
	);
