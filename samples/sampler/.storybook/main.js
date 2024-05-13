/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

module.exports = {
	core: {
		builder: 'webpack5',
		disableTelemetry: true
	},
	features: {
		postcss: false,
		warnOnLegacyHierarchySeparator: false
	},
	framework: '@storybook/react',
	stories: ['./../stories/default/*.js'],
	addons: [
		'@enact/storybook-utils/addons/actions',
		'@enact/storybook-utils/addons/controls',
		'@enact/storybook-utils/addons/docs',
		'@enact/storybook-utils/addons/toolbars',
		'../colors-toolbar/manager.js'
	],
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	},
	typescript: {
		reactDocgen: false
	},
	// custom theme globals
	parameters: {
		globalsColors: {
			componentBackgroundColor: '#7D848C',
			focusBackgroundColor: '#E6E6E6',
			popupBackgroundColor: '#575E66',
			textColor: '#E6E6E6',
			subtitleTextColor:'#ABAEB3'
		}
	}
}
