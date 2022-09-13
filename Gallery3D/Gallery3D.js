import kind from "@enact/core/kind";
import {OrbitControls} from "@react-three/drei";
import {VRCanvas, DefaultXRControllers} from '@react-three/xr';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';

import ImageItem3D from '../ImageItem3D';


const Image = ({index, name, ...props}) => {
	const group = useRef();

	return (
		<group ref={group}>
			<ImageItem3D src={`https://picsum.photos/2${10 + parseInt(index)}/2${10 + parseInt(index)}`} {...props} index={index}>
				{name}
			</ImageItem3D>
		</group>
	);
};

Image.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string
};

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
	[14, -16, -10]	// 24
];

const Gallery3D = kind({
	name: 'ImageItem3DBase',

	functional: true,

	propTypes: {
		index: PropTypes.number,
		name: PropTypes.string
	},

	render: () => {
		const [isControlled, setIsControlled] = useState(true); // eslint-disable-line react-hooks/rules-of-hooks
		const [pointerDown, setPointerDown] = useState(-1); // eslint-disable-line react-hooks/rules-of-hooks
		const [selected, setSelected] = useState(null); // eslint-disable-line react-hooks/rules-of-hooks
		const fakeRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const galleryRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const imageItemRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks


		const handlePointerMove = useCallback((ev) => { // eslint-disable-line react-hooks/rules-of-hooks
			if (pointerDown !== -1) {
				imageItemRef.current?.handlePointerMove(ev);
			}
		}, [pointerDown]);

		const handlePointerUp = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			if (pointerDown !== -1) {
				setPointerDown(-1);
			}
		}, [pointerDown]);

		return (
			<VRCanvas>
				{isControlled && <OrbitControls />}
				<DefaultXRControllers />
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 30, 10]} intensity={10} />
				<pointLight position={[-20, -30, -10]} intensity={2} />
				<group
					name="imageCopies"
					ref={galleryRef}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerUp}
				>
					{positions.map((position, i) => {
						return (
							<Image
								name={'Image-' + i}
								position={position}
								index={i}
								key={i}
								pointerDown={pointerDown}
								selected={selected}
								setPointerDown={setPointerDown}
								setSelected={setSelected}
								setControlled={setIsControlled}
								imageItemRef={pointerDown === i ? imageItemRef : fakeRef}
							/>
						);
					})}
				</group>
			</VRCanvas>
		);
	}
});

export default Gallery3D;
export {
	Image,
	Gallery3D
};
