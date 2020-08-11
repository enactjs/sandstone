
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import ContexturePopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import React from 'react';

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
		setTimeout(() => {
			this.setState({result: ''});
		}, 1500);
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
			<div {...rest} style={{width: '400px', height: '400px'}}>
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
			<>
				<Header title="voice-exclusive" subtitle={this.state.result} />
				<Button onClick={this.updateResult('필터 is clicked')}>필터</Button>
				<Heading>Popup</Heading>
				<Button onClick={this.openPopup('popup')}>마음의 소리</Button>
				<Popup open={this.state.isPopup}>
					<div>This is Popup</div>
					<Button onClick={this.closePopup('popup')}>닫기</Button>
				</Popup>
				<Heading>Alert</Heading>
				<Button onClick={this.openPopup('alert')}>알림</Button>
				<Alert open={this.state.isAlert}>
					<span>This is Alert</span>
					<buttons>
						<Button onClick={this.closePopup('alert')}>close</Button>
					</buttons>
				</Alert>
				<Heading>ContexturePopup</Heading>
				<ContexturePopupButton
					open={this.state.isContexturePopup}
					popupComponent={this.renderPopup}
					onClick={this.openPopup('contexturePopup')}
					direction="right middle"
				>
					고양이
				</ContexturePopupButton>
				<Heading>CustomPopup</Heading>
				<Button spotlightId="customizedPopupActivator" onClick={this.openPopup('customizedPopup')}>Customized Popup</Button>
				<FloatingLayer
					open={this.state.isCustomPopup}
					onOpen={this.customizedPopupOpenHandler}
					onClose={this.customizedPopupCloseHandler}
					scrimType="none"
				>
					<ContainerDiv
						spotlightId="customizedPopup"
						style={{
							backgroundColor: '#CCE5FF',
							width: '600px',
							height: '400px',
							position: 'absolute',
							left: window.innerWidth / 2 - 300,
							top: window.innerHeight / 2 - 200,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						data-webos-voice-exclusive
					>
						<Button onClick={this.updateResult('연어 is clicked')}>연어</Button>
						<Button onClick={this.closePopup('customizedPopup')}>닫기</Button>
					</ContainerDiv>
				</FloatingLayer>
			</>
		);
	}
}

export default DataWebosVoiceExclusive;
