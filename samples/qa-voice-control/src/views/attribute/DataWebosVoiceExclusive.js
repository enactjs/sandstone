/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import Alert from '@enact/sandstone/Alert';
import ContexturePopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spotlight from '@enact/spotlight';

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

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => {
			this.setState({result: ''});
		}, 1500);
	};

	openPopup = (type) => {
		if (type === 'popup') {
			this.setState({isPopup: true});
		} else if (type === 'dialog') {
			this.setState({isDialog: true});
		} else if (type === 'alert') {
			this.setState({isAlert: true});
		} else if (type === 'contexturePopup') {
			this.setState({isContexturePopup: true});
		} else if (type === 'customPopup') {
			this.setState({isCustomPopup: true});
		}
	};

	closePopup = (type) => {
		if (type === 'popup') {
			this.setState({isPopup: false});
		} else if (type === 'dialog') {
			this.setState({isDialog: false});
		} else if (type === 'alert') {
			this.setState({isAlert: false});
		} else if (type === 'contexturePopup') {
			this.setState({isContexturePopup: false});
		} else if (type === 'customPopup') {
			this.setState({isCustomPopup: false});
		}
	};

	renderPopup = ({...rest}) => {
		return (
			<div {...rest} style={{width: '400px', height: '400px'}}>
				<div>ContexturePopup</div>
				<Button onClick={() => this.closePopup('contexturePopup')}>close</Button>
			</div>
		);
	};

	customPopupOpenHandler = () => {
		Spotlight.focus('customPopup');
	};

	customPopupCloseHandler = () => {
		Spotlight.focus('customPopupActivator');
	};

	render () {
		return (
			<Panel>
				<Header title="voice-exclusive" subtitle={this.state.result} />
				<Button small onClick={() => this.showResult('필터 is clicked')}>필터</Button>
				<Heading>Popup</Heading>
				<Button small onClick={() => this.openPopup('popup')}>마음의 소리</Button>
				<Popup open={this.state.isPopup} showCloseButton>
					<div>popup</div>
					<Button onClick={() => this.closePopup('popup')}>닫기</Button>
				</Popup>
				<Heading>Alert</Heading>
				<Button small onClick={() => this.openPopup('alert')}>알림</Button>
				<Alert open={this.state.isAlert} showCloseButton>
					<span>alert</span>
					<buttons>
						<Button onClick={() => this.closePopup('alert')}>close</Button>
					</buttons>
				</Alert>
				<Heading>ContexturePopup</Heading>
				<ContexturePopupButton
					small
					open={this.state.isContexturePopup}
					popupComponent={this.renderPopup}
					onClick={() => this.openPopup('contexturePopup')}
					direction="right"
					showCloseButton
				>
					고양이
				</ContexturePopupButton>
				<Heading>CustomPopup</Heading>
				<Button spotlightId="customPopupActivator" small onClick={() => this.openPopup('customPopup')}>커스텀팝업</Button>
				<FloatingLayer
					open={this.state.isCustomPopup}
					onOpen={this.customPopupOpenHandler}
					onClose={this.customPopupCloseHandler}
					scrimType="none"
				>
					<ContainerDiv
						spotlightId="customPopup"
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
						<Button onClick={() => this.showResult('연어 is clicked')}>연어</Button>
						<Button onClick={() => this.closePopup('customPopup')}>닫기</Button>
					</ContainerDiv>
				</FloatingLayer>
			</Panel>
		);
	}
}

export default DataWebosVoiceExclusive;
