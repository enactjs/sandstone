// Theme Environment

import classnames from 'classnames';
import kind from '@enact/core/kind';
import {Panels, Panel, Header} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';

import css from './ThemeEnvironment.module.less';

// custom theme imports
import {hexToRGB} from '../../utils/hexToRGB';
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

	// console.log('xaxa', globals);
	const {ComponentBackgroundColor='#7D848C', FocusBackgroundColor='#E6E6E6', PopupBackgroundColor='#575E66', ComponentTextColor='#E6E6E6', SubTextColor='#ABAEB3'} = globals;
	const colors = generateStylesheet(globals, ComponentBackgroundColor, FocusBackgroundColor, PopupBackgroundColor, ComponentTextColor, SubTextColor);
	console.log('xaxaxa', colors)

	return (
		<Theme
			className={classnames(classes)}
			title={componentName === config.name ? `${config.kind}`.replace(/\//g, ' ').trim() : `${componentName} ${config.name}`}
			description={hasInfoText ? config.parameters.info.text : null}
			locale={globals.locale}
			textSize={JSON.parse(globals['large text']) ? 'large' : 'normal'}
			highContrast={JSON.parse(globals['high contrast'])}
			style={{
				'--sand-env-background': globals.background === 'default' ? '' : globals.background,
				// '--sand-text-color-rgb': '194, 46, 46',
				colors,
				// '--sand-component-bg-color': '#519a51',
				// '--sand-component-text-color-rgb': hexToRGB(config.globals.ComponentTextColor) || '255, 0, 0',
				// '--sand-component-text-sub-color-rgb': '0, 0, 255',
				// '--sand-overlay-bg-color-rgb': '0, 0, 255'
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
