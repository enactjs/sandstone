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
			<span>Item 0</span>
			<br />
			<span>Item 1</span>
			<br />
			<span>Item 2</span>
			<br />
			<span disabled>Item 3</span>
			<br />
		</div>
	);

	renderPopup2 = () => (
		<div>
			<Button>Text 0</Button>
			<Button>Text 1</Button>
			<Button>Text 2</Button>
			<Button disabled>Text 3</Button>
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
			{['Item 0', 'Item 1', 'Item 2']}
		</Group>
	);

	renderPopup4 = () => (
		<Group
			childComponent={RadioItem}
			defaultSelected={0}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
		>
			{[
				{children: 'Item 0', disabled: true, key: 0},
				{children: 'Item 1', disabled: true, key: 1},
				{children: 'Item 2', disabled: true, key: 2}
			]}
		</Group>
	);

	render () {
		return (
			<Section title="Button wrapped with ContextualPopupDecorator">
				<ContextualButton alt="With Texts" popupComponent={this.renderPopup1}>Text 0</ContextualButton>
				<ContextualButton alt="With Buttons" popupComponent={this.renderPopup2} spotlightRestrict="self-only">Text 1</ContextualButton>
				<ContextualButton alt="With RadioItems in Group" direction="below" popupComponent={this.renderPopup3}>Text 2</ContextualButton>
				<ContextualButton alt="With Disabled RadioItems in Group" direction="below" popupComponent={this.renderPopup4}>Text 3</ContextualButton>
				<ContextualButton alt="Disabled" disabled popupComponent={this.renderPopup1}>Text 4</ContextualButton>
			</Section>
		);
	}
}

export default ContextualPopupDecoratorView;
