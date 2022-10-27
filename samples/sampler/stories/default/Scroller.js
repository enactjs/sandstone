import classnames from 'classnames';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {Primary, Title} from '@enact/storybook-utils/addons/docs';
import BodyText from '@enact/sandstone/BodyText';
import Scroller from '@enact/sandstone/Scroller';
import ri from '@enact/ui/resolution';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';

import css from './Scroller.module.less';

const prop = {
	direction: ['both', 'horizontal', 'vertical'],
	focusableScrollbarOption: {
		false: false,
		true: true,
		byEnter: 'byEnter'
	},
	scrollbarOption: ['auto', 'hidden', 'visible'],
	scrollModeOption: ['native', 'translate']
};

const ScrollerConfig = mergeComponentMetadata('Scroller', UiScrollerBasic, Scroller);

export default {
	title: 'Sandstone/Scroller',
	component: 'Scroller',
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Primary />
				</>
			)
		}
	}
};

export const _Scroller = (args) => {
	const direction = args['direction'],
		focusableScrollbar =
			prop.focusableScrollbarOption[
				args['focusableScrollbar']
			],
		horizontalScrollbar = args['horizontalScrollbar'],
		verticalScrollbar = args['verticalScrollbar'];
	return (
		<Scroller
			className={classnames({
				[css.verticalPadding]:
					(direction !== 'horizontal' && verticalScrollbar !== 'hidden') ||
					verticalScrollbar === 'visible',
				[css.horizontalPadding]:
					(direction !== 'vertical' && horizontalScrollbar !== 'hidden') ||
					horizontalScrollbar === 'visible',
				[css.bodyText]: focusableScrollbar || null
			})}
			direction={direction}
			fadeOut={args['fadeOut']}
			focusableScrollbar={focusableScrollbar}
			horizontalScrollbar={horizontalScrollbar}
			hoverToScroll={args['hoverToScroll']}
			key={args['scrollMode']}
			noScrollByWheel={args['noScrollByWheel']}
			onScrollStart={action('onScrollStart')}
			onScrollStop={action('onScrollStop')}
			scrollMode={args['scrollMode']}
			spotlightDisabled={args['spotlightDisabled']}
			verticalScrollbar={verticalScrollbar}
		>
			<div
				style={{
					height: ri.scaleToRem(2004),
					width: ri.scaleToRem(4002)
				}}
			>
				<BodyText>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					<br />
					Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt.
					Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
				</BodyText>
				<div
					style={{
						marginTop: ri.scaleToRem(1602)
					}}
				>
					<BodyText>
						Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur
						sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
					</BodyText>
				</div>
			</div>
		</Scroller>
	);
};

select('direction', _Scroller, prop.direction, ScrollerConfig);
select('focusableScrollbar', _Scroller, prop.focusableScrollbarOption, ScrollerConfig);
select('horizontalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);
select('verticalScrollbar', _Scroller, prop.scrollbarOption, ScrollerConfig);
boolean('fadeOut', _Scroller, ScrollerConfig);
boolean('hoverToScroll', _Scroller, ScrollerConfig);
boolean('noScrollByWheel', _Scroller, ScrollerConfig);
select('scrollMode', _Scroller, prop.scrollModeOption, ScrollerConfig);
boolean('spotlightDisabled', _Scroller, ScrollerConfig, false);

_Scroller.storyName = 'Scroller';
_Scroller.parameters = {
	info: {
		text: 'Basic usage of Scroller'
	}
};
