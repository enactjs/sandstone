import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import BodyText from '@enact/sandstone/BodyText';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import ri from '@enact/ui/resolution';
import {Scroller as UiScroller, ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import PropTypes from 'prop-types';
import {Component} from 'react';

import css from './Scroller.module.less';

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

class ScrollerResizableItem extends Component {
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
				<Button onClick={toggleMore} size="small" style={{position: 'absolute', bottom: 0}}>
					{text}
				</Button>
			</div>
		);
	}
}

class ScrollerWithLongItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			more: false
		};
	}

	handleClick = () => {
		this.setState((prevState) => ({more: !prevState.more}));
	};

	render () {
		return (
			<Scroller
				focusableScrollbar={
					prop.focusableScrollbarOption[
						select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
					]
				}
				key={select('scrollMode', prop.scrollModeOption, Config)}
				onKeyDown={action('onKeyDown')}
				onScrollStart={action('onScrollStart')}
				onScrollStop={action('onScrollStop')}
				scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			>
				<Item>
					Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long
					Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text
				</Item>
				<ScrollerResizableItem min={100} more={this.state.more} toggleMore={this.handleClick} />
			</Scroller>
		);
	}
}

class ScrollerWithResizable extends Component {
	constructor (props) {
		super(props);
		this.state = {
			more: false
		};
	}

	handleClick = () => {
		this.setState((prevState) => ({more: !prevState.more}));
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

class ScrollerWithLargeContainer extends Component {
	componentDidMount () {
		setTimeout(() => {
			Spotlight.focus('scroller');
		}, 50);
	}

	render () {
		return (
			<Scroller
				focusableScrollbar={
					prop.focusableScrollbarOption[
						select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
					]
				}
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

export default {
	title: 'Sandstone/Scroller',
	component: 'Scroller'
};

export const ListOfThings = () => (
	<Scroller
		focusableScrollbar={
			prop.focusableScrollbarOption[
				select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
			]
		}
		horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
		hoverToScroll={boolean('hoverToScroll', Config)}
		key={select('scrollMode', prop.scrollModeOption, Config)}
		noScrollByWheel={boolean('noScrollByWheel', Config)}
		onKeyDown={action('onKeyDown')}
		onScrollStart={action('onScrollStart')}
		onScrollStop={action('onScrollStop')}
		scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
		spotlightDisabled={boolean('spotlightDisabled', Config, false)}
		verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
	>
		<Group childComponent={Item}>{itemData}</Group>
	</Scroller>
);

ListOfThings.storyName = 'List of things';

export const HorizontalScroll = () => (
	<Scroller
		direction={select('direction', prop.direction, Config, 'horizontal')}
		focusableScrollbar={
			prop.focusableScrollbarOption[
				select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
			]
		}
		horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
		hoverToScroll={boolean('hoverToScroll', Config)}
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
				<Button key={i + 1}>Button {i + 1}</Button>
			))}
		</div>
	</Scroller>
);

HorizontalScroll.storyName = 'Horizontal scroll';

export const WithSpottableComponents = () => (
	<Scroller
		direction={select('direction', prop.direction, Config)}
		focusableScrollbar={
			prop.focusableScrollbarOption[
				select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
			]
		}
		horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
		hoverToScroll={boolean('hoverToScroll', Config)}
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
			{[...Array(10)].map((y, j) => (
				<div key={j + 1}>
					{[...Array(10)].map((x, i) => (
						<Button
							key={i + 1}
							style={{
								width: ri.scaleToRem(402),
								height: ri.scaleToRem(102),
								margin: ri.scaleToRem(51)
							}}
						>
							Button {j * 10 + i + 1}
						</Button>
					))}
				</div>
			))}
		</div>
	</Scroller>
);

WithSpottableComponents.storyName = 'With Spottable Components';

export const WithShortContents = () => (
	<>
		<Scroller
			direction={select('direction', prop.direction, Config)}
			focusableScrollbar={
				prop.focusableScrollbarOption[
					select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
				]
			}
			horizontalScrollbar={select('horizontalScrollbar', prop.scrollbarOption, Config)}
			key={select('scrollMode', prop.scrollModeOption, Config)}
			noScrollByWheel={boolean('noScrollByWheel', Config)}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			spotlightDisabled={boolean('spotlightDisabled', Config, false)}
			style={{height: ri.scaleToRem(600)}}
			verticalScrollbar={select('verticalScrollbar', prop.scrollbarOption, Config)}
		>
			Text
		</Scroller>
		<Button>Button</Button>
	</>
);

WithShortContents.storyName = 'With short contents';

export const WithResizable = () => <ScrollerWithResizable />;

WithResizable.storyName = 'With Resizable';

export const WithTwoUiScroller = () => (
	<div style={{display: 'flex', height: ri.scaleToRem(798)}}>
		<UiScroller
			key={select('scrollMode', prop.scrollModeOption, Config) + '1'}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
		>
			<Group childComponent={Item}>{itemData}</Group>
		</UiScroller>
		<UiScroller
			key={select('scrollMode', prop.scrollModeOption, Config) + '2'}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
		>
			<Group childComponent={Item}>{itemData}</Group>
		</UiScroller>
	</div>
);

WithTwoUiScroller.storyName = 'With Two ui:Scroller';

export const WithLargeContainer = () => <ScrollerWithLargeContainer />;

WithLargeContainer.storyName = 'With Large Container';

export const WithFocusOutsideContainer = () => (
	<div style={{display: 'flex'}}>
		<Button>focus to me</Button>
		<Scroller
			focusableScrollbar={
				prop.focusableScrollbarOption[
					select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
				]
			}
			key={select('scrollMode', prop.scrollModeOption, Config)}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			style={{height: ri.scaleToRem(840), width: ri.scaleToRem(600), display: 'inline-block'}}
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
);

WithFocusOutsideContainer.storyName = 'With Focus outside Container';

export const TestScrollingToBoundaryWithSmallOverflow = () => {
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
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>
				{size}px Spacer
			</div>
			<Item style={{marginBottom: ri.scaleToRem(36)}}>3</Item>
		</Scroller>
	);
};

TestScrollingToBoundaryWithSmallOverflow.storyName = 'Test scrolling to boundary with small overflow';

export const TestScrollingToBoundaryWithLongOverflow = () => {
	const size = number('Spacer size', Config, {max: 600, min: 0, range: true}, 402);
	return (
		<Scroller
			focusableScrollbar={
				prop.focusableScrollbarOption[
					select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
				]
			}
			key={select('scrollMode', prop.scrollModeOption, Config)}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			style={{height: ri.scaleToRem(402)}}
		>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>
				{size}px Spacer
			</div>
			<Item>1</Item>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>
				{size}px Spacer
			</div>
			<Item>3</Item>
			<div style={{height: ri.scaleToRem(size), paddingLeft: ri.scaleToRem(80)}}>
				{size}px Spacer
			</div>
		</Scroller>
	);
};

TestScrollingToBoundaryWithLongOverflow.storyName = 'Test scrolling to boundary with long overflow';

export const WithSpotlightTargetCalculation = () => (
	<div>
		<Button>hello</Button>
		<Scroller
			focusableScrollbar={
				prop.focusableScrollbarOption[
					select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
				]
			}
			key={select('scrollMode', prop.scrollModeOption, Config)}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			style={{height: ri.scaleToRem(804)}}
		>
			<Group childComponent={Item}>{itemData}</Group>
		</Scroller>
	</div>
);

WithSpotlightTargetCalculation.storyName = 'With Spotlight Target Calculation';

export const WithLongItem = () => <ScrollerWithLongItem />;

WithLongItem.storyName = 'With Long Item';

export const WithOneLongHeightItem = () => (
	<Scroller
		focusableScrollbar={
			prop.focusableScrollbarOption[
				select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
			]
		}
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
);

WithOneLongHeightItem.storyName = 'With One Long Height Item';

export const WithNestedScroller = () => {
	let noScrollByWheel = boolean('noScrollByWheel', Config);
	return (
		<Scroller
			direction="vertical"
			focusableScrollbar={
				prop.focusableScrollbarOption[
					select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
				]
			}
			key={select('scrollMode', prop.scrollModeOption, Config) + '1'}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			verticalScrollbar="visible"
		>
			<Scroller
				direction="horizontal"
				focusableScrollbar={
					prop.focusableScrollbarOption[
						select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
					]
				}
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
					<Item>
						This is the upper horizontal scroller. If noScrollByWheel is not specified, this
						scroller will be scrolled by wheel and the outer scroller will not be scrolled.
					</Item>
					<br />
					<br />
					<Item>
						If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the
						outer scroller will be scrolled.
					</Item>
					<br />
					<br />
					<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
				</div>
			</Scroller>
			<Scroller
				direction="horizontal"
				focusableScrollbar={
					prop.focusableScrollbarOption[
						select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)
					]
				}
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
					<Item>
						This is the lower horizontal scroller. If noScrollByWheel is not specified, this
						scroller will be scrolled by wheel and the outer scroller will not be scrolled.
					</Item>
					<br />
					<br />
					<Item>
						If noScrollByWheel is specified, this scroller will NOT be scrolled by wheel but the
						outer scroller will be scrolled.
					</Item>
					<br />
					<br />
					<Item>To set or unset noScrollByWheel prop, click KNOBS below.</Item>
				</div>
			</Scroller>
		</Scroller>
	);
};

WithNestedScroller.storyName = 'With Nested Scroller';

export const WithCustomizedStyle = () => (
	<div>
		<Scroller
			focusableScrollbar={prop.focusableScrollbarOption[select('focusableScrollbar', ['false', 'true', '"byEnter"'], Config)]}
			key={select('scrollMode', prop.scrollModeOption, Config)}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollbarTrackCss={css}
			scrollMode={select('scrollMode', prop.scrollModeOption, Config)}
			style={{height: ri.scaleToRem(804)}}
		>
			<div style={{height: ri.scaleToRem(1200)}}>
				The scrollbar track is displayed in white.
			</div>
			The scrollbar thumb is displayed in orangered.
		</Scroller>
	</div>
);

WithCustomizedStyle.storyName = 'With Customized Style';

export const WithLongContents = (args) => {
	const content = `
	The goal of Enact is to provide the building blocks for creating robust and maintainable applications. To that end, we’ve pulled together the best solutions for internationalization (i18n), accessibility (a11y), focus management, linting, testing and building. Then, we created a set of reusable components and behaviors on top of that. We combined these pieces and ensured that they work together seamlessly, allowing developers to focus on implementation.
	Easy to Use
	Enact builds atop the excellent React library, and provides a full framework to the developer. The recent boom of web technologies and related tools has led to a plethora of options available. In fact, getting started might be the most difficult part of building a modern web application.
	Performant
	Beyond initial setup, Enact continues to provide benefits. It was built with performance in mind, and conscious decisions were made to ensure that applications remain performant as they grow in size and complexity. This ranges from the way components are rendered to how data flows through application.
	Customizable
	Enact has a full set of customizable widgets that can be tuned and tweaked to the particular style of each project. Using our experience in building full UI libraries for a broad swath of devices ranging from TVs to watches, we have created a widget library whose components can easily be composed to create complex views and applications.
	Adaptable
	Enact was designed to produce native quality applications for a wide variety embedded web platforms. Read about Enact’s use cases and how it helps solve problems for Automotive, Robotics, TV and more.
	`;
	let longContents = '';
	for (let i = 0; i < 50; i++) {
		longContents += content;
	}

	return (
		<Scroller
			focusableScrollbar={args['focusableScrollbar']}
			key={args['scrollMode']}
			onKeyDown={action('onKeyDown')}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
		>
			<BodyText style={{whiteSpace: 'pre-line'}}>
				{longContents}
			</BodyText>
		</Scroller>
	);
};

select('focusableScrollbar', WithLongContents, prop.focusableScrollbarOption, Config, 'byEnter');
select('scrollMode', WithLongContents, prop.scrollModeOption, Config);

WithLongContents.storyName = 'With Long Contents';
