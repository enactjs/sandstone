import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/sandstone/Button';
import VideoPlayer, {VideoPlayerBase} from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';

import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {ImageItem} from '@enact/sandstone/ImageItem';
import ri from '@enact/ui/resolution';

import icons from './icons';

const items = [];
const size = 20;
// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {source} = items[index];

	return (
		<ImageItem
			{...rest}
			src={source}
		/>
	);
};

const updateDataSize = (dataSize) => {
	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		const
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;

		items.push({source});
	}

	return dataSize;
};

updateDataSize(size);

// Set up some defaults for info and knobs
const prop = {
	moreButtonColor: [
		'',
		'red',
		'green',
		'yellow',
		'blue'
	],
	videoTitles: [
		'Sintel',
		'Big Buck Bunny',
		'VideoTest',
		'Bad Video Source'
	],
	videos: {
		'Sintel': 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		'Big Buck Bunny': 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov',
		'VideoTest': 'http://media.w3.org/2010/05/video/movie_300.mp4',
		// Purposefully not a video to demonstrate source error state
		'Bad Video Source': 'https://github.com/mderrick/react-html5video'
	},
	posters: {
		'Sintel': 'http://media.w3.org/2010/05/sintel/poster.png',
		'Big Buck Bunny': 'http://media.w3.org/2010/05/bunny/poster.png',
		'VideoTest': 'http://media.w3.org/2010/05/video/poster.png',
		'Bad Video Source': 'http://media.w3.org/2010/05/video/poster.png'
	},
	events: [
		'onAbort',
		'onCanPlay',
		'onCanPlayThrough',
		'onControlsAvailable',
		'onDurationChange',
		'onEmptied',
		'onEncrypted',
		'onEnded',
		'onError',
		'onFastForward',
		'onJumpBackward',
		'onJumpForward',
		'onLoadedData',
		'onLoadedMetadata',
		'onLoadStart',
		'onPause',
		'onPlay',
		'onPlaying',
		'onProgress',
		'onRateChange',
		'onRewind',
		'onSeeked',
		'onSeekFailed',
		'onSeeking',
		'onStalled',
		'onSuspend',
		'onToggleMore',
		// 'onTimeUpdate',	// Disabled due to Storybook Actions-reporting having an adverse effect on VideoPlayer performance. Uncomment to view this event.
		'onVolumeChange',
		'onWaiting'
	]
};

prop.eventActions = {};
prop.events.forEach( (ev) => {
	prop.eventActions[ev] = action(ev);
});

const Config = mergeComponentMetadata('VideoPlayer', VideoPlayerBase, VideoPlayer);
const MediaControlsConfig = mergeComponentMetadata('MediaControls', MediaControls);

VideoPlayer.displayName = 'VideoPlayer';
MediaControls.displayName = 'MediaControls';

storiesOf('Sandstone', module)
	.add(
		'VideoPlayer',
		() => {
			const videoTitle = select('source', prop.videoTitles, Config, 'Sintel');
			const videoSource = prop.videos[videoTitle];
			const poster = prop.posters[videoTitle];

			return (
				<div
					style={{
						transformOrigin: 'top',
						transform: 'scale(' + number('video scale', Config, {range: true, min: 0.05, max: 1, step: 0.01}, 1) + ')',
						outline: 'teal dashed 1px',
						height: '70vh'
					}}
				>
					<label
						style={{
							outline: 'teal dashed 1px',
							backgroundColor: 'rgba(0, 128, 128, 0.5)',
							color: '#0bb',
							position: 'absolute',
							transform: 'translateY(-100%)',
							borderBottomWidth: 0,
							padding: '0.1em 1em',
							fontWeight: 100,
							fontStyle: 'italic',
							fontSize: '32px'
						}}
					>VideoPlayer Edge</label>
					<VideoPlayer
						autoCloseTimeout={number('autoCloseTimeout', Config, 7000)}
						disabled={boolean('disabled', Config)}
						feedbackHideDelay={number('feedbackHideDelay', Config, 3000)}
						initialJumpDelay={number('initialJumpDelay', Config, 400)}
						jumpDelay={number('jumpDelay', Config, 200)}
						loop={boolean('loop', Config, true)}
						miniFeedbackHideDelay={number('miniFeedbackHideDelay', Config, 2000)}
						muted={boolean('muted', Config, true)}
						no5WayJump={boolean('no5WayJump', Config)}
						noAutoPlay={boolean('noAutoPlay', Config)}
						noAutoShowMediaControls={boolean('noAutoShowMediaControls', Config)}
						noMediaSliderFeedback={boolean('noMediaSliderFeedback', Config, false)}
						noMiniFeedback={boolean('noMiniFeedback', Config)}
						noSlider={boolean('noSlider', Config)}
						pauseAtEnd={boolean('pauseAtEnd', Config)}
						poster={poster}
						seekDisabled={boolean('seekDisabled', Config)}
						spotlightDisabled={boolean('spotlightDisabled', Config)}
						thumbnailSrc={poster}
						thumbnailUnavailable={boolean('thumbnailUnavailable', Config)}
						title={text('title', Config, 'Sandstone VideoPlayer Sample Video')}
						titleHideDelay={number('titleHideDelay', Config, 4000)}
						{...prop.eventActions}
					>
						<source src={videoSource} type="video/mp4" />
						<infoComponents>A video about some things happening to and around some characters. Very exciting stuff.</infoComponents>
						<MediaControls
							actionGuideAriaLabel={text('actionGuideAriaLabel', MediaControlsConfig, 'Press Down Key Using Remote Control')}
							actionGuideLabel={text('actionGuideLabel', MediaControlsConfig, 'Press Down Button to Scroll')}
							jumpBackwardIcon={select('jumpBackwardIcon', icons, MediaControlsConfig, 'jumpbackward')}
							jumpButtonsDisabled={boolean('jumpButtonsDisabled', MediaControlsConfig)}
							jumpForwardIcon={select('jumpForwardIcon', icons, MediaControlsConfig, 'jumpforward')}
							noJumpButtons={boolean('noJumpButtons', MediaControlsConfig)}
							rateChangeDisabled={boolean('rateChangeDisabled', MediaControlsConfig)}
							moreActionDisabled={boolean('moreActionDisabled', MediaControlsConfig)}
							pauseIcon={select('pauseIcon', icons, MediaControlsConfig, 'pause')}
							playIcon={select('playIcon', icons, MediaControlsConfig, 'play')}
							playPauseButtonDisabled={boolean('playPauseButtonDisabled', MediaControlsConfig)}
						>
							<bottomComponents>
								<VirtualGridList
									style={{height: ri.scale(240), marginTop: ri.scale(60)}}
									horizontalScrollbar={'hidden'}
									dataSize={size}
									direction="horizontal"
									itemSize={{
										minWidth: ri.scale(320),
										minHeight: ri.scale(270)
									}}
									itemRenderer={renderItem}
									spacing={ri.scale(12)}
								/>
							</bottomComponents>
							<Button size="small" icon="list" />
							<Button size="small" icon="playspeed" />
							<Button size="small" icon="speakercenter" />
							<Button size="small" icon="miniplayer" />
							<Button size="small" icon="subtitle" />
						</MediaControls>
					</VideoPlayer>
				</div>
			);
		},
		{
			info: {
				text: 'The basic VideoPlayer'
			}
		}
	);
