
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import Heading from '@enact/sandstone/Heading';
import Popup from '@enact/sandstone/Popup';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import FloatingLayer from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const ContextualPopupButton = ContextualPopupDecorator(Button);
const ContainerDiv = SpotlightContainerDecorator({restrict: 'self-only'}, 'div');

const DataWebosVoiceExclusive = () => {
	const [isPopup, setIsPopup] = useState(false);
	const [isAlert, setIsAlert] = useState(false);
	const [isContextualPopup, setIsContextualPopup] = useState(false);
	const [isCustomPopup, setIsCustomPopup] = useState(false);
	const [result, setResult] = useState('');

	const updateResult = (msg) => () => setResult(msg);

	const openPopup = (type) => () => {
		if (type === 'popup') {
			setIsPopup(true);
		} else if (type === 'alert') {
			setIsAlert(true);
		} else if (type === 'contextualPopup') {
			setIsContextualPopup(true);
		} else if (type === 'customizedPopup') {
			setIsCustomPopup(true);
		}
	};

	const closePopup = (type) => () => {
		if (type === 'popup') {
			setIsPopup(false);
		} else if (type === 'alert') {
			setIsAlert(false);
		} else if (type === 'contextualPopup') {
			setIsContextualPopup(false);
		} else if (type === 'customizedPopup') {
			setIsCustomPopup(false);
		}
	};

	const renderPopup = useCallback(({...rest}) => {
		return (
			<div data-testid="testContextualPopup" {...rest}>
				<div>This is ContextualPopup</div>
				<Button onClick={closePopup('contextualPopup')}>Close</Button>
			</div>
		);
	}, []);

	const customizedPopupOpenHandler = useCallback(() => {
		Spotlight.focus('customizedPopup');
	}, []);

	const customizedPopupCloseHandler = useCallback(() => {
		Spotlight.focus('customizedPopupActivator');
	}, []);

	return (
		<CommonView title="data-webos-voice-exclusive" subtitle={result}>
			<Heading>Button</Heading>
			<Button onClick={updateResult('Selected > Hello')}>Hello</Button>
			<Heading>Popup</Heading>
			<Button onClick={openPopup('popup')}>Popup</Button>
			<Popup data-testid="testPopup" open={isPopup}>
				<div>This is Popup</div>
				<Button onClick={closePopup('popup')}>Close</Button>
			</Popup>
			<Heading>Alert</Heading>
			<Button onClick={openPopup('alert')}>Alert</Button>
			<Alert data-testid="testAlert" open={isAlert}>
				<span>This is Alert</span>
				<buttons>
					<Button onClick={closePopup('alert')}>Close</Button>
				</buttons>
			</Alert>
			<Heading>ContextualPopup</Heading>
			<ContextualPopupButton
				open={isContextualPopup}
				popupComponent={renderPopup}
				onClick={openPopup('contextualPopup')}
				direction="right middle"
			>
				ContextualPopup
			</ContextualPopupButton>
			<Heading>CustomizedPopup</Heading>
			<Button spotlightId="customizedPopupActivator" onClick={openPopup('customizedPopup')}>Customized Popup</Button>
			<FloatingLayer
				data-testid="testCustomizedPopup"
				open={isCustomPopup}
				onOpen={customizedPopupOpenHandler}
				onClose={customizedPopupCloseHandler}
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
					<Button onClick={updateResult('Selected >  Bye')}>Bye</Button>
					<Button onClick={closePopup('customizedPopup')}>Close</Button>
				</ContainerDiv>
			</FloatingLayer>
		</CommonView>
	);

};

export default DataWebosVoiceExclusive;
