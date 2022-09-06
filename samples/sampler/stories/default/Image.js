import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {object, select} from '@enact/storybook-utils/addons/controls';
import Image, {ImageBase, ImageDecorator} from '@enact/sandstone/Image';
import {ImageBase as UiImageBase} from '@enact/ui/Image';

const src = {
	hd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' class='img-fluid rounded mx-auto d-block' width='200' height='200'%3E%3Crect width='200' height='200' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E200 X 200%3C/text%3E%3C/svg%3E",
	fhd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' class='img-fluid rounded mx-auto d-block' width='300' height='300'%3E%3Crect width='300' height='300' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E300 X 300%3C/text%3E%3C/svg%3E",
	uhd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' class='img-fluid rounded mx-auto d-block' width='600' height='600'%3E%3Crect width='600' height='600' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E600 X 600%3C/text%3E%3C/svg%3E"
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
