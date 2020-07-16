import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import Steps from '@enact/sandstone/Steps';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

import Section from '../components/Section';

import css from '../App/App.module.less';

const cellStyle = {border: '3px solid red'};

const HeaderView = () => (
	<>
		<Cell style={cellStyle}>
			<Panel>
				<Header title="Header with title" />
				<Button>Button in Panel 01</Button>
			</Panel>
		</Cell>
		<Cell style={cellStyle}>
			<Panel>
				<Header subtitle="with title and subtitle" title="Header" />
				<Button>Button in Panel 02</Button>
			</Panel>
		</Cell>
		<Cell style={cellStyle}>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
				/>
				<Button>Button in Panel 03</Button>
			</Panel>
		</Cell>
		<Cell style={cellStyle}>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
					type="compact"
				/>
				<Button>Button in Panel 04</Button>
			</Panel>
		</Cell>
		<Cell style={cellStyle}>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
					type="mini"
				/>
				<Button>Button in Panel 05</Button>
			</Panel>
		</Cell>
		<Cell style={cellStyle}>
			<Panel>
				<Header
					centered
					slotAbove={<Steps current={3} total={5} />}
					slotAfter={<Button icon="arrowsmallright" aria-label="next" />}
					slotBefore={<Button icon="arrowsmallleft" aria-label="back" />}
					subtitle="with title, subtitle, and buttons"
					title="WizardPanel Header"
					type="wizard"
				/>
				<Button>Button in Panel 06</Button>
			</Panel>
		</Cell>
	</>
);

export default HeaderView;
