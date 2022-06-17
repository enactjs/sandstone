import kind from '@enact/core/kind';
import {OrbitControls, Text} from '@react-three/drei';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';
import * as THREE from 'three';

import Skinnable from '../Skinnable';

const Item3DBase = kind({
	name: 'Item3DBase',

	functional: true,

	propTypes: {
		children: PropTypes.node,
		disabled: PropTypes.bool,
		label: PropTypes.string,
		/**
		 * The size of the 3D item.
		 *
		 * @type {('large'|'small')}
		 * @default 'large'
		 * @private
		 */
		size: PropTypes.oneOf(['large', 'small'])
	},

	defaultProps: {
		size: 'large'
	},

	render: ({children, disabled, label, size, ...rest}) => {
		const mesh = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const textRef = useRef(); // eslint-disable-line react-hooks/rules-of-hooks
		const [hovered, setHover] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks
		const shape = new THREE.Shape();

		let sizeX = 15;
		let sizeY = size === 'small' ? 1.2 : 1.5;
		let radius = 0.1;

		let halfX = sizeX * 0.5 - radius;
		let halfY = sizeY * 0.5 - radius;
		let baseAngle = Math.PI * 0.5;
		shape.absarc(halfX, halfY, radius, 0, baseAngle);
		shape.absarc(-halfX, halfY, radius, baseAngle, baseAngle + baseAngle);
		shape.absarc(-halfX, -halfY, radius, baseAngle * 2, baseAngle * 2 + baseAngle);
		shape.absarc(halfX, -halfY, radius, baseAngle * 3, baseAngle * 3 + baseAngle);

		const disabledHoverColor = disabled ? '#404040' : '#e6e6e6';

		const handlePointerOver = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setHover(true);
		}, []);

		const handlePointerOut = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setHover(false);
		}, []);

		return (
			<group>
				<group position={[0, 0, -0.51]}>
					<mesh
						{...rest}
						ref={mesh}
						onPointerOver={handlePointerOver}
						onPointerOut={handlePointerOut}
					>
						<extrudeBufferGeometry args={[shape, {bevelEnabled: false, depth: 0.1}]} />
						<meshStandardMaterial transparent={!hovered} opacity={!hovered ? 0 : 1} color={hovered ? disabledHoverColor : '#ffffff'} />
						<OrbitControls />
					</mesh>
				</group>
				<group position={[-3, label ? 0.25 : 0, -0.30]}>
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
				<group position={[-3, -0.25, -0.3]}>
					<Text
						anchorX="left"
						color={hovered ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'} // eslint-disable-line no-nested-ternary
						font={'../fonts/MuseoSans/MuseoSans-BoldItalic.ttf'}
						fontSize={0.3}
						maxWidth={15}
						textAlign="left"
					>
						{label}
					</Text>
				</group>
			</group>
		);
	}
});

const Item3D = Skinnable({prop: 'skin'}, Item3DBase);

export default Item3D;
export {
	Item3DBase,
	Item3D
};
