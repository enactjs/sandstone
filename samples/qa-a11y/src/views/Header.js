import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

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
	</>
);

export default HeaderView;
