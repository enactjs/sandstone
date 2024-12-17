import {scaleToRem} from '@enact/ui/resolution';

import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import Slider from '../../../../Slider';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(900)}}>
			<Heading>Slider default</Heading>
			<Slider defaultValue={0} id="sliderDefault"  />

			<Heading>Slider activate on select</Heading>
			<Slider activateOnSelect id="sliderActivateOnSelect"  />

			<Heading>Slider custom progressAnchor</Heading>
			<Slider activateOnSelect id="sliderCustomProgressAnchor" progressAnchor={0.7} />

			<Heading>Slider vertical</Heading>
			<Slider id="sliderVertical" max={10} orientation="vertical" />

			<Heading>Slider disabled</Heading>
			<Slider disabled id="sliderDisabled"  />

			<Heading>Slider vertical disabled</Heading>
			<Slider disabled id="sliderVerticalDisabled" max={10} orientation="vertical" />
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
