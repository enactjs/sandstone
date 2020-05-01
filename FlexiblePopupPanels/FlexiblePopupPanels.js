import {arrange} from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';

import {animationOptions, getHorizontalTranslation, PopupDecorator, Viewport} from '../internal/Panels';
import {Panel, Header} from '../Panels';

import css from './FlexiblePopupPanels.module.less';

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
const FadeAndSlideArranger = {
	enter: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node);

		return arrange(config, [
			{transform, opacity: 0, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: 'none', opacity: 1, offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node, -1);

		return arrange(config, [
			{transform: 'none', opacity: 1, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform, opacity: 0, offset: 1}
		], animationOptions);
	}
};

const FlexiblePopupPanelsDecorator = compose(
	PopupDecorator({
		className: 'flexiblePopupPanels',
		css,
		panelArranger: FadeAndSlideArranger,
		panelType: 'flexiblePopup'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the left
 * or right side of the screen inside a popup. This panel flexes both horizontally and vertically,
 * with the Header positioned outside the Panel background area. This is typically used for a single
 * setting or control at a time, for maximum background area viewing.
 *
 * @class FlexiblePopupPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const FlexiblePopupPanels = FlexiblePopupPanelsDecorator(Viewport);

// Directly set the defaultProps for position to the left side so it initially draws on the correct
// side. The real default is assigned in PopupDecorator, but should still be overridable by an app.
FlexiblePopupPanels.defaultProps = {
	...FlexiblePopupPanels.defaultProps,
	position: 'left'
};

export default FlexiblePopupPanels;
export {
	FlexiblePopupPanels,
	Header,
	Panel
};
