/**
 * Media Player component for video and audio.
 *
 * @module sandstone/MediaPlayer
 * @exports calcNumberValueOfPlaybackRate
 * @exports FeedbackContent
 * @exports FeedbackTooltip
 * @exports MediaControls
 * @exports MediaTitle
 * @exports MediaSlider
 * @exports secondsToTime
 * @exports Times
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
