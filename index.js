// This space intentionally left blank
import jsdocToTs from '@enact/jsdoc-to-ts';
import fs from 'fs';

jsdocToTs({
	package: '.',
	output: fs.writeFileSync,
	ignore: ['node_modules', 'ilib', 'build', 'dist', 'samples', 'coverage', 'tests'],
	importMap: {
		core: '@enact/core',
		ui: '@enact/ui',
		spotlight: '@enact/spotlight',
		i18n: '@enact/i18n',
		webos: '@enact/webos',
		moonstone: '@enact/moonstone',
		'moonstone-ez': '@enact/moonstone-ez',
		agate: '@enact/agate',
		sandstone: '@enact/sandstone'
	},
	outputPath: '.'
});