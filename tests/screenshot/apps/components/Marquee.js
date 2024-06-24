import Marquee from '../../../../Marquee';
import * as css from './Marquee.module.less';

const MarqueeTests = [
	<Marquee />,
	<div><Marquee className={css.marquee}>Text</Marquee></div>
];

export default MarqueeTests;
