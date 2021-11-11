import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {object, select} from '@enact/storybook-utils/addons/controls';
import Image, {ImageBase, ImageDecorator} from '@enact/sandstone/Image';
import {ImageBase as UiImageBase} from '@enact/ui/Image';

const src = {
	hd: 'http://via.placeholder.com/200x200',
	fhd: 'http://via.placeholder.com/300x300',
	uhd: 'http://via.placeholder.com/600x600'
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
