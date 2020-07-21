import kind from '@enact/core/kind';
import $L from '@enact/i18n/$L';
import Text from '@enact/i18n/Text';
import BodyText from '@enact/sandstone/BodyText';
import Heading from '@enact/sandstone/Heading';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="QA Sample - I18N" />
			<Scroller>
				<Heading showLine>Strings</Heading>
				<BodyText>String - $L: {$L('String')}</BodyText>
				<BodyText>String - Text: <Text>String</Text></BodyText>

				<Heading showLine>Components</Heading>
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
