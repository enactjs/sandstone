import kind from '@enact/core/kind';
import {OrbitControls, Text} from '@react-three/drei';
import {Interactive} from '@react-three/xr';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';
import * as THREE from 'three';

import {get3DShape} from '../internal/util/util';

const Item3D = kind({
	name: 'Item3D',

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
		const zPosition = -0.1;

		const [hovered, setHover] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks
		const [shapePosition, setShapePosition] = useState([0, 0, zPosition - 0.5]); // eslint-disable-line react-hooks/rules-of-hooks
		const [textPosition, setTextPosition] = useState([-3, label ? 0.25 : 0, zPosition]); // eslint-disable-line react-hooks/rules-of-hooks
		const [labelPosition, setLabelPosition] = useState([-3, -0.25, zPosition]); // eslint-disable-line react-hooks/rules-of-hooks

		let sizeX = 15;
		let sizeY = size === 'small' ? 1.2 : 1.5;
		let radius = 0.1;
		const itemShape = get3DShape(radius, sizeX, sizeY);

		const disabledHoverColor = disabled ? '#404040' : '#a6a6a6';
		const lineColor = hovered ? '#363636' : '#e6e6e6';
		const itemGeometry = new THREE.ExtrudeGeometry(itemShape, {bevelEnabled: false, depth: 0.4});

		const handlePointerOver = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setHover(true);
		}, []);

		const handlePointerOut = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setHover(false);
		}, []);

		const onPointerDown = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setShapePosition([0, 0, zPosition + 0.2]);
			setTextPosition([-3, label ? 0.3 : 0, zPosition + 1]);
			setLabelPosition([-3, -0.3, zPosition + 1]);
		}, [label, zPosition]);

		const onPointerUp = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setShapePosition([0, 0, zPosition - 0.5]);
			setTextPosition([-3, label ? 0.25 : 0, zPosition]);
			setLabelPosition([-3, -0.25, zPosition]);
		}, [label, zPosition]);

		const onSqueezeStartHandler = useCallback(() => { // eslint-disable-line react-hooks/rules-of-hooks
			setShapePosition([0, 0, zPosition - 1.5]);
			setTextPosition([-3, label ? 0.2 : 0, zPosition]);
			setLabelPosition([-3, -0.2, zPosition]);
		}, [label, zPosition]);

		return (
			<Interactive
				onHover={handlePointerOver}
				onBlur={handlePointerOut}
				onSelectStart={onPointerDown}
				onSelectEnd={onPointerUp}
				onSqueezeStart={onSqueezeStartHandler}
				onSqueezeEnd={onPointerUp}
			>
				<group>
					<group position={shapePosition}>
						<mesh
							{...rest}
							ref={mesh}
							onPointerOver={handlePointerOver}
							onPointerOut={handlePointerOut}
						>
							<lineSegments>
								<edgesGeometry args={[itemGeometry]} />
								<lineBasicMaterial color={lineColor} />
							</lineSegments>
							<extrudeBufferGeometry args={[itemShape, {bevelEnabled: false, depth: 0.4}]} />
							<meshStandardMaterial color={hovered ? disabledHoverColor : '#212121'} />
							<OrbitControls />
						</mesh>
					</group>
					<group position={textPosition}>
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
					<group position={labelPosition}>
						<Text
							anchorX="left"
							color={hovered ? '#6f7074' : disabled ? '#404040' : '#e6e6e6'} // eslint-disable-line no-nested-ternary
							font={'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'}
							fontSize={0.3}
							maxWidth={15}
							textAlign="left"
						>
							{label}
						</Text>
					</group>
				</group>
			</Interactive>
		);
	}
});

export default Item3D;
