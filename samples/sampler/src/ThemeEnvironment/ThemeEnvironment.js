// Theme Environment

import classnames from 'classnames';
import kind from '@enact/core/kind';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

import css from './ThemeEnvironment.module.less';

// custom theme imports
import LS2Request from '@enact/webos/LS2Request';
import {platform} from '@enact/webos/platform';

import {AppContext, customColorsContext, defaultSandstoneColors} from '../../colors-toolbar/constants';
import {generateStylesheet} from '../../utils/generateStylesheet';

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

const StorybookDecorator = (story, config = {}) => {
	// Executing `story` here allows the story controls to register and render before the global variable below.
	const sample = story();

	const {globals} = config;

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

	// ---> beginning of custom theme code
	const request = new LS2Request();
	const [context, setContext] = useState(customColorsContext);

	useEffect(() => {
		if (platform.tv) {
			request.send({
				service: 'luna://com.webos.service.settings/',
				method: 'getSystemSettings',
				parameters: {
					category: 'customUi',
					keys: ['theme']
				},
				onSuccess: (res) => {
					// update context with received data from `theme` key
					if (res.settings.theme !== '' && res) {
						const parsedKeyData = JSON.parse(res.settings.theme);
						setContext({...parsedKeyData});
					}
				}
			});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const [localColors, setLocalColors] = useState({
		componentBackgroundColor: defaultSandstoneColors.componentBackgroundColor,
		focusBackgroundColor: defaultSandstoneColors.focusBackgroundColor,
		popupBackgroundColor: defaultSandstoneColors.popupBackgroundColor,
		subtitleTextColor: defaultSandstoneColors.subtitleTextColor,
		textColor: defaultSandstoneColors.textColor
	});

	const {
		componentBackgroundColor,
		focusBackgroundColor,
		popupBackgroundColor,
		subtitleTextColor,
		textColor
	} = platform.tv ? context : localColors;

	// merge `generatedColors` with `background`(global type) into the style object
	const generatedColors = generateStylesheet(componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor);
	const background = {'--sand-env-background': globals.background === 'default' ? '' : globals.background};
	const mergedStyles = {...generatedColors, ...background};

	// update custom colors when a new color is picked from color picker when running on PC
	useEffect(() => {
		setLocalColors({
			componentBackgroundColor: globals.componentBackgroundColor || defaultSandstoneColors.componentBackgroundColor,
			focusBackgroundColor: globals.focusBackgroundColor || defaultSandstoneColors.focusBackgroundColor,
			popupBackgroundColor: globals.popupBackgroundColor || defaultSandstoneColors.popupBackgroundColor,
			subtitleTextColor: globals.subtitleTextColor || defaultSandstoneColors.subtitleTextColor,
			textColor: globals.textColor || defaultSandstoneColors.textColor
		});
	}, [globals]);

	// some components render on a `floatingLayer` which is a sibling of `Theme`, so we need to apply colors to <floatLayer> as well
	useEffect(() => {
		const floatLayerElement = document.getElementById("floatLayer");
		// Apply the generated styles to the <floatLayer> element
		for (const property in generatedColors) {
			if (generatedColors.hasOwnProperty(property)) { // eslint-disable-line
				floatLayerElement.style.setProperty(property, generatedColors[property]);
			}
		}
	}, [generatedColors]);
	// <--- end of custom theme code

	return (
		<AppContext.Provider value={{context, setContext}}>
			<Theme
				className={classnames(classes)}
				title={componentName === config.name ? `${config.kind}`.replace(/\//g, ' ').trim() : `${componentName} ${config.name}`}
				description={hasInfoText ? config.parameters.info.text : null}
				locale={globals.locale}
				textSize={JSON.parse(globals['large text']) ? 'large' : 'normal'}
				focusRing={JSON.parse(globals['focus ring'])}
				highContrast={JSON.parse(globals['high contrast'])}
				style={mergedStyles}
				skin={globals.skin}
				{...hasProps ? config.parameters.props : null}
			>
				{sample}
			</Theme>
		</AppContext.Provider>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Theme};
