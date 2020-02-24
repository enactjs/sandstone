import kind from '@enact/core/kind';
import Slottable from '@enact/ui/Slottable';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Steps from '../Steps';

import {ActivityArranger} from './Arrangers';
import BreadcrumbDecorator from './BreadcrumbDecorator';
import Header from './Header';
import {PanelsBase} from './Panels';

import css from './Panel.module.less';

/**
 * A Panel is the standard view container used inside a [WizardPanel]{@link sandstone/Panels.WizardPanel} view
 * manager instance.
 *
 * [WizardPanel]{@link sandstone/Panels.WizardPanel} will typically contain several instances of these and
 * transition between them.
 *
 * @class WizardPanel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const PanelBase = kind({

	name: 'Panel',

	propTypes: /** @lends sandstone/Panels.WizardPanel.prototype */ {
	},

	defaultProps: {
	},

	styles: {
		css,
		className: 'wizardPanel'
	},

	handlers: {
	},

	computed: {
	},

	render: ({children, index, subtitle, title, ...rest}) => {

		return (
			<PanelsBase>
				<header>
					<Header centered subtitle={subtitle} title={title} type="wizard">
						<slotAbove>
							<Steps current={index + 1} />
						</slotAbove>
						<slotAfter>
							<Button icon="arrowRight" />
						</slotAfter>
						<slotBefore>
							<Button icon="arrowleft" />
						</slotBefore>
					</Header>
				</header>
				{children}
			</PanelsBase>
		);
	}
});

/**
 * Prevents the component from restoring any framework shared state.
 *
 * When `false`, the default, Panel will store state for some framework components in order to
 * restore that state when returning to the Panel. Setting this prop to `true` will suppress that
 * behavior and not store or retrieve any framework component state.
 *
 * @name noSharedState
 * @type {Boolean}
 * @default {false}
 * @memberof sandstone/Panels.Panel.prototype
 */
const Panel = SharedStateDecorator(
	{idProp: 'data-index'},
	SpotlightContainerDecorator(
		{
			// prefer any spottable within the panel body for first render
			continue5WayHold: true,
			defaultElement: [`.${spotlightDefaultClass}`, `.${css.body} *`],
			enterTo: 'last-focused',
			preserveId: true
		},
		Slottable(
			{slots: ['header']},
			PanelBase
		)
	)
);

export default Panel;
export {Panel, PanelBase};
