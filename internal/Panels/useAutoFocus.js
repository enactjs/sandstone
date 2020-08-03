import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import Spotlight from '@enact/spotlight';
import {getTargetByContainer} from '@enact/spotlight/src/target';
import PropTypes from 'prop-types';
import React from 'react';

const isSelector = (autoFocus) => autoFocus && autoFocus !== 'last-focused' && autoFocus !== 'default-element' && autoFocus !== 'none';

function configureContainer (ref, autoFocus, spotlightId) {
	if (ref.current.id === spotlightId && ref.current.autoFocus === autoFocus) return;

	ref.current.id = spotlightId;
	ref.current.autoFocus = autoFocus;

	// If autoFocus is a selector, we're using default-element but need to update the selector
	// for that element in the container config
	if (isSelector(autoFocus)) {
		Spotlight.set(spotlightId, {
			defaultElement: autoFocus
		});
	}
}

function useAutoFocus ({autoFocus = 'last-focused', hideChildren}) {
	const ref = React.useRef({id: null, autoFocus: null});

	return React.useCallback((node) => {
		if (!node) return;

		// FIXME: This is a candidate to move to the decorator once hooks have been fully
		// adopted and we can configure SpotlightContainerDecorator with the current props
		const {spotlightId} = node.dataset;

		configureContainer(ref, autoFocus, spotlightId);

		// In order to spot the body components, we defer spotting until !hideChildren. If the
		// Panel opts out of hideChildren support by explicitly setting it to false, it'll spot
		// on first render.
		if (!hideChildren && autoFocus !== 'none' && !Spotlight.getCurrent() && !Spotlight.isPaused()) {
			// For the purpose of imperatively focusing the Panel contents, we find the target
			// within the panel using a (currently) private Spotlight API with the enterTo parameter
			// to influence which configuration is used to find said target.
			const enterTo = isSelector(autoFocus) ? autoFocus : 'last-focused';
			const target = getTargetByContainer(spotlightId, enterTo);

			if (target) {
				Spotlight.focus(target);
			}
		}
	}, [autoFocus, hideChildren, ref]);
}

const AutoFocusDecorator = hoc((config, Wrapped) => {
	// eslint-disable-next-line no-shadow
	function AutoFocusDecorator ({autoFocus, componentRef, hideChildren, ...rest}) {
		const hook = useAutoFocus({autoFocus, hideChildren});
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
