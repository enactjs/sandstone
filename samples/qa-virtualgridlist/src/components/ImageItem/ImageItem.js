import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import {ImageItem as SandstoneImageItem} from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';
import React from 'react';

import {selectItem} from '../../actions';

const ImageItem = kind({
	name: 'ImageItem',
	propTypes: {
		onSelectItem: PropTypes.func
	},
	render: ({onSelectItem, ...rest}) => {
		return (
			<SandstoneImageItem onClick={onSelectItem} {...rest} />
		);
	}
});

const mapStateToProps = ({data: {data, selectedItems}}, {['data-index']: dataIndex}) => {
	const {
		caption: children,
		subCaption: label,
		showSelection,
		src
	} = data[dataIndex];

	return ({
		children,
		label,
		selected: selectedItems.has(dataIndex),
		showSelection,
		src
	});
};

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		onSelectItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
