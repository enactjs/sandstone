/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');
const { loadCsf } = require('@storybook/csf-tools');
const { readFileSync }  = require('fs');

const config = {
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
	storyIndexers: (indexers) => {
		const indexer = async (fileName, opts) => {
			const code = readFileSync(fileName, { encoding: 'utf-8' });
			return loadCsf(code, { ...opts, fileName }).parse();
		};
		return [
			{
				test: /\.[tj]sx?$/,
				indexer,
			},
			...(indexers || [])
		]
	},
	stories: ['./../stories/default/*.js'],
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
export default config;

// module.exports = {
// 	core: {
// 		disableTelemetry: true
// 	},
// 	features: {
// 		postcss: false,
// 		warnOnLegacyHierarchySeparator: false
// 	},
// 	framework: {
// 		name: '@storybook/react-webpack5',
// 		options: {}
// 	},
// 	storyIndexers: (indexers) => {
// 		const indexer = async (fileName, opts) => {
// 			const code = readFileSync(fileName, { encoding: 'utf-8' });
// 			return loadCsf(code, { ...opts, fileName }).parse();
// 		};
// 		return [
// 			{
// 				test: /\.[tj]sx?$/,
// 				indexer,
// 			},
// 			...(indexers || [])
// 		]
// 	},
// 	stories: ['./../stories/default/*.js'],
// 	addons: [
// 		'@enact/storybook-utils/addons/actions',
// 		'@enact/storybook-utils/addons/controls',
// 		'@enact/storybook-utils/addons/docs',
// 		'@enact/storybook-utils/addons/toolbars'
// 	],
// 	webpackFinal: async (config, {configType}) => {
// 		// Removing the global alias as it conflicts with the global npm pkg
// 		const { global, ...alias } = config.resolve.alias;
// 		config.resolve.alias = alias;
//
// 		return webpack(config, configType, __dirname);
// 	},
// 	typescript: {
// 		reactDocgen: false
// 	}
// }
