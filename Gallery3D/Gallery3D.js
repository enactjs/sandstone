import PropTypes from 'prop-types';
import {useRef, useState} from 'react';

import ImageItem3D from '../ImageItem3D';

const Image = ({index, name, ...props}) => {
	const group = useRef();

	return (
		<group ref={group}>
			<ImageItem3D src={'https://picsum.photos/20' + index} {...props} index={index}>
				{name}
			</ImageItem3D>
		</group>
	);
};

Image.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string
};

const Gallery3D = () => {
	const [selected, setSelected] = useState(null);

	const positions = [
		[-14, 16, -10], // 0
		[-7, 16, -10], // 1
		[0, 16, -10], // 2
		[7, 16, -10], // 3
		[14, 16, -10], // 4
		[-14, 8, -10], // 5
		[-7, 8, -10], // 6
		[0, 8, -10], // 7
		[7, 8, -10], // 8
		[14, 8, -10], // 9
		[-14, 0, -10], // 10
		[-7, 0, -10], // 11
		[0, 0, -10], // 12
		[7, 0, -10], // 13
		[14, 0, -10], // 14
		[-14, -8, -10], // 15
		[-7, -8, -10], // 16
		[0, -8, -10], // 17
		[7, -8, -10], // 18
		[14, -8, -10], // 19
		[-14, -16, -10], // 20
		[-7, -16, -10], // 21
		[0, -16, -10], // 22
		[7, -16, -10], // 23
		[14, -16, -10]]; // 24

	return (
		<group name="imageCopies">
			{positions.map((position, i) => {
				return (
					<Image
						name={'Image-' + i}
						position={position}
						index={i}
						key={i}
						selected={selected}
						setSelected={setSelected}
					/>
				);
			}
			)}
		</group>
	);
};

Gallery3D.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string
};

export default Gallery3D;
export {
	Image,
	Gallery3D
};
