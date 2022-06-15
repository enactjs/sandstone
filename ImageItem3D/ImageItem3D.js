import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import kind from '@enact/core/kind';
import Skinnable from '../Skinnable';
import PropTypes from 'prop-types'
import { useRef, useState } from "react";
import { useLoader } from '@react-three/fiber';

const ImageItem3DBase = kind({
	propTypes: {
		children: PropTypes.node,

		disabled: PropTypes.bool
	},

	functional: true,

	render: ({ children, disabled, label, rest, src }) => {

		const mesh = useRef();
		const textRef = useRef();
		const [hovered, setHover] = useState(false);
		const shape = new THREE.Shape();

		let sizeX = 6;
		let sizeY = 7;
		let radius = 0.6;

		const texture = useLoader(THREE.TextureLoader, src)
		const image = <mesh>
			<planeBufferGeometry attach="geometry" args={[5, 5]} />
			<meshBasicMaterial attach="material" map={texture} toneMapped={false} />
		</mesh>

		let halfX = sizeX * 0.5 - radius;
		let halfY = sizeY * 0.5 - radius;
		let baseAngle = Math.PI * 0.5;
		shape.absarc(halfX, halfY, radius, baseAngle * 0, baseAngle * 0 + baseAngle);
		shape.absarc(-halfX, halfY, radius, baseAngle * 1, baseAngle * 1 + baseAngle);
		shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle);
		shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle);

		const disabledHoverColor = disabled ? '#404040' : '#e6e6e6';

		return (
			<group>
				<group position={[0, -.5, -0.51]}>
					<mesh
						{...rest}
						ref={mesh}
						onPointerOver={() => setHover(true)}
						onPointerOut={() => setHover(false)}
					>
						<extrudeBufferGeometry args={[shape, { bevelEnabled: false, depth: 0.3 }]} />
						<meshStandardMaterial
							transparent={!hovered ? true : false}
							opacity={!hovered ? 0 : 1}
							color={hovered ? disabledHoverColor : '#ffffff'}
						/>
						<OrbitControls />
					</mesh>
				</group>
				<group position={[-2.5, -3.1, -.15]}>
					<Text
						ref={textRef}
						anchorX="left"
						anchorY="middle"
						color={hovered ? '#6f7074' : disabledHoverColor}
						font={'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'}
						fontSize={0.5}
						maxWidth={15}
						textAlign="left"
					>
						{children}
					</Text>
				</group>
				<group position={[-2.5, -3.45, -.15]}>
					<Text
						anchorX="left"
						color={hovered ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'}
						fontSize={0.3}
						maxWidth={15}
						textAlign="left"
					>
						{label}
					</Text>
				</group>
				<group position={[0, 0, -.15]}>
					{image}
				</group>
			</group>
		)
	}
})

const ImageItem3D = Skinnable({ prop: 'skin' }, ImageItem3DBase);

export default ImageItem3D;
export {
	ImageItem3DBase,
	ImageItem3D
};