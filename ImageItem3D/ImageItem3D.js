import {OrbitControls, Text} from '@react-three/drei';
import * as THREE from 'three';
import kind from '@enact/core/kind';
import Skinnable from '../Skinnable';
import PropTypes from 'prop-types';
import {useRef, useState} from "react";
import {useLoader} from '@react-three/fiber';

const ImageItem3DBase = kind({
	propTypes: {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		index: PropTypes.number,
		position: PropTypes.array,
		selected: PropTypes.number,
		setSelected: PropTypes.func
	},

	defaultProps: {
		index: 0,
		position: [0, 0, 0],
		selected: null,
		setSelected: null
	},

	functional: true,

	render: ({children, disabled, label, rest, src, position, index, selected, setSelected}) => {

		const mesh = useRef();
		const textRef = useRef();
		const [hovered, setHover] = useState(false);
		const shape = new THREE.Shape();

		let sizeX = 6;
		let sizeY = 7;
		let radius = 0.6;

		const texture = useLoader(THREE.TextureLoader, src);
		const image = <mesh>
			<planeBufferGeometry attach="geometry" args={[5, 5]} />
			<meshBasicMaterial attach="material" map={texture} toneMapped={false} />
		</mesh>;

		let halfX = sizeX * 0.5 - radius;
		let halfY = sizeY * 0.5 - radius;
		let baseAngle = Math.PI * 0.5;
		shape.absarc(halfX, halfY, radius, 0, baseAngle);
		shape.absarc(-halfX, halfY, radius, baseAngle, baseAngle + baseAngle);
		shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle);
		shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle);

		const disabledHoverColor = disabled ? '#404040' : '#e6e6e6';

		const handlePosition = () => {
			if (selected === index) {
				return [position[0], position[1], position[2] + 2];
			}

			if (hovered) {
				return [position[0], position[1], position[2] + 3];
			}

			return position;
		};

		const handleSelect = () => {
			if (selected === index) {
				setSelected(null);
			} else {
				setSelected(index);
			}
		};

		const newPosition = handlePosition();

		return (
			<group {...rest} position={newPosition} scale={selected === index ? 1.3 : 1} >
				<group position={[0, -0.5, -0.51]}>
					<mesh
						ref={mesh}
						onPointerOver={() => setHover(true)}
						onPointerOut={() => setHover(false)}
						onPointerDown={handleSelect}
					>
						<extrudeBufferGeometry args={[shape, {bevelEnabled: false, depth: 0.3}]} />
						<meshStandardMaterial
							transparent={!hovered}
							// opacity={!hovered ? 0 : 1}
							color={hovered || (selected === index) ? disabledHoverColor : '#282929'}
						/>
						<OrbitControls />
					</mesh>
				</group>
				<group position={[-2.5, -3.1, -0.15]}>
					<Text
						ref={textRef}
						anchorX="left"
						anchorY="middle"
						color={hovered || selected === index ? '#6f7074' : disabledHoverColor}
						font={'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'}
						fontSize={0.5}
						maxWidth={15}
						textAlign="left"
					>
						{children}
					</Text>
				</group>
				<group position={[-2.5, -3.45, -0.15]}>
					<Text
						anchorX="left"
						color={hovered || selected === index  ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'}
						fontSize={0.3}
						maxWidth={15}
						textAlign="left"
					>
						{label}
					</Text>
				</group>
				<group position={[0, 0, -0.15]}>
					{image}
				</group>
			</group>
		);
	}
});

const ImageItem3D = Skinnable({prop: 'skin'}, ImageItem3DBase);

export default ImageItem3D;
export {
	ImageItem3DBase,
	ImageItem3D
};
