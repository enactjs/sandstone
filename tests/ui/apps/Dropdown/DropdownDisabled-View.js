import Button from '../../../../Button';
import Dropdown from '../../../../Dropdown';
import Scroller from '../../../../Scroller';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
// import {scaleToRem} from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const Container = SpotlightContainerDecorator('div');
const items = (itemCount, optionText = 'Option') => (new Array(itemCount)).fill().map((i, index) => `${optionText} ${index + 1}`);

// <Button id="disabledButton" onClick={onToggleOpen}>Disable/Enable Dropdown</Button>
const app = (props) => (
	<div {...props}>
		<Container>
			<Button id="buttonDisable" size="small">Disable Dropdown</Button>
			<Button id="buttonEnable" size="small">Enable Dropdown</Button>
		</Container>
		<br />
		<Scroller id="scroller">
			<Dropdown title="Dropdown 1" id="dropdown1">
				{items(5)}
			</Dropdown>
		</Scroller>
	</div>

);
export default ThemeDecorator(app);
