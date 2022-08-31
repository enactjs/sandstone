/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

module.exports = {
	features: {
		postcss: false
	},
	stories: ['./../stories/default/*.js'],
	addons: [
		'@enact/storybook-utils/addons/actions/register',
		'@enact/storybook-utils/addons/controls/register',
		'@enact/storybook-utils/addons/toolbars/register',
		'@storybook/addon-docs'
	],
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	}
}
