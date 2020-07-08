import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';

const ContextualButton = Toggleable(
	{prop: 'open', toggle: 'onClick', deactivate: 'onClose'},
	ContextualPopupDecorator(
		Button
	)
);

class ContextualPopupDecoratorView extends React.Component {

	renderPopup1 = () => (
		<div>
			<span>Item 1</span>
			<br />
			<span>Item 2</span>
			<br />
			<span>Item 3</span>
			<br />
		</div>
	);

	renderPopup2 = () => (
		<div>
			<Button>Button</Button>
			<Button>Button2</Button>
			<Button>Button3</Button>
		</div>
	);

	renderPopup3 = () => (
		<Group
			childComponent={RadioItem}
			defaultSelected={0}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
		>
			{['Creek', 'River', 'Ocean']}
		</Group>
	);

	render () {
		return (
			<>
				<ContextualButton popupComponent={this.renderPopup1}>
					Average
				</ContextualButton>
				<ContextualButton popupComponent={this.renderPopup2} spotlightRestrict="self-only">
					Spotlight Modal
				</ContextualButton>
				<ContextualButton direction="below" popupComponent={this.renderPopup3}>
					Nested Radio
				</ContextualButton>
			</>
		);
	}
}

export default ContextualPopupDecoratorView;
