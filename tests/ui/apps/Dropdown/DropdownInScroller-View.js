import Dropdown from '../../../../Dropdown';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = (itemCount, optionText = 'Option') => (new Array(itemCount)).fill().map((i, index) => `${optionText} ${index + 1}`);

window.__log = [];

const app = (props) => (
	<div {...props}>
		<Scroller style={{height: scaleToRem(250)}} id="scroller">
			<Dropdown title="Dropdown 1" id="dropdown1">
				{items(3)}
			</Dropdown>
			<br />
			<Dropdown title="Dropdown 2" id="dropdown2">
				{items(5)}
			</Dropdown>
			<br />
			<Dropdown title="Dropdown 3" id="dropdown3">
				{items(7)}
			</Dropdown>
		</Scroller>
	</div>
);

export default ThemeDecorator(app);
