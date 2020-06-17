import Button from '@enact/sandstone/Button';
import Layout, {Cell} from '@enact/ui/Layout';
import {Header, Panel} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Steps from '@enact/sandstone/Steps';
import React from 'react';

const HeaderView = () => (
	<Layout orientation="vertical">
		<Cell component={Scroller}>
			<Cell style={{border: '3px solid red'}}>
				<Panel>
					<Header title="Header with title" />
					<Button>Button in Panel 01</Button>
				</Panel>
			</Cell>
			<Cell style={{border: '3px solid red'}}>
				<Panel>
					<Header title="Header" subtitle="with title and subtitle" />
					<Button>Button in Panel 02</Button>
				</Panel>
			</Cell>
			<Cell style={{border: '3px solid red'}}>
				<Panel>
					<Header title="Header" subtitle="with closeButtonAriaLabel" closeButtonAriaLabel="application close" />
					<Button>Button in Panel 03</Button>
				</Panel>
			</Cell>
			<Cell style={{border: '3px solid red'}}>
				<Panel>
					<Header
						type="wizard"
						centered
						slotAbove={<Steps current={3} total={5} />}
						slotBefore={<Button icon="arrowsmallleft" aria-label="back" />}
						slotAfter={<Button icon="arrowsmallright" aria-label="next" />}
						title="WizardPanel Header"
						subtitle="with title, subtitle, and buttons"
					/>
					<Button>Button in Panel 04</Button>
				</Panel>
			</Cell>
		</Cell>
	</Layout>
);

export default HeaderView;
