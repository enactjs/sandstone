import {select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import Button from '@enact/sandstone/Button';
import {ContextualPopupDecorator} from '@enact/sandstone/ContextualPopupDecorator';
import Heading from '@enact/sandstone/Heading';
import Slider from '@enact/sandstone/Slider';
import ri from '@enact/ui/resolution';
import {Component} from 'react';

const ContextualButton = ContextualPopupDecorator(Button);
const Config = mergeComponentMetadata('ContextualButton', ContextualButton);
ContextualButton.displayName = 'ContextualButton';

const buttonMargin = () => ({margin: ri.scaleToRem(24)});
const sliderMargin = () => ({margin: ri.scaleToRem(30)});

const renderPopup = () => (
	<div>
		<Button style={buttonMargin()}>First Button</Button>
		<Button style={buttonMargin()}>Second Button</Button>
	</div>
);

const renderWidePopup = () => (
	<div style={{width: ri.scaleToRem(1002)}}>This is a wide popup</div>
);

const renderTallPopup = () => (
	<div style={{height: ri.scaleToRem(402)}}>This is a tall popup</div>
);

const renderSuperTallPopup = () => (
	<div style={{height: ri.scaleToRem(1140)}}>
		This is a super tall popup. Note: this popup does not overflow in full screen mode.
	</div>
);

const renderPopupWithSlider = () => (
	<div style={{textAlign: 'center', minWidth: ri.scaleToRem(600), height: ri.scaleToRem(120), padding: `${ri.scaleToRem(60)} ${ri.scaleToRem(30)} 0 ${ri.scaleToRem(30)}`}}>
		<Slider
			backgroundProgress={0}
			disabled={false}
			max={100}
			min={0}
			step={1}
			style={sliderMargin()}
			tooltip
		/>
	</div>
);

const renderButtonWithTooltip = () => (
	<div style={{textAlign: 'center'}}>
		<Button
			size="large"
			tooltipPosition="below center"
			tooltipText="Longer tooltip"
		>Tooltip button</Button>
	</div>
);

class ContextualPopupWithActivator extends Component {
	constructor (props) {
		super(props);

		this.state = {open: false};
	}

	handleOpenToggle = () => {
		this.setState(({open}) => ({open: !open}));
	};

	render () {
		return (
			<ContextualButton
				{...this.props}
				onClose={this.handleOpenToggle}
				onClick={this.handleOpenToggle}
				open={this.state.open}
			/>
		);
	}
}

export default {
	title: 'Sandstone/ContextualPopupDecorator',
	component: 'ContextualPopupDecorator'
};

export const With5WaySelectableActivator = (args) => (
	<div style={{textAlign: 'center', marginTop: ri.scaleToRem(260)}}>
		<ContextualPopupWithActivator
			direction={args['direction']}
			popupComponent={renderPopup}
			spotlightRestrict={args['spotlightRestrict']}
		>
			Hello Contextual Button
		</ContextualPopupWithActivator>
	</div>
);

select(
	'direction',
	With5WaySelectableActivator,
	[
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left middle',
		'left top',
		'left bottom',
		'right middle',
		'right top',
		'right bottom'
	],
	Config,
	'below'
);
select(
	'spotlightRestrict',
	With5WaySelectableActivator,
	['none', 'self-first', 'self-only'],
	Config,
	'self-only'
);

With5WaySelectableActivator.storyName = 'with 5-way selectable activator';

export const WithOverflows = () => (
	<div style={{position: 'relative', width: '100%', height: '100%'}}>
		<Heading showLine>direction Up</Heading>
		<div
			style={{display: 'flex', justifyContent: 'space-between', marginBottom: ri.scaleToRem(24)}}
		>
			<ContextualPopupWithActivator direction="above" popupComponent={renderWidePopup}>
				Overflows Left
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator direction="above" popupComponent={renderTallPopup}>
				Overflows Top
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator direction="above" popupComponent={renderWidePopup}>
				Overflows Right
			</ContextualPopupWithActivator>
		</div>
		<div style={{display: 'flex'}}>
			<Heading showLine style={{flexGrow: '1'}}>
				direction left{' '}
			</Heading>
			<Heading showLine style={{flexGrow: '1'}}>
				direction right
			</Heading>
		</div>
		<div style={{display: 'flex', marginBottom: ri.scaleToRem(48)}}>
			<div style={{flexGrow: '1', display: 'flex', justifyContent: 'space-between'}}>
				<ContextualPopupWithActivator direction="left middle" popupComponent={renderWidePopup}>
					Overflows Left
				</ContextualPopupWithActivator>
				<ContextualPopupWithActivator direction="left middle" popupComponent={renderSuperTallPopup}>
					Overflows Top
				</ContextualPopupWithActivator>
			</div>
			<div style={{flexGrow: '1', display: 'flex', justifyContent: 'space-between'}}>
				<ContextualPopupWithActivator
					direction="right middle"
					popupComponent={renderSuperTallPopup}
				>
					Overflows Top
				</ContextualPopupWithActivator>
				<ContextualPopupWithActivator direction="right middle" popupComponent={renderWidePopup}>
					Overflows Right
				</ContextualPopupWithActivator>
			</div>
		</div>
		<div style={{display: 'flex', justifyContent: 'center', marginBottom: ri.scaleToRem(48)}}>
			<ContextualPopupWithActivator direction="left middle" popupComponent={renderSuperTallPopup}>
				Overflows Bottom
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator direction="right middle" popupComponent={renderSuperTallPopup}>
				Overflows Bottom
			</ContextualPopupWithActivator>
		</div>
		<Heading showLine>direction down</Heading>
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<ContextualPopupWithActivator direction="below" popupComponent={renderWidePopup}>
				Overflows Left
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator direction="below" popupComponent={renderTallPopup}>
				Overflows Bottom
			</ContextualPopupWithActivator>
			<ContextualPopupWithActivator direction="below" popupComponent={renderWidePopup}>
				Overflows Right
			</ContextualPopupWithActivator>
		</div>
	</div>
);

WithOverflows.storyName = 'with overflows';
WithOverflows.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithButtonTooltip = () => (
	<div style={{textAlign: 'center', marginTop: ri.scaleToRem(260)}}>
		<ContextualPopupWithActivator
			direction="above"
			popupComponent={renderButtonWithTooltip}
			spotlightRestrict="self-only"
		>
			Contextual Button
		</ContextualPopupWithActivator>
	</div>
);

WithButtonTooltip.storyName = 'with button tooltip';
WithButtonTooltip.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const WithSliderTooltip = (args) => (
	<div style={{textAlign: 'center', marginTop: ri.scaleToRem(260)}}>
		<ContextualPopupWithActivator
			direction={args['direction']}
			popupComponent={renderPopupWithSlider}
			spotlightRestrict={args['spotlightRestrict']}
		>
			Hello Contextual Slider
		</ContextualPopupWithActivator>
	</div>
);

select(
	'direction',
	WithSliderTooltip,
	[
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left middle',
		'left top',
		'left bottom',
		'right middle',
		'right top',
		'right bottom'
	],
	Config,
	'below center'
);
select(
	'spotlightRestrict',
	WithSliderTooltip,
	['none', 'self-first', 'self-only'],
	Config,
	'self-only'
);

WithSliderTooltip.storyName = 'with Slider Tooltip';
