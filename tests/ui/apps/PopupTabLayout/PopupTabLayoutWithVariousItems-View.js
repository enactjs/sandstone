import {add, is} from '@enact/core/keymap';
import spotlight from '@enact/spotlight';
import {Cell} from '@enact/ui/Layout'
import {useCallback, useState} from 'react';

import {Header} from '../../../../Panels'
import PopupTabLayout, {Tab, TabPanel, TabPanels} from '../../../../PopupTabLayout';
import ThemeDecorator from '../../../../ThemeDecorator';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';
import Button from "../../../../Button";
import Item from "../../../../Item";
import Icon from "../../../../Icon";
import Slider from "../../../../Slider";
import Dropdown from "../../../../Dropdown";
import Scroller from "../../../../Scroller";
import Input, {InputField} from "../../../../Input";
import Popup from "../../../../Popup";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

add('cancel', 27);
const isCancel = is('cancel');
const isRight = is('right');

const navPrev = (callback, value) => () => {
	const index = Math.max(value - 1, 0);
	callback(index);
};
const navNext = (callback, value) => () => {
	const index = Math.min(value + 1, 1);
	callback(index);
};

function App() {
	const [popupOpen, setPopupOpenState] = useState(false);
	const [indexDisplay, setIndexDisplay] = useState(0);
	const [indexSound, setIndexSound] = useState(0);

	const handleDisplayNext = navNext(setIndexDisplay, indexDisplay);
	const handleDisplayPrev = navPrev(setIndexDisplay, indexDisplay);
	const handleSoundNext = navNext(setIndexSound, indexSound);
	const handleSoundPrev = navPrev(setIndexSound, indexSound);

	const handleOpenPopup = useCallback(() => {
		setPopupOpenState(true);
	}, [setPopupOpenState]);
	const handleClosePopup = useCallback(() => {
		setPopupOpenState(false);
	}, [setPopupOpenState]);

	const handleKeyUpOnPopup = useCallback((ev) => {
		if ((isCancel(ev.keyCode)) && popupOpen) {
			setPopupOpenState(false);
			ev.preventDefault();
			ev.stopPropagation();
		}
	}, [popupOpen, setPopupOpenState]);

	// Navigate menus with the right key. The left key is handled by framework.
	const handleKeyDown = (setState, state) => (ev) => {
		const {keyCode} = ev;

		if (isRight(keyCode) && ev.target && !ev.target.hasAttribute('disabled')) {
			navNext(setState, state)();
		}
	};

	return (
		<PopupTabLayout id="tabLayout" open>
			<Tab icon="picture" title="Display">
				<TabPanels id="display" index={indexDisplay} onBack={handleDisplayPrev}>
					<TabPanel>
						<Header title="Display Settings" type="compact" />
						<Cell>
							<span>This is the first panel.</span>
							<Button id="button1" size="small" disabled onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Button1</Button>
							<br/>
							<br/>
							<Button id="button2" size="small">Button2</Button>
							<Button size="small" onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)}>Button3</Button>
							<br/>
							<br/>
							<Item id="colorAdjust" onClick={handleDisplayNext} onKeyDown={handleKeyDown(setIndexDisplay, indexDisplay)} slotAfter={<Icon>arrowlargeright</Icon>}>Color Adjust</Item>
							<Slider/>
							<br/>
							<Button id="button4" size="small" disabled>Button4</Button>
							<Dropdown id="dropdown" width={100} style={{margin: 0}} title="A dropdown">
								{['a', 'b', 'c', 'd', 'e', 'f']}
							</Dropdown>
							<br/>
							<br/>
						</Cell>
					</TabPanel>
					<TabPanel>
						<Header title="Color Adjust" type="compact" slotAfter={<Button iconOnly icon="help" />} />
						<Cell>
							<span>This is the second panel.</span>
							<Button id="button1" size="small" disabled>Button1</Button>
							<Dropdown id="dropdown" width={100} style={{margin: 0}} title="A dropdown">
								{['a', 'b', 'c', 'd', 'e', 'f']}
							</Dropdown>
							<br />
							<br />
							<Button id="button2" size="small" disabled>Button2</Button>
							<Button id="button3" size="small">Button3</Button>
							<br />
							<br />
							<Button id="sliderButton" size="small">Slider</Button><Slider style={{display: 'inline-block', width: '30%'}} />
							<br />
							<br />
						</Cell>
					</TabPanel>
				</TabPanels>
			</Tab>
			<Tab icon="sound" title="Sound">
				<TabPanels id="sound" index={indexSound} onBack={handleSoundPrev}>
					<TabPanel>
						<Header title="Sound Settings" type="compact" />
						<Scroller>
							<Item id="advancedAudio" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Advanced Audio</Item>
							<Item id="volume" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Volume</Item>
							<Item id="selectMode" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Select Mode</Item>
							<Item id="soundOut" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Sound Out</Item>
							<Item id="balance" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Balance</Item>
							<Item id="equalizer" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Equalizer</Item>
							<Item id="applyToAllInputs" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Apply to All inputs</Item>
							<Item id="reset" onClick={handleSoundNext} onKeyDown={handleKeyDown(setIndexSound, indexSound)} slotAfter={<Icon>arrowsmallright</Icon>}>Reset</Item>
						</Scroller>
					</TabPanel>
					<TabPanel>
						<Header title="Advanced Audio" type="compact" />
						<Item id="balance">Balance</Item>
						<InputField id="inputField" defaultValue="value" />
						<Input id="input" size="small" value="Input" noBackButton />
						<Button id="popupButton" onClick={handleOpenPopup} size="small" >Open</Button>
						<Popup id="popup" open={popupOpen} onKeyUp={handleKeyUpOnPopup}>
							<Button id="closeButton" onClick={handleClosePopup}>Close</Button>
							<Button id="dummyButton">Dummy</Button>
						</Popup>
					</TabPanel>
				</TabPanels>
			</Tab>
		</PopupTabLayout>
	);
}

export default UrlPropsDecorator(ThemeDecorator(App));
