import kind from '@enact/core/kind';
import spotlight from '@enact/spotlight';
import Toggleable from '@enact/ui/Toggleable';
import React from 'react';
import compose from 'ramda/src/compose';

import BodyText from '../../../../../BodyText';
import Button from '../../../../../Button';
import Item from '../../../../../Item';
import {FixedPopupPanels, Panel, Header} from '../../../../../FixedPopupPanels';
import ThemeDecorator from '../../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = kind({
	name: 'FixedPopupPanelsPanel',

	render: ({className, open, onToggleOpen, ...rest}) => {
		return (
			<div className={className}>
				<Button id="openButton" onClick={onToggleOpen}>Open FixedPopupPanels</Button>
				<FixedPopupPanels
					{...rest}
					id="fixedpopuppanels"
					open={open}
					onClose={onToggleOpen}
				>
					{open ?
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
							<Item id="item1">Example Item 1</Item>
							<Item>Example Item 2</Item>
							<Item>Example Item 3</Item>
						</Panel> :
						null
					}
				</FixedPopupPanels>
			</div>
		);
	}
});

const AppDecorator = compose(
	ThemeDecorator,
	Toggleable({prop: 'open', toggle: 'onToggleOpen'})
);

export default AppDecorator(app);
