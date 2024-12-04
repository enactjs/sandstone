import Button from '@enact/sandstone/Button';
import {Panel} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import SwitchItem from '@enact/sandstone/SwitchItem';
import QuickGuidePanels from '@enact/sandstone/QuickGuidePanels';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/controls';

import css from './QuickGuidePanels.module.less';

QuickGuidePanels.displayName = 'QuickGuidePanels';

const propOptions = {
	buttonVisibility: ['auto', 'always', 'never']
};

export default {
	title: 'Sandstone/QuickGuidePanels',
	component: 'QuickGuidePanels'
};

export const _QuickGuidePanels = (args) => {
	const screenWidth = window?.screen.width;
	const screenHeight = window?.screen.height;
	const widthRatio = screenWidth / 1920;
	const heightRatio = screenHeight / 1080;

	return (
		<>
			<Panel css={css}>
				<Button css={css} focusEffect="static" size="small">Button</Button>
				<br />
				<SwitchItem inline>item</SwitchItem>
			</Panel>
			<Popup
				css={css}
				open
				position="fullscreen"
				scrimType="transparent"
			>
				<QuickGuidePanels
					current={args['current']}
					nextButtonVisibility={args['nextButtonVisibility']}
					onBack={action('onBack')}
					onChange={action('onChange')}
					onClose={action('onClose')}
					onNextClick={action('onNextClick')}
					onPrevClick={action('onPrevClick')}
					prevButtonVisibility={args['prevButtonVisibility']}
					total={args['total']}
				>
					<QuickGuidePanels.Panel>
						<div className={css.guide}>
							This is a guide to Sandstone components.<br />
							This sample needs to be run with FHD or 4K dimensions.
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgb(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z`} />
							</svg>
						</div>
					</QuickGuidePanels.Panel>
					<QuickGuidePanels.Panel>
						<div className={css.guide}>
							This is a Sandstone Button component.
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgb(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z M${184 * widthRatio} ${100 * heightRatio} v${100 * heightRatio} h${200 * widthRatio} v-${100 * heightRatio}z`} />
							</svg>
						</div>
					</QuickGuidePanels.Panel>
					<QuickGuidePanels.Panel aria-label={'aria test'}>
						<div className={css.guide}>
							This is a Sandstone SwitchItem component.
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgb(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z M${184 * widthRatio} ${232 * heightRatio} v${100 * heightRatio} h${200 * widthRatio} v-${100 * heightRatio}z`} />
							</svg>
						</div>
					</QuickGuidePanels.Panel>
				</QuickGuidePanels>
			</Popup>
		</>
	);
};

number('current', _QuickGuidePanels, 0);
select('nextButtonVisibility', _QuickGuidePanels, propOptions.buttonVisibility, 'auto');
select('prevButtonVisibility', _QuickGuidePanels, propOptions.buttonVisibility, 'auto');
number('total', _QuickGuidePanels, 0);

_QuickGuidePanels.storyName = 'QuickGuidePanels';
_QuickGuidePanels.parameters = {
	props: {
		noPanel: true
	}
};
