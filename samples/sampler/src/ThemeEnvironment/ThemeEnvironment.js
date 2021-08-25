// Theme Environment

import classnames from 'classnames';
import kind from '@enact/core/kind';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import qs from 'query-string';

import css from './ThemeEnvironment.module.less';

const globalGroup = 'Global Knobs';

const reloadPage = () => {
	const {protocol, host, pathname} = window.parent.location;
	window.parent.location.href = protocol + '//' + host + pathname;
};

const PanelsBase = kind({
	name: 'ThemeEnvironmentPanels',

	propTypes: {
		description: PropTypes.string,
		noHeader: PropTypes.bool,
		noPanel: PropTypes.bool,
		noPanels: PropTypes.bool,
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'themeEnvironmentPanels'
	},

	render: ({children, description, noHeader, noPanel, noPanels, title, ...rest}) => (
		!noPanels ? <Panels {...rest} onClose={reloadPage}>
			{!noPanel ? <Panel className={css.panel}>
				{!noHeader ? (
					<Header title={title} subtitle={description} />
				) : null}
				{children}
			</Panel> : children}
		</Panels> : <div {...rest}>{children}</div>
	)
});

const FullscreenBase = kind({
	name: 'ThemeEnvrionment',

	render: (props) => (
		<div {...props} />
	)
});

const Theme = ThemeDecorator({overlay: false}, PanelsBase);
const ThemeFullscreen = ThemeDecorator({overlay: false}, FullscreenBase);

// NOTE: Locales taken from strawman. Might need to add more in the future.
const locales = {
	'local': '',
	'en-US - US English': 'en-US',
	'ko-KR - Korean': 'ko-KR',
	'es-ES - Spanish, with alternate weekends': 'es-ES',
	'am-ET - Amharic, 5 meridiems': 'am-ET',
	'th-TH - Thai, with tallglyph characters': 'th-TH',
	'ar-SA - Arabic, RTL and standard font': 'ar-SA',
	'ur-PK - Urdu, RTL and custom Urdu font': 'ur-PK',
	'zh-Hans-HK - Simplified Chinese, custom Hans font': 'zh-Hans-HK',
	'zh-Hant-HK - Traditional Chinese, custom Hant font': 'zh-Hant-HK',
	'vi-VN - Vietnamese, with tallglyph characters': 'vi-VN',
	'ta-IN - Tamil, custom Indian font': 'ta-IN',
	'ja-JP - Japanese, custom Japanese font': 'ja-JP',
	'en-JP - English, custom Japanese font': 'en-JP',
	'si-LK - Sinhala, external font family with tallglyph characters': 'si-LK',
	'km-KH - Cambodian Khmer, with tallglyph characters': 'km-KH'
};

// This mapping/remapping is necessary to support objects being used as select-knob values, since
// they cannot be safely URL encoded during the knob saving/linking process.
const backgroundLabels = {
	'Default (Based on Skin)': '',
	'Strawberries (Red)': 'backgroundColorful1',
	'Tunnel (Green)': 'backgroundColorful2',
	'Mountains (Blue)': 'backgroundColorful3',
	'Misty River': 'backgroundColorful4',
	'Turbulent Tides': 'backgroundColorful5',
	'Space Station': 'backgroundColorful6',
	'Warm Pup': 'backgroundColorful7',
	'Random': 'backgroundColorful8'
};

// Values of `backgroundLabels` must be kept in sync with keys of `backgroundLabelMap`.
const backgroundLabelMap = {
	'': '',
	'backgroundColorful1': '#bb3352 url("http://picsum.photos/1280/720?image=1080") no-repeat center/cover',
	'backgroundColorful2': '#4e6a40 url("http://picsum.photos/1280/720?image=1063") no-repeat center/cover',
	'backgroundColorful3': '#5985a8 url("http://picsum.photos/1280/720?image=930") no-repeat center/cover',
	'backgroundColorful4': '#71736d url("http://picsum.photos/1280/720?image=1044") no-repeat center/cover',
	'backgroundColorful5': '#547460 url("http://picsum.photos/1280/720?image=1053") no-repeat center/cover',
	'backgroundColorful6': '#7c4590 url("http://picsum.photos/1280/720?image=967") no-repeat center/cover',
	'backgroundColorful7': '#5d6542 url("http://picsum.photos/1280/720?image=1025") no-repeat center/cover',
	'backgroundColorful8': '#555 url("http://picsum.photos/1280/720") no-repeat center/cover'
};

const skins = {
	'Neutral': 'neutral',
	'Light': 'light'
};

const getArgs = (str) => {
	return qs.parse(str || (typeof window !== 'undefined' ? window.parent.location.search : ''));
};

// This allows any knob to be taken from the URL.
const getKnobFromArgs = (args, propName, fallbackValue) => {
	const knob = 'knob-' + propName;
	let value = fallbackValue;

	if (args && knob in args) {
		try {
			// If it's valid JSON, parse it
			value = JSON.parse(args[knob]);
		} catch (e) {
			// no handling required; allow fallbackValue to be used
		}
	}

	return value;
};

const StorybookDecorator = (story, config = {}) => {
	// Executing `story` here allows the story knobs to register and render before the global knobs below.
	const sample = story();

	const {globals} = config;

	const Config = {
		defaultProps: {
			locale: 'en-US',
			'large text': false,
			'high contrast': false,
			skin: 'neutral'
		},
		groupId: globalGroup
	};

	const DevelopmentConfig = {
		defaultProps: {
			'debug aria': false,
			'debug layout': false,
			'debug spotlight': false,
			'debug sprites': false
		},
		groupId: 'Development'
	};

	const componentName = config.kind.replace(/^([^\/]+)\//, '');

	// NOTE: 'config' object is not extensible.
	const hasInfoText = config.parameters && config.parameters.info && config.parameters.info.text;
	const hasProps = config.parameters && config.parameters.props;
	const args = getArgs();
	const classes = {
		aria: boolean('debug aria', DevelopmentConfig, getKnobFromArgs(args, 'debug aria')),
		layout: boolean('debug layout', DevelopmentConfig, getKnobFromArgs(args, 'debug layout')),
		spotlight: boolean('debug spotlight', DevelopmentConfig, getKnobFromArgs(args, 'debug spotlight')),
		sprites: boolean('debug sprites', DevelopmentConfig, getKnobFromArgs(args, 'debug sprites'))
	};
	if (Object.keys(classes).length > 0) {
		classes.debug = true;
	}

	globals.locale = select('locale', locales, Config, globals.locale);
	globals.largeText = boolean('large text', Config, getKnobFromArgs(args, 'large text', globals.largeText));
	globals.highContrast = boolean('high contrast', Config, getKnobFromArgs(args, 'high contrast', globals.highContrast));
	globals.background = select('background', backgroundLabels, Config, getKnobFromArgs(args, 'background', globals.background));
	globals.skin = select('skin', skins, Config, getKnobFromArgs(args, 'skin', globals.skin));

	return (
		<Theme
			className={classnames(classes)}
			title={componentName === config.name ? `Sandstone ${componentName}` : `${componentName} ${config.name}`}
			description={hasInfoText ? config.parameters.info.text : null}
			locale={globals.locale}
			textSize={globals.largeText ? 'large' : 'normal'}
			highContrast={globals.highContrast}
			style={{
				'--sand-env-background': backgroundLabelMap[globals.background]
			}}
			skin={globals.skin}
			{...hasProps ? config.parameters.props : null}
		>
			{sample}
		</Theme>
	);
};

const FullscreenStorybookDecorator = (story, config = {}) => {
	const sample = story();
	const args = getArgs();
	return (
		<ThemeFullscreen
			title={`${config.kind} ${config.story}`.trim()}
			description={config.description}
			locale={select('locale', locales, 'en-US')}
			textSize={boolean('large text', getKnobFromArgs(args, 'large text')) ? 'large' : 'normal'}
			highContrast={boolean('high contrast', getKnobFromArgs(args, 'high contrast'))}
			style={backgroundLabelMap[select('background', backgroundLabels, getKnobFromArgs(args, 'background'))]}
			skin={select('skin', skins, getKnobFromArgs(args, 'skin'))}
		>
			{sample}
		</ThemeFullscreen>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Theme, FullscreenStorybookDecorator as ThemeFullscreen};
