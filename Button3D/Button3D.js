import {OrbitControls, Text, Stars} from '@react-three/drei';
import * as THREE from 'three'


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
	const [shapePosition, setShapePosition] = useState([0, 0, 0]);
	const [textPosition, setTextPosition] = useState([0, 0, 0.16]);

	const buttonShape = new THREE.Shape();
	const tooltipShape = new THREE.Shape();
	const colorShape = new THREE.Shape();

	// Calculations for Button Shape size
	let sizeX = Math.max(props.children.length * 0.3, props.size === "small" ? 4 : 5)
	let sizeY = props.size === "small" ? 2 : 3
	let radius = 0.5

	let halfX = sizeX * 0.5 - radius
	let halfY = sizeY * 0.5 - radius
	let baseAngle = Math.PI * 0.5
	buttonShape.absarc(halfX, halfY, radius, baseAngle * 0, baseAngle * 0 + baseAngle)
	buttonShape.absarc(-halfX, halfY, radius, baseAngle * 1, baseAngle * 1 + baseAngle)
	buttonShape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle)
	buttonShape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle)

	// Calculations for Tooltip Shape size
	let tooltipSizeX = Math.max((props.tooltipText.length || 0) * 0.3, 2.5);
	let tooltipSizeY = 1.5;
	let tooltipRadius = 0.5;

	let tooltipHalfX = tooltipSizeX * 0.5 - tooltipRadius
	let tooltipHalfY = tooltipSizeY * 0.5 - tooltipRadius
	let tooltipBaseAngle = Math.PI * 0.5
	tooltipShape.absarc(tooltipHalfX, tooltipHalfY, tooltipRadius, tooltipBaseAngle * 0, tooltipBaseAngle * 0 + tooltipBaseAngle)
	tooltipShape.absarc(-tooltipHalfX, tooltipHalfY, tooltipRadius, tooltipBaseAngle * 1, tooltipBaseAngle * 1 + tooltipBaseAngle)
	tooltipShape.absarc(-tooltipHalfX, -tooltipHalfY, tooltipRadius, tooltipBaseAngle * 2, tooltipBaseAngle * 2 + tooltipBaseAngle)
	tooltipShape.absarc(tooltipHalfX, -tooltipHalfY, tooltipRadius, tooltipBaseAngle * 3, tooltipBaseAngle * 3 + tooltipBaseAngle)

	const onPointerDown = () => {
		setActive(true);
		setShapePosition([0, 0, 0.2]);
		setTextPosition([0, 0, 0.36]);
	};

	const onPointerUp = () => {
		setActive(false);
		setShapePosition([0, 0, 0]);
		setTextPosition([0, 0, 0.16]);
	};

	const isTooltipVisible = props.showTooltip && hovered;
	const tooltipPosition = props.size === 'large' ? [2, 2.5, 0] : [1.5, 2, 0];
	const tooltipTextPosition = props.size === 'large' ? [2, 2.5, 0.16] : [1.5, 2, 0.16];

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
			{isTooltipVisible &&
				<group>
					<group position={tooltipPosition}>
						<mesh
							{...props}
							ref={mesh}
						>
							<extrudeBufferGeometry args={[tooltipShape, {bevelEnabled: false, depth: 0.15}]}/>
							<meshStandardMaterial color={hovered ? '#e6e6e6' : '#7d848c'}/>
						</mesh>
					</group>
					<group>
						<Text position={tooltipTextPosition} color="#4c5059" anchorX="center" anchorY="middle" fontSize={0.5}>
							{props.tooltipText}
						</Text>
					</group>
				</group>
			}
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
					<extrudeBufferGeometry args={[buttonShape, {bevelEnabled: false, depth: 0.15}]}/>
					<meshStandardMaterial color={hovered ? '#e6e6e6' : '#7d848c'}/>
					{/*<extrudeGeometry args={,[10, 1, 1,1,1,5]} />*/}
				</mesh>
			</group>
			<group position={textPosition}>
				<Text
					//font={font}
					color={hovered ? '#4c5059' : '#e6e6e6'}
					anchorX="center"
					anchorY="middle"
					fontSize={0.5}>
					{props.iconPosition === 'before' ? icon : null} {props.children} {props.iconPosition === 'after' ? icon : null}
				</Text>
			</group>
			<OrbitControls/>
		</group>
	)
}

const Button3D = Skinnable(Button3DBase);

export default Button3D;
export {
	Button3DBase,
	Button3D
};
