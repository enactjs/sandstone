import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import kind from '@enact/core/kind';
import Skinnable from '../Skinnable';
import PropTypes from 'prop-types'
import { useRef, useState } from "react";

const Item3DBase = kind({
	propTypes: {
		children: PropTypes.node,

		disabled: PropTypes.bool
	},

	functional: true,

	render: ({ children, disabled, label, rest }) => {

		const mesh = useRef();
		const [hovered, setHover] = useState(false);
		const shape = new THREE.Shape();

		let sizeX = 15;
		let sizeY = 1.5;
		let radius = 0.1;

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
				<group position={[0, 0, -0.51]}>
					<mesh
						{...rest}
						ref={mesh}
						onPointerOver={(event) => setHover(true)}
						onPointerOut={(event) => setHover(false)}
					>
						<extrudeBufferGeometry args={[shape, { bevelEnabled: false, depth: 0.1 }]} />
						<meshStandardMaterial transparent={!hovered ? true : false} opacity={!hovered ? 0 : 1} color={hovered ? disabledHoverColor : '#ffffff'} />
						<OrbitControls />
					</mesh>
				</group>
				<group position={[-3, label ? .25 : 0, -0.30]}>
					<Text
						anchorX="left"
						anchorY="middle"
						color={hovered ? '#6f7074' : disabledHoverColor}
						font={'../styles/internal/fonts/MuseoSans/MuseoSans-Medium.ttf'}
						fontSize={0.5}
						maxWidth={15}
						textAlign="left"
					>
						{children}
					</Text>
				</group>
				<group position={[-3, -.25, -.3]}>
					<Text
						anchorX="left"
						color={hovered ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'}
						font={'../styles/internal/fonts/MuseoSans/MuseoSans-Medium.ttf'}
						fontSize={0.3}
						maxWidth={15}
						textAlign="left"
					>
						{label}
					</Text>
				</group>
			</group>
		)
	}
})

const Item3D = Skinnable({ prop: 'skin' }, Item3DBase);

export default Item3D;
export {
	Item3DBase,
	Item3D
};