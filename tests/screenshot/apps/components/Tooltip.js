import {Tooltip} from '../../../../TooltipDecorator/TooltipDecorator';
import React from 'react';

import {withConfig} from './utils';

const TooltipDisplay = (props) => (
	<div {...props}>
		<Tooltip type={props.type} direction={props.direction} arrowAnchor={props.arrowAnchor} style={{top: '50%', left: '50%'}}>{`View ${props.type} ${props.direction} ${props.arrowAnchor}`}</Tooltip>
	</div>
);

const ToolTipTests = withConfig({
	wrapper: {
		full: true
	}
}, [
	TooltipDisplay({type: 'balloon', direction:'above', arrowAnchor:'center'}),

	TooltipDisplay({type: 'balloon', direction:'below', arrowAnchor:'center'}),

	TooltipDisplay({type: 'balloon', direction:'right', arrowAnchor:'middle'}),

	TooltipDisplay({type: 'transparent', direction:'below', arrowAnchor:'center'}),

	TooltipDisplay({type: 'transparent', direction:'above', arrowAnchor:'center'}),

	TooltipDisplay({type: 'transparent', direction:'left', arrowAnchor:'middle'})
]);

export default ToolTipTests;
