/**
 * Provides Sandstone styled fixed-width, popup-styled Panels component.
 *
 * @module sandstone/FixedPopupPanels
 * @exports FixedPopupPanels
 * @exports Panel
 * @exports Header
 */

import {arrange} from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';

import {animationOptions, getHorizontalTranslation, PopupDecorator, Viewport} from '../internal/Panels';
import {Panel, Header} from '../Panels';

import css from './FixedPopupPanels.module.less';

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
export const BasicArranger = {
	enter: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node);

		return arrange(config, [
			{transform, offset: 0},
			{transform: 'none', offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node, -1);

		return arrange(config, [
			{transform: 'none', offset: 0},
			{transform, offset: 1}
		], animationOptions);
	}
};

const FixedPopupPanelsDecorator = compose(
	PopupDecorator({
		className: 'fixedPopupPanels',
		css,
		panelArranger: BasicArranger,
		panelType: 'fixedPopup'
	})
);

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the right
 * or left side of the screen inside a popup. Typically used for overlaying panels over other
 * content.
 *
 * @class FixedPopupPanels
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const FixedPopupPanels = FixedPopupPanelsDecorator(Viewport);

FixedPopupPanels.Panel = Panel;
FixedPopupPanels.Header = Header;

export default FixedPopupPanels;
export {
	FixedPopupPanels,
	Header,
	Panel
};
