import Button from '@enact/sandstone/Button';
import ContextualPopupDecorator from '@enact/sandstone/ContextualPopupDecorator';
import RadioItem from '@enact/sandstone/RadioItem';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';

import Section from '../components/Section';

const ContextualButton = Toggleable(
	{prop: 'open', toggle: 'onClick', deactivate: 'onClose'},
	ContextualPopupDecorator(
		Button
	)
);

class ContextualPopupDecoratorView extends React.Component {
	renderPopup1 = () => (
		<div>
			<span>Item</span>
			<br />
			<span>Item</span>
			<br />
			<span>Item</span>
			<br />
			<span disabled>Item</span>
			<br />
		</div>
	)

	renderPopup2 = () => (
		<div>
			<Button>Text</Button>
			<Button>Text</Button>
			<Button>Text</Button>
			<Button disabled>Text</Button>
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
			{['Item', 'Item', 'Item']}
		</Group>
	)

	renderPopup4 = () => (
		<Group
			childComponent={RadioItem}
			defaultSelected={0}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
		>
			{[
				{children: 'Item', disabled: true, key: 0},
				{children: 'Item', disabled: true, key: 1},
				{children: 'Item', disabled: true, key: 2}
			]}
		</Group>
	)

	render () {
		return (
			<Section title="Button wrapped with ContextualPopupDecorator">
				<ContextualButton alt="With Texts" popupComponent={this.renderPopup1}>Text</ContextualButton>
				<ContextualButton alt="With Buttons" popupComponent={this.renderPopup2} spotlightRestrict="self-only">Text</ContextualButton>
				<ContextualButton alt="With RadioItems in Group" direction="below" popupComponent={this.renderPopup3}>Text</ContextualButton>
				<ContextualButton alt="With Disabled RadioItems in Group" direction="below" popupComponent={this.renderPopup4}>Text</ContextualButton>
				<ContextualButton alt="Disabled" disabled popupComponent={this.renderPopup1}>Text</ContextualButton>
			</Section>
		);
	}
}

export default ContextualPopupDecoratorView;
