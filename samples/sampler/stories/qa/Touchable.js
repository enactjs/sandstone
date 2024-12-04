import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, range} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import {Fragment} from 'react';
import {useState, useCallback} from 'react';

const TouchableDiv = Touchable('div');

const onInteractionEnd = () => {
	const el = document.getElementById('touchRadius');
	el.style.display = 'none';
};
const onHoldEnd = (ev) => {
	onInteractionEnd(ev);
	return action('onHoldEnd')(ev);
};

const TouchArea = kind({
	name: 'TouchArea',

	propTypes: {
		moveTolerance: PropTypes.number
	},

	handlers: {
		onInteractionStart: (ev, {moveTolerance}) => {
			const el = document.getElementById('touchRadius');
			const x = ev.clientX || (ev.touches && ev.touches[0].clientX);
			const y = ev.clientY || (ev.touches && ev.touches[0].clientY);

			el.style.display = 'block';
			el.style.left = `${x - moveTolerance}px`;
			el.style.top = `${y - moveTolerance}px`;
			return false;
		}
	},

	render: ({children, moveTolerance, onInteractionStart, ...rest}) => (
		<Fragment>
			<TouchableDiv
				{...rest}
				onHoldEnd={onHoldEnd}
				onMouseDown={onInteractionStart}
				onMouseUp={onInteractionEnd}
				onTouchStart={onInteractionStart}
				onTouchEnd={onInteractionEnd}
			>
				{children}
			</TouchableDiv>
			<div
				id="touchRadius"
				style={{
					display: 'none',
					position: 'fixed',
					height: moveTolerance * 2 + 'px',
					width: moveTolerance * 2 + 'px',
					borderRadius: '999px',
					border: '1px solid orange',
					backgroundColor: 'rgb(255, 180, 0, 0.3)',
					pointerEvents: 'none',
					touchAction: 'none'
				}}
			/>
		</Fragment>
	)
});

export default {
	title: 'Sandstone/Touchable',
	component: 'Touchable'
};

export const WithDefaultHoldEvents = (args) => (
	<Button
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
		disabled={args['disabled']}
	>
		Touchable
	</Button>
);

boolean('disabled', WithDefaultHoldEvents, Button);

WithDefaultHoldEvents.storyName = 'with default hold events';

export const WithACustomLongpressEventAnd1SecondFrequency = (args) => (
	<Button
		holdConfig={{
			events: [
				{name: 'hold', time: 1000},
				{name: 'longpress', time: 2000}
			],
			frequency: 1000
		}}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
		disabled={args['disabled']}
	>
		LongPress
	</Button>
);

boolean('disabled', WithACustomLongpressEventAnd1SecondFrequency, Button);

WithACustomLongpressEventAnd1SecondFrequency.storyName = 'with a custom longpress event and 1 second frequency';

export const ThatPausesTheHoldWhenMovingBeyondTolerance32Px = (args) => {
	const moveTolerance = args['holdConfig moveTolerance'];
	const cancelOnMove = args['holdConfig cancelOnMove'] || false;
	return (
		<TouchArea
			holdConfig={{
				moveTolerance,
				cancelOnMove
			}}
			moveTolerance={moveTolerance}
			noResume={args['noResume']}
			onHold={action('onHold', {depth: 0})}
			onHoldEnd={action('onHoldEnd')}
			onHoldStart={action('onHoldStart')}
			disabled={args['disabled']}
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'center',
				border: '4px dashed #888',
				width: ri.scaleToRem(480),
				height: ri.scaleToRem(480)
			}}
		>
			Resumable
		</TouchArea>
	);
};

range('holdConfig moveTolerance', ThatPausesTheHoldWhenMovingBeyondTolerance32Px, Button, 32, {min: 16,	max: 320,	step: 16});
boolean('holdConfig cancelOnMove', ThatPausesTheHoldWhenMovingBeyondTolerance32Px, Button, true);
boolean('noResume', ThatPausesTheHoldWhenMovingBeyondTolerance32Px, TouchArea, false);
boolean('disabled', ThatPausesTheHoldWhenMovingBeyondTolerance32Px, TouchArea);

ThatPausesTheHoldWhenMovingBeyondTolerance32Px.storyName = 'that pauses the hold when moving beyond tolerance (32px)';

export const ThatDoesNotResumeWhenReEnteringComponent = (args) => (
	<Button
		noResume={args['noResume']}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
		disabled={args['disabled']}
	>
		Not Resumable
	</Button>
);

boolean('noResume', ThatDoesNotResumeWhenReEnteringComponent, Button, true);
boolean('disabled', ThatDoesNotResumeWhenReEnteringComponent, Button);

ThatDoesNotResumeWhenReEnteringComponent.storyName = 'that does not resume when re-entering component';

export const WithOnFlickHandler = (args) => (
	<TouchableDiv
		onFlick={action('onFlick')}
		disabled={args['disabled']}
		style={{
			border: '4px dashed #888',
			width: ri.scaleToRem(1000),
			height: ri.scaleToRem(1000)
		}}
	>
		Flick within this component
	</TouchableDiv>
);

boolean('disabled', WithOnFlickHandler, TouchableDiv);

WithOnFlickHandler.storyName = 'with onFlick handler';

export const WithDragHandlers = (args) => (
	<TouchableDiv
		dragConfig={{
			global: args['dragConfig global'] || false,
			moveTolerance: args['dragConfig moveTolerance']
		}}
		noResume={args['noResume']}
		onDragStart={action('onDragStart')}
		onDrag={action('onDrag')}
		onDragEnd={action('onDragEnd')}
		disabled={args['disabled']}
		style={{
			border: '4px dashed #888',
			width: ri.scaleToRem(1000),
			height: ri.scaleToRem(1000)
		}}
	>
		Drag within this component. Setting <code>noResume</code> to <code>false</code> should prevent
		drag from resuming when re-entering this component after leaving.
	</TouchableDiv>
);

boolean('dragConfig global', WithDragHandlers, TouchableDiv, false);
number('dragConfig moveTolerance', WithDragHandlers, TouchableDiv, 32);
boolean('noResume', WithDragHandlers, TouchableDiv, false);
boolean('disabled', WithDragHandlers, TouchableDiv);

WithDragHandlers.storyName = 'with drag handlers';

export const WithPinchHandlers = (args) => {
	const [scale, setScale] = useState(1.0);

	const handlePinch = useCallback((ev) => {
		action('onPinch')(ev);
		setScale(ev.scale);
	}, []);

	return (
		<TouchableDiv
			pinchConfig={{
				global: args['pinchConfig global'] || false,
				maxScale: args['pinchConfig maxScale'],
				minScale: args['pinchConfig minScale'],
				moveTolerance: args['pinchConfig moveTolerance']
			}}
			onPinchStart={action('onPinchStart')}
			onPinch={handlePinch}
			onPinchEnd={action('onPinchEnd')}
			style={{
				border: '4px dashed #888',
				margin: ri.scaleToRem(300),
				width: ri.scaleToRem(1000),
				height: ri.scaleToRem(1000),
				transform: `scale(${scale})`
			}}
		>
			Pinch within this component.
		</TouchableDiv>
	);
};

boolean('pinchConfig global', WithPinchHandlers, TouchableDiv, false);
number('pinchConfig maxScale', WithPinchHandlers, TouchableDiv, 4);
number('pinchConfig minScale', WithPinchHandlers, TouchableDiv, 0.5);
number('pinchConfig moveTolerance', WithPinchHandlers, TouchableDiv, 16);

WithPinchHandlers.storyName = 'with onPinch handlers';

export const OnTapWhenClicked = (args) => (
	<TouchableDiv
		disabled={args['disabled']}
		noResume={args['noResume']}
		onClick={action('onClick')}
		onDown={action('onDown')}
		onMouseDown={action('onMouseDown')}
		onMouseUp={action('onMouseUp')}
		onTap={action('onTap')}
		onTouchEnd={action('onTouchEnd')}
		onTouchStart={action('onTouchStart')}
		onUp={action('onUp')}
		style={{border: '4px dashed #888', textAlign: 'center'}}
	>
		Click here
	</TouchableDiv>
);

boolean('disabled', OnTapWhenClicked, TouchableDiv);
boolean('noResume', OnTapWhenClicked, TouchableDiv, false);

OnTapWhenClicked.storyName = 'onTap when clicked';

export const WithOnClickHandler = () => (
	<TouchableDiv
		disabled={boolean('disabled', TouchableDiv)}
		onClick={action('onClick')}
		onDown={action('onDown')}
		onMouseDown={action('onMouseDown')}
		onMouseUp={action('onMouseUp')}
		onTouchEnd={action('onTouchEnd')}
		onTouchStart={action('onTouchStart')}
		onUp={action('onUp')}
		style={{border: '4px dashed #888', textAlign: 'center'}}
	>
		Click here
	</TouchableDiv>
);

WithOnClickHandler.storyName = 'with onClick handler';
