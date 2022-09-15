/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

module.exports = {
	core: {
		builder: 'webpack5',
		disableTelemetry: true
	},
	features: {
		postcss: false,
		storyStoreV7: true
	},
	framework: '@storybook/react',
	stories: ['./../stories/default/*.js'],
	addons: [
		'@enact/storybook-utils/addons/essentials'
	],
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	},
	typescript: {
		reactDocgen: false
	}
}
