
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import ContexturePopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';
import React from 'react';

import CommonView from '../../components/CommonView';

const ContexturePopupButton = ContexturePopupDecorator(Button);
const ContainerDiv = SpotlightContainerDecorator({restrict: 'self-only'}, 'div');


class DataWebosVoiceExclusive extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isPopup: false,
			isDialog: false,
			isAlert: false,
			isContexturePopup: false,
			isCustomPopup: false,
			result: ''
		};
	}

	updateResult = (msg) => () => {
		this.setState({result: msg});
	};

	openPopup = (type) => () => {
		if (type === 'popup') {
			this.setState({isPopup: true});
		} else if (type === 'dialog') {
			this.setState({isDialog: true});
		} else if (type === 'alert') {
			this.setState({isAlert: true});
		} else if (type === 'contexturePopup') {
			this.setState({isContexturePopup: true});
		} else if (type === 'customizedPopup') {
			this.setState({isCustomPopup: true});
		}
	};

	closePopup = (type) => () => {
		if (type === 'popup') {
			this.setState({isPopup: false});
		} else if (type === 'dialog') {
			this.setState({isDialog: false});
		} else if (type === 'alert') {
			this.setState({isAlert: false});
		} else if (type === 'contexturePopup') {
			this.setState({isContexturePopup: false});
		} else if (type === 'customizedPopup') {
			this.setState({isCustomPopup: false});
		}
	};

	renderPopup = ({...rest}) => {
		return (
			<div {...rest}>
				<div>This is ContexturePopup</div>
				<Button onClick={this.closePopup('contexturePopup')}>Close</Button>
			</div>
		);
	};

	customizedPopupOpenHandler = () => {
		Spotlight.focus('customizedPopup');
	};

	customizedPopupCloseHandler = () => {
		Spotlight.focus('customizedPopupActivator');
	};

	render () {
		return (
			<CommonView title="data-webos-voice-exclusive" subtitle={this.state.result}>
				<Heading>Button</Heading>
				<Button onClick={this.updateResult('Hello is clicked')}>Hello</Button>
				<Heading>Popup</Heading>
				<Button onClick={this.openPopup('popup')}>Popup</Button>
				<Popup open={this.state.isPopup}>
					<div>This is Popup</div>
					<Button onClick={this.closePopup('popup')}>Close</Button>
				</Popup>
				<Heading>Alert</Heading>
				<Button onClick={this.openPopup('alert')}>Alert</Button>
				<Alert open={this.state.isAlert}>
					<span>This is Alert</span>
					<buttons>
						<Button onClick={this.closePopup('alert')}>Close</Button>
					</buttons>
				</Alert>
				<Heading>ContexturePopup</Heading>
				<ContexturePopupButton
					open={this.state.isContexturePopup}
					popupComponent={this.renderPopup}
					onClick={this.openPopup('contexturePopup')}
					direction="right middle"
				>
					CotextualPopup
				</ContexturePopupButton>
				<Heading>CustomizedPopup</Heading>
				<Button spotlightId="customizedPopupActivator" onClick={this.openPopup('customizedPopup')}>Customized Popup</Button>
				<FloatingLayer
					open={this.state.isCustomPopup}
					onOpen={this.customizedPopupOpenHandler}
					onClose={this.customizedPopupCloseHandler}
					scrimType="translucent"
				>
					<ContainerDiv
						spotlightId="customizedPopup"
						style={{
							backgroundColor: '#CCE5FF',
							width: ri.scale(1600),
							height: ri.scale(1200),
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						data-webos-voice-exclusive
					>
						<Button onClick={this.updateResult('Bye is clicked')}>Bye</Button>
						<Button onClick={this.closePopup('customizedPopup')}>Close</Button>
					</ContainerDiv>
				</FloatingLayer>
			</CommonView>
		);
	}
}

export default DataWebosVoiceExclusive;
