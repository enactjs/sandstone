// import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {ScrollbarBase as UiScrollbarBase} from '@enact/ui/Scrollable/Scrollbar';
import PropTypes from 'prop-types';
import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';

import ScrollThumb from './ScrollThumb';
// import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

/**
 * A Sandstone-styled scroller base component.
 *
 * @class ScrollbarBase
 * @memberof sandstone/Scrollable
 * @extends ui/ScrollbarBase
 * @ui
 * @private
 */
const ScrollbarBase = memo(forwardRef((props, ref) => {
	// Refs
	const scrollbarRef = useRef();
	// render
	const {cbAlertThumb, clientSize, corner, vertical, ...rest} = props;

	delete rest.focusableScrollbar;
	delete rest.rtl;

	useImperativeHandle(ref, () => {
		const {getContainerRef, showThumb, startHidingThumb, update: uiUpdate} = scrollbarRef.current;

		return {
			get uiScrollbarContainer () {
				return getContainerRef();
			},
			showThumb,
			startHidingThumb,
			uiUpdate,
			update: (bounds) => {
				uiUpdate(bounds);
			}
		};
	}, [scrollbarRef]);

	return (
		<UiScrollbarBase
			clientSize={clientSize}
			corner={corner}
			css={componentCss}
			ref={scrollbarRef}
			vertical={vertical}
			childRenderer={({thumbRef}) => { // eslint-disable-line react/jsx-no-bind
				return (
					<ScrollThumb
						{...rest}
						cbAlertThumb={cbAlertThumb}
						key="thumb"
						ref={thumbRef}
						vertical={vertical}
					/>
				);
			}}
		/>
	);
}));

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends sandstone/Scrollable.Scrollbar.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link sandstone/Scrollable.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func,

	/**
	 * Client size of the container; valid values are an object that has `clientWidth` and `clientHeight`.
	 *
	 * @type {Object}
	 * @property {Number}    clientHeight    The client height of the list.
	 * @property {Number}    clientWidth    The client width of the list.
	 * @public
	 */
	clientSize: PropTypes.shape({
		clientHeight: PropTypes.number.isRequired,
		clientWidth: PropTypes.number.isRequired
	}),

	/**
	 * Adds the corner between vertical and horizontal scrollbars.
	 *
	 * @type {Booelan}
	 * @default false
	 * @public
	 */
	corner: PropTypes.bool,

	/**
	 * Registers the Scrollbar component with an
	 * {@link core/internal/ApiDecorator.ApiDecorator}.
	 *
	 * @type {Function}
	 * @private
	 */
	// setApiProvider: PropTypes.func,

	/**
	 * The scrollbar will be oriented vertically.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	vertical: PropTypes.bool
};

ScrollbarBase.defaultProps = {
	corner: false,
	vertical: true
};

/**
 * A Sandstone-styled scroll bar. It is used in [Scrollable]{@link sandstone/Scrollable.Scrollable}.
 *
 * @class Scrollbar
 * @memberof sandstone/Scrollable
 * @ui
 * @private
 */
/* TODO: Is it possible to use ApiDecorator?
const Scrollbar = ApiDecorator(
	{api: [
		'showThumb',
		'startHidingThumb',
		'update'
	]}, Skinnable(ScrollbarBase)
);
*/
const Scrollbar = ScrollbarBase;

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	Scrollbar as ScrollbarBase
};
