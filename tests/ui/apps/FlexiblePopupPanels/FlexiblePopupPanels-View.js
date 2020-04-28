import kind from '@enact/core/kind';
import {adaptEvent, handle, forward} from '@enact/core/handle';
import spotlight from '@enact/spotlight';
import Changeable from '@enact/ui/Changeable';
import Toggleable from '@enact/ui/Toggleable';
import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';
import compose from 'ramda/src/compose';

import Button from '../../../../Button';
import Item from '../../../../Item';
import Scroller from '../../../../Scroller';
import {FlexiblePopupPanels, Panel, Header} from '../../../../Panels';
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
	name: 'FixedPopupPanelsPanel',

	defaultProps: {
		index: 0
	},

	computed: {
		fatBlock: () => (<div style={{...blockStyles(), height: scaleToRem(99), width: scaleToRem(900)}} />),
		mediumBlock: () => (<div style={{...blockStyles(), height: scaleToRem(900), width: scaleToRem(900)}} />),
		skinnyBlock: () => (<div style={{...blockStyles(), height: scaleToRem(600), width: scaleToRem(99)}} />),
		smallBlock: () => (<div style={{...blockStyles(), height: scaleToRem(300), width: scaleToRem(300)}} />)
	},

	handlers: {
		onNavPrevPanel: handle(adaptEvent((ev, {index}) => ({index: Math.max(index - 1, 0)}), forward('onNavigate'))),
		onNavNextPanel: handle(adaptEvent((ev, {index}) => ({index: Math.min(index + 1, 5)}), forward('onNavigate')))
	},

	render: ({open, onToggleOpen, index, onNavPrevPanel, onNavNextPanel, fatBlock, mediumBlock, skinnyBlock, smallBlock, ...rest}) => {
		delete rest.onNavigate;

		const prevPanelButton = (<Button id="prevButton" icon="arrowhookleft" onClick={onNavPrevPanel} size="small" />);
		const nextPanelButton = (<Button id="nextButton" icon="arrowlargeright" onClick={onNavNextPanel} size="small" />);

		return (
			<div {...rest}>
				<Button id="openButton" onClick={onToggleOpen}>Open FlexiblePopupPanels</Button>
				<FlexiblePopupPanels
					id="flexiblepopuppanels"
					index={index}
					open={open}
					onClose={onToggleOpen}
				>
					<Panel id="panel1">
						<Header title="Panel 1 - With Scroller">
							<slotAfter>{nextPanelButton}</slotAfter>
						</Header>

						<Scroller style={{width: scaleToRem(900)}}>
							<Item>Single Item</Item>
						</Scroller>
					</Panel>
					<Panel id="panel2">
						<Header title="Panel 2 - With Big Scroller">
							<slotAfter>{nextPanelButton}</slotAfter>
							{prevPanelButton}
						</Header>

						<Scroller style={{width: scaleToRem(900)}}>
							{stamp(20, (i, idx) => <Item key={`item${idx}`}>Item {idx + 1}</Item>)}
						</Scroller>
					</Panel>
					<Panel id="panel3">
						<Header title="Panel 3 - Medium Block">
							<slotAfter>{nextPanelButton}</slotAfter>
							{prevPanelButton}
						</Header>

						{mediumBlock}
					</Panel>
					<Panel id="panel4">
						<Header title="Panel 4 - Small Block with extra long title for testing marquee behavior">
							<slotAfter>{nextPanelButton}</slotAfter>
							{prevPanelButton}
						</Header>

						{smallBlock}
					</Panel>
					<Panel id="panel5">
						<Header title="Panel 5 - Skinny Block">
							<slotAfter>{nextPanelButton}</slotAfter>
							{prevPanelButton}
						</Header>

						{skinnyBlock}
					</Panel>
					<Panel id="panel6">
						<Header title="Panel 6 - Fat Block">
							<slotAfter>{nextPanelButton}</slotAfter>
							{prevPanelButton}
						</Header>

						{fatBlock}
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
