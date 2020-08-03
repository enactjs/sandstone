import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

const HeaderView = () => (
	<>
		<Cell>
			<Panel>
				<Header title="Header Title 0" />
				<hr />
				<Button>Text 0</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					subtitle="Subtitle"
					title="Header Title 1"
				/>
				<hr />
				<Button>Text 1</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Header Title 2"
				/>
				<hr />
				<Button>Text 2</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Compact Header Title 3"
					type="compact"
				/>
				<hr />
				<Button>Text 3</Button>
			</Panel>
		</Cell>
		<Cell>
			<Panel>
				<Header
					closeButtonAriaLabel="This is Close"
					subtitle="with closeButtonAriaLabel"
					title="Mini Header Title 4"
					type="mini"
				/>
				<hr />
				<Button>Text 4</Button>
			</Panel>
		</Cell>
	</>
);

export default HeaderView;
