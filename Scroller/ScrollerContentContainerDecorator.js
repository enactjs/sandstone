import hoc from '@enact/core/hoc';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const defaultConfig = {
	scrollTargetOnDescendantsFocus: true
};

/**
 * Wraps a component to be a scroll target when its descendants get focused.
 *
 * @hoc
 * @memberof sandstone/Scroller
 * @public
 */
const ScrollerContentContainerDecorator = hoc(defaultConfig, (config, Wrapped) => {
	return SpotlightContainerDecorator(config, Wrapped);
});

export default ScrollerContentContainerDecorator;
export {
	ScrollerContentContainerDecorator
};
