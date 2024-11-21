import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import DatePicker from '@enact/sandstone/DatePicker';
import Heading from '@enact/sandstone/Heading';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import Image from '@enact/sandstone/Image';
import Picker from '@enact/sandstone/Picker';
import Popup from '@enact/sandstone/Popup';
import RadioItem from '@enact/sandstone/RadioItem';
import Skinnable from '@enact/sandstone/Skinnable';
import SwitchItem from '@enact/sandstone/SwitchItem';
import TimePicker from '@enact/sandstone/TimePicker';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {Row, Cell, Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component, cloneElement, useCallback} from 'react';

import css from './Spotlight.module.less';

import docs from '../../images/icon-enact-docs.png';
import {svgGenerator} from '../helper/svg';

const Container = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const style = {
	container: () => ({
		width: ri.scaleToRem(600),
		border: '1px dashed red',
		margin: '0 ' + ri.scaleToRem(24),
		padding: ri.scaleToRem(24)
	}),
	fittedContainer: () => ({
		border: '1px dashed blue',
		margin: '0 ' + ri.scaleToRem(24),
		padding: ri.scaleToRem(24)
	})
};

const Items = ['First', 'Second', 'Third'];

class DisappearTest extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showButton: true
		};
	}

	componentWillUnmount () {
		this.stopTimer();
	}

	removeButton = () => {
		this.setState({showButton: false});
	};

	restoreButton = () => {
		this.setState({showButton: true});
	};

	resetFocus = () => {
		Spotlight.focus('restoreButton');
	};

	startTimer = () => {
		this.timer = window.setTimeout(this.removeButton, 4000);
	};

	stopTimer = () => {
		if (this.timer) {
			window.clearTimeout(this.timer);
		}
	};

	render () {
		return (
			<div>
				5-way select to set focus to the Focus Me button and wait until 4s has elapsed, and observe
				the focused button is removed and the remaining button gains focus.
				{this.state.showButton ? (
					<Button onFocus={this.startTimer} onSpotlightDisappear={this.resetFocus}>
						Focus me
					</Button>
				) : null}
				<Button spotlightId="restoreButton" onClick={this.restoreButton}>
					Restore Button
				</Button>
			</div>
		);
	}
}

class DisableOnClick extends Component {
	constructor (props) {
		super(props);

		this.state = {
			disabled: false
		};
	}

	handleButtonDisable = () => {
		this.setState({disabled: true});
	};

	handleButtonEnable = () => {
		this.setState({disabled: false});
	};

	render () {
		return (
			<div>
				<p>
					Pressing the marqueeable button will disable it. The marquee should continue and restart
					while the button is focused and disabled.
				</p>
				<Button disabled={this.state.disabled} onClick={this.handleButtonDisable}>
					A very super ultra massive extensively long marquee Button
				</Button>
				<Button onClick={this.handleButtonEnable}>Enable</Button>
			</div>
		);
	}
}

class DisableTest extends Component {
	constructor (props) {
		super(props);

		this.state = {
			disabled: false,
			paused: false
		};
	}

	componentDidMount () {
		Spotlight.resume();
		this.id = setInterval(() => this.setState((state) => ({disabled: !state.disabled})), 5000);
	}

	componentWillUnmount () {
		clearInterval(this.id);
		this.paused.resume();
	}

	paused = new Pause('Pause Test');

	handleToggle = () => {
		if (this.paused.isPaused()) {
			this.paused.resume();
			this.setState({paused: false});
		} else {
			this.paused.pause();
			this.setState({paused: true});
		}
	};

	render () {
		return (
			<div>
				<p>
					Timed Button is alternately enabled and disabled every 5 seconds. Pressing the
					Active/Paused button will resume and pause Spotlight, respectively.
				</p>
				<Button disabled={this.state.disabled}>Timed Button</Button>
				<Button onClick={this.handleToggle} icon={this.state.paused ? 'pause' : 'play'}>
					{this.state.paused ? 'Paused' : 'Active'}
				</Button>
			</div>
		);
	}
}

class PopupFocusTest extends Component {
	static propTypes = {
		noAnimation: PropTypes.bool,
		noAutoDismiss: PropTypes.bool,
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),
		spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
	};

	static defaultProps = {
		noAnimation: false,
		noAutoDismiss: false,
		scrimType: 'translucent',
		spotlightRestrict: 'self-only'
	};

	constructor (props) {
		super(props);

		this.state = {
			popupOpen: false
		};
	}

	handleClosePopup = () => {
		this.setState({popupOpen: false});
	};

	handleOpenPopup = () => {
		this.setState({popupOpen: true});
	};

	render () {
		const {noAnimation, noAutoDismiss, scrimType, spotlightRestrict} = this.props;

		return (
			<div>
				<p>
					Open the popup by using 5-way selection on the &quot;Open Popup&quot; buttons. When the
					popup is visible, select the popup&apos;s close button to close the popup. Focus should
					return to the button used to originally open the popup. Verify this behavior for each of
					the buttons.
				</p>
				<p>Use the controls to verify 5-way behavior under different Popup configurations.</p>
				<Button onClick={this.handleOpenPopup}>Open Popup</Button>
				<Button onClick={this.handleOpenPopup}>Open Popup</Button>
				<Popup
					noAnimation={noAnimation}
					noAutoDismiss={noAutoDismiss}
					onClose={this.handleClosePopup}
					open={this.state.popupOpen}
					scrimType={scrimType}
					spotlightRestrict={spotlightRestrict}
				>
					<Row>
						<Cell align="center">This is a Popup</Cell>
						<Cell shrink>
							<Button icon="closex" onClick={this.handleClosePopup} size="small" />
						</Cell>
					</Row>
				</Popup>
			</div>
		);
	}
}

class FocusedAndDisabled extends Component {
	state = {
		index: -1
	};

	tests = [
		<Button icon="star">Button</Button>,
		<Button icon="star" />,
		<Button icon={docs}>Button</Button>,
		<Button icon={docs} />
	];

	handleClear = () => this.setState({index: -1});

	select = (index) => {
		Spotlight.setPointerMode(false);
		Spotlight.focus(`component-${index}`);
		this.setState({index});
	};

	render () {
		return (
			<Scroller>
				<p>Click or 5-way select the icon buttons to:</p>
				<ol>
					<li>Disable pointer mode</li>
					<li>Set focus on the component next to the button</li>
					<li>Disable the newly focused component</li>
				</ol>
				<Button onClick={this.handleClear}>Enable All</Button>
				{this.tests.map((comp, index) => (
					<div key={`row-${index}`}>
						{/* eslint-disable-next-line react/jsx-no-bind */}
						<Button icon="arrowlargeright" onClick={() => this.select(index)} />
						{cloneElement(comp, {
							disabled: this.state.index === index,
							spotlightId: `component-${index}`
						})}
					</div>
				))}
			</Scroller>
		);
	}
}

export default {
	title: 'Sandstone/Spotlight',
	component: 'Spotlight'
};

const SimpleDiv = () => {
	action('Render')(true);
	return <div>Spottable Component</div>;
};

const SpottableItem = Spottable(Skinnable('div'));

export const CheckRerender = () => (
	<div>
		<p>
			A spottable component must not be re-rendered when a focus change occurs.
			So the message of the Actions tab(&apos;Render: true&apos;) should be displayed only once.
		</p>
		<Row align="center space-evenly">
			<SpottableItem className={css.spottableitem}>
				<SimpleDiv />
			</SpottableItem>
		</Row>
	</div>
);

CheckRerender.storyName = 'Check Re-render';
CheckRerender.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const MultipleButtons = () => (
	<Row align="center space-evenly">
		<Cell shrink>
			<Button onClick={action('onClick')}>One</Button>
		</Cell>
		<Cell shrink>
			<Button onClick={action('onClick')}>Two</Button>
		</Cell>
		<Cell shrink>
			<Button onClick={action('onClick')}>Three</Button>
		</Cell>
	</Row>
);

MultipleButtons.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const MultipleContainers = () => (
	<Scroller>
		<p>
			The containers below will spot the last-focused element. Keep track of the last-focused
			element in the container when testing and ensure that the correct element is spotted when
			re-entering the container with 5-way. If the pointer is inside a container and a 5-way
			directional key is pressed, the nearest element to the pointer (in the direction specified by
			the key) will be spotted.
		</p>
		<Row>
			<Cell component={Container} shrink style={style.container()}>
				<Item>1</Item>
				<Item>2</Item>
				<Item>3</Item>
				<div>Non-spottable content 1</div>
				<div>Non-spottable content 2</div>
				<div>Non-spottable content 3</div>
			</Cell>
			<Cell component={Container} shrink style={style.container()}>
				<div>Non-spottable content A</div>
				<div>Non-spottable content B</div>
				<div>Non-spottable content C</div>
				<Item>A</Item>
				<Item>B</Item>
				<Item>C</Item>
			</Cell>
		</Row>
	</Scroller>
);

MultipleContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const NestedContainers = () => (
	<div>
		<p>
			The nested containers below both use a enterTo: &apos;last-focused&apos; configuration. You
			should be able to naturally 5-way navigate between the items in the containers. Also,
			attempting to 5-way navigate (left or down) from the application close button should result in
			the last-focused item being spotted.
		</p>
		<Row>
			<Cell component={Container} shrink style={style.fittedContainer()}>
				<Item>Item in a container</Item>
				<Container style={style.fittedContainer()}>
					<Item>Item in a nested container</Item>
				</Container>
			</Cell>
		</Row>
	</div>
);

NestedContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DirectionalEvents = () => (
	<div>
		<p>
			The item below will emit onSpotlight[Direction] events when attempting to 5-way navigate from
			the item. Highlight the item below and press any of the 5-way directional keys to verify a
			matching directional event in the action logger.
		</p>
		<Item
			onSpotlightDown={action('onSpotlightDown')}
			onSpotlightLeft={action('onSpotlightLeft')}
			onSpotlightRight={action('onSpotlightRight')}
			onSpotlightUp={action('onSpotlightUp')}
		>
			Item
		</Item>
	</div>
);

DirectionalEvents.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};


export const DisappearingSpottable = () => <DisappearTest />;

DisappearingSpottable.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DisabledOnClick = () => <DisableOnClick />;

DisabledOnClick.storyName = 'Disabled on Click';
DisabledOnClick.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const DisabledWithPause = () => <DisableTest />;

DisabledWithPause.storyName = 'Disabled with Pause';
DisabledWithPause.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const PopupNavigation = (args) => (
	<PopupFocusTest
		noAnimation={args['noAnimation']}
		noAutoDismiss={args['noAutoDismiss']}
		scrimType={args['scrimType']}
		spotlightRestrict={args['spotlightRestrict']}
	/>
);

boolean('noAnimation', PopupNavigation, Popup, false);
boolean('noAutoDismiss', PopupNavigation, Popup, false);
select('scrimType', PopupNavigation, ['none', 'transparent', 'translucent'], Popup, 'translucent');
select('spotlightRestrict', PopupNavigation, ['self-first', 'self-only'], Popup, 'self-only');

export const _FocusedAndDisabled = () => <FocusedAndDisabled />;

_FocusedAndDisabled.storyName = 'Focused and Disabled';
_FocusedAndDisabled.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const NavigatingIntoOverflowContainers = () => (
	<div>
		<Item>Before last-focused Container + Scroller</Item>
		<Container style={{outline: '1px dotted #ffffff80'}}>
			<Scroller>
				<Item disabled>Item A</Item>
				<Item>Item B</Item>
				<Item disabled>Item C</Item>
				<Item>Item D</Item>
				<Item disabled>Item E</Item>
			</Scroller>
		</Container>
		<Item>After last-focused Container + Scroller</Item>
	</div>
);

NavigatingIntoOverflowContainers.storyName = 'Navigating into overflow containers';
NavigatingIntoOverflowContainers.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

const SpottableDiv = Spottable(Skinnable('div'));

export const FocusRing = () => (
	<Row>
		<SpottableDiv className={css.spottableDiv1}>
			<Image className={css.image} src={svgGenerator(360, 240, 'd8d8d8', '6e6e6e', '360 X 240')} />
		</SpottableDiv>
		<SpottableDiv className={css.spottableDiv2}>
			<Image className={css.image} src={svgGenerator(360, 240, '7ed31d', 'ffffff', '360 X 240')} />
		</SpottableDiv>
	</Row>
);

FocusRing.storyName = 'Spottable with Focus Ring';

export const FocusWithPreventScroll = () => {
	const handleClickNotPrevented = useCallback(() => {
		Spotlight.focus('#FocusWithPreventScrollTarget1');
	}, []);

	const handleClickPrevented = useCallback(() => {
		Spotlight.focus('#FocusWithPreventScrollTarget2', {preventScroll: true});
	}, []);

	return (
		<>
			<p>Press OK button on the first button calls Spotlight.focus() to focus the second button for each scroller.</p>
			Without preventScroll option.
			<div className={css.shortPureScroller}>
				<Button className={css.block} onClick={handleClickNotPrevented}>Press OK on this button</Button>
				<Button className={css.block} id="FocusWithPreventScrollTarget1">To be scrolled</Button>
			</div>
			<br />
			With preventScroll: true option.
			<div className={css.shortPureScroller}>
				<Button className={css.block} onClick={handleClickPrevented}>Press OK on this button</Button>
				<Button className={css.block} id="FocusWithPreventScrollTarget2">Not to be scrolled</Button>
			</div>
		</>
	);
};

FocusWithPreventScroll.storyName = 'Focus with preventScroll';

export const KitchenSink = (args) => (
	<Column>
		<Cell component="p" shrink>
			Use the controls to test the available behaviors for the spottable components below.
		</Cell>
		<Cell
			component={Container}
			spotlightDisabled={args['Container spotlightDisabled']}
		>
			<Row style={{height: '100%'}}>
				<Cell>
					<Column>
						<Cell component={Heading} showLine shrink>
							Misc Components
						</Cell>
						<Cell component={Scroller}>
							<div>
								<Button
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									Button
								</Button>
							</div>
							<div>
								<Button
									backgroundOpacity="transparent"
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									Transparent
								</Button>
							</div>
							<div>
								<Button
									icon="plus"
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								/>
								<Input
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								/>
							</div>
							<div>
								<Picker
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									{Items}
								</Picker>
								<Picker
									joined
									onSpotlightDown={action('onSpotlightDown')}
									onSpotlightLeft={action('onSpotlightLeft')}
									onSpotlightRight={action('onSpotlightRight')}
									onSpotlightUp={action('onSpotlightUp')}
									spotlightDisabled={args['Spottable spotlightDisabled']}
								>
									{Items}
								</Picker>
							</div>
							<Slider
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							/>
							<Item
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								Item
							</Item>
							<Item
								label="Label"
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								Item with label
							</Item>
							<CheckboxItem
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								CheckboxItem
							</CheckboxItem>
							<FormCheckboxItem
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								FormCheckboxItem
							</FormCheckboxItem>
							<RadioItem
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								RadioItem
							</RadioItem>
							<SwitchItem
								onSpotlightDown={action('onSpotlightDown')}
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								onSpotlightUp={action('onSpotlightUp')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
							>
								SwitchItem
							</SwitchItem>
						</Cell>
					</Column>
				</Cell>
				<Cell>
					<Column>
						<Cell component={Heading} showLine shrink>
							Expandables
						</Cell>
						<Cell component={Scroller}>
							<DatePicker
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="DatePicker"
							/>
							<TimePicker
								onSpotlightLeft={action('onSpotlightLeft')}
								onSpotlightRight={action('onSpotlightRight')}
								spotlightDisabled={args['Spottable spotlightDisabled']}
								title="TimePicker"
							/>
						</Cell>
					</Column>
				</Cell>
			</Row>
		</Cell>
	</Column>
);

boolean('Container spotlightDisabled', KitchenSink, Container, false);
boolean('Spottable spotlightDisabled', KitchenSink, Container, false);
