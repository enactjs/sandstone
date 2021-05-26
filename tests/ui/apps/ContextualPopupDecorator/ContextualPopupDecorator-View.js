import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';
import ThemeDecorator from '../../../../ThemeDecorator';
import {Component} from 'react';
import spotlight from '@enact/spotlight';

const ContextualButton = ContextualPopupDecorator(Button);

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const renderPopup1 = () => (
	<Button id="popupButton1">Hello Contextual Popup1</Button>
);

const renderPopup2 = () => (
	<Button id="popupButton2">Hello Contextual Popup2</Button>
);

class app extends Component {

	state = {
		button1Open: false,
		button2Open: false
	};

	clickHandler = (st) =>  this.setState(st);

	render () {
		const {button1Open, button2Open} = this.state;
		
		return (
			<div {...this.props}>
				<ContextualButton
					id="button1"
					onClick={() => this.clickHandler({button1Open: !button1Open})}
					onClose={() => this.clickHandler({button1Open: false})}
					open={button1Open}
					popupComponent={renderPopup1}
					spotlightRestrict="self-only"
				>
					Contextual Popup Button1
				</ContextualButton>
				<ContextualButton
					id="button2"
					onClick={() => this.clickHandler({button2Open: !button2Open})}
					onClose={() => this.clickHandler({button2Open: false})}
					open={button2Open}
					popupComponent={renderPopup2}
					spotlightRestrict="self-only"
				>
					Contextual Popup Button2
				</ContextualButton>
			</div>
		);
	}
}

export default ThemeDecorator(app);
