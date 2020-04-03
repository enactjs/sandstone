import Button from '../../../../../Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '../../../../../Panels';
import PropTypes from 'prop-types';
import React from 'react';

import SampleVirtualGridListNative from '../components/SampleVirtualGridListNative';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({onClick, title, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
			</Header>
			<SampleVirtualGridListNative index={rest['data-index']} onClick={onClick} />
		</Panel>
	)
});

export default MainPanel;
