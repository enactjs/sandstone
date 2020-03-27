import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Slottable from '@enact/ui/Slottable';
import Measurable from '@enact/ui/Measurable';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {ActivityArranger} from './Arrangers';
import BreadcrumbDecorator from './BreadcrumbDecorator';
import {PanelsBase} from './Panels';

const ActivityPanelsDecorator = compose(
	Slottable({slots: ['controls']}),
	Measurable({refProp: 'controlsRef', measurementProp: 'controlsMeasurements'}),
	Skinnable,
	BreadcrumbDecorator({
		className: 'panels activity enact-fit',
		max: 1,
		panelArranger: ActivityArranger
	})
);

/**
 * An instance of Panels in which the Panel uses the entire viewable screen with a single breadcrumb
 * for the previous panel when viewing any panel beyond the first.
 *
 * **Note** ActivityPanels requires that the `data-index` property that all panels variations add to
 * its children be applied to the root DOM node of each child in order to manage layout correctly.
 * It is recommended that you spread any extra props on the root node but you may also handle this
 * property explicitly if necessary.
 *
 * @class ActivityPanels
 * @memberof sandstone/Panels
 * @ui
 * @deprecated Will be removed in 1.0.0-beta.1. Use {@link sandstone/Panels.Panels} instead.
 * @public
 */

class Deprecated extends React.Component {
	constructor (props) {
		super(props);
		deprecate({
			name: 'sandstone/Panels.ActivityPanels',
			replacedBy: 'sandstone/Panels',
			until: '1.0.0-beta.1'
		});
	}

	render () {
		return (<PanelsBase {...this.props} />);
	}
}

const ActivityPanels = ActivityPanelsDecorator(Deprecated);

export default ActivityPanels;
export {ActivityPanels};
