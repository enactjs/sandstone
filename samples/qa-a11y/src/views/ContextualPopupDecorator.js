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
	)

	renderPopup2 = () => (
		<div>
			<Button size="small">Button</Button>
			<Button size="small">Button2</Button>
			<Button size="small">Button3</Button>
		</div>
	)

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
	)

	render () {
		return (
			<div>
				<ContextualButton
					popupComponent={this.renderPopup1}
					size="small"
				>
					Average
				</ContextualButton>
				<ContextualButton
					popupComponent={this.renderPopup2}
					size="small"
					spotlightRestrict="self-only"
				>
					Spotlight Modal
				</ContextualButton>
				<ContextualButton
					popupComponent={this.renderPopup3}
					size="small"
				>
					Nested Radio
				</ContextualButton>
			</div>
		);
	}
}

export default ContextualPopupDecoratorView;
