import deprecate from '@enact/core/internal/deprecate';
import {handle, forward, adaptEvent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';

import css from './Panels.module.less';

// Since we expose `onSelect` to handle breadcrumb selection, we need that handler to be set on a
// component that proxies mouse events for key events so we create a spottable div that will
// get the right classes as well as handle events correctly.
const SpottableDiv = Spottable('div');

/**
 * The width of a breadcrumb (in 4K resolution) which may be used to allocate space for it in a
 * panels layout. This value will be scaled for other resolutions so should be divisible by 6.
 *
 * @type {Number}
 * @default 192
 * @private
 * @memberof sandstone/Panels
 */
export const breadcrumbWidth = 192;

/**
 * Transparent bar used to navigate to a prior Panel.
 *
 * @class Breadcrumb
 * @memberof sandstone/Panels
 * @ui
 * @deprecated Will be removed in 1.0.0-beta.1.
 * @public
 */
const BreadcrumbBase = kind({
	name: 'Breadcrumb',

	propTypes: /** @lends sandstone/Panels.Breadcrumb.prototype */ {
		/**
		 * Index of the associated panel.
		 *
		 * @type {Number}
		 * @required
		 */
		index: PropTypes.number.isRequired,

		/**
		 * Called when the breadcrumb is clicked.
		 *
		 * @private
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * Called when the breadcrumb is clicked.
		 *
		 * The index of the clicked breadcrumb is passed in the event data.
		 *
		 * @type {Function}
		 */
		onSelect: PropTypes.func
	},

	styles: {
		css,
		className: 'breadcrumb'
	},

	handlers: {
		onSelect: handle(
			forward('onClick'),
			adaptEvent((ev, {index}) => ({type: 'onSelect', index}), forward('onSelect'))
		)
	},

	render: deprecate(({children, index, onSelect, ...rest}) => (
		<SpottableDiv
			{...rest}
			aria-label={$L('GO TO PREVIOUS')}
			data-index={index}
			onClick={onSelect}
		>
			<div className={css.breadcrumbHeader}>
				{children}
			</div>
		</SpottableDiv>
	),
	{
		name: 'sandstone/Panels.Breadcrumb',
		until: '1.0.0-beta.1'
	})
});

export default BreadcrumbBase;
export {BreadcrumbBase as Breadcrumb, BreadcrumbBase};
