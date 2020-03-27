import classnames from 'classnames';
import Measurable from '@enact/ui/Measurable';
import React from 'react';

import {ScrollPositionDecorator, useScrollPosition} from '../useScroll/useScrollPosition';

import {Panel} from './Panel';
import css from './CollapsingHeaderPanel.module.less';

/**
 * Sandstone specific behaviors to apply to [Item]{@link sandstone/Panels.CollapsingHeaderPanel}.
 *
 * @class CollapsingHeaderPanelDecorator
 * @hoc
 * @memberof sandstone/CollapsingHeaderPanel
 * @public
 */
const CollapsingHeaderPanelDecorator = (Wrapped) => {
	return Measurable({refProp: 'titleRef', measurementProp: 'titleMeasurements'},
		ScrollPositionDecorator(
			({style, className, titleMeasurements, ...rest}) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const {collapsed} = useScrollPosition();

				const enhancedStyle = {
					...style,
					'--panel-header-title-height': titleMeasurements && titleMeasurements.height + 'px' || 'auto'
				};

				const enhancedClassName = classnames(
					className,
					collapsed ? css.collapsed : '',
					css.panel
				);
				return <Wrapped {...rest} className={enhancedClassName} style={enhancedStyle} />;
			}
		)
	);
}

/**
 * A [Panel]{@link sandstone/Panels.Panel} that collapses its header in response to scrolling within
 * its children.
 *
 * @class Panel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const CollapsingHeaderPanel = CollapsingHeaderPanelDecorator(Panel);

export default CollapsingHeaderPanel;
export {CollapsingHeaderPanel, CollapsingHeaderPanelDecorator};
