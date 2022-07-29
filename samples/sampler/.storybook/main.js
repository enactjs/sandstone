/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');

const {readFileSync} = require("fs");
const { loadCsf } = require( '@storybook/csf-tools');

const csfIndexer = async (fileName, opts) => {
	const code = readFileSync(fileName, 'utf-8').toString();
	const parsed =loadCsf(code, { ...opts, fileName }).parse()
	return parsed;
};


module.exports = {
	core: {
		disableTelemetry: true
	},
	features: {
		postcss: false,
		storyStoreV7: true,
		modernInlineRender: false
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: { fastRefresh: true }
	},
	stories: ['./../stories/default/*.js'],
	storyIndexers: [ {
		test: /.*/
		, indexer: csfIndexer
	}],
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
}
