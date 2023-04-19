/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

module.exports = {
	core: {
		disableTelemetry: true
	},
	features: {
		postcss: false,
		warnOnLegacyHierarchySeparator: false
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {}
	},
	stories: ['./../stories/qa/*.js'],
	addons: [
		'@enact/storybook-utils/addons/actions',
		'@enact/storybook-utils/addons/controls',
		'@enact/storybook-utils/addons/docs',
		'@enact/storybook-utils/addons/toolbars'
	],
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	},
	typescript: {
		reactDocgen: false
	}
};
