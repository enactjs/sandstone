import classnames from 'classnames';
import Measurable from '@enact/ui/Measurable';
import {scale} from '@enact/ui/resolution';
import React from 'react';

import {ScrollPositionDecorator, useScrollPosition} from '../useScroll/useScrollPosition';

import Panel from './Panel';
import css from './CollapsingHeaderPanel.module.less';

/**
 * Sandstone specific behaviors to apply to [Item]{@link sandstone/Panels.CollapsingHeaderPanel}.
 *
 * @class CollapsingHeaderPanelDecorator
 * @hoc
 * @memberof sandstone/Panels
 * @public
 */
const CollapsingHeaderPanelDecorator = (Wrapped) => {
	return Measurable({refProp: 'titleRef', measurementProp: 'titleMeasurements'},
		ScrollPositionDecorator({valueProp: 'collapsed', transform: ({y}) => (y > scale(360))},
			function CollapsingHeaderPanelWrapper ({style, className, titleMeasurements, ...rest}) {
				const {collapsed} = useScrollPosition();

				const enhancedStyle = {
					...style,
					'--sand-panels-header-title-height': titleMeasurements && titleMeasurements.height + 'px' || '0px'
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
};

/**
 * A [Panel]{@link sandstone/Panels.Panel} that collapses its header in response to scrolling within
 * its children.
 *
 * @class CollapsingHeaderPanel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const CollapsingHeaderPanel = CollapsingHeaderPanelDecorator(Panel);

export default CollapsingHeaderPanel;
export {
	CollapsingHeaderPanel,
	CollapsingHeaderPanelDecorator
};
