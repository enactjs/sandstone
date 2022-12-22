import Image, {ImageBase, ImageDecorator} from '@enact/sandstone/Image';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {object, select} from '@enact/storybook-utils/addons/controls';
import {ImageBase as UiImageBase} from '@enact/ui/Image';

import {svgGenerator} from '../helper/svg';

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
};

const Config = mergeComponentMetadata('Image', UiImageBase, ImageBase, Image, ImageDecorator);
Image.displayName = 'Image';

export default {
	title: 'Sandstone/Image',
	component: 'Image'
};

export const _Image = (args) => (
	<Image
		src={args['src']}
		sizing={args['sizing']}
		onError={action('error')}
		onLoad={action('loaded')}
		style={{
			border: '#ffa500 dashed 1px'
		}}
	>
		<label
			style={{
				border: '#ffa500 dashed 1px',
				borderBottomWidth: 0,
				borderRadius: '12px 12px 0 0',
				backgroundColor: 'rgba(255, 165, 0, 0.5)',
				color: '#fff',
				position: 'absolute',
				transform: 'translateX(-1px) translateY(-100%)',
				padding: '0.1em 1em',
				fontWeight: 100,
				fontStyle: 'italic',
				fontSize: '32px'
			}}
		>
			Image Boundry
		</label>
	</Image>
);

object('src', _Image, Config, src);
select('sizing', _Image, ['fill', 'fit', 'none'], Config);

_Image.storyName = 'Image';
_Image.parameters = {
	info: {
		text: 'The basic Image'
	}
};
