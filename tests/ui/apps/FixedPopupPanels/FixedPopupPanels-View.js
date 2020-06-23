import kind from '@enact/core/kind';
import spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';
import compose from 'ramda/src/compose';

import BodyText from '../../../../BodyText';
import Button from '../../../../Button';
import Item from '../../../../Item';
import {FixedPopupPanels, Panel, Header} from '../../../../FixedPopupPanels';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = kind({
	name: 'FixedPopupPanelsPanel',

	defaultProps: {
		index: 0
	},

	render: ({open, onToggleOpen, index, onNavigate, ...rest}) => {
		return (
			<div {...rest}>
				<Button id="openButton" onClick={onToggleOpen}>Open FixedPopupPanels</Button>
				<FixedPopupPanels
					id="fixedpopuppanels"
					index={index}
					open={open}
					onBack={onNavigate}
					onClose={onToggleOpen}
					onTransition={(({index: panelIndex}) => { window.__index = panelIndex; } )}
				>
					<Panel id="panel1">
						<Header>
							<title>
								FixedPopupPanels Title
							</title>
							<subtitle>
								A panel type for options views
							</subtitle>
						</Header>
						<BodyText>Example text inside an FixedPopupPanels Panel</BodyText>
						<Item onClick={() => onNavigate({index: 1})} id="item1">Example Item 1</Item>
						<Item>Example Item 2</Item>
						<Item>Example Item 3</Item>
					</Panel>
					<Panel id="panel2">
						<Header>
							<title>
								Another Panel
							</title>
							<subtitle>
								This is the second page
							</subtitle>
						</Header>
						<BodyText>Woo woo</BodyText>
						<Item>Example Item 1 on Panel 2</Item>
						<Item>Example Item 2 on Panel 2</Item>
						<Item>Example Item 3 on Panel 2</Item>
					</Panel>
				</FixedPopupPanels>
			</div>
		);
	}
});

const AppDecorator = compose(
	ThemeDecorator,
	Changeable({prop: 'index', change: 'onNavigate'}),
	Toggleable({prop: 'open', toggle: 'onToggleOpen'})
);

export default AppDecorator(app);
