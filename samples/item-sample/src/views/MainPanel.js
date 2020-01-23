import Item from '../../../../Item';
// import Item from '@enact/malachite/Item';
import Icon from '../../../../Icon';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import {Row, Cell} from '@enact/ui/Layout';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<Row>
				<Cell>
					<Item>
						Hello Item
					</Item>
					<Item>
						<Icon slot="slotBefore">notification</Icon>
						Hello Slottable Item
						<Icon slot="slotAfter">search</Icon>
					</Item>
					<Item label="Secondary Text">
						2 Line item Label
						<slotAfter>
							<Icon>check</Icon>
						</slotAfter>
					</Item>
					<Item label="Label">
						<Icon slot="slotBefore">check</Icon>
						Hello Item with Icon
					</Item>
				</Cell>
			</Row>
		</Panel>
	)
});

export default MainPanel;
