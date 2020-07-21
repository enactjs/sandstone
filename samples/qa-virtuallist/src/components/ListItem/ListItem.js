import {connect} from 'react-redux';
import Item from '@enact/sandstone/Item';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const ListItem = kind({
	name: 'ListItem',
	propTypes: {
		children: PropTypes.any,
		disabled: PropTypes.bool,
		dispatch: PropTypes.func,
		index: PropTypes.number
	},
	render: ({disabled, children, ...rest}) => {
		delete rest.index;
		delete rest.dispatch;

		return (
			<Item {...rest} disabled={disabled}>
				{children}
			</Item>
		);
	}
});

const mapStateToProps = ({listItems}, {index}) => ({
	disabled: listItems[index].disabled
});

export default connect(mapStateToProps, null)(ListItem);
