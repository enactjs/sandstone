import ImageItem from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/sandstone/VirtualList';

import css from './SampleVirtualGridList.module.less';

class SampleVirtualGridList extends Component {
	static propTypes = {
		index: PropTypes.number,
		onClick: PropTypes.func
	}

	renderItem = ({index, ...rest}) => {
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = {
				'hd': `http://placehold.it/200x200/${color}/ffffff&text=Image ${index}`,
				'fhd': `http://placehold.it/300x300/${color}/ffffff&text=Image ${index}`,
				'uhd': `http://placehold.it/600x600/${color}/ffffff&text=Image ${index}`
			};

		return (
			<ImageItem {...rest} onClick={this.props.onClick} src={source} />
		);
	}

	render () {
		const {index, ...rest} = this.props;

		delete rest.scrollLeft;
		delete rest.scrollTop;
		delete rest.onClick;

		const id = `vgl_${index}`;

		return (
			<VirtualGridList
				{...rest}
				cbScrollTo={this.getScrollTo}
				className={css.verticalPadding}
				dataSize={1000}
				id={id}
				itemRenderer={this.renderItem}
				itemSize={{
					minWidth: ri.scale(705),
					minHeight: ri.scale(705)
				}}
				spacing={ri.scale(-120)}
				spotlightId={id} // Set a unique ID to preserve last focus
			/>
		);
	}
}

export default SampleVirtualGridList;
