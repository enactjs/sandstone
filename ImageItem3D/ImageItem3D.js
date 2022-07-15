import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {Text} from '@react-three/drei';
import {useLoader} from '@react-three/fiber';
import {Interactive} from '@react-three/xr';
import PropTypes from 'prop-types';
import {useCallback, useImperativeHandle, useRef, useState} from 'react';
import * as THREE from 'three';

import Skinnable from '../Skinnable';

const ImageItem3DBase = kind({
	name: 'ImageItem3DBase',

	functional: true,

	propTypes: {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		imageItemRef: EnactPropTypes.ref,
		index: PropTypes.number,
		label: PropTypes.string,
		pointerDown: PropTypes.number,
		position: PropTypes.array,
		selected: PropTypes.number,
		setControlled: PropTypes.func,
		setPointerDown: PropTypes.func,
		setSelected: PropTypes.func,
		src: PropTypes.string
	},

	defaultProps: {
		index: 0,
		position: [0, 0, 0],
		selected: null,
		setSelected: null
	},

	render: ({children, disabled, imageItemRef, index, label, pointerDown, position, selected, setControlled, setPointerDown, setSelected, src, ...rest}) => {
		const groupRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const mesh = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const textRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const [hovered, setHover] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks
		const [pastState, setPastState] = useState(null); // eslint-disable-line react-hooks/rules-of-hooks
		const [rotateX, setRotateX] = useState(0); // eslint-disable-line react-hooks/rules-of-hooks
		const [rotateY, setRotateY] = useState(0); // eslint-disable-line react-hooks/rules-of-hooks
		const shape = new THREE.Shape();

		let radius = 0.6;
		let sizeX = 6;
		let sizeY = 7;

		const texture = useLoader(THREE.TextureLoader, src); // eslint-disable-line react-hooks/rules-of-hooks
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
		const imageItemGeometry = new THREE.ExtrudeGeometry(shape, {bevelEnabled: false, depth: 0.3});
		const lineColor = (hovered || selected === index) ? '#363636' : '#e6e6e6';

		const handlePointerDown = useCallback((ev) => { // eslint-disable-line react-hooks/rules-of-hooks
			if (pointerDown === -1) {
				setPastState(ev);
				setPointerDown(index);
				setControlled(false);
			}
		}, [index, pointerDown, setControlled, setPointerDown]);

		const handlePointerOut = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setControlled(true);
			setHover(false);
		}, [setControlled]);

		const handlePointerOver = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setHover(true);
		}, []);

		const handleSelect = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			if (selected === index) {
				setSelected(null);
			} else {
				setSelected(index);
			}
		}, [index, selected]); // eslint-disable-line react-hooks/exhaustive-deps

		const handlePosition = () => {
			if (selected === index) {
				return [position[0], position[1], position[2] + 2];
			}

			if ((hovered && pointerDown === -1) || pointerDown === index) {
				return [position[0], position[1], position[2] + 3];
			}

			return position;
		};

		const newPosition = handlePosition();

		useImperativeHandle(imageItemRef, () => ({ // eslint-disable-line react-hooks/rules-of-hooks
			handlePointerMove: (ev) => {
				if (pointerDown === index) {
					if (pastState) {
						if (pastState.nativeEvent.clientX > ev.nativeEvent.clientX) {
							setRotateY((state) => state - 0.02);
						}
						if (pastState.nativeEvent.clientX < ev.nativeEvent.clientX) {
							setRotateY((state) => state + 0.02);
						}
						if (pastState.nativeEvent.clientY > ev.nativeEvent.clientY) {
							setRotateX((state) => state - 0.02);
						}
						if (pastState.nativeEvent.clientY < ev.nativeEvent.clientY) {
							setRotateX((state) => state + 0.02);
						}
						setPastState(ev);
					}
				}
			},

			handlePointerUp: () => setPointerDown(-1)
		}));

		return (
			<Interactive
				onHover={handlePointerOver}
				onBlur={handlePointerOut}
				onSelectStart={handlePointerOver}
				onSelectEnd={handlePointerOut}
				onSqueezeStart={handlePointerOver}
				onSqueezeEnd={handlePointerOut}
			>
				<group
					{...rest}
					ref={groupRef}
					rotation={new THREE.Euler(rotateX, rotateY, 0)}
					position={newPosition}
					scale={selected === index ? 1.3 : 1}
				>
					<group position={[0, -0.5, -0.51]}>
						<mesh
							onClick={handleSelect}
							onPointerDown={handlePointerDown}
							onPointerOut={handlePointerOut}
							onPointerOver={handlePointerOver}
							ref={mesh}
						>
							<lineSegments>
								<edgesGeometry args={[imageItemGeometry]} />
								<lineBasicMaterial color={lineColor} />
							</lineSegments>
							<extrudeBufferGeometry args={[shape, {bevelEnabled: false, depth: 0.3}]} />
							<meshStandardMaterial color={hovered || (selected === index) ? disabledHoverColor : '#282929'} />
						</mesh>
					</group>
					<group position={[-2.5, -3.1, -0.15]}>
						<Text
							anchorX="left"
							anchorY="middle"
							color={hovered || selected === index ? '#6f7074' : disabledHoverColor}
							font={'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'}
							fontSize={0.5}
							maxWidth={15}
							ref={textRef}
							textAlign="left"
						>
							{children}
						</Text>
					</group>
					<group position={[-2.5, -3.45, -0.15]}>
						<Text
							anchorX="left"
							color={hovered || selected === index  ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'} // eslint-disable-line no-nested-ternary
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
			</Interactive>
		);
	}
});

const ImageItem3D = Skinnable({prop: 'skin'}, ImageItem3DBase);

export default ImageItem3D;
export {
	ImageItem3DBase,
	ImageItem3D
};
