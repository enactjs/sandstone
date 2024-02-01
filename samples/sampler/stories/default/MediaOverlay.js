import MediaOverlay, {MediaOverlayBase} from '@enact/sandstone/MediaOverlay';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';

MediaOverlay.displayName = 'MediaOverlay';
const Config = mergeComponentMetadata('MediaOverlay', MediaOverlayBase, MediaOverlay);

const prop = {
	marqueeOn: ['focus', 'hover', 'render'],
	textAlign: ['start', 'center', 'end'],
	videos: {
		Sintel: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		'Cosmos Laundromat': 'http://media.xiph.org/cosmoslaundromat/Pilot_Trailer_Cosmos_Laundromat.mp4',
		VideoTest: 'http://media.w3.org/2010/05/video/movie_300.mp4',
		// Purposefully not a video to demonstrate source error state
		'Bad Video Source': 'https://github.com/mderrick/react-html5video'
	},
	images: {
		None: '',
		Strawberries: 'https://picsum.photos/1280/720?image=1080',
		Tunnel: 'https://picsum.photos/1280/720?image=1063',
		Mountains: 'https://picsum.photos/1280/720?image=930',
		'Bad Image Source': 'imagenotfound.png'
	},
	strings: [
		'',
		'Short',
		'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.',
		'Η γρήγορη καφέ αλεπού πήδηξε πάνω από το μεσημέρι. Το πουλί πετά σε φασολιών δύση του ηλίου.',
		"ਤੁਰੰਤ ਭੂਰਾ Fox ਆਲਸੀ ਕੁੱਤੇ ਨੂੰ ਵੱਧ ਗਈ. ਬੀਨ ਪੰਛੀ ਸੂਰਜ ਡੁੱਬਣ 'ਤੇ ਉਡਾਣ ਭਰਦੀ ਹੈ.",
		'速い茶色のキツネは、怠け者の犬を飛び越えた。豆の鳥は日没で飛ぶ。',
		'那只敏捷的棕色狐狸跃过那只懒狗。豆鸟飞日落。',
		'빠른 갈색 여우가 게으른 개를 뛰어 넘었다.콩 조류 일몰에 파리.',
		'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקיעה.',
		'قفز الثعلب البني السريع فوق الكلب الكسول. الطيور تطير في الفول عند غروب الشمس.',
		'فوری بھوری لومڑی سست کتے پر چھلانگ لگا. بین پرندوں سوریاست میں پرواز.'
	],
	placeholders: {
		None: '',
		SVG:
			'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
			'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
			'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
			'4NCg=='
	}
};

export default {
	title: 'Sandstone/MediaOverlay',
	component: 'MediaOverlay'
};

export const _MediaOverlay = (args) => (
	<MediaOverlay
		caption={args['caption']}
		disabled={args['disabled']}
		imageOverlay={args['imageOverlay']}
		loop={args['loop']}
		marqueeOn={args['marqueeOn']}
		muted={args['muted']}
		noAutoPlay={args['noAutoPlay']}
		placeholder={args['placeholder']}
		progress={args['progress']}
		showProgress={args['showProgress']}
		subtitle={args['subtitle']}
		text={args['text']}
		textAlign={args['textAlign']}
		title={args['title']}
	>
		<source src={args['source']} />
	</MediaOverlay>
);

text('caption', _MediaOverlay, Config, 'DTV 7-1');
boolean('disabled', _MediaOverlay, Config);
select('imageOverlay', _MediaOverlay, prop.images, Config);
boolean('loop', _MediaOverlay, Config);
select('marqueeOn', _MediaOverlay, prop.marqueeOn, Config, 'focus');
boolean('muted', _MediaOverlay, Config, true);
boolean('noAutoPlay', _MediaOverlay, Config);
select('placeholder', _MediaOverlay, prop.placeholders, Config);
range('progress', _MediaOverlay, Config, {min: 0, max: 1, step: 0.05}, 0.5);
boolean('showProgress', _MediaOverlay, Config);
text('subtitle', _MediaOverlay, Config, '07:00 AM - 08:00 AM');
select('text', _MediaOverlay, prop.strings, Config);
select('textAlign', _MediaOverlay, prop.textAlign, Config);
text('title', _MediaOverlay, Config, 'Program Name');
select('source', _MediaOverlay, prop.videos, Config, prop.videos.Sintel);

_MediaOverlay.storyName = 'MediaOverlay';
_MediaOverlay.parameters = {
	info: {
		text: 'The basic MediaOverlay'
	}
};
