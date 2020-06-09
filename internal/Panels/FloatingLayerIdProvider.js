
import hoc from '@enact/core/hoc';
import {useFloatingLayer} from '@enact/ui/FloatingLayer';
import React from 'react';

const defaultConfig = {};

const FloatingLayerIdProvider = hoc(defaultConfig, (config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	return function FloatingLayerIdProvider (props) {
		const {floatingLayerId} = useFloatingLayer();

		return (
			<Wrapped
				{...props}
				floatingLayerId={floatingLayerId}
			/>
		);
	};
});

export default FloatingLayerIdProvider;
export {FloatingLayerIdProvider};
