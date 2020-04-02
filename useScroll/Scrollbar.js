// import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {ScrollbarBase as UiScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import ReactDOM from 'react-dom';

import ScrollThumb from './ScrollThumb';
// import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

/**
 * A Sandstone-styled scroller base component.
 *
 * @class ScrollbarBase
 * @memberof sandstone/useScroll
 * @extends ui/ScrollbarBase
 * @ui
 * @private
 */
const ScrollbarBase = memo(forwardRef((props, ref) => {
	// Refs
	const mutableRef = useRef({prevScrollPosition: -1, scale: 1});
	const scrollbarRef = useRef();
	const thumbDivRef = useRef();

	// render
	const {className, clientSize, vertical, ...rest} = props;

	delete rest.corner;

	const syncHeight = (initialHiddenHeight, scrollPosition) => {
		if (scrollbarRef.current && typeof window !== 'undefined' && mutableRef.current.prevScrollPosition !== scrollPosition) {
			const
				scrollbarNode = scrollbarRef.current.getContainerRef().current,
				thumbNode = ReactDOM.findDOMNode(thumbDivRef.current), // eslint-disable-line react/no-find-dom-node
				height = parseInt(window.getComputedStyle(scrollbarNode).getPropertyValue('height')),
				scale = (height - initialHiddenHeight + scrollPosition) / (height);

			// To scale the scrollbar height depending on the VirtualList position
			scrollbarNode.style.transform = 'scale3d(1, ' + scale + ', 1)';
			thumbNode.style.transform = 'scale3d(1, ' + 1 / scale + ', 1)';

			mutableRef.current.scale = scale;
		}
		mutableRef.current.prevScrollPosition = scrollPosition;
	};

	useImperativeHandle(ref, () => {
		const {getContainerRef, showThumb, startHidingThumb, update: uiUpdate} = scrollbarRef.current;

		return {
			get uiScrollbarContainer () {
				return getContainerRef();
			},
			showThumb,
			startHidingThumb,
			syncHeight,
			uiUpdate,
			update: (bounds) => {
				uiUpdate(bounds, mutableRef.current.scale);
			}
		};
	}, [scrollbarRef]);

	return (
		<UiScrollbarBase
			clientSize={clientSize}
			className={classNames(className, componentCss.initialHiddenHeight)}
			css={componentCss}
			minThumbSize={120}
			ref={scrollbarRef}
			vertical={vertical}
			childRenderer={({thumbRef}) => { // eslint-disable-line react/jsx-no-bind
				return (
					<ScrollThumb
						{...rest}
						ref={thumbRef}
						thumbDivRef={thumbDivRef}
						vertical={vertical}
					/>
				);
			}}
		/>
	);
}));

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends sandstone/useScroll.Scrollbar.prototype */ {
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
	vertical: true
};

/**
 * A Sandstone-styled scroll bar.
 *
 * @class Scrollbar
 * @memberof sandstone/useScroll
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
