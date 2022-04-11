import ImageItem from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import css from './SampleVirtualGridList.module.less';

const SampleVirtualGridList = ({index, onClick, ...rest}) => {
	const renderItem = useCallback(({index, ...rest}) => { // eslint-disable-line no-shadow
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = {
				'hd': `http://via.placeholder.com/200x200/${color}/ffffff/png?text=Image+${index}`,
				'fhd': `http://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${index}`,
				'uhd': `http://via.placeholder.com/600x600/${color}/ffffff/png?text=Image+${index}`
			};

		return (
			<ImageItem {...rest} onClick={onClick} src={source} />
		);
	}, [onClick]);

	const id = `vgl_${index}`;

	return (
		<VirtualGridList
			{...rest}
			className={css.verticalPadding}
			dataSize={1000}
			id={id}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(678), // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
				minHeight: ri.scale(678) // 606px(size of expanded ImageItem) + 36px(for shadow) * 2
			}}
			spacing={ri.scale(-132)} // -(ImageItem padding(48px(for expanding) + 36px(for shadow)) * 2 - 36px(for the gap between items))
			spotlightId={id} // Set a unique ID to preserve last focus
		/>
	);
};

SampleVirtualGridList.propTypes = {
	index: PropTypes.number,
	onClick: PropTypes.func
};

export default SampleVirtualGridList;
