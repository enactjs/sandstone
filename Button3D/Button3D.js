import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import Icon from '../Icon';

import Skinnable from '../Skinnable';

import componentCss from './Button3D.module.less';
import {useRef, useState} from "react";


const Button3DBase = (props) => {
	// This reference will give us direct access to the mesh
	const mesh = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	// Rotate mesh every frame, this is outside of React without overhead
	//useFrame(() => (mesh.current.rotation.z += 0.01))
	const [shapePosition, setShapePosition] = useState([0,0,0]);
	const [textPosition, setTextPosition] = useState([0,0,0.16]);

	const shape = new THREE.Shape();

	let sizeX = Math.max(props.children.length * 0.3, 5)
	let sizeY = 3
	let radius = 0.5

	let halfX = sizeX * 0.5 - radius
	let halfY = sizeY * 0.5 - radius
	let baseAngle = Math.PI * 0.5
	shape.absarc(halfX, halfY, radius, baseAngle * 0, baseAngle * 0 + baseAngle)
	shape.absarc(-halfX, halfY, radius, baseAngle * 1, baseAngle * 1 + baseAngle)
	shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle)
	shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle)

	const onPointerDown = () => {
		setActive(true);
		setShapePosition([0,0,0.2]);
		setTextPosition([0,0,0.36]);
	};

	const onPointerUp = () => {
		setActive(false);
		setShapePosition([0,0,0]);
		setTextPosition([0,0,0.16]);
	};


	return (
		<group>
			<group position={shapePosition}>
				<mesh
					{...props}
					ref={mesh}
					scale={hovered ? 1.05 : 1}
					onPointerDown={onPointerDown}
					onPointerUp={onPointerUp}
					onPointerOver={(event) => setHover(true)}
					onPointerOut={(event) => setHover(false)}
				>

					{/*<boxGeometry args={[5, 1, 1]} />*/}

					<extrudeBufferGeometry  args={[shape, { bevelEnabled: false, depth: 0.15 }]} />
					<meshStandardMaterial color={hovered ? '#e6e6e6' : '#7d848c'} />
					{/*<extrudeGeometry args={,[10, 1, 1,1,1,5]} />*/}
					<OrbitControls />
				</mesh>
			</group>
			<group
				position={textPosition}
			>
				<Text color={hovered ? '#4c5059' : '#e6e6e6'} anchorX="center" anchorY="middle" fontSize={0.5}>
					{props.iconPosition === 'before' ? props.icon : null}{props.children}{props.iconPosition === 'after' ? props.icon : null}
				</Text>
			</group>

		</group>
	)
}

const Button3D = Skinnable(Button3DBase);

export default Button3D;
export {
	Button3DBase,
	Button3D
};
