import Button from '@enact/sandstone/Button';
import {Panel} from '@enact/sandstone/Panels';
import Popup from '@enact/sandstone/Popup';
import SwitchItem from '@enact/sandstone/SwitchItem';
import QuickGuidePanels from '@enact/sandstone/QuickGuidePanels';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';

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
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;
	const widthratio = screenWidth / 1920;
	const heightratio = screenHeight / 1080;

	return (
		<>
			<Panel style={{margin: ri.scaleToRem(240)}}>
				<Button size="small" style={{marginLeft: ri.scaleToRem(64), marginBottom: ri.scaleToRem(160)}}>Button</Button>
				<br />
				<SwitchItem inline>item</SwitchItem>
			</Panel>
			<Popup
				open
				position="fullscreen"
				scrimType="transparent"
				style={{backgroundColor: 'transparent'}}
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
							This is a guide to sandstone components<br />
							Sample needs to be run with FHD or 4K dimensions
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgba(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z`} />
							</svg>
						</div>
					</QuickGuidePanels.Panel>
					<QuickGuidePanels.Panel>
						<div className={css.guide}>
							This is a sandstone button component
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgba(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z M${184 * widthratio} ${100 * heightratio} v${100 * heightratio} h${200 * widthratio} v-${100 * heightratio}z`} />
							</svg>
						</div>
					</QuickGuidePanels.Panel>
					<QuickGuidePanels.Panel aria-label={'aria test'}>
						<div className={css.guide}>
							This is a sandstone switch component
						</div>
						<div className={css.svg}>
							<svg width="100%" height="100%" fill="rgba(87, 94, 102, 0.3)">
								<path d={`M0 0 h${screenWidth} v${screenHeight} h-${screenWidth}z M${184 * widthratio} ${232 * heightratio} v${100 * heightratio} h${200 * widthratio} v-${100 * heightratio}z`} />
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
