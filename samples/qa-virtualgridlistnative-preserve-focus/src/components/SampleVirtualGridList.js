import ImageItem from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

import css from './SampleVirtualGridList.module.less';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' class='img-fluid rounded mx-auto d-block' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='4rem' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const SampleVirtualGridList = ({index, onClick, ...rest}) => {
	const renderItem = useCallback(({index, ...rest}) => { // eslint-disable-line no-shadow
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = {
				'hd': svgGenerator(200, 200, color, 'ffffff', `Image ${index}`),
				'fhd': svgGenerator(300, 300, color, 'ffffff', `Image ${index}`),
				'uhd': svgGenerator(600, 600, color, 'ffffff', `Image ${index}`)
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
