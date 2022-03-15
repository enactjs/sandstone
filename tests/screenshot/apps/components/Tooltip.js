import {Tooltip} from '../../../../TooltipDecorator/TooltipDecorator';

import {withConfig} from './utils';

const TooltipDisplay = (props) => (
	<div {...props}>
		<Tooltip type={props.type} direction={props.direction} arrowAnchor={props.arrowAnchor} style={{top: '50%', left: '50%'}} marquee={props.marquee} width={props.tooltipWidth}>{`View ${props.type} ${props.direction} ${props.arrowAnchor}`}</Tooltip>
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

	TooltipDisplay({type: 'balloon', direction:'left', arrowAnchor:'middle'}),

	TooltipDisplay({type: 'transparent', direction:'below', arrowAnchor:'center'}),

	TooltipDisplay({type: 'transparent', direction:'above', arrowAnchor:'center'}),

	TooltipDisplay({type: 'transparent', direction:'left', arrowAnchor:'middle'}),

	// Custom width
	TooltipDisplay({type: 'balloon', direction:'above', arrowAnchor:'center', tooltipWidth: 200}),

	TooltipDisplay({type: 'balloon', direction:'below', arrowAnchor:'center', tooltipWidth: 200}),

	TooltipDisplay({type: 'balloon', direction:'right', arrowAnchor:'middle', tooltipWidth: 200}),

	TooltipDisplay({type: 'balloon', direction:'left', arrowAnchor:'middle', tooltipWidth: 200}),

	// Testing marquee
	TooltipDisplay({type: 'balloon', direction:'above', arrowAnchor:'center', tooltipWidth: 200, marquee: true}),

	TooltipDisplay({type: 'balloon', direction:'below', arrowAnchor:'center', tooltipWidth: 200, marquee: true}),

	TooltipDisplay({type: 'balloon', direction:'right', arrowAnchor:'middle', tooltipWidth: 200, marquee: true}),

	TooltipDisplay({type: 'balloon', direction:'left', arrowAnchor:'middle', tooltipWidth: 200, marquee: true})

]);

export default ToolTipTests;
