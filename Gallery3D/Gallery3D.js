import React, { useEffect, useMemo, useRef } from 'react';
import ImageItem3D from '../ImageItem3D';
import * as THREE from 'three';
import { Text} from '@react-three/drei'

const Image = ({ layers = undefined, name, ...props }) => {
	const group = useRef();
	useEffect(() => {
		group.current.lookAt(0, 0, 0);
	}, []);

	return (
		<group {...props} ref={group}>
			<ImageItem3D src={'https://picsum.photos/200/300'} {...props}>
				{name}
			</ImageItem3D>
			{/*<Text depthTest={false} material-toneMapped={false}  layers={layers}>*/}
			{/*	codrops*/}
			{/*</Text>*/}
		</group>
	)
};

const Gallery3D = ({ layers }) => {
	// const vertices = useMemo(() => {
	// 	const y = new THREE.IcosahedronGeometry(12);
	// 	console.log(y);
	// 	return y.vertices;
	// }, []);
	const vertices = [
		[-10.207809448242188, 0,6.308773517608643], // 0
		[0, 6.308773517608643, 10.207809448242188], // 1
		[-6.308773517608643, 10.207809448242188, 0], // 2
		[6.308773517608643, 10.207809448242188, 0], // 3
		[0, 6.308773517608643, -10.207809448242188], // 4
		[10.207809448242188, 0, -6.308773517608643], // 5
		[10.207809448242188, 0, 6.308773517608643], // 6
		[0, -6.308773517608643, 10.207809448242188], // 7
		[-6.308773517608643, -10.207809448242188, 0], // 8
		[0, -6.308773517608643,-10.207809448242188], // 9
		[10.207809448242188, 0, -6.308773517608643], // 10
		[6.308773517608643, -10.207809448242188, 0]] // 11

	return (
		<group name="imageCopies">
			{vertices.map((vertex, i) => (
				<Image name={'titleCopy-' + i}
					   position={vertex}
					   layers={layers}
				/>
			))}
		</group>
	)
};

export default Gallery3D;
export {
	Image,
	Gallery3D
};
