import Spotlight from '@enact/spotlight';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {Row, Cell, Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import Pause from '@enact/spotlight/Pause';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import CheckboxItem from '@enact/sandstone/CheckboxItem';
import DatePicker from '@enact/sandstone/DatePicker';
import Heading from '@enact/sandstone/Heading';
import FormCheckboxItem from '@enact/sandstone/FormCheckboxItem';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';
import Picker from '@enact/sandstone/Picker';
import Popup from '@enact/sandstone/Popup';
import RadioItem from '@enact/sandstone/RadioItem';
import SwitchItem from '@enact/sandstone/SwitchItem';
import TimePicker from '@enact/sandstone/TimePicker';
import Scroller from '@enact/sandstone/Scroller';
import Slider from '@enact/sandstone/Slider';

import docs from '../../images/icon-enact-docs.png';

const Container = SpotlightContainerDecorator(
	{enterTo: 'last-focused'},
	'div'
);

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

class DisappearTest extends React.Component {
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
	}

	restoreButton = () => {
		this.setState({showButton: true});
	}

	resetFocus = () => {
		Spotlight.focus('restoreButton');
	}

	startTimer = () => {
		this.timer = window.setTimeout(this.removeButton, 4000);
	}

	stopTimer = () => {
		if (this.timer) {
			window.clearTimeout(this.timer);
		}
	}

	render () {
		return (
			<div>
				5-way select to set focus to the Focus Me button and wait until 4s has elapsed, and observe the focused
				button is removed and the remaining button gains focus.
				{this.state.showButton ? (
					<Button
						onFocus={this.startTimer}
						onSpotlightDisappear={this.resetFocus}
					>
						Focus me
					</Button>
				) : null}
				<Button
					spotlightId="restoreButton"
					onClick={this.restoreButton}
				>
					Restore Button
				</Button>
			</div>
		);
	}
}

class DisableOnClick extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			disabled: false
		};
	}

	handleButtonDisable = () => {
		this.setState({disabled: true});
	}

	handleButtonEnable = () => {
		this.setState({disabled: false});
	}

	render () {
		return (
			<div>
				<p>Pressing the marqueeable button will disable it. The marquee should continue and restart while the button is focused and disabled.</p>
				<Button disabled={this.state.disabled} onClick={this.handleButtonDisable}>
					A very super ultra massive extensively long marquee Button
				</Button>
				<Button onClick={this.handleButtonEnable}>
					Enable
				</Button>
			</div>
		);
	}
}

class DisableTest extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			disabled: false,
			paused: false
		};
	}

	componentDidMount () {
		Spotlight.resume();
		this.id = setInterval(() => this.setState(state => ({disabled: !state.disabled})), 5000);
	}

	componentWillUnmount () {
		clearInterval(this.id);
		this.paused.resume();
	}

	paused = new Pause('Pause Test')

	handleToggle = () => {
		if (this.paused.isPaused()) {
			this.paused.resume();
			this.setState({paused: false});
		} else {
			this.paused.pause();
			this.setState({paused: true});
		}
	}

	render () {
		return (
			<div>
				<p>Timed Button is alternately enabled and disabled every 5 seconds. Pressing the Active/Paused button will resume and pause Spotlight, respectively.</p>
				<Button disabled={this.state.disabled}>
					Timed Button
				</Button>
				<Button onClick={this.handleToggle} icon={this.state.paused ? 'pause' : 'play'}>
					{this.state.paused ? 'Paused' : 'Active'}
				</Button>
			</div>
		);
	}
}

class PopupFocusTest extends React.Component {
	static propTypes = {
		noAnimation: PropTypes.bool,
		noAutoDismiss: PropTypes.bool,
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),
		spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
	}

	static defaultProps = {
		noAnimation: false,
		noAutoDismiss: false,
		scrimType: 'translucent',
		spotlightRestrict: 'self-only'
	}

	constructor (props) {
		super(props);
		this.state = {
			popupOpen: false
		};
	}

	handleClosePopup = () => {
		this.setState({popupOpen: false});
	}

	handleOpenPopup = () => {
		this.setState({popupOpen: true});
	}

	render () {
		const {noAnimation, noAutoDismiss, scrimType, spotlightRestrict} = this.props;

		return (
			<div>
				<p>
					Open the popup by using 5-way selection on the &quot;Open Popup&quot; buttons.
					When the popup is visible, select the popup&apos;s close button to close the popup.
					Focus should return to the button used to originally open the popup. Verify this
					behavior for each of the buttons.
				</p>
				<p>
					Use the knobs to verify 5-way behavior under different Popup configurations.
				</p>
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

class FocusedAndDisabled extends React.Component {
	state = {
		index: -1
	}

	tests = [
		<Button icon="star">Button</Button>,
		<Button icon="star" />,
		<Button icon={docs}>Button</Button>,
		<Button icon={docs} />
	]

	handleClear = () => this.setState({index: -1})

	select = (index) => {
		Spotlight.setPointerMode(false);
		Spotlight.focus(`component-${index}`);
		this.setState({index});
	}

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
						<Button icon="arrowlargeright" onTap={() => this.select(index)} />
						{React.cloneElement(comp, {
							disabled: this.state.index === index,
							spotlightId: `component-${index}`
						})}
					</div>
				))}
			</Scroller>
		);
	}
}

storiesOf('Spotlight', module)
	.add(
		'Multiple Buttons',
		() => (
			<Row align="center space-evenly">
				<Cell shrink>
					<Button onClick={action('onClick')}>
						One
					</Button>
				</Cell>
				<Cell shrink>
					<Button onClick={action('onClick')}>
						Two
					</Button>
				</Cell>
				<Cell shrink>
					<Button onClick={action('onClick')}>
						Three
					</Button>
				</Cell>
			</Row>
		)
	)
	.add(
		'Multiple Containers',
		() => (
			<Scroller>
				<p>
					The containers below will spot the last-focused element. Keep track of the
					last-focused element in the container when testing and ensure that the correct
					element is spotted when re-entering the container with 5-way. If the pointer is
					inside a container and a 5-way directional key is pressed, the nearest element
					to the pointer (in the direction specified by the key) will be spotted.
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
		)
	)
	.add(
		'Nested Containers',
		() => (
			<div>
				<p>
					The nested containers below both use a enterTo: &apos;last-focused&apos; configuration.
					You should be able to naturally 5-way navigate between the items in the containers. Also,
					attempting to 5-way navigate (left or down) from the application close button should
					result in the last-focused item being spotted.
				</p>
				<Row>
					<Cell component={Container} shrink style={style.fittedContainer()} >
						<Item>Item in a container</Item>
						<Container style={style.fittedContainer()} >
							<Item>Item in a nested container</Item>
						</Container>
					</Cell>
				</Row>
			</div>
		)
	)
	.add(
		'Directional Events',
		() => (
			<div>
				<p>
					The item below will emit onSpotlight[Direction] events when attempting
					to 5-way navigate from the item. Highlight the item below and press any of
					the 5-way directional keys to verify a matching directional event in the
					action logger.
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
		)
	)
	.add(
		'Disappearing Spottable',
		() => (
			<DisappearTest />
		)
	)
	.add(
		'Disabled on Click',
		() => (
			<DisableOnClick />
		)
	)
	.add(
		'Disabled with Pause',
		() => (
			<DisableTest />
		)
	)
	.add(
		'Popup Navigation',
		() => (
			<PopupFocusTest
				noAnimation={boolean('noAnimation', Popup, false)}
				noAutoDismiss={boolean('noAutoDismiss', Popup, false)}
				scrimType={select('scrimType', ['none', 'transparent', 'translucent'], Popup, 'translucent')}
				spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Popup, 'self-only')}
			/>
		)
	)
	.add(
		'Focused and Disabled',
		() => (
			<FocusedAndDisabled />
		)
	)
	.add(
		'Navigating into overflow containers',
		() => (
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
		)
	)
	.add(
		'Kitchen Sink',
		() => (
			<Column>
				<Cell component="p" shrink>
					Use the knobs to test the available behaviors for the spottable components
					below.
				</Cell>
				<Cell component={Container} spotlightMuted={boolean('spotlightMuted', Container, false)} spotlightDisabled={boolean('Container spotlightDisabled', Container, false)}>
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
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										>
											Button
										</Button>
										<Button
											backgroundOpacity="translucent"
											onSpotlightDown={action('onSpotlightDown')}
											onSpotlightLeft={action('onSpotlightLeft')}
											onSpotlightRight={action('onSpotlightRight')}
											onSpotlightUp={action('onSpotlightUp')}
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										>
											Translucent
										</Button>
									</div>
									<div>
										<Button
											backgroundOpacity="transparent"
											onSpotlightDown={action('onSpotlightDown')}
											onSpotlightLeft={action('onSpotlightLeft')}
											onSpotlightRight={action('onSpotlightRight')}
											onSpotlightUp={action('onSpotlightUp')}
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
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
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										/>
										<Input
											onSpotlightDown={action('onSpotlightDown')}
											onSpotlightLeft={action('onSpotlightLeft')}
											onSpotlightRight={action('onSpotlightRight')}
											onSpotlightUp={action('onSpotlightUp')}
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										/>
									</div>
									<div>
										<Picker
											onSpotlightDown={action('onSpotlightDown')}
											onSpotlightLeft={action('onSpotlightLeft')}
											onSpotlightRight={action('onSpotlightRight')}
											onSpotlightUp={action('onSpotlightUp')}
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										>
											{Items}
										</Picker>
										<Picker
											joined
											onSpotlightDown={action('onSpotlightDown')}
											onSpotlightLeft={action('onSpotlightLeft')}
											onSpotlightRight={action('onSpotlightRight')}
											onSpotlightUp={action('onSpotlightUp')}
											spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										>
											{Items}
										</Picker>
									</div>
									<Slider
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									/>
									<Item
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									>
										Item
									</Item>
									<Item
										label="Label"
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									>
										Item with label
									</Item>
									<CheckboxItem
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									>
										CheckboxItem
									</CheckboxItem>
									<FormCheckboxItem
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									>
										FormCheckboxItem
									</FormCheckboxItem>
									<RadioItem
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
									>
										RadioItem
									</RadioItem>
									<SwitchItem
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
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
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										title="DatePicker"
									/>
									<TimePicker
										onSpotlightDown={action('onSpotlightDown')}
										onSpotlightLeft={action('onSpotlightLeft')}
										onSpotlightRight={action('onSpotlightRight')}
										onSpotlightUp={action('onSpotlightUp')}
										spotlightDisabled={boolean('Spottable spotlightDisabled', Container, false)}
										title="TimePicker"
									/>
								</Cell>
							</Column>
						</Cell>
					</Row>
				</Cell>
			</Column>
		)
	);
