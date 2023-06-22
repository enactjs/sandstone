/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');
const { loadCsf } = require('@storybook/csf-tools');
const { readFileSync }  = require('fs');

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
