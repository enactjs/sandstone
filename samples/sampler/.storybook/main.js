/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

module.exports = {
	features: {
		postcss: false
	},
	stories: ['./../stories/default/*.js'],
	addons: [
		'@enact/storybook-utils/addons/actions',
		'@enact/storybook-utils/addons/controls',
		'@enact/storybook-utils/addons/docs',
		'@enact/storybook-utils/addons/toolbars'
	],
	features: {
		storyStoreV7: true,
	},
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	}
}
