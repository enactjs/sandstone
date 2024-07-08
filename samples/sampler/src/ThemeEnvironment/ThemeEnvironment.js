// Theme Environment

import classnames from 'classnames';
import kind from '@enact/core/kind';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';

import css from './ThemeEnvironment.module.less';
import {BACKGROUND_ADDON_ID, TEXT_ADDON_ID} from "../../addon-toolbar/constants";

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

const Theme = ThemeDecorator({overlay: false}, PanelsBase);

const getPropFromURL = (propName) => {
	propName = propName.replaceAll(' ', '+');
	const locationParams = window.parent.location.search;

	const propNameStartIndex = locationParams.indexOf(propName);
	const propValueStartIndex = locationParams.indexOf(':', propNameStartIndex);
	let propValueEndIndex = locationParams.indexOf(';', propValueStartIndex);
	let lastCharacter = '';

	if (propNameStartIndex > -1) {
		if (propName.includes('color')) {
			const startIndex = locationParams.indexOf('(', propValueStartIndex);
			const endIndex = locationParams.indexOf(')', startIndex);

			return '#' + locationParams.substring(startIndex + 1, endIndex);
		}

		if (propValueEndIndex === -1) {
			propValueEndIndex = locationParams.indexOf(locationParams.at(-1), propValueStartIndex);
			lastCharacter = locationParams.at(-1);
		}

		return locationParams.substring(propValueStartIndex + 1, propValueEndIndex) + lastCharacter;
	}

	return null;
};

const getRGBColor = (color) => {
	const hexColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

	if (hexColor) {
		const red = parseInt(hexColor[1], 16);
		const green = parseInt(hexColor[2], 16);
		const blue = parseInt(hexColor[3], 16);

		return `${red}, ${green}, ${blue}`;
	}

	return null;
};

const StorybookDecorator = (story, config = {}) => {
	// Executing `story` here allows the story controls to register and render before the global variable below.
	const sample = story();

	const backgroundColorFromURL = getPropFromURL('component background color');
	const textColorFromURL = getPropFromURL('component text color');

	const {globals} = config;
	const backgroundColor = globals[BACKGROUND_ADDON_ID], textColor = globals[TEXT_ADDON_ID];

	const componentName = config.kind.replace(/^([^/]+)\//, '');

	// NOTE: 'config' object is not extensible.
	const hasInfoText = config.parameters && config.parameters.info && config.parameters.info.text;
	const hasProps = config.parameters && config.parameters.props;
	const classes = {
		aria: JSON.parse(globals['debug aria']),
		layout: JSON.parse(globals['debug layout']),
		spotlight: JSON.parse(globals['debug spotlight']),
		sprites: JSON.parse(globals['debug sprites'])
	};

	if (Object.keys(classes).length > 0) {
		classes.debug = true;
	}

	return (
		<Theme
			className={classnames(classes)}
			title={componentName === config.name ? `${config.kind}`.replace(/\//g, ' ').trim() : `${componentName} ${config.name}`}
			description={hasInfoText ? config.parameters.info.text : null}
			locale={globals.locale}
			textSize={JSON.parse(globals['large text']) ? 'large' : 'normal'}
			focusRing={JSON.parse(globals['focus ring'])}
			highContrast={JSON.parse(globals['high contrast'])}
			style={{
				'--sand-env-background': globals.background === 'default' ? '' : globals.background,
				'--sand-component-bg-color': backgroundColor || backgroundColorFromURL,
				'--sand-component-text-color-rgb': getRGBColor(textColor) || getRGBColor(textColorFromURL)
			}}
			skin={globals.skin}
			{...hasProps ? config.parameters.props : null}
		>
			{sample}
		</Theme>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Theme};
