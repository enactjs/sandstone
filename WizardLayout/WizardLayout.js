import kind from '@enact/core/kind';
import {Cell, Column} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import {SlideLeftArranger, ViewManager} from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Steps from '../Steps';

import {ActivityArranger} from '../Panels/Arrangers';
import BreadcrumbDecorator from '../Panels/BreadcrumbDecorator';
import Header from '../Panels/Header';

/**
 * A Panel is the standard view container used inside a [WizardLayout]{@link sandstone/Panels.WizardLayout} view
 * manager instance.
 *
 * [WizardLayout]{@link sandstone/Panels.WizardLayout} will typically contain several instances of these and
 * transition between them.
 *
 * @class WizardLayout
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const WizardLayoutBase = kind({

	name: 'WizardLayout',

	propTypes: /** @lends sandstone/Panels.WizardLayout.prototype */ {
		/**
		 * List of titles to display. Could be an array of strings or array of objects;
		 * each object in the array of titles should include a `title` property and, optionally, an
		 * `subtitle` property.
		 *
		 * @type {(Object[]|String[])}
		 * @required
		 * @public
		 */
		titles: PropTypes.array.isRequired,

		/**
		 * The currently selected step.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Called when the index value is changed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onChange: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	styles: {
		className: 'wizardPanel enact-fit'
	},

	handlers: {
		onIncrementStep: (ev, {index, onChange, titles}) => {
			if (onChange) {
				const nextIndex = index < (titles.length - 1) ? (index + 1) : index;

				onChange({index: nextIndex});
			}
		},
		onDecrementStep: (ev, {index, onChange}) => {
			if (onChange) {
				const prevIndex = index > 0 ? (index - 1) : index;

				onChange({index: prevIndex});
			}
		}
	},

	computed: {
		subtitle: ({titles, index}) => titles[index] ? titles[index].subtitle : null,
		title: ({titles, index}) => typeof titles[index] === 'object' && titles[index] !== null ? titles[index].title : titles[index]
	},

	render: ({children, index, onIncrementStep, onDecrementStep, subtitle, title, titles, ...rest}) => {
		return (
			<Column {...rest}>
				<Cell component={Header} centered shrink subtitle={subtitle} title={title} type="wizard">
					<Steps current={index + 1} slot="slotAbove" total={titles.length} />
					{index < (titles.length - 1) ? (
						<Button icon="arrowlargeright" onClick={onIncrementStep} slot="slotAfter" />
					) : null}
					{index > 0 ? (
						<Button icon="arrowlargeleft" onClick={onDecrementStep} slot="slotBefore" />
					) : null}
				</Cell>
				<Cell component={ViewManager} arranger={SlideLeftArranger} index={index}>
					{children}
				</Cell>
			</Column>
		);
	}
});

const WizardLayoutDecorator = compose(
	Changeable({prop: 'index'})
);

const WizardLayout = WizardLayoutDecorator(WizardLayoutBase);

export default WizardLayout;
export {WizardLayout, WizardLayoutBase};
