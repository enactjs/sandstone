/**
 * Sandstone styled expand effect on focus.
 *
 * @module sandstone/ExpandDecorator
 * @exports ExpandDecorator
 */

import hoc from '@enact/core/hoc';
import {useLayoutEffect, useRef} from 'react';

import css from './ExpandDecorator.module.less';

/**
 * A higher-order component for expanding effect of the wrapped component on focus.
 *
 * @class ExpandDecorator
 * @memberof sandstone/ExpandDecorator
 * @hoc
 * @public
 */
const ExpandDecorator = hoc({}, (config, Wrapped) => {
	const {duration, scale} = config;

	const Decorator = ({...rest}) => {
		const ref = useRef();

		useLayoutEffect(() => {
			const styleObject = ref.current?.style;

			if (styleObject) {
				if (duration) {
					styleObject.setProperty('--expand-decorator-transition-duration', `${duration}ms`);
				}
				if (scale) {
					styleObject.setProperty('--expand-decorator-transform', `scale(${scale})`);
				}
			}
		}, []);

		return (
			<div ref={ref} className={css.expand}>
				<Wrapped {...rest} />
			</div>
		);
	};

	Decorator.displayName = 'ExpandDecorator';

	return Decorator;
});


export default ExpandDecorator;
export {
	ExpandDecorator
};
