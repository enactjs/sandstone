import {Cell, Row} from '@enact/ui/Layout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Heading} from '@enact/sandstone/Heading';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {useContext} from 'react';

import KeyLogger from '../components/KeyLogger/KeyLogger';
import PressedKeysContext from '../contexts/PressedKeysContext';

const MainPanelBase = kind({
	name: 'MainPanel',

	propTypes: {
		keys: PropTypes.object
	},

	render: ({keys: {modifiers, nonModifiers}, ...rest}) => (
		<Panel {...rest} noCloseButton>
			<Header>
				<title>KeyPress Monitor</title>
			</Header>
			<Row>
				<Cell>
					<Heading>keydown Events</Heading>
					<KeyLogger keys={nonModifiers} />
				</Cell>
				<Cell>
					<Heading>Modifier Keys</Heading>
					<KeyLogger keys={modifiers} />
				</Cell>
			</Row>
		</Panel>
	)
});

const MainPanel = (props) => {
	const {pressedKeys} = useContext(PressedKeysContext);

	const modifierKeys = ['alt', 'control', 'shift', 'meta'];
	const isModifier = ({key} = {}) => modifierKeys.includes(key.toLowerCase());

	const keys = [...pressedKeys.values()];
	const filteredKeys = {
		modifiers: keys.length ? keys.filter((key) => isModifier(key)) : [],
		nonModifiers: keys.length ? keys.filter((key) => !isModifier(key)) : []
	};

	return (
		<MainPanelBase {...props} keys={filteredKeys} />
	);

};

export default MainPanel;
