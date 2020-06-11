import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import React from 'react';

function useAutoFocus ({autoFocus = 'last-focused', focusMode = 'prop', hideChildren}) {
	return React.useCallback((node) => {
		if (!node) return;

		const {spotlightId} = node.dataset;

		if (focusMode === 'prop') {
			const config = {
				enterTo: 'last-focused'
			};

			if (autoFocus !== 'last-focused') {
				config.enterTo = 'default-element';

				if (autoFocus !== 'default-element') {
					config.defaultElement = autoFocus;
				}
			}

			Spotlight.set(spotlightId, config);
		}

		// In order to spot the body components, we defer spotting until !hideChildren. If the
		// Panel opts out of hideChildren support by explicitly setting it to false, it'll spot
		// on first render.
		if (!hideChildren && autoFocus !== 'none' && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
			Spotlight.focus(spotlightId);
		}
	}, [autoFocus, focusMode, hideChildren]);
}

const AutoFocusDecorator = hoc({focusMode: 'prop'}, (config, Wrapped) => {
	const {focusMode} = config;

	// eslint-disable-next-line no-shadow
	function AutoFocusDecorator ({autoFocus, componentRef, hideChildren, ...rest}) {
		const hook = useAutoFocus({autoFocus, focusMode, hideChildren});
		const ref = useChainRefs(componentRef, hook);

		return <Wrapped {...rest} componentRef={ref} hideChildren={hideChildren} />;
	}

	AutoFocusDecorator.propTypes = {
		autoFocus: PropTypes.string,
		componentRef: EnactPropTypes.ref,
		hideChildren: PropTypes.bool
	};

	AutoFocusDecorator.defaultProps = {
		autoFocus: 'last-focused'
	};

	return AutoFocusDecorator;
});

export default useAutoFocus;
export {
	AutoFocusDecorator,
	useAutoFocus
};
