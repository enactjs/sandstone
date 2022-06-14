import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

import Skinnable from '../Skinnable';

import componentCss from './Button3D.module.less';
import {useEffect, useRef, useState} from "react";
import iconList from '../Icon/IconList.js';
import ri from "../../enact/packages/ui/resolution";

import sandstoneIcons from '../fonts/Sandstone_Icons.json';

const Button3DBase = (props) => {
	// This reference will give us direct access to the mesh
	const mesh = useRef()
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	const [icon, setIcon] = useState(null);

	//const font = new THREE.FontLoader().parse(null);

	const [shapePosition, setShapePosition] = useState([0,0,0]);
	const [textPosition, setTextPosition] = useState([0,0,0.16]);

	const shape = new THREE.Shape();

	let sizeX = Math.max(props.children.length * 0.3, props.size === "small" ? 4 : 5)
	let sizeY = props.size === "small" ? 2 : 3
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

	const computeIcon = () => {
		const iconProp = props.icon;
		let icon = iconList[props.icon];

		if (!icon) {
			if (typeof iconProp == 'string') {
				if (iconProp.indexOf('&#x') === 0) {
					// Converts a hex reference in HTML entity form: &#x99999;
					icon = parseInt(iconProp.slice(3, -1), 16);
				} else if (iconProp.indexOf('&#') === 0) {
					// Convert an HTML entity: &#99999;
					icon = parseInt(iconProp.slice(2, -1));
				} else if (iconProp.indexOf('\\u') === 0) {
					// Convert a unicode reference: \u99999;
					icon = parseInt(iconProp.slice(2), 16);
				} else if (iconProp.indexOf('0x') === 0) {
					// Converts a hex reference in string form
					icon = String.fromCodePoint(iconProp);
				} else if (!isUri(iconProp)) {
					// A "simple" string is assumed to be an icon-name string
					icon = iconProp;
				}
			}
		}

		if (typeof icon == 'number') {
			// Converts a hex reference in number form
			icon = String.fromCodePoint(icon);
		}

		return icon;


	}

	useEffect(() => {
		setIcon(computeIcon);
	}, [props.icon]);


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
				<Text
					//font={font}
					color={hovered ? '#4c5059' : '#e6e6e6'}
					anchorX="center"
					anchorY="middle"
					fontSize={0.5}>
					{props.iconPosition === 'before' ? icon : null} {props.children} {props.iconPosition === 'after' ? icon : null}
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
