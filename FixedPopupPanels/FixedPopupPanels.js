/**
 * Provides Sandstone styled fixed-width, popup-styled Panels component.
 *
 * @module sandstone/FixedPopupPanels
 * @exports FixedPopupPanels
 * @exports FixedPopupPanelsBase
 * @exports FixedPopupPanelsDecorator
 * @exports Panel
 * @exports Header
 */

import {forKey, forProp, forward, forwardCustom, handle, stop} from '@enact/core/handle';
import useHandlers from '@enact/core/useHandlers';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import compose from 'ramda/src/compose';

import {BasicArranger, PopupDecorator, Viewport} from '../internal/Panels';
import DefaultPanel from '../Panels/Panel';
import DefaultHeader from '../Panels/Header';

import css from './FixedPopupPanels.module.less';

/**
 * Adds popup functionality and `rtl` prop to [`FixedPopupPanels`]{@link sandstone/FixedPopupPanels}.
 *
 * @class FixedPopupPanelsDecorator
 * @memberof sandstone/FixedPopupPanels
 * @hoc
 * @public
 */
const FixedPopupPanelsDecorator = compose(
	I18nContextDecorator({rtlProp: 'rtl'}),
	PopupDecorator({
		className: 'fixedPopupPanels',
		css,
		noAlertRole: true,
		panelArranger: BasicArranger,
		panelType: 'fixedPopup'
	})
);

const fixedPopupPanelsHandlers = {
	onKeyDown: handle(
		forward('onKeyDown'),
		forProp('rtl', false),
		forKey('left'),
		(ev, {index}) => (index > 0),
		({target}) => (document.querySelector(`section.${css.body}`).contains(target)),
		({target}) => (getTargetByDirectionFromElement('left', target) === null),
		forwardCustom('onBack'),
		stop
	)
};

/**
 * A base panels component for [`FixedPopupPanels`]{@link sandstone/FixedPopupPanels} that has
 * left key handler to navigate panels.
 *
 * @class FixedPopupPanelsBase
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const FixedPopupPanelsBase = (props) => {
	const handlers = useHandlers(fixedPopupPanelsHandlers, props);
	return <Viewport {...props} {...handlers} />;
};

/**
 * An instance of [`Panels`]{@link sandstone/Panels.Panels} which restricts the `Panel` to the right
 * or left side of the screen inside a popup. Typically used for overlaying panels over other
 * content.
 *
 * @class FixedPopupPanels
 * @memberof sandstone/FixedPopupPanels
 * @extends sandstone/FixedPopupPanels.FixedPopupPanelsBase
 * @mixes sandstone/FixedPopupPanels.FixedPopupPanelsDecorator
 * @ui
 * @public
 */
const FixedPopupPanels = FixedPopupPanelsDecorator(FixedPopupPanelsBase);

/**
 * Size of the popup.
 *
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels.prototype
 * @name width
 * @type {('narrow'|'half')}
 * @default 'narrow'
 * @public
 */

/**
 * The standard view container used inside a
 * [FixedPopupPanels]{@link sandstone/FixedPopupPanels.FixedPopupPanels} view manager instance.
 *
 * @class Panel
 * @extends sandstone/Panels.Panel
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const Panel = (props) => (<DefaultPanel {...props} css={css} hideChildren={false} />);

/**
 * A shortcut to access {@link sandstone/FixedPopupPanels.Panel}
 *
 * @name Panel
 * @static
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels
 */
FixedPopupPanels.Panel = Panel;

/**
 * A header component for a Panel with a `title` and `subtitle`, supporting several configurable
 * [`slots`]{@link ui/Slottable.Slottable} for components.
 *
 * @class Header
 * @extends sandstone/Panels.Header
 * @memberof sandstone/FixedPopupPanels
 * @ui
 * @public
 */
const Header = (props) => (<DefaultHeader type="compact" {...props} css={css} />);
// Relay the defaultSlot property to our version of Header
Header.defaultSlot = DefaultHeader.defaultSlot;

/**
 * A shortcut to access {@link sandstone/FixedPopupPanels.Header}
 *
 * @name Header
 * @static
 * @memberof sandstone/FixedPopupPanels.FixedPopupPanels
 */
FixedPopupPanels.Header = Header;

export default FixedPopupPanels;
export {
	FixedPopupPanels,
	FixedPopupPanelsBase,
	FixedPopupPanelsDecorator,
	Header,
	Panel
};
