import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

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

	const shape = new THREE.Shape();

	let sizeX = 5
	let sizeY = 3
	let radius = 0.5

	let halfX = sizeX * 0.5 - radius
	let halfY = sizeY * 0.5 - radius
	let baseAngle = Math.PI * 0.5
	shape.absarc(halfX, halfY, radius, baseAngle * 0, baseAngle * 0 + baseAngle)
	shape.absarc(-halfX, halfY, radius, baseAngle * 1, baseAngle * 1 + baseAngle)
	shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle)
	shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle)


	return (
		<group>
			<group position={[0,0,-0.51]}>
				<mesh
					{...props}
					ref={mesh}
					scale={hovered ? 1.5 : 1}
					onClick={(event) => setActive(!active)}
					onPointerOver={(event) => setHover(true)}
					onPointerOut={(event) => setHover(false)}>

					{/*<boxGeometry args={[5, 1, 1]} />*/}

					<extrudeBufferGeometry  args={[shape, { bevelEnabled: false, depth: 0.1 }]} />
					<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
					{/*<extrudeGeometry args={,[10, 1, 1,1,1,5]} />*/}
					<OrbitControls />
				</mesh>
			</group>
			<group>
				<Text color="red" anchorX="center" anchorY="middle" fontSize={1}>
					hello world!
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
