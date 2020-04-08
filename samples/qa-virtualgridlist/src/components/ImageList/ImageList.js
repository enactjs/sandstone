import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import ImageItem from '../ImageItem';

class ImageList extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array,
		minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	}

	calculateOfSize = (size) => ri.scale(parseInt(size) || 0)

	renderItem = ({...rest}) => (<ImageItem {...rest} />)

	render = () => {
		const
			rest = Object.assign({}, this.props),
			{imageitems, spacing, minHeight, minWidth} = this.props;

		delete rest.dispatch;
		delete rest.imageitems;
		delete rest.minHeight;
		delete rest.minWidth;
		delete rest.spacing;

		return (
			<VirtualGridList
				{...rest}
				dataSize={imageitems.length}
				itemRenderer={this.renderItem}
				itemSize={{minHeight: this.calculateOfSize(minHeight), minWidth: this.calculateOfSize(minWidth)}}
				scrollMode="translate"
				spacing={this.calculateOfSize(spacing)}
			/>
		);
	}
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	spacing: data.spacing
});

export default connect(mapStateToProps)(ImageList);
