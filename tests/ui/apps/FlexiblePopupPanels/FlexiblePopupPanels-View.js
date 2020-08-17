import kind from '@enact/core/kind';
import spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';
import Toggleable from '@enact/ui/Toggleable';
import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';
import compose from 'ramda/src/compose';

import Button from '../../../../Button';
import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FlexiblePopupPanels, Panel, Header} from '../../../../FlexiblePopupPanels';
import ThemeDecorator from '../../../../ThemeDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const blockStyles = () => ({
	backgroundColor: '#58a',
	border: `${scaleToRem(6)} solid #6ac`,
	borderRadius: scaleToRem(6)
});

const stamp = (howMany, fn) => (new Array(howMany)).fill().map(fn);

const app = kind({
	name: 'FlexiblePopupPanelsPanel',

	defaultProps: {
		index: 0
	},

	computed: {
		fatBlock: () => (<div style={{...blockStyles(), height: scaleToRem(99), width: scaleToRem(900)}} />),
		mediumBlock: () => (<div style={{...blockStyles(), height: scaleToRem(900), width: scaleToRem(900)}} />),
		nextButton: () => (<Button id="nextButton" />),
		prevButton: () => (<Button id="prevButton" />),
		skinnyBlock: () => (<div style={{...blockStyles(), height: scaleToRem(600), width: scaleToRem(99)}} />),
		smallBlock: () => (<div style={{...blockStyles(), height: scaleToRem(300), width: scaleToRem(300)}} />)
	},

	render: ({open, onToggleOpen, index, onNavigate, fatBlock, mediumBlock, nextButton, prevButton, skinnyBlock, smallBlock, ...rest}) => {
		return (
			<div {...rest}>
				<Button id="openButton" onClick={onToggleOpen}>Open FlexiblePopupPanels</Button>
				<FlexiblePopupPanels
					id="flexiblepopuppanels"
					index={index}
					open={open}
					onChange={onNavigate}
					onClose={onToggleOpen}
				>
					<Panel id="panel1" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 1 - With Scroller" />

						<Scroller style={{width: scaleToRem(900)}}>
							<Item id="singleItem">Single Item</Item>
						</Scroller>
					</Panel>
					<Panel id="panel2" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 2 - With Big Scroller" />

						<Scroller style={{height: scaleToRem(1500), width: scaleToRem(900)}}>
							{stamp(20, (i, idx) => <Item key={`item${idx}`}>Item {idx + 1}</Item>)}
						</Scroller>
					</Panel>
					<Panel id="panel3" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 3 - Medium Block" />

						{mediumBlock}
					</Panel>
					<Panel id="panel4" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 4 - Small Block with extra long title for testing marquee behavior" />

						{smallBlock}
					</Panel>
					<Panel id="panel5" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 5 - Skinny Block" />

						{skinnyBlock}
					</Panel>
					<Panel id="panel6" nextButton={nextButton} prevButton={prevButton}>
						<Header title="Panel 6 - Fat Block" />

						{fatBlock}
					</Panel>
					<Panel id="panel7" nextButton={nextButton} prevButton={prevButton} autoFocus="#item2">
						<Header title="Panel 7 - autoFocus" />
						<div style={{width: scaleToRem(798)}}>
							<Item>Item 1</Item>
							<Item id="item2">Item 2</Item>
						</div>
					</Panel>
				</FlexiblePopupPanels>
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
