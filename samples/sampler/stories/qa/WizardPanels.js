import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import {Scroller} from '@enact/sandstone/Scroller';
import WizardPanels, {Panel, WizardPanelsBase} from '@enact/sandstone/WizardPanels';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import PropTypes from 'prop-types';
import {Component, PureComponent} from 'react';

WizardPanels.displayName = 'WizardPanels';
const Config = mergeComponentMetadata('WizardPanels', WizardPanelsBase, WizardPanels);

const propOptions = {
	buttonVisibility: ['auto', 'always', 'never']
};

const inputData = {
	prevString: 'Prev',
	nextString: 'Next',
	longString:
	'Core, The building blocks of an Enact application. Sandstone, our touch-centric UI library.',
	longerString:
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi. Vestibulum sed arcu non odio euismod lacinia at quis. Elementum eu facilisis sed odio morbi quis commodo. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Neque ornare aenean euismod elementum. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Tincidunt augue interdum velit euismod. Nunc sed augue lacus viverra vitae congue eu consequat. Ultricies integer quis auctor elit sed vulputate. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.'
};

export default {
	title: 'Sandstone/WizardPanels',
	component: 'WizardPanels'
};

class WizardPanelsWithFooterButtons extends Component {
	constructor () {
		super();
		this.state = {
			index: 0
		};
	}

	onNextClick = (ev) => {
		this.setState({index: 1});
		action('onNextClick')(ev);
	};

	onPrevClick = (ev) => {
		this.setState({index: 0});
		action('onPrevClick')(ev);
	};

	render () {
		return (
			<WizardPanels
				index={this.state.index}
				noAnimation
				onNextClick={this.onNextClick}
				onPrevClick={this.onPrevClick}
			>
				<Panel title={'Panel0'} subtitle={'subtitle'} nextButton={<Button>Next</Button>}>
					<footer>
						<Button>Dummy</Button>
						<Button onClick={this.onNextClick}>Next</Button>
					</footer>
				</Panel>
				<Panel title={'Panel1'} subtitle={'subtitle'} prevButton={<Button>Previous</Button>}>
					<footer>
						<Button onClick={this.onPrevClick}>Previous</Button>
					</footer>
				</Panel>
			</WizardPanels>
		);
	}
}

export const WithFooterButtons = () => <WizardPanelsWithFooterButtons />;

WithFooterButtons.storyName = 'with footer buttons';
WithFooterButtons.parameters = {
	props: {
		noPanel: true
	},
	controls: {
		hideNoControlsWarning: true
	}
};

export const LongPrevNextButtons = (args) => (
	<WizardPanels
		current={args['current']}
		noAnimation={args['noAnimation']}
		noSteps={args['noSteps']}
		nextButtonVisibility={args['nextButtonVisibility']}
		onNextClick={action('onNextClick')}
		onPrevClick={action('onPrevClick')}
		onTransition={action('onTransition')}
		onWillTransition={action('onWillTransition')}
		prevButtonVisibility={args['prevButtonVisibility']}
		total={args['total']}
	>
		<WizardPanels.Panel
			footer="Footer in View 1"
			subtitle="A subtitle for View 1"
			title="WizardPanel View 1"
			prevButton={
				args['custom first Panel prevButton'] ? (
					<Button icon="closex" aria-label="exit">
						Exit
					</Button>
				) : (
					void 0
				)
			}
		>
			<Scroller>
				<BodyText>This is BodyText.</BodyText>
			</Scroller>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			subtitle="A subtitle for View 2"
			title={inputData.longerString}
			nextButton={<Button>{inputData.nextString}</Button>}
			prevButton={<Button>{inputData.longString}</Button>}
		>
			<Item>
				<slotBefore>
					<Icon>notification</Icon>
				</slotBefore>
				A Long title, Previous button has long text, and Next button has short text.
			</Item>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			subtitle="A subtitle for View 3"
			title={inputData.longerString}
			nextButton={<Button>{inputData.longString}</Button>}
			prevButton={<Button>{inputData.longString}</Button>}
		>
			<Item>
				<slotBefore>
					<Icon>notification</Icon>
				</slotBefore>
				A Long title, Previous button has long text, and Next button has long text.
			</Item>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			subtitle="A subtitle for View 4"
			title={inputData.longerString}
			nextButton={<Button>{inputData.longString}</Button>}
			prevButton={<Button>{inputData.prevString}</Button>}
		>
			<Item>
				<slotBefore>
					<Icon>notification</Icon>
				</slotBefore>
				A Long title, Previous button has short text, and Next button has long text.
			</Item>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			footer="Footer in View 5"
			subtitle="A subtitle for View 5"
			title="WizardPanel View 5"
			nextButton={
				args['custom last Panel nextButton'] ? (
					<Button icon="closex" aria-label="quit">
						Close
					</Button>
				) : (
					void 0
				)
			}
		>
			<Icon>support</Icon>
			<BodyText>A simple view</BodyText>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
	</WizardPanels>
);

number('current', LongPrevNextButtons, Config, 0);
boolean('noAnimation', LongPrevNextButtons, Config);
boolean('noSteps', LongPrevNextButtons, Config);
select('nextButtonVisibility', LongPrevNextButtons, propOptions.buttonVisibility, Config);
select('prevButtonVisibility', LongPrevNextButtons, propOptions.buttonVisibility, Config);
number('total', LongPrevNextButtons, Config, 0);
boolean('custom first Panel prevButton', LongPrevNextButtons, Config);
boolean('custom last Panel nextButton', LongPrevNextButtons, Config);

LongPrevNextButtons.storyName = 'long prev next buttons';
LongPrevNextButtons.parameters = {
	props: {
		noPanel: true
	}
};

class WizardPanelsWithChangingChildren extends Component {
	constructor () {
		super();
		this.state = {
			clickCount: 0
		};
	}

	onClick = () => {
		this.setState(prevState => ({clickCount: prevState.clickCount + 1}));
	};

	render () {
		const args = this.props.args;
		return (
			<WizardPanels
				noAnimation={args['noAnimation']}
			>
				<Panel title={'Panel0'} subtitle={'subtitle'} nextButton={<Button>Next</Button>}>
					<Button onClick={this.onClick}>Click</Button>
					{`ClickCount: ${this.state.clickCount}`}
				</Panel>
				<Panel title={'Panel1'} subtitle={'subtitle'} prevButton={<Button>Previous</Button>}>
					<Button onClick={this.onClick}>Click</Button>
					{`ClickCount: ${this.state.clickCount}`}
				</Panel>
			</WizardPanels>
		);
	}
}

WizardPanelsWithChangingChildren.propTypes = {
	args: PropTypes.object
};

export const WithChangingChildren = (args) => <WizardPanelsWithChangingChildren args={args} />;

boolean('noAnimation', WithChangingChildren, Config);

WithChangingChildren.storyName = 'with changing children';
WithChangingChildren.parameters = {
	props: {
		noPanel: true
	}
};

class PureComponentItem extends PureComponent {
	constructor (props) {
		super(props);
		action('constructor')(props.children);
	}

	componentDidMount () {
		action('componentDidMount')(this.props.children);
	}

	componentWillUnmount () {
		action('componentWillUnmount')(this.props.children);
	}

	render () {
		action('render')(this.props.children);
		return (
			<Item>{this.props.children}</Item>
		);
	}
}

export const WithPureComponent = (args) => (
	<WizardPanels
		current={args['current']}
		noAnimation={args['noAnimation']}
		noSteps={args['noSteps']}
		nextButtonVisibility={args['nextButtonVisibility']}
		onNextClick={action('onNextClick')}
		onPrevClick={action('onPrevClick')}
		onTransition={action('onTransition')}
		onWillTransition={action('onWillTransition')}
		prevButtonVisibility={args['prevButtonVisibility']}
		total={args['total']}
	>
		<WizardPanels.Panel
			footer="Footer in View 1"
			subtitle="A subtitle for View 1"
			title="WizardPanel View 1"
		>
			<PureComponentItem>Item1</PureComponentItem>
			<footer>
				<Button>OK</Button>
				<Button>Cancel</Button>
			</footer>
		</WizardPanels.Panel>
		<WizardPanels.Panel
			footer="Footer in View 2"
			subtitle="A subtitle for View 2"
			title="WizardPanel View 2"
		>
			<PureComponentItem>Item2</PureComponentItem>
		</WizardPanels.Panel>
	</WizardPanels>
);

number('current', WithPureComponent, Config, 0);
boolean('noAnimation', WithPureComponent, Config);
boolean('noSteps', WithPureComponent, Config);
select('nextButtonVisibility', WithPureComponent, propOptions.buttonVisibility, Config);
select('prevButtonVisibility', WithPureComponent, propOptions.buttonVisibility, Config);
number('total', WithPureComponent, Config, 0);

WithPureComponent.storyName = 'with pure component';
WithPureComponent.parameters = {
	props: {
		noPanel: true
	}
};

class WizardPanelsWithAlert extends Component {
	constructor () {
		super();
		this.state = {
			open: false
		};
	}

	handleClose = () => {
		this.setState({open: false});
	};

	handleTransition = (e) => {
		if (e.index === 1) {
			this.setState({open: true});
			e.preventDefault();	// Prevent to focus on panel
		}
	};

	render = () => (
		<WizardPanels onTransition={this.handleTransition}>
			<Panel title="title 0">
				<Button>Button1</Button>
				<Button>Button2</Button>
			</Panel>
			<Panel title="title 1">
				<Alert open={this.state.open} type="overlay">
					<Button onClick={this.handleClose}>close</Button>
				</Alert>
				<Button>Button3</Button>
				<Button>Button4</Button>
			</Panel>
		</WizardPanels>
	);
}

export const _WizardPanelsWithAlert = () => <WizardPanelsWithAlert />;

_WizardPanelsWithAlert.storyName = 'with Alert';
_WizardPanelsWithAlert.parameters = {
	props: {
		noPanel: true
	}
};

const WizardPanelsWithLongSubtitle = () => {
	return (
		<WizardPanels
			total={2}
			noAnimation
		>
			<Panel
				title="title 0"
				subtitle="This is very long text. It is very very long. This is very long text. It is very very long. This is very long text. It is very very long. This is very long text. It is very very long."
			>
				<Button>Button1</Button>
				<Button>Button2</Button>
			</Panel>
			<Panel title="title 1">
				<Button>Button3</Button>
				<Button>Button4</Button>
			</Panel>
		</WizardPanels>
	);
};

export const _WizardPanelsWithLongSubtitle = () => <WizardPanelsWithLongSubtitle />;

_WizardPanelsWithLongSubtitle.storyName = 'with long subtitle';
_WizardPanelsWithLongSubtitle.parameters = {
	props: {
		noPanel: true
	}
};
