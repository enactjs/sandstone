import kind from '@enact/core/kind';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import {SlideLeftArranger, ViewManager} from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Steps from '../Steps';
import {Header} from '../Panels';

import componentCss from './WizardLayout.module.less';

/**
 * A WizardLayout that has steps with corresponding views. Required to have [Panel]{@link sandstone/Panels} as children.
 *
 * [WizardLayout]{@link sandstone/WizardLayout} transitions between [Panel]{@link sandstone/Panels} with next button and previous button.
 *
 * @class WizardLayout
 * @memberof sandstone/WizardLayout
 * @ui
 * @public
 */
const WizardLayoutBase = kind({

	name: 'WizardLayout',

	propTypes: /** @lends sandstone/WizardLayout.WizardLayout.prototype */ {
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
		 * Buttons to be included under the component.
		 *
		 * Typically, up to 2 buttons are used.
		 *
		 * @type {Element|Element[]}
		 * @public
		 */
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

		/**
		 * The footer for WizardLayout.
		 *
		 * @type {node}
		 * @public
		 */
		footer: PropTypes.node,

		/**
		 * The currently selected step.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * The text for next button.
		 *
		 * @type {String}
		 * @public
		 */
		nextButtonText: PropTypes.string,

		/**
		 * Called when the index value is changed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * The text for previous button.
		 *
		 * @type {String}
		 * @public
		 */
		prevButtonText: PropTypes.string
	},

	defaultProps: {
		index: 0
	},

	styles: {
		css: componentCss,
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

	render: ({buttons, children, footer, index, nextButtonText, onIncrementStep, onDecrementStep, prevButtonText, subtitle, title, titles, ...rest}) => {
		return (
			<Column {...rest}>
				<Cell component={Header} centered shrink subtitle={subtitle} title={title} type="wizard">
					<Steps current={index + 1} slot="slotAbove" total={titles.length} />
					<Button disabled={index === (titles.length - 1)} icon="arrowlargeright" onClick={onIncrementStep} slot="slotAfter">{nextButtonText}</Button>
					<Button disabled={index === 0} icon="arrowlargeleft" onClick={onDecrementStep} slot="slotBefore">{prevButtonText}</Button>
				</Cell>
				<Cell className={componentCss.content} component={ViewManager} arranger={SlideLeftArranger} index={index}>
					{children}
				</Cell>
				<Cell className={componentCss.bottomContainer} shrink>
					<div className={componentCss.buttonContainer}>
						{buttons}
					</div>
					<div className={componentCss.footer}>
						{footer}
					</div>
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
