import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import Scroller from '@enact/sandstone/Scroller';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/sandstone/TooltipDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, object, select, text} from '@enact/storybook-utils/addons/controls';
import Layout, {Cell, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component} from 'react';

import Section from './components/KitchenSinkSection';

const Config = mergeComponentMetadata('TooltipDecorator', TooltipDecorator, Tooltip, TooltipBase);

const prop = {
	tooltipPosition: {
		above: 'above',
		'above center': 'above center',
		'above left': 'above left',
		'above right': 'above right',
		below: 'below',
		'below center': 'below center',
		'below left': 'below left',
		'below right': 'below right',
		'left bottom': 'left bottom',
		'left middle': 'left middle',
		'left top': 'left top',
		'right bottom': 'right bottom',
		'right middle': 'right middle',
		'right top': 'right top'
	},
	tooltipType: ['balloon', 'transparent'],
	ariaObject: {
		'aria-hidden': false,
		'aria-label': 'Tooltip Label',
		role: 'alert'
	}
};

const inputData = {
	longText:
	'An extremely long Tooltip text to test marquee. It will very useful to test different types of Tooltip.',
	longerText:
	'An app development framework built atop React that’s easy to use, performant and customizable. The goal of Enact is to provide the building blocks for creating robust and maintainable applications.'
};

class TooltipTest extends Component {
	constructor (props) {
		super(props);

		this.state = {
			showButton: true
		};
	}

	handleClick = () => {
		this.setState({showButton: false});
	};

	render () {
		return (
			<div>
				Focus the button and click it before 5s has elapsed, and observe the console for errors
				{this.state.showButton ? (
					<Button
						onClick={this.handleClick}
						tooltipDelay={5000}
						tooltipText="Tooltip position!"
						tooltipRelative
					>
						Click me
					</Button>
				) : null}
			</div>
		);
	}
}

class ChangeableTooltip extends Component {
	constructor (props) {
		super(props);

		this.state = {
			text: 'short',
			position: {
				top: 0,
				left: 0
			}
		};
	}

	changeTooltipText = () => {
		const {text: stringText} = this.state;
		if (stringText === 'short') {
			this.setState({text: 'long text'});
		} else if (stringText === 'long text') {
			this.setState({text: 'very loooooooooooong text'});
		} else if (stringText === 'very loooooooooooong text') {
			this.setState({text: ''});
		} else {
			this.setState({text: 'short'});
		}
	};

	handleChangeLeft = ({value}) => {
		this.setState((prevState) => ({
			position: {
				...prevState.position,
				left: value
			}
		}));
	};

	handleChangeTop = ({value}) => {
		this.setState((prevState) => ({
			position: {
				...prevState.position,
				top: value
			}
		}));
	};

	render () {
		const {left, top} = this.state.position;
		const style = {
			position: 'absolute',
			width: ri.scaleToRem(780),
			left: '50%',
			transform: 'translateX(-50%)'
		};
		const args = this.props.args;

		return (
			<div>
				<div style={style}>
					<div>LEFT : </div>
					<Input
						id="left"
						size="small"
						type="number"
						onChange={this.handleChangeLeft}
						value={left}
					/>
					<div>TOP : </div>
					<Input id="top" size="small" type="number" onChange={this.handleChangeTop} value={top} />
					<Button onClick={this.changeTooltipText}>Change Text</Button>
				</div>
				<Button
					icon="list"
					tooltipPosition={args['tooltipPosition']}
					tooltipText={this.state.text}
					onClick={this.changeTooltipText}
					style={{
						position: 'absolute',
						left: parseInt(left || 0),
						top: parseInt(top || 0)
					}}
				/>
			</div>
		);
	}
}

const IconButtonItem = kind({
	name: 'IconButtonItem',
	render: ({...rest}) => {
		return (
			<div style={{height: 200, border: 'solid 6px yellow'}}>
				<Button icon="plus" size="small" tooltipText="tooltip" {...rest} />
				<Button
					icon="plus"
					style={{marginLeft: '450px'}}
					size="small"
					tooltipText="tooltip"
					{...rest}
				/>
			</div>
		);
	}
});

class TooltipFollow extends Component {
	constructor (props) {
		super(props);

		this.state = {
			left: 0,
			widthMinus: 360,
			widthPlus: 60
		};
	}

	handleWidthMinusClick = () => {
		this.setState((prevState) => {
			return {widthMinus: prevState.widthMinus - 60};
		});
	};

	handleWidthPlusClick = () => {
		this.setState((prevState) => {
			return {widthPlus: prevState.widthPlus + 60};
		});
	};

	handlePositionClick = () => {
		this.setState((prevState) => {
			return {left: prevState.left + 60};
		});
	};

	render = () => {
		return (
			<Layout orientation="vertical">
				<Cell shrink>
					<BodyText>Click icon buttons to resize or move</BodyText>
					<Button
						icon="minus"
						size="small"
						tooltipText="tooltip"
						onClick={this.handleWidthMinusClick}
						style={{width: `${this.state.widthMinus}px`}}
					/>
					<Button
						icon="plus"
						size="small"
						tooltipText="tooltip"
						onClick={this.handleWidthPlusClick}
						style={{width: `${this.state.widthPlus}px`}}
					/>
					<Button
						icon="plus"
						size="small"
						tooltipText="tooltip"
						onClick={this.handlePositionClick}
						style={{left: `${this.state.left}px`}}
					/>
				</Cell>
				<Cell component={Scroller}>
					<IconButtonItem tooltipPosition="above" />
					<IconButtonItem tooltipPosition="above center" />
					<IconButtonItem tooltipPosition="above left" />
					<IconButtonItem tooltipPosition="above right" />
					<IconButtonItem tooltipPosition="below" />
					<IconButtonItem tooltipPosition="below center" />
					<IconButtonItem tooltipPosition="below left" />
					<IconButtonItem tooltipPosition="below right" />
					<IconButtonItem tooltipPosition="left bottom" />
					<IconButtonItem tooltipPosition="left middle" />
					<IconButtonItem tooltipPosition="left top" />
					<IconButtonItem tooltipPosition="right bottom" />
					<IconButtonItem tooltipPosition="right middle" />
					<IconButtonItem tooltipPosition="right top" />
					<IconButtonItem />
				</Cell>
				<Cell shrink component={BodyText} centered>
					<em>This space left intentionally blank for bottom margin below scroller</em>
				</Cell>
			</Layout>
		);
	};
}

export default {
	title: 'Sandstone/Tooltip',
	component: 'Tooltip'
};

export const ThatShowsAfterButtonIsUnmountedEnyo3809 = () => <TooltipTest />;

ThatShowsAfterButtonIsUnmountedEnyo3809.storyName = 'that shows after Button is unmounted (ENYO-3809)';
ThatShowsAfterButtonIsUnmountedEnyo3809.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

ChangeableTooltip.propTypes = {
	args: PropTypes.object
};

export const TooltipDecoratorWithChangeableTooltipText = (args) => <ChangeableTooltip args={args} />;

select('tooltipPosition', TooltipDecoratorWithChangeableTooltipText, prop.tooltipPosition, Config, 'above');

TooltipDecoratorWithChangeableTooltipText.storyName = 'tooltipDecorator with changeable tooltipText';

export const TooltipToFollowComponentWhenChanged = () => <TooltipFollow />;

TooltipToFollowComponentWhenChanged.storyName = 'tooltip to follow component when changed';
TooltipToFollowComponentWhenChanged.parameters = {
	controls: {
		hideNoControlsWarning: true
	}
};

export const TooltipOverflows = (args) => {
	const buttonAlignment = args['button alignment'];
	const tooltipDelay = args['tooltipDelay'];
	const tooltipText = args['tooltipText'];
	const tooltipPosition = args['tooltipPosition'];
	const tooltipProps = args['tooltipProps'];
	const tooltipRelative = args['tooltipRelative'];
	const disabled = args['disabled'];
	return (
		<Layout
			orientation="vertical"
			align={buttonAlignment + ' space-between'}
			className="enact-fit"
			style={{
				position: 'fixed',
				padding: `${ri.unit(ri.scale(36), 'rem')} ${ri.unit(ri.scale(24), 'rem')}`
			}}
		>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Top Left
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Top
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Top Right
						</Button>
					</Cell>
				</Layout>
			</Cell>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Left
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Center
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Right
						</Button>
					</Cell>
				</Layout>
			</Cell>
			<Cell shrink>
				<Layout align="center space-between">
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Bottom Left
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Bottom
						</Button>
					</Cell>
					<Cell shrink>
						<Button
							disabled={disabled}
							tooltipDelay={tooltipDelay}
							tooltipText={tooltipText}
							tooltipPosition={tooltipPosition}
							tooltipProps={tooltipProps}
							tooltipRelative={tooltipRelative}
						>
							Bottom Right
						</Button>
					</Cell>
				</Layout>
			</Cell>
		</Layout>
	);
};

boolean('disabled', TooltipOverflows, Config);
select('button alignment', TooltipOverflows, {'': null, start: 'start', end: 'end'}, Config);
number('tooltipDelay', TooltipOverflows, Config, 500);
text('tooltipText', TooltipOverflows, Config, 'tooltip position!');
select('tooltipPosition', TooltipOverflows, prop.tooltipPosition, Config, 'above');
object('tooltipProps', TooltipOverflows, Config, prop.ariaObject);
boolean('tooltipRelative', TooltipOverflows, Config);

TooltipOverflows.storyName = 'tooltip overflows';

export const LongTooltipMarquees = (args) => {
	const disabled = args['disabled'];
	const tooltipText = args['tooltipText'];

	return (
		<Scroller>
			<Heading spacing="large" size="large">
				Default position of &apos;transparent&apos; Tooltip: &apos;below&apos; and
				&apos;centered&apos; under the activator, depending on the size of the viewport.
			</Heading>
			<Heading spacing="large" size="large" showLine>
				Default position of &apos;balloon&apos; Tooltip: &apos;above&apos; and to the
				&apos;right&apos; of the activator, depending on the size of the viewport.
			</Heading>

			<Heading spacing="large" size="large" />
			<Heading spacing="large" size="large" showLine>
				Without tooltipRelative
			</Heading>

			<Row wrap>
				<Section title="Transparent Tooltip" size="50%">
					<Button
						alt="Marquee checked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipMarquee
						tooltipText={tooltipText}
						tooltipType="transparent"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Balloon Tooltip" size="50%">
					<Button
						alt="Marquee checked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipMarquee
						tooltipText={tooltipText}
						tooltipType="balloon"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Transparent Tooltip" size="50%">
					<Button
						alt="Marquee unchecked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipText={tooltipText}
						tooltipType="transparent"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Balloon Tooltip" size="50%">
					<Button
						alt="Marquee unchecked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipText={tooltipText}
						tooltipType="balloon"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
			</Row>

			<Heading spacing="large" size="large" />
			<Heading spacing="large" size="large" showLine>
				With tooltipRelative
			</Heading>

			<Row wrap>
				<Section title="Transparent Tooltip" size="50%">
					<Button
						alt="Marquee checked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipMarquee
						tooltipRelative
						tooltipText={tooltipText}
						tooltipType="transparent"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Balloon Tooltip" size="50%">
					<Button
						alt="Marquee checked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipMarquee
						tooltipRelative
						tooltipText={tooltipText}
						tooltipType="balloon"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Transparent Tooltip" size="50%">
					<Button
						alt="Marquee unchecked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipRelative
						tooltipText={tooltipText}
						tooltipType="transparent"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Section title="Balloon Tooltip" size="50%">
					<Button
						alt="Marquee unchecked"
						disabled={disabled}
						tooltipDelay={500}
						tooltipRelative
						tooltipText={tooltipText}
						tooltipType="balloon"
						tooltipWidth={1000}
					>
						Click me
					</Button>
				</Section>
				<Heading spacing="large" size="large" showLine />
			</Row>
		</Scroller>
	);
};

boolean('disabled', LongTooltipMarquees, Config);
text('tooltipText', LongTooltipMarquees, Config, inputData.longerText);

LongTooltipMarquees.storyName = 'Long tooltip marquees';
