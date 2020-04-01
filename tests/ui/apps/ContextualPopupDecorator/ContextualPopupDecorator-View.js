import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';

const ContextualButton = ContextualPopupDecorator(Button);

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const renderPopup = () => (
	<Button id="popupButton">Hello Contextual Popup</Button>
);

class app extends Component {

	state = {
		open: false
	};

	clickHandler = (st) =>  this.setState(st);

	render () {
		const {open} = this.state;
		return (
			<div {...this.props}>
				<ContextualButton
					id="button1"
					onClick={() => this.clickHandler({open: !open})}
					onClose={() => this.clickHandler({open: false})}
					open={open}
					popupComponent={renderPopup}
					spotlightRestrict="self-only"
				>
					Contextual Popup Button
				</ContextualButton>
			</div>
		);
	}
}

export default ThemeDecorator(app);
