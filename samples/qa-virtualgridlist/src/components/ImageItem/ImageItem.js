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

const mapStateToProps = ({data}, {['data-index']: dataIndex}) => ({
	children: data.data[dataIndex].caption,
	label: data.data[dataIndex].subCaption,
	selected: data.selectedItems.has(dataIndex),
	showSelection: data.data[dataIndex].selectionOverlayShowing,
	src: data.data[dataIndex].source
});

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		onSelectItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
