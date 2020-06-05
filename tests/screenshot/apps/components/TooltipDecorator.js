import {Tooltip} from '../../../TooltipDecorator';
import React from 'react';


const ToolTipTests = [
	<Tooltip type="balloon" direction="above" arrowAnchor="left" style={{top: 0, left: '50%'}}>above left</Tooltip>,

	<Tooltip type="transparent" direction="below" arrowAnchor="center" style={{top: 0, left: '50%'}}>above left</Tooltip>
];

export default ToolTipTests;
