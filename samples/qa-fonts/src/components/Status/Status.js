import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import css from './Status.module.less';

const Status = kind({
	name: 'Status',

	propTypes: {
		loaded: PropTypes.bool
	},

	defaultProps: {
		loaded: false
	},

	styles: {
		css,
		className: 'status'
	},

	computed: {
		className: ({loaded, styler}) => styler.append({loaded})
	},

	render: ({children, ...rest}) => {
		delete rest.loaded;

		return (
			<span {...rest}>{children}</span>
		);
	}
});

export default Status;
