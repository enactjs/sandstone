/**
 * Media Player component for video and audio.
 *
 * @module sandstone/MediaPlayer
 * @exports Input
 * @exports InputBase
 * @exports InputDecorator
 * @exports InputField
 * @exports InputFieldBase
 * @exports InputFieldDecorator
 */

import {calcNumberValueOfPlaybackRate, secondsToTime} from './util';
import MediaControls from './MediaControls';
import MediaTitle from './MediaTitle';
import MediaSlider from './MediaSlider';
import FeedbackContent from './FeedbackContent';
import FeedbackTooltip from './FeedbackTooltip';
import Times from './Times';

export default MediaControls;
export {
	calcNumberValueOfPlaybackRate,
	FeedbackContent,
	FeedbackTooltip,
	MediaControls,
	MediaTitle,
	MediaSlider,
	secondsToTime,
	Times
};
