import Button from '../../../../Button';
import ContextualMenuDecorator from '../../../../ContextualMenuDecorator';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';

const ContextualButton = ContextualMenuDecorator(Button);
const menuItems = ['Option 1', 'Option 2', 'Option 3'];

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

class app extends Component {

	render () {
		return (
			<div>
				<ContextualButton
					id="button1"
					menuItems={menuItems}
					popupSpotlightId="menu1"
				>
					Contextual Menu Button
				</ContextualButton>
				<ContextualButton
					id="button2"
					menuItems={menuItems}
					open
					popupSpotlightId="menu2"
				>
					Contextual Menu Button
				</ContextualButton>
			</div>
		);
	}
}

export default ThemeDecorator(app);
