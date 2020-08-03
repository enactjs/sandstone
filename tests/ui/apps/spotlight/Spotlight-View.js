import Item from '../../../../Item';
import ThemeDecorator from '../../../../ThemeDecorator';
import Button from '../../../../Button';
import React from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
const style = {
	container: {
		width: '300px',
		border: '1px dashed red',
		margin: '0 12px',
		padding: '12px'
	},
	fittedContainer: {
		border: '1px dashed blue',
		margin: '0 12px',
		padding: '12px'
	},
	flexBox: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	flexItem: {
		flex: '1'
	}
};

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

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
	};

	restoreButton = () => {
		this.setState({showButton: true});
	};

	resetFocus = () => {
		spotlight.focus('[data-component-id="restoreButton"]');
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
				<Container style={style.container}>
					{this.state.showButton ? (
						<Button
							id="focusButton"
							onFocus={this.startTimer}
							onSpotlightDisappear={this.resetFocus}
						>
							Focus me
						</Button>
					) : null}
					<Button
						id="restoreButton"
						data-component-id="restoreButton"
						onClick={this.restoreButton}
					>
						Restore Button
					</Button>
				</Container>
			</div>
		);
	}
}

const app = (props) => <div {...props}>
	<div style={style.flexBox}>
		<Container style={style.container}>
			<Item id="item1" className="spottable-default">1</Item>
			<Item id="item2">2</Item>
			<Item id="item3">3</Item>
			<div id="itemns1">Non-spottable content 1</div>
			<div id="itemns2">Non-spottable content 2</div>
			<div id="itemns3">Non-spottable content 3</div>
		</Container>
		<Container style={style.container}>
			<div id="itemnsA">Non-spottable content A</div>
			<div id="itemnsB">Non-spottable content B</div>
			<div id="itemnsC">Non-spottable content C</div>
			<Item id="itemA">A</Item>
			<Item id="itemB">B</Item>
			<Item id="itemC">C</Item>
		</Container>
		<div style={style.flexBox}>
			<Container style={style.fittedContainer} >
				<Item id="itemParent">Item in a container</Item>
				<Container style={style.fittedContainer} >
					<Item id="itemChild">Item in a nested container</Item>
				</Container>
			</Container>
		</div>
		<div style={style.flexBox}>
			<DisappearTest />
		</div>
	</div>
</div>;

export default ThemeDecorator(app);

