import kind from '@enact/core/kind';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/sandstone/Button';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import {Fragment} from 'react';

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
					backgroundColor: 'rgba(255, 180, 0, 0.3)',
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

export const WithDefaultHoldEvents = () => (
	<Button
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
		disabled={boolean('disabled', Button)}
	>
		Touchable
	</Button>
);

WithDefaultHoldEvents.storyName = 'with default hold events';

export const WithACustomLongpressEventAnd1SecondFrequency = () => (
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
		disabled={boolean('disabled', Button)}
	>
		LongPress
	</Button>
);

WithACustomLongpressEventAnd1SecondFrequency.storyName = 'with a custom longpress event and 1 second frequency';

export const ThatPausesTheHoldWhenMovingBeyondTolerance32Px = () => {
	const moveTolerance = number('holdConfig moveTolerance', Button, 32, {
		range: true,
		min: 16,
		max: 320,
		step: 16
	});
	const cancelOnMove = boolean('holdConfig cancelOnMove', Button, true) || false;
	return (
		<TouchArea
			holdConfig={{
				moveTolerance,
				cancelOnMove
			}}
			moveTolerance={moveTolerance}
			noResume={boolean('noResume', TouchArea, false)}
			onHold={action('onHold', {depth: 0})}
			onHoldEnd={action('onHoldEnd')}
			onHoldStart={action('onHoldStart')}
			disabled={boolean('disabled', TouchArea)}
			style={{
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'center',
				border: '4px dashed #888',
				width: ri.unit(ri.scale(480), 'rem'),
				height: ri.unit(ri.scale(480), 'rem')
			}}
		>
			Resumable
		</TouchArea>
	);
};

ThatPausesTheHoldWhenMovingBeyondTolerance32Px.storyName = 'that pauses the hold when moving beyond tolerance (32px)';

export const ThatDoesNotResumeWhenReEnteringComponent = () => (
	<Button
		noResume={boolean('noResume', Button, true)}
		onHold={action('onHold')}
		onHoldEnd={action('onHoldEnd')}
		onHoldStart={action('onHoldStart')}
		disabled={boolean('disabled', Button)}
	>
		Not Resumable
	</Button>
);

ThatDoesNotResumeWhenReEnteringComponent.storyName = 'that does not resume when re-entering component';

export const WithOnFlickHandler = () => (
	<TouchableDiv
		onFlick={action('onFlick')}
		disabled={boolean('disabled', TouchableDiv)}
		style={{
			border: '4px dashed #888',
			width: ri.unit(ri.scale(1000), 'rem'),
			height: ri.unit(ri.scale(1000), 'rem')
		}}
	>
		Flick within this component
	</TouchableDiv>
);

WithOnFlickHandler.storyName = 'with onFlick handler';

export const WithDragHandlers = () => (
	<TouchableDiv
		dragConfig={{
			global: boolean('dragConfig global', TouchableDiv, false) || false,
			moveTolerance: number('dragConfig moveTolerance', TouchableDiv, 32)
		}}
		noResume={boolean('noResume', TouchableDiv, false)}
		onDragStart={action('onDragStart')}
		onDrag={action('onDrag')}
		onDragEnd={action('onDragEnd')}
		disabled={boolean('disabled', TouchableDiv)}
		style={{
			border: '4px dashed #888',
			width: ri.unit(ri.scale(1000), 'rem'),
			height: ri.unit(ri.scale(1000), 'rem')
		}}
	>
		Drag within this component. Setting <code>noResume</code> to <code>false</code> should prevent
		drag from resuming when re-entering this component after leaving.
	</TouchableDiv>
);

WithDragHandlers.storyName = 'with drag handlers';

export const OnTapWhenClicked = () => (
	<TouchableDiv
		disabled={boolean('disabled', TouchableDiv)}
		noResume={boolean('noResume', TouchableDiv, false)}
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
