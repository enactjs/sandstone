import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Component} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import ImageItem from '../ImageItem';

import css from './ImageList.module.less';

class ImageList extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		imageitems: PropTypes.array,
		minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	};

	calculateOfSize = (size) => ri.scale(parseInt(size) || 0);

	renderItem = ({...rest}) => (<ImageItem {...rest} />);

	componentDidUpdate () {
		//this.scrollTo({index: 2, animate: false, focus: true});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}
	render = () => {
		const
			{imageitems, spacing, minHeight, minWidth, ...rest} = this.props;

		delete rest.dispatch;

		return (
			<VirtualGridList
				{...rest}
				cbScrollTo={this.getScrollTo}
				className={rest.direction === 'horizontal' ? css.horizontalPadding : css.verticalPadding}
				dataSize={imageitems.length}
				itemRenderer={this.renderItem}
				itemSize={{minHeight: this.calculateOfSize(minHeight), minWidth: this.calculateOfSize(minWidth)}}
				snapToCenter
				style={{width: '30%'}}
				spacing={this.calculateOfSize(spacing)}
			/>
		);
	};
}

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder,
	minHeight: data.minHeight,
	minWidth: data.minWidth,
	spacing: data.spacing
});

export default connect(mapStateToProps)(ImageList);
