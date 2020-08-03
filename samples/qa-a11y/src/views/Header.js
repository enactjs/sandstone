import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

const HeaderView = () => (
	<>
		<Cell>
			<Panel>
				<Header title="Header with title" />
				<hr />
				<Button>Button in Panel 01</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header subtitle="with title and subtitle" title="Header" />
				<hr />
				<Button>Button in Panel 02</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
				/>
				<hr />
				<Button>Button in Panel 03</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
					type="compact"
				/>
				<hr />
				<Button>Button in Panel 04</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="application close"
					subtitle="with closeButtonAriaLabel"
					title="Header"
					type="mini"
				/>
				<hr />
				<Button>Button in Panel 05</Button>
			</Panel>
		</Cell>
	</>
);

export default HeaderView;
