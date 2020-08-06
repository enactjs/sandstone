import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

const HeaderView = () => (
	<>
		<Cell>
			<Panel>
				<Header title="Header Title 0" />
				<Button>Text 0</Button>
			</Panel>
			<hr />
		</Cell>
		<Cell>
			<Panel>
				<Header
					subtitle="Subtitle"
					title="Header Title 1"
				/>
				<Button>Text 1</Button>
			</Panel>
			<hr />
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Header Title 2"
				/>
				<Button>Text 2</Button>
			</Panel>
			<hr />
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Compact Header Title 3"
					type="compact"
				/>
				<Button>Text 3</Button>
			</Panel>
			<hr />
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Mini Header Title 4"
					type="mini"
				/>
				<Button>Text 4</Button>
			</Panel>
			<hr />
		</Cell>
	</>
);

export default HeaderView;
