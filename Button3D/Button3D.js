import { OrbitControls } from '@react-three/drei'

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

	return (
		<mesh
			{...props}
			ref={mesh}
			scale={hovered ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}>
			<boxGeometry args={[1, 2, 3]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
			<OrbitControls />
		</mesh>
	)
}

const Button3D = Skinnable(Button3DBase);

export default Button3D;
export {
	Button3DBase,
	Button3D
};
