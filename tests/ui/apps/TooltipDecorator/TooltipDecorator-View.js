import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';
import TooltipDecorator from '../../../../TooltipDecorator';
import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) =>
	<div {...props} style={{padding: scaleToRem(40)}}>
		<TooltipButton
			id="tooltipButton1"
			tooltipPosition="right middle"
			tooltipText="Hello Tooltip Button Default"
		>
			Tooltip Button Default
		</TooltipButton>
		<TooltipButton
			id="tooltipButton2"
			backgroundOpacity="transparent"
			selected
			tooltipText="Hello Tooltip Button Delayed"
			tooltipDelay={1000}
		>
			Tooltip Button Delayed
		</TooltipButton>
		<TooltipButton
			id="tooltipButton3"
			disabled
			size="small"
			tooltipText="Hello Tooltip Button Disabled"
		>
			Tooltip Button Disabled
		</TooltipButton>
		<TooltipButton
			id="tooltipButton4"
			tooltipMarquee
			tooltipWidth={400}
			tooltipText="A long tooltip to test marquee"
		>
			Tooltip Button with marquee tooltip
		</TooltipButton>
	</div>;

export default ThemeDecorator(app);
