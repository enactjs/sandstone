/**
 * Provides Sandstone-themed video player components.
 *
 * @module sandstone/VideoPlayer
 * @exports Video
 * @exports VideoPlayer
 * @exports VideoPlayerBase
 */

import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {on, off} from '@enact/core/dispatcher';
import {memoize} from '@enact/core/util';

import {adaptEvent, call, forKey, forward, forwardCustom, forwardWithPrevent, handle, preventDefault, stopImmediate, returnsTrue} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {platform} from '@enact/core/platform';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {perfNow, Job, shallowEqual} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {toUpperCase} from '@enact/i18n/util';
import {getDirection, Spotlight} from '@enact/spotlight';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import {Spottable} from '@enact/spotlight/Spottable';
import Announce from '@enact/ui/AnnounceDecorator/Announce';
import ComponentOverride from '@enact/ui/ComponentOverride';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {FloatingLayerContext} from '@enact/ui/FloatingLayer/FloatingLayerDecorator';
import ForwardRef from "@enact/ui/ForwardRef";
import Media from '@enact/ui/Media';
import Slottable from '@enact/ui/Slottable';
import Touchable from '@enact/ui/Touchable';
import DurationFmt from 'ilib/lib/DurationFmt';
import equals from 'ramda/src/equals';
import PropTypes from 'prop-types';
import {cloneElement, Component, createRef, isValidElement} from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Skinnable from '../Skinnable';
import Spinner from '../Spinner';
import {
	MediaControls,
	MediaSlider,
	secondsToTime,
	Times
} from '../MediaPlayer';

import Overlay from './Overlay';
import MediaTitle from './MediaTitle';
import FeedbackContent from './FeedbackContent';
import FeedbackTooltip from './FeedbackTooltip';
import Video from './Video';

import css from './VideoPlayer.module.less';

const isEnter = is('enter');
const isLeft = is('left');
const isRight = is('right');

const jumpBackKeyCode = 37;
const jumpForwardKeyCode = 39;
const controlsHandleAboveSelectionKeys = [13, 16777221, jumpBackKeyCode, jumpForwardKeyCode];
const getControlsHandleAboveHoldConfig = ({frequency, time}) => ({
	events: [
		{name: 'hold', time}
	],
	frequency
});
const shouldJump = ({disabled, no5WayJump}, {mediaControlsVisible, sourceUnavailable}) => (
	!no5WayJump && !mediaControlsVisible && !(disabled || sourceUnavailable)
);
const calcNumberValueOfPlaybackRate = (rate) => {
	const pbArray = String(rate).split('/');
	return (pbArray.length > 1) ? parseInt(pbArray[0]) / parseInt(pbArray[1]) : parseFloat(rate);
};

const RootComponent = ({playerRef, ...rest}) => (<div ref={playerRef} {...rest} />);

RootComponent.propTypes = {
	/*
	 * Called with the reference to the mediaControls node.
	 *
	 * @type {Object|Function}
	 * @public
	 */
	playerRef: EnactPropTypes.ref
};

const SpottableDiv = Touchable(Spottable('div'));
const RootContainer = ForwardRef({prop: 'playerRef'}, SpotlightContainerDecorator(
	{
		enterTo: 'default-element',
		defaultElement: [`.${css.controlsHandleAbove}`, `.${css.controlsFrame}`]
	},
	RootComponent
));

const ControlsContainer = SpotlightContainerDecorator(
	{
		enterTo: 'default-element',
		straightOnly: true
	},
	'div'
);

const memoGetDurFmt = memoize((/* locale */) => new DurationFmt({
	length: 'medium', style: 'clock', useNative: false
}));

const getDurFmt = (locale) => {
	if (typeof window === 'undefined') return null;

	return memoGetDurFmt(locale);
};

const forwardWithState = (type) => adaptEvent(() => ({type}), handle(adaptEvent(call('addStateToEvent'), forwardWithPrevent(type))));

const forwardToggleMore = forward('onToggleMore');

// provide forwarding of events on media controls
const forwardControlsAvailable = forwardCustom('onControlsAvailable');
const forwardPlay = forwardWithState('onPlay');
const forwardWillPlay = forwardWithState('onWillPlay');
const forwardPause = forwardWithState('onPause');
const forwardWillPause = forwardWithState('onWillPause');
const forwardRewind = forwardWithState('onRewind');
const forwardWillRewind = forwardWithState('onWillRewind');
const forwardFastForward = forwardWithState('onFastForward');
const forwardWillFastForward = forwardWithState('onWillFastForward');
const forwardJumpBackward = forwardWithState('onJumpBackward');
const forwardWillJumpBackward = forwardWithState('onWillJumpBackward');
const forwardJumpForward = forwardWithState('onJumpForward');
const forwardWillJumpForward = forwardWithState('onWillJumpForward');

const AnnounceState = {
	// Video is loaded but additional announcements have not been made
	READY: 0,

	// The title should be announced
	TITLE: 1,

	// The title has been announced
	TITLE_READ: 2,

	// The infoComponents should be announced
	INFO: 3,

	// All announcements have been made
	DONE: 4
};

/**
 * Every callback sent by {@link sandstone/VideoPlayer|VideoPlayer} receives a status package,
 * which includes an object with the following key/value pairs as the first argument:
 *
 * @typedef {Object} videoStatus
 * @memberof sandstone/VideoPlayer
 * @property {String} type - Type of event that triggered this callback
 * @property {Number} currentTime - Playback index of the media in seconds
 * @property {Number} duration - Media's entire duration in seconds
 * @property {Boolean} paused - Playing vs paused state. `true` means the media is paused
 * @property {Number} playbackRate - Current playback rate, as a number
 * @property {Number} proportionLoaded - A value between `0` and `1` representing the proportion of the media that has loaded
 * @property {Number} proportionPlayed - A value between `0` and `1` representing the proportion of the media that has already been shown
 *
 * @public
 */

/**
 * A set of playback rates when media fast forwards, rewinds, slow-forwards, or slow-rewinds.
 *
 * The number used for each operation is proportional to the normal playing speed, 1. If the rate
 * is less than 1, it will play slower than normal speed, and, if it is larger than 1, it will play
 * faster. If it is negative, it will play backward.
 *
 * The order of numbers represents the incremental order of rates that will be used for each
 * operation. Note that rates can be expressed as decimals, strings, and fractions.
 * (e.g.: `0.5`, `'0.5'`, `'1/2'`).
 *
 * @typedef {Object} playbackRateHash
 * @memberof sandstone/VideoPlayer
 * @property {[]} fastForward - An array of playback rates when media fast forwards
 * @property {[]} rewind - An array of playback rates when media rewinds
 * @property {[]} slowForward - An array of playback rates when media slow-forwards
 * @property {[]} slowRewind - An array of playback rates when media slow-rewinds
 *
 * @public
 */

/**
 * A player for video {@link sandstone/VideoPlayer.VideoPlayerBase}.
 *
 * @class VideoPlayerBase
 * @memberof sandstone/VideoPlayer
 * @ui
 * @public
 */
const VideoPlayerBase = class extends Component {
	static displayName = 'VideoPlayerBase';

	static propTypes = /** @lends sandstone/VideoPlayer.VideoPlayerBase.prototype */ {
		/**
		 * passed by AnnounceDecorator for accessibility
		 *
		 * @type {Function}
		 * @private
		 */
		announce: PropTypes.func,

		/**
		 * The time (in milliseconds) before the control buttons will hide.
		 *
		 * Setting this to 0 or `null` disables closing, requiring user input to open and close.
		 *
		 * @type {Number}
		 * @default 5000
		 * @public
		 */
		autoCloseTimeout: PropTypes.number,

		/**
		 * Sets the hint string read when focusing the back button.
		 *
		 * @type {String}
		 * @default 'go to previous'
		 * @public
		 */
		backButtonAriaLabel: PropTypes.string,

		/**
		 * Removes interactive capability from this component. This includes, but is not limited to,
		 * key-press events, most clickable buttons, and prevents the showing of the controls.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Amount of time (in milliseconds) after which the feedback text/icon part of the slider's
		 * tooltip will automatically hidden after the last action.
		 * Setting this to 0 or `null` disables feedbackHideDelay; feedback will always be present.
		 *
		 * @type {Number}
		 * @default 3000
		 * @public
		 */
		feedbackHideDelay: PropTypes.number,

		/**
		 * Components placed below the title.
		 *
		 * Typically, these will be media descriptor icons, like how many audio channels, what codec
		 * the video uses, but can also be a description for the video or anything else that seems
		 * appropriate to provide information about the video to the user.
		 *
		 * @type {Node}
		 * @public
		 */
		infoComponents: PropTypes.node,

		/**
		 * The number of milliseconds that the player will pause before firing the
		 * first jump event on a right or left pulse.
		 *
		 * @type {Number}
		 * @default 400
		 * @public
		 */
		initialJumpDelay: PropTypes.number,

		/**
		 * The number of seconds the player should skip forward or backward when a "jump" button is
		 * pressed.
		 *
		 * @type {Number}
		 * @default 30
		 * @public
		 */
		jumpBy: PropTypes.number,

		/**
		 * The number of milliseconds that the player will throttle before firing a
		 * jump event on a right or left pulse.
		 *
		 * @type {Number}
		 * @default 200
		 * @public
		 */
		jumpDelay: PropTypes.number,

		/**
		 * Manually set the loading state of the media, in case you have information that
		 * `VideoPlayer` does not have.
		 *
		 * @type {Boolean}
		 * @public
		 */
		loading: PropTypes.bool,

		/**
		 * The current locale as a
		 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
		 *
		 * @type {String}
		 * @public
		 */
		locale: PropTypes.string,

		/**
		 * Overrides the default media control component to support customized behaviors.
		 *
		 * The provided component will receive the following props from `VideoPlayer`:
		 *
		 * * `initialJumpDelay` - Time (in ms) to wait before starting a jump
		 * * `jumpDelay` -  - Time (in ms) to wait between jumps
		 * * `mediaDisabled` - `true` when the media controls are not interactive
		 * * `no5WayJump` - `true` when 5-way jumping is disabled
		 * * `onClose` - Called when cancel key is pressed when the media controls are visible
		 * * `onFastForward` - Called when the media is fast forwarded via a key event
		 * * `onJump` - Called when the media jumps either forward or backward
		 * * `onJumpBackwardButtonClick` - Called when the jump backward button is pressed
		 * * `onJumpForwardButtonClick` - Called when the jump forward button is pressed
		 * * `onKeyDown` - Called when a key is pressed
		 * * `onPause` - Called when the media is paused via a key event
		 * * `onPlay` - Called when the media is played via a key event
		 * * `onRewind` - Called when the media is rewound via a key event
		 * * `onToggleMore` - Called when the more components are hidden or shown
		 * * `paused` - `true` when the media is paused
		 * * `spotlightId` - The spotlight container Id for the media controls
		 * * `spotlightDisabled` - `true` when spotlight is disabled for the media controls
		 * * `visible` - `true` when the media controls should be displayed
		 *
		 * @type {Component|Element}
		 * @default sandstone/MediaPlayer.MediaControls
		 * @public
		 */
		mediaControlsComponent: EnactPropTypes.componentOverride,

		/**
		 * Amount of time (in milliseconds), after the last user action, that the `miniFeedback`
		 * will automatically hide.
		 * Setting this to 0 or `null` disables `miniFeedbackHideDelay`; `miniFeedback` will always
		 * be present.
		 *
		 * @type {Number}
		 * @default 2000
		 * @public
		 */
		miniFeedbackHideDelay: PropTypes.number,

		/**
		 * Disable audio for this video.
		 *
		 * In a TV context, this is handled by the remote control, not programmatically in the
		 * VideoPlayer API.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		muted: PropTypes.bool,

		/**
		 * Prevents the default behavior of using left and right keys for seeking.
		 *
		 * @type {Boolean}
		 * @public
		 */
		no5WayJump: PropTypes.bool,

		/**
		 * Prevents the default behavior of playing a video immediately after it's loaded.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoPlay: PropTypes.bool,

		/**
		 * Prevents the default behavior of showing media controls immediately after it's loaded.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAutoShowMediaControls: PropTypes.bool,

		/**
		 * Hides media slider feedback when fast-forward or rewind while media controls are hidden.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noMediaSliderFeedback: PropTypes.bool,

		/**
		 * Removes the mini feedback.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noMiniFeedback: PropTypes.bool,

		/**
		 * Removes the media slider.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noSlider: PropTypes.bool,

		/**
		 * Removes spinner while loading.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noSpinner: PropTypes.bool,

		/**
		 * Called when the back button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * Called when the player's controls change availability, whether they are shown
		 * or hidden.
		 *
		 * The current status is sent as the first argument in an object with a key `available`
		 * which will be either `true` or `false`. (e.g.: `onControlsAvailable({available: true})`)
		 *
		 * @type {Function}
		 * @public
		 */
		onControlsAvailable: PropTypes.func,

		/**
		 * Called when the video has been fast forwarded.
		 *
		 * @type {Function}
		 * @public
		 */
		onFastForward: PropTypes.func,

		/**
		 * Called when the user clicks the JumpBackward button.
		 *
		 * Is passed a {@link sandstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpBackward: PropTypes.func,

		/**
		 * Called when the user clicks the JumpForward button.
		 *
		 * Is passed a {@link sandstone/VideoPlayer.videoStatus} as the first argument.
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpForward: PropTypes.func,

		/**
		 * Called when the video has been paused.
		 *
		 * @type {Function}
		 * @public
		 */
		onPause: PropTypes.func,

		/**
		 * Called when the video has been played.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlay: PropTypes.func,

		/**
		 * Called when the video has been rewound.
		 *
		 * @type {Function}
		 * @public
		 */
		onRewind: PropTypes.func,

		/**
		 * Called when the user is moving the VideoPlayer's Slider knob independently of
		 * the current playback position.
		 *
		 * It is passed an object with a `seconds` key (float value) to indicate the current time
		 * index. It can be used to update the `thumbnailSrc` to reflect the current scrub
		 * position.
		 *
		 * @type {Function}
		 * @public
		 */
		onScrub: PropTypes.func,

		/**
		 * Called when seek is attempted while `seekDisabled` is true.
		 *
		 * @type {Function}
		 */
		onSeekFailed: PropTypes.func,

		/**
		 * Called when seeking outside of the current `selection` range.
		 *
		 * By default, the seek will still be performed. Calling `preventDefault()` on the event
		 * will prevent the seek operation.
		 *
		 * @type {Function}
		 * @public
		 */
		onSeekOutsideSelection: PropTypes.func,

		/**
		 * Called when the visibility of more components is changed
		 *
		 * Event payload includes:
		 *
		 * * `type` - Type of event, `'onToggleMore'`
		 * * `showMoreComponents` - `true` when the components are visible`
		 * * `liftDistance` - The distance, in pixels, the component animates
		 *`
		 * @type {Function}
		 * @public
		 */
		onToggleMore: PropTypes.func,

		/**
		 * Called once before the video is forwarded.
		 *
		 * @type {Function}
		 * @public
		 */
		onWillFastForward: PropTypes.func,

		/**
		  * Called once before the video is jump backwarded.
		  *
		  * Is passed a {@link sandstone/VideoPlayer.videoStatus} as the first argument.
		  *
		  * @type {Function}
		  * @public
		  */
		onWillJumpBackward: PropTypes.func,

		/**
		  * Called once before the video is jump forwarded.
		  *
		  * Is passed a {@link sandstone/VideoPlayer.videoStatus} as the first argument.
		  *
		  * @type {Function}
		  * @public
		  */
		onWillJumpForward: PropTypes.func,

		/**
		  * Called once before the video is paused.
		  *
		  * @type {Function}
		  * @public
		  */
		onWillPause: PropTypes.func,

		/**
		  * Called once before the video is played
		  *
		  * @type {Function}
		  * @public
		  */
		onWillPlay: PropTypes.func,

		/**
		  * Called once before the video is rewound.
		  *
		  * @type {Function}
		  * @public
		  */
		onWillRewind: PropTypes.func,

		/**
		 * Pauses the video when it reaches either the start or the end of the video during rewind,
		 * slow rewind, fast-forward, or slow forward.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		pauseAtEnd: PropTypes.bool,

		/**
		 * Mapping of playback rate names to playback rate values that may be set.
		 *
		 * @type {sandstone/VideoPlayer.playbackRateHash}
		 * @default {
		 *	fastForward: ['2', '4', '8', '16'],
		 *	rewind: ['-2', '-4', '-8', '-16'],
		 *	slowForward: ['1/4', '1/2'],
		 *	slowRewind: ['-1/2', '-1']
		 * }
		 * @public
		 */
		playbackRateHash: PropTypes.shape({
			fastForward: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			rewind: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			slowForward: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			slowRewind: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
		}),

		/**
		 * Disables seek function.
		 *
		 * Note that jump by arrow keys will also be disabled when `true`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		seekDisabled: PropTypes.bool,

		/**
		 * A range of the video to display as selected.
		 *
		 * The value of `selection` may either be:
		 * * `null` or `undefined` for no selection,
		 * * a single-element array with the start time of the selection
		 * * a two-element array containing both the start and end time of the selection in seconds
		 *
		 * When the start time is specified, the media slider will show filled starting at that
		 * time to the current time.
		 *
		 * When the end time is specified, the slider's background will be filled between the two
		 * times.
		 *
		 * @type {Number[]}
		 * @public
		 */
		selection: PropTypes.arrayOf(PropTypes.number),

		/**
		 * Registers the VideoPlayer component with an
		 * {@link core/internal/ApiDecorator.ApiDecorator}.
		 *
		 * @type {Function}
		 * @private
		 */
		setApiProvider: PropTypes.func,

		/**
		 * The video source.
		 *
		 * Any children `<source>` tag elements of {@link sandstone/VideoPlayer|VideoPlayer} will
		 * be sent directly to the `videoComponent` as video sources.
		 *
		 * @type {Node}
		 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
		 * @public
		 */
		source: PropTypes.node,

		/**
		 * Disables spotlight navigation into the component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The spotlight container ID for the player.
		 *
		 * @type {String}
		 * @public
		 * @default 'videoPlayer'
		 */
		spotlightId: PropTypes.string,

		/**
		 * The thumbnail component to be used instead of the built-in version.
		 *
		 * The internal thumbnail style will not be applied to this component. This component
		 * follows the same rules as the built-in version.
		 *
		 * @type {String|Component|Element}
		 * @public
		 */
		thumbnailComponent: EnactPropTypes.renderableOverride,

		/**
		 * Thumbnail image source to show on the slider knob.
		 *
		 * This is a standard {@link sandstone/Image} component so it supports all the same
		 * options for the `src` property. If no `thumbnailComponent` and no `thumbnailSrc` is set,
		 * no tooltip will display.
		 *
		 * @type {String|Object}
		 * @public
		 */
		thumbnailSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		* Enables the thumbnail transition from opaque to translucent.
		*
		* @type {Boolean}
		* @public
		*/
		thumbnailUnavailable: PropTypes.bool,

		/**
		 * Title for the video being played.
		 *
		 * @type {String|Node}
		 * @public
		 */
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

		/**
		 * The time (in milliseconds) before the title disappears from the controls.
		 *
		 * Setting this to `0` disables hiding.
		 *
		 * @type {Number}
		 * @default 5000
		 * @public
		 */
		titleHideDelay: PropTypes.number,

		/**
		 * Video component to use.
		 *
		 * The default renders an `HTMLVideoElement`. Custom video components must have a similar
		 * API structure, exposing the following APIs:
		 *
		 * Properties:
		 * * `currentTime` {Number} - Playback index of the media in seconds
		 * * `duration` {Number} - Media's entire duration in seconds
		 * * `error` {Boolean} - `true` if video playback has errored.
		 * * `loading` {Boolean} - `true` if video playback is loading.
		 * * `paused` {Boolean} - Playing vs paused state. `true` means the media is paused
		 * * `playbackRate` {Number} - Current playback rate, as a number
		 * * `proportionLoaded` {Number} - A value between `0` and `1`
		 *	representing the proportion of the media that has loaded
		 * * `proportionPlayed` {Number} - A value between `0` and `1` representing the
		 *	proportion of the media that has already been shown
		 *
		 * Events:
		 * * `onLoadStart` - Called when the video starts to load
		 * * `onUpdate` - Sent when any of the properties were updated
		 *
		 * Methods:
		 * * `play()` - play video
		 * * `pause()` - pause video
		 * * `load()` - load video
		 *
		 * The {@link sandstone/VideoPlayer.Video.source|source} property is passed to
		 * the video component as a child node.
		 *
		 * @type {Component|Element}
		 * @default {@link ui/Media.Media}
		 * @public
		 */
		videoComponent: EnactPropTypes.componentOverride
	};

	static contextType = FloatingLayerContext;

	static defaultProps = {
		autoCloseTimeout: 5000,
		feedbackHideDelay: 3000,
		initialJumpDelay: 400,
		jumpBy: 30,
		jumpDelay: 200,
		mediaControlsComponent: MediaControls,
		miniFeedbackHideDelay: 2000,
		playbackRateHash: {
			fastForward: ['2', '4', '8', '16'],
			rewind: ['-2', '-4', '-8', '-16'],
			slowForward: ['1/4', '1/2'],
			slowRewind: ['-1/2', '-1']
		},
		spotlightId: 'videoPlayer',
		titleHideDelay: 5000,
		videoComponent: Media
	};

	constructor (props) {
		super(props);

		// Internal State
		this.video = null;
		this.pulsedPlaybackRate = null;
		this.pulsedPlaybackState = null;
		this.prevCommand = (props.noAutoPlay ? 'pause' : 'play');
		this.showMiniFeedback = false;
		this.speedIndex = 0;
		this.seekingMode = true;
		this.id = this.generateId();
		this.selectPlaybackRates('fastForward');
		this.sliderKnobProportion = 0;
		this.mediaControlsSpotlightId = props.spotlightId + '_mediaControls';
		this.jumpButtonPressed = null;
		this.playerRef = createRef();
		this.playbackRate = 1;

		// Re-render-necessary State
		this.state = {
			announce: AnnounceState.READY,
			currentTime: 0,
			duration: 0,
			error: false,
			loading: false,
			paused: props.noAutoPlay,
			playbackRate: 1,
			titleOffsetHeight: 0,
			bottomOffsetHeight: 0,

			// Non-standard state computed from properties
			bottomControlsRendered: false,
			feedbackAction: 'idle',
			feedbackVisible: false,
			infoVisible: false,
			mediaControlsVisible: false,
			mediaSliderVisible: false,
			miniFeedbackVisible: false,
			proportionLoaded: 0,
			proportionPlayed: 0,
			sourceUnavailable: true,
			titleVisible: true
		};

		if (props.setApiProvider) {
			props.setApiProvider(this);
		}
	}

	componentDidMount () {
		on('mousemove', this.activityDetected);
		if (platform.touchEvent) {
			on('touchmove', this.activityDetected);
		}
		document.addEventListener('keydown', this.handleGlobalKeyDown, {capture: true});
		document.addEventListener('wheel', this.activityDetected, {capture: true});
		this.startDelayedFeedbackHide();
		if (this.context && typeof this.context === 'function') {
			this.floatingLayerController = this.context(() => {});
		}
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (
			// Use shallow props compare instead of source comparison to support possible changes
			// from mediaComponent.
			shallowEqual(this.props, nextProps) &&
			!this.state.miniFeedbackVisible && this.state.miniFeedbackVisible === nextState.miniFeedbackVisible &&
			!this.state.mediaSliderVisible && this.state.mediaSliderVisible === nextState.mediaSliderVisible &&
			this.state.loading === nextState.loading && this.props.loading === nextProps.loading &&
			(
				this.state.currentTime !== nextState.currentTime ||
				this.state.proportionPlayed !== nextState.proportionPlayed ||
				this.state.sliderTooltipTime !== nextState.sliderTooltipTime
			)
		) {
			return false;
		}

		return true;
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.titleRef && this.state.infoVisible &&
			(!prevState.infoVisible || !equals(this.props.infoComponents, prevProps.infoComponents))
		) {
			const node = this.titleRef;
			node.style.setProperty('--infoComponentsOffset', `${node.offsetHeight}px`);
		}

		if (
			!this.state.mediaControlsVisible && prevState.mediaControlsVisible !== this.state.mediaControlsVisible ||
			!this.state.mediaSliderVisible && prevState.mediaSliderVisible !== this.state.mediaSliderVisible
		) {
			this.floatingLayerController.notify({action: 'closeAll'});
		}

		if (this.props.spotlightId !== prevProps.spotlightId) {
			this.mediaControlsSpotlightId = this.props.spotlightId + '_mediaControls';
		}

		if (!this.state.mediaControlsVisible && prevState.mediaControlsVisible) {
			forwardControlsAvailable({available: false}, this.props);
			this.stopAutoCloseTimeout();

			if (!this.props.spotlightDisabled) {
				// If last focused item were in the media controls or slider, we need to explicitly
				// blur the element when MediaControls hide. See ENYO-5648
				const current = Spotlight.getCurrent();
				const bottomControls = document.querySelector(`.${css.bottom}`);
				if (current && bottomControls && bottomControls.contains(current)) {
					current.blur();
				}

				// when in pointer mode, the focus call below will only update the last focused for
				// the video player and not set the active container to the video player which will
				// cause focus to land back on the media controls button when spotlight restores
				// focus.
				if (Spotlight.getPointerMode()) {
					Spotlight.setActiveContainer(this.props.spotlightId);
				}

				// Set focus to the hidden spottable control - maintaining focus on available spottable
				// controls, which prevents an additional 5-way attempt in order to re-show media controls
				Spotlight.focus(`.${css.controlsHandleAbove}`);
			}
		} else if (this.state.mediaControlsVisible && !prevState.mediaControlsVisible) {
			forwardControlsAvailable({available: true}, this.props);
			this.startAutoCloseTimeout();

			if (!this.props.spotlightDisabled) {
				const current = Spotlight.getCurrent();
				if (!current || this.playerRef.current.contains(current)) {
					// Set focus within media controls when they become visible.
					if (Spotlight.focus(this.mediaControlsSpotlightId) && this.jumpButtonPressed === 0) {
						this.jumpButtonPressed = null;
					}
				}
			}
		}

		// Once video starts loading it queues bottom control render until idle
		if (this.state.bottomControlsRendered && !prevState.bottomControlsRendered && !this.state.mediaControlsVisible) {
			this.showControls();
		}
	}

	componentWillUnmount () {
		off('mousemove', this.activityDetected);
		if (platform.touchEvent) {
			off('touchmove', this.activityDetected);
		}
		document.removeEventListener('keydown', this.handleGlobalKeyDown, {capture: true});
		document.removeEventListener('wheel', this.activityDetected, {capture: true});
		this.stopRewindJob();
		this.stopAutoCloseTimeout();
		this.stopDelayedTitleHide();
		this.stopDelayedFeedbackHide();
		this.stopDelayedMiniFeedbackHide();
		this.announceJob.stop();
		this.renderBottomControl.stop();
		this.slider5WayPressJob.stop();
		if (this.floatingLayerController) {
			this.floatingLayerController.unregister();
		}
	}

	//
	// Internal Methods
	//

	announceJob = new Job((msg, clear) => (this.announceRef && this.announceRef.announce(msg, clear)), 200);

	announce = (msg, clear) => {
		this.announceJob.start(msg, clear);
	};

	activityDetected = () => {
		this.startAutoCloseTimeout();
	};

	startAutoCloseTimeout = () => {
		// If this.state.more is used as a reference for when this function should fire, timing for
		// detection of when "more" is pressed vs when the state is updated is mismatched. Using an
		// instance variable that's only set and used for this express purpose seems cleanest.
		if (this.props.autoCloseTimeout && this.state.mediaControlsVisible) {
			this.autoCloseJob.startAfter(this.props.autoCloseTimeout);
		}
	};

	stopAutoCloseTimeout = () => {
		this.autoCloseJob.stop();
	};

	generateId = () => {
		return Math.random().toString(36).substring(2, 10);
	};

	isTimeBeyondSelection (time) {
		const {selection} = this.props;

		// if selection isn't set or only contains the starting value, there isn't a valid selection
		// with which to test the time
		if (selection != null && selection.length >= 2) {
			const [start, end] = selection;

			return time > end || time < start;
		}

		return false;
	}

	preventTimeChange (time) {
		return (
			this.isTimeBeyondSelection(time) &&
			!forwardWithPrevent('onSeekOutsideSelection', {type: 'onSeekOutsideSelection', time}, this.props)
		);
	}

	/**
	 * If the announce state is either ready to read the title or ready to read info, advance the
	 * state to "read".
	 *
	 * @returns {Boolean} Returns true to be used in event handlers
	 * @private
	 */
	markAnnounceRead = () => {
		if (this.state.announce === AnnounceState.TITLE) {
			this.setState({announce: AnnounceState.TITLE_READ});
		} else if (this.state.announce === AnnounceState.INFO) {
			this.setState({announce: AnnounceState.DONE});
		}

		return true;
	};

	/**
	 * Shows media controls.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	showControls = () => {
		if (this.props.disabled) {
			return;
		}

		this.startDelayedFeedbackHide();
		this.startDelayedTitleHide();

		this.setState(({announce}) => {
			if (announce === AnnounceState.READY) {
				// if we haven't read the title yet, do so this time
				announce = AnnounceState.TITLE;
			} else if (announce === AnnounceState.TITLE) {
				// if we have read the title, advance to INFO so title isn't read again
				announce = AnnounceState.TITLE_READ;
			}

			return {
				announce,
				bottomControlsRendered: true,
				feedbackAction: 'idle',
				feedbackVisible: true,
				mediaControlsVisible: true,
				mediaSliderVisible: true,
				miniFeedbackVisible: false,
				titleVisible: true
			};
		});
	};

	/**
	 * Hides media controls.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	hideControls = () => {
		this.stopDelayedFeedbackHide();
		this.stopDelayedMiniFeedbackHide();
		this.stopDelayedTitleHide();
		this.stopAutoCloseTimeout();
		this.setState({
			feedbackAction: 'idle',
			feedbackVisible: false,
			mediaControlsVisible: false,
			mediaSliderVisible: false,
			miniFeedbackVisible: false,
			infoVisible: false
		});
		this.markAnnounceRead();
	};

	/**
	 * Toggles the media controls.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	toggleControls = () => {
		if (this.state.mediaControlsVisible) {
			this.hideControls();
		} else {
			this.showControls();
		}
	};

	doAutoClose = () => {
		this.stopDelayedFeedbackHide();
		this.stopDelayedTitleHide();
		this.setState(({mediaSliderVisible, miniFeedbackVisible}) => ({
			feedbackVisible: false,
			mediaControlsVisible: false,
			mediaSliderVisible: mediaSliderVisible && miniFeedbackVisible,
			infoVisible: false
		}));
		this.markAnnounceRead();
	};

	autoCloseJob = new Job(this.doAutoClose);

	startDelayedTitleHide = () => {
		if (this.props.titleHideDelay) {
			this.hideTitleJob.startAfter(this.props.titleHideDelay);
		}
	};

	stopDelayedTitleHide = () => {
		this.hideTitleJob.stop();
	};

	hideTitle = () => {
		this.setState({titleVisible: false});
	};

	hideTitleJob = new Job(this.hideTitle);

	startDelayedFeedbackHide = () => {
		if (this.props.feedbackHideDelay) {
			this.hideFeedbackJob.startAfter(this.props.feedbackHideDelay);
		}
	};

	stopDelayedFeedbackHide = () => {
		this.hideFeedbackJob.stop();
	};

	showFeedback = () => {
		if (this.state.mediaControlsVisible) {
			this.setState({
				feedbackVisible: true
			});
		} else {
			const shouldShowSlider = this.pulsedPlaybackState !== null || calcNumberValueOfPlaybackRate(this.playbackRate) !== 1;

			if (this.showMiniFeedback && (!this.state.miniFeedbackVisible || this.state.mediaSliderVisible !== shouldShowSlider)) {
				this.setState(({loading, duration, error}) => ({
					mediaSliderVisible: shouldShowSlider && !this.props.noMediaSliderFeedback,
					miniFeedbackVisible: !(loading || !duration || error)
				}));
			}
		}
	};

	hideFeedback = () => {
		if (this.state.feedbackVisible && this.state.feedbackAction !== 'focus') {
			this.setState({
				feedbackVisible: false,
				feedbackAction: 'idle'
			});
		}
	};

	hideFeedbackJob = new Job(this.hideFeedback);

	startDelayedMiniFeedbackHide = (delay = this.props.miniFeedbackHideDelay) => {
		if (delay) {
			this.hideMiniFeedbackJob.startAfter(delay);
		}
	};

	stopDelayedMiniFeedbackHide = () => {
		this.hideMiniFeedbackJob.stop();
	};

	hideMiniFeedback = () => {
		if (this.state.miniFeedbackVisible) {
			this.showMiniFeedback = false;
			this.setState({
				mediaSliderVisible: false,
				miniFeedbackVisible: false
			});
		}
	};

	hideMiniFeedbackJob = new Job(this.hideMiniFeedback);

	handle = handle.bind(this);

	showControlsFromPointer = () => {
		Spotlight.setPointerMode(false);
		this.showControls();
	};

	clearPulsedPlayback = () => {
		this.pulsedPlaybackRate = null;
		this.pulsedPlaybackState = null;
	};

	// only show mini feedback if playback controls are invoked by a key event
	shouldShowMiniFeedback = (ev) => {
		if (ev.type === 'keyup') {
			this.showMiniFeedback = true;
		}
		return true;
	};

	handleLoadStart = () => {
		this.firstPlayReadFlag = true;
		this.prevCommand = this.props.noAutoPlay ? 'pause' : 'play';
		this.speedIndex = 0;
		this.setState({
			announce: AnnounceState.READY,
			currentTime: 0,
			sourceUnavailable: true,
			proportionPlayed: 0,
			proportionLoaded: 0
		});

		if (!this.props.noAutoShowMediaControls) {
			if (!this.state.bottomControlsRendered) {
				this.renderBottomControl.idle();
			} else {
				this.showControls();
			}
		}
	};

	handlePlay = this.handle(
		forwardWillPlay,
		this.shouldShowMiniFeedback,
		() => this.play(),
		forwardPlay
	);

	handlePause = this.handle(
		forwardWillPause,
		this.shouldShowMiniFeedback,
		() => this.pause(),
		forwardPause
	);

	handleRewind = this.handle(
		forwardWillRewind,
		this.shouldShowMiniFeedback,
		() => this.rewind(),
		forwardRewind
	);

	handleFastForward = this.handle(
		forwardWillFastForward,
		this.shouldShowMiniFeedback,
		() => this.fastForward(),
		forwardFastForward
	);

	handleJump = ({keyCode}) => {
		if (this.props.seekDisabled) {
			forwardCustom('onSeekFailed')(null, this.props);
		} else {
			const jumpBy = (is('left', keyCode) ? -1 : 1) * this.props.jumpBy;
			const time = Math.min(this.state.duration, Math.max(0, this.state.currentTime + jumpBy));

			if (this.preventTimeChange(time)) return;

			this.showMiniFeedback = true;
			this.jump(jumpBy);
			this.announceJob.startAfter(500, secondsToTime(this.video.currentTime, getDurFmt(this.props.locale), {includeHour: true}));
		}
	};

	handleGlobalKeyDown = this.handle(
		returnsTrue(this.activityDetected),
		forKey('down'),
		() => (
			!this.state.mediaControlsVisible &&
			((!Spotlight.getCurrent() && Spotlight.getPointerMode()) || !Spotlight.getPointerMode()) &&
			!this.props.spotlightDisabled
		),
		preventDefault,
		stopImmediate,
		this.showControlsFromPointer
	);

	handleControlsHandleAboveHold = () => {
		if (shouldJump(this.props, this.state)) {
			this.handleJump({keyCode: this.jumpButtonPressed === -1 ? jumpBackKeyCode : jumpForwardKeyCode});
		}
	};

	handleControlsHandleAboveKeyDown = ({keyCode}) => {
		if (isEnter(keyCode)) {
			this.jumpButtonPressed = 0;
		} else if (isLeft(keyCode)) {
			this.jumpButtonPressed = -1;
		} else if (isRight(keyCode)) {
			this.jumpButtonPressed = 1;
		}
	};

	handleControlsHandleAboveKeyUp = ({keyCode}) => {
		if (isEnter(keyCode) || isLeft(keyCode) || isRight(keyCode)) {
			this.jumpButtonPressed = null;
		}
	};

	handleControlsHandleAboveDown = () => {
		if (this.jumpButtonPressed === 0) {
			this.showControls();
		} else if (this.jumpButtonPressed === -1 || this.jumpButtonPressed === 1) {
			const keyCode = this.jumpButtonPressed === -1 ? jumpBackKeyCode : jumpForwardKeyCode;

			if (shouldJump(this.props, this.state)) {
				this.handleJump({keyCode});
			} else {
				Spotlight.move(getDirection(keyCode));
			}
		}
	};

	//
	// Media Interaction Methods
	//
	handleEvent = () => {
		const el = this.video;
		const updatedState = {
			// Standard media properties
			currentTime: el.currentTime,
			duration: el.duration,
			paused: this.state.seekingMode ? (el.playbackRate !== 1 || el.paused) : el.paused,
			playbackRate: el.playbackRate,

			// Non-standard state computed from properties
			error: el.error,
			loading: el.loading,
			proportionLoaded: el.proportionLoaded,
			proportionPlayed: el.proportionPlayed || 0,
			sliderTooltipTime: el.currentTime,
			// note: `el.loading && this.state.sourceUnavailable == false` is equivalent to `oncanplaythrough`
			sourceUnavailable: el.loading && this.state.sourceUnavailable || el.error
		};

		// If there's an error, we're obviously not loading, no matter what the readyState is.
		if (updatedState.error) updatedState.loading = false;

		const isRewind = this.prevCommand === 'rewind' || this.prevCommand === 'slowRewind';
		const isForward = this.prevCommand === 'fastForward' || this.prevCommand === 'slowForward';
		if (this.props.pauseAtEnd && (el.currentTime === 0 && isRewind || el.currentTime === el.duration && isForward)) {
			this.pause();
		}

		this.setState(updatedState);
	};

	renderBottomControl = new Job(() => {
		if (!this.state.bottomControlsRendered) {
			this.setState({bottomControlsRendered: true});
		}
	});

	/**
	 * Returns an object with the current state of the media including `currentTime`, `duration`,
	 * `paused`, `playbackRate`, `proportionLoaded`, and `proportionPlayed`.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @returns {Object}
	 * @public
	 */
	getMediaState = () => {
		return {
			currentTime       : this.video.currentTime,
			duration          : this.state.duration,
			paused            : this.state.seekingMode ? (this.video.playbackRate !== 1 || this.video.paused) : this.video.paused,
			playbackRate      : this.video.playbackRate,
			proportionLoaded  : this.video.proportionLoaded,
			proportionPlayed  : this.video.proportionPlayed || 0
		};
	};

	/**
	 * The primary means of interacting with the `<video>` element.
	 *
	 * @param  {String} action The method to preform.
	 * @param  {Multiple} props  The arguments, in the format that the action method requires.
	 *
	 * @private
	 */
	send = (action, props) => {
		this.clearPulsedPlayback();
		this.showFeedback();
		this.startDelayedFeedbackHide();
		this.video[action](props);
	};

	/**
	 * Programmatically plays the current media.
	 * If you call this function during fast forwarding or rewinding, the playback speed will be set to normal.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	play = () => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		if (this.state.seekingMode) {
			this.setPlaybackRate(1);
		}
		this.speedIndex = 0;
		// must happen before send() to ensure feedback uses the right value
		// TODO: refactor into this.state member
		this.prevCommand = 'play';
		this.send('play');
		this.announce($L('Play'));
		this.startDelayedMiniFeedbackHide(5000);

		return true;
	};

	/**
	 * Programmatically pauses the current media.
	 * If you call this function during fast forwarding or rewinding, the playback speed will be set to normal.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	pause = () => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		if (this.state.seekingMode) {
			this.setPlaybackRate(1);
		}
		this.speedIndex = 0;
		// must happen before send() to ensure feedback uses the right value
		// TODO: refactor into this.state member
		this.prevCommand = 'pause';
		this.send('pause');
		this.announce($L('Pause'));
		this.stopDelayedMiniFeedbackHide();

		return true;
	};

	/**
	 * Sets the media playback time index.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @param {Number} timeIndex - Time index to seek
	 * @public
	 */
	seek = (timeIndex) => {
		if (!this.props.seekDisabled && !isNaN(this.video.duration) && !this.state.sourceUnavailable) {
			this.video.currentTime = timeIndex;
		} else {
			forwardCustom('onSeekFailed')(null, this.props);
		}
	};

	/**
	 * Step a given amount of time away from the current playback position.
	 * Like {@link sandstone/VideoPlayer.VideoPlayerBase.seek|seek} but relative.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @param {Number} distance - Time value to jump
	 * @public
	 */
	jump = (distance) => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		this.pulsedPlaybackRate = toUpperCase(new DurationFmt({length: 'long'}).format({second: this.props.jumpBy}));
		this.pulsedPlaybackState = distance > 0 ? 'jumpForward' : 'jumpBackward';
		this.showFeedback();
		this.startDelayedFeedbackHide();
		this.seek(this.state.currentTime + distance);
		this.startDelayedMiniFeedbackHide();

		return true;
	};

	/**
	 * Fast forwards the current media for seeking.
	 * This function changes the playback rate.
	 * If you call `play` or `pause` during fast forwarding, the playback speed will be set to normal.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	fastForward = () => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		this.setState({seekingMode : true});
		let shouldResumePlayback = false;

		switch (this.prevCommand) {
			case 'slowForward':
				if (this.speedIndex === this.playbackRates.length - 1) {
					// reached to the end of array => fastforward
					this.selectPlaybackRates('fastForward');
					this.speedIndex = 0;
					this.prevCommand = 'fastForward';
				} else {
					this.speedIndex = this.clampPlaybackRate(this.speedIndex + 1);
				}
				break;
			case 'pause':
				this.selectPlaybackRates('slowForward');
				if (this.state.paused) {
					shouldResumePlayback = true;
				}
				this.speedIndex = 0;
				this.prevCommand = 'slowForward';
				break;
			case 'fastForward':
				this.speedIndex = this.clampPlaybackRate(this.speedIndex + 1);
				this.prevCommand = 'fastForward';
				break;
			default:
				this.selectPlaybackRates('fastForward');
				this.speedIndex = 0;
				this.prevCommand = 'fastForward';
				if (this.state.paused) {
					shouldResumePlayback = true;
				}
				break;
		}

		this.setPlaybackRate(this.selectPlaybackRate(this.speedIndex));

		if (shouldResumePlayback) this.send('play');

		this.stopDelayedFeedbackHide();
		this.stopDelayedMiniFeedbackHide();
		this.clearPulsedPlayback();
		this.showFeedback();

		return true;
	};

	/**
	 * Rewinds the current media for seeking.
	 * This function changes the playback rate.
	 * If you call `play` or `pause` during rewinding, the playback speed will be set to normal.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	rewind = () => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		this.setState({seekingMode: true});
		const rateForSlowRewind = this.props.playbackRateHash['slowRewind'];
		let shouldResumePlayback = false,
			command = 'rewind';

		if (this.video.currentTime === 0) {
			// Do not rewind if currentTime is 0. We're already at the beginning.
			return true;
		}

		switch (this.prevCommand) {
			case 'slowRewind':
				if (this.speedIndex === this.playbackRates.length - 1) {
					// reached to the end of array => go to rewind
					this.selectPlaybackRates(command);
					this.speedIndex = 0;
					this.prevCommand = command;
				} else {
					this.speedIndex = this.clampPlaybackRate(this.speedIndex + 1);
				}
				break;
			case 'pause':
				// If it's possible to slowRewind, do it, otherwise just leave it as normal rewind : QEVENTSEVT-17386
				if (rateForSlowRewind && rateForSlowRewind.length >= 0) {
					command = 'slowRewind';
				}
				this.selectPlaybackRates(command);
				if (this.state.paused && this.state.duration > this.state.currentTime) {
					shouldResumePlayback = true;
				}
				this.speedIndex = 0;
				this.prevCommand = command;
				break;
			case 'rewind':
				this.speedIndex = this.clampPlaybackRate(this.speedIndex + 1);
				this.prevCommand = command;
				break;
			default:
				this.selectPlaybackRates(command);
				this.speedIndex = 0;
				this.prevCommand = command;
				break;
		}

		this.setPlaybackRate(this.selectPlaybackRate(this.speedIndex));

		if (shouldResumePlayback) this.send('play');

		this.stopDelayedFeedbackHide();
		this.stopDelayedMiniFeedbackHide();
		this.clearPulsedPlayback();
		this.showFeedback();

		return true;
	};

	/**
	 * Sets the playback speed.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @param {Number} rate - The desired playback rate. This value is passed to the `playbackRate` property of `HTMLMediaElement`.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate|MDN playbackRate property}
	 * @returns {Boolean} Returns true if the speed changes successfully.
	 * @public
	 */
	setPlaybackSpeed = (rate) => {
		if (this.state.sourceUnavailable) {
			return false;
		}

		this.setState({seekingMode: false});
		this.setPlaybackRate(rate);

		return true;
	};

	// Creates a proxy to the video node if Proxy is supported
	videoProxy = typeof Proxy !== 'function' ? null : new Proxy({}, {
		get: (target, name) => {
			let value = this.video[name];

			if (typeof value === 'function') {
				value = value.bind(this.video);
			}

			return value;
		},
		set: (target, name, value) => {
			return (this.video[name] = value);
		}
	});

	/**
	 * Returns a proxy to the underlying `<video>` node currently used by the VideoPlayer
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @public
	 */
	getVideoNode = () => {
		return this.videoProxy || this.video;
	};

	areControlsVisible = () => {
		return this.state.mediaControlsVisible;
	};

	/**
	 * Sets the playback rate type for video seeking (from the keys of {@link sandstone/VideoPlayer.VideoPlayer.playbackRateHash|playbackRateHash}).
	 *
	 * @param {String} cmd - Key of the playback rate type.
	 * @private
	 */
	selectPlaybackRates = (cmd) => {
		this.playbackRates = this.props.playbackRateHash[cmd];
	};

	/**
	 * Changes playbackRate to a valid value when initiating fast-forward or rewind.
	 *
	 * @param {Number} idx - The index of the desired playback rate.
	 * @private
	 */
	clampPlaybackRate = (idx) => {
		if (!this.playbackRates) {
			return;
		}

		return idx % this.playbackRates.length;
	};

	/**
	 * Retrieves the playback rate value.
	 *
	 * @param {Number} idx - The index of the desired playback rate.
	 * @returns {Number|String} The playback rate value.
	 * @private
	 */
	selectPlaybackRate = (idx) => {
		return this.playbackRates[idx];
	};

	/**
	 * Sets playbackRate.
	 *
	 * @param {Number|String} rate - The desired playback rate.
	 * @private
	 */
	setPlaybackRate = (rate) => {
		if (this.state.seekingMode) {
			// Stop rewind (if happening)
			this.stopRewindJob();
		}

		// Make sure rate is a string
		this.playbackRate = String(rate);
		const pbNumber = calcNumberValueOfPlaybackRate(this.playbackRate);

		if (platform.type !== 'webos') {
			// ReactDOM throws error for setting negative value for playbackRate
			this.video.playbackRate = pbNumber < 0 ? 0 : pbNumber;

			if (this.state.seekingMode) {
				// For supporting cross browser behavior
				if (pbNumber < 0) {
					this.beginRewind();
				}
			}
		} else {
			// Set native playback rate
			this.video.playbackRate = pbNumber;
		}
	};

	/**
	 * Calculates the time that has elapsed since. This is necessary for browsers until negative
	 * playback rate is directly supported.
	 *
	 * @private
	 */
	rewindManually = () => {
		const now = perfNow(),
			distance = now - this.rewindBeginTime,
			pbRate = calcNumberValueOfPlaybackRate(this.playbackRate),
			adjustedDistance = (distance * pbRate) / 1000;

		this.jump(adjustedDistance);
		this.stopDelayedMiniFeedbackHide();
		this.clearPulsedPlayback();
		this.startRewindJob();	// Issue another rewind tick
	};

	rewindJob = new Job(this.rewindManually, 100);

	/**
	 * Starts rewind job.
	 *
	 * @private
	 */
	startRewindJob = () => {
		this.rewindBeginTime = perfNow();
		this.rewindJob.start();
	};

	/**
	 * Stops rewind job.
	 *
	 * @private
	 */
	stopRewindJob = () => {
		this.rewindJob.stop();
	};

	/**
	 * Implements custom rewind functionality (until browsers support negative playback rate).
	 *
	 * @private
	 */
	beginRewind = () => {
		this.send('pause');
		this.startRewindJob();
	};

	//
	// Handled Media events
	//
	addStateToEvent = (ev) => {
		return {
			// More props from `ev` may be added here as needed, but a full copy via `...ev`
			// overloads Storybook's Action Logger and likely has other perf fallout.
			type: ev.type,
			// Specific state variables are included in the outgoing callback payload, not all of them
			...this.getMediaState()
		};
	};

	//
	// Player Interaction events
	//
	onVideoClick = () => {
		this.toggleControls();
	};

	onSliderChange = ({value}) => {
		const time = value * this.state.duration;

		if (this.preventTimeChange(time)) return;

		this.seek(time);
		this.sliderScrubbing = false;
	};

	handleBack = this.handle(forwardCustom('onBack'));

	handleKnobMove = (ev) => {
		this.sliderScrubbing = true;

		// prevent announcing repeatedly when the knob is detached from the progress.
		// TODO: fix Slider to not send onKnobMove when the knob hasn't, in fact, moved
		if (this.sliderKnobProportion !== ev.proportion) {
			this.sliderKnobProportion = ev.proportion;
			const seconds = Math.floor(this.sliderKnobProportion * this.video.duration);

			if (!isNaN(seconds)) {
				const knobTime = secondsToTime(seconds, getDurFmt(this.props.locale), {includeHour: true});

				forward('onScrub', {...ev, seconds, type: 'onScrub'}, this.props);

				this.announce(`${$L('jump to')} ${knobTime}`, true);
			}
		}
	};

	handleSliderFocus = () => {
		const seconds = Math.floor(this.sliderKnobProportion * this.video.duration);
		this.sliderScrubbing = true;

		this.setState({
			feedbackAction: 'focus',
			feedbackVisible: true
		});
		this.stopDelayedFeedbackHide();

		if (!isNaN(seconds)) {
			const knobTime = secondsToTime(seconds, getDurFmt(this.props.locale), {includeHour: true});

			forward('onScrub', {
				detached: this.sliderScrubbing,
				proportion: this.sliderKnobProportion,
				seconds,
				type: 'onScrub'
			},
			this.props);

			this.announce(`${$L('jump to')} ${knobTime}`, true);
		}
	};

	handleSliderBlur = () => {
		this.sliderScrubbing = false;
		this.startDelayedFeedbackHide();
		this.setState(() => ({
			feedbackAction: 'blur',
			feedbackVisible: true
		}));
	};

	slider5WayPressJob = new Job(() => {
		this.setState({slider5WayPressed: false});
	}, 200);

	handleSliderKeyDown = (ev) => {
		const {keyCode} = ev;

		if (is('enter', keyCode)) {
			this.setState({
				slider5WayPressed: true
			}, this.slider5WayPressJob.start());
		} else if (is('down', keyCode)) {
			Spotlight.setPointerMode(false);

			if (Spotlight.focus(this.mediaControlsSpotlightId)) {
				preventDefault(ev);
				stopImmediate(ev);
			}
		} else if (is('up', keyCode)) {
			Spotlight.setPointerMode(false);
		}
	};

	onJumpBackward = this.handle(
		forwardWillJumpBackward,
		() => this.jump(-1 * this.props.jumpBy),
		forwardJumpBackward
	);

	onJumpForward = this.handle(
		forwardWillJumpForward,
		() => this.jump(this.props.jumpBy),
		forwardJumpForward
	);

	handleToggleMore = (ev) => {
		const {showMoreComponents, liftDistance} = ev;

		forwardToggleMore(ev, this.props);

		if (!showMoreComponents) {
			this.startAutoCloseTimeout();	// Restore the timer since we are leaving "more".
			// Restore the title-hide now that we're finished with "more".
			this.startDelayedTitleHide();
		} else {
			// Interrupt the title-hide since we don't want it hiding autonomously in "more".
			this.stopDelayedTitleHide();
		}

		this.playerRef.current.style.setProperty('--liftDistance', `${liftDistance}px`);
		this.setState(({announce}) => ({
			infoVisible: showMoreComponents,
			titleVisible: true,
			announce: announce < AnnounceState.INFO ? AnnounceState.INFO : AnnounceState.DONE
		}));
	};

	handleMediaControlsClose = (ev) => {
		this.hideControls();
		ev.stopPropagation();
	};

	setVideoRef = (video) => {
		this.video = video;
	};

	setTitleRef = (node) => {
		this.titleRef = node;
	};

	setAnnounceRef = (node) => {
		this.announceRef = node;
	};

	getControlsAriaProps () {
		if (this.state.announce === AnnounceState.TITLE) {
			return {
				'aria-labelledby': `${this.id}_mediaTitle_title ${this.id}_mediaControls_actionGuide`,
				'aria-live': 'off',
				role: 'alert'
			};
		} else if (this.state.announce === AnnounceState.INFO) {
			return {
				'aria-labelledby': `${this.id}_mediaTitle_info`,
				role: 'region'
			};
		}

		return null;
	}

	render () {
		const {
			backButtonAriaLabel,
			className,
			disabled,
			infoComponents,
			initialJumpDelay,
			jumpDelay,
			loading,
			locale,
			mediaControlsComponent,
			no5WayJump,
			noAutoPlay,
			noMiniFeedback,
			noSlider,
			noSpinner,
			selection,
			spotlightDisabled,
			spotlightId,
			style,
			thumbnailComponent,
			thumbnailSrc,
			title,
			videoComponent: VideoComponent,
			...mediaProps
		} = this.props;

		delete mediaProps.announce;
		delete mediaProps.autoCloseTimeout;
		delete mediaProps.children;
		delete mediaProps.feedbackHideDelay;
		delete mediaProps.jumpBy;
		delete mediaProps.miniFeedbackHideDelay;
		delete mediaProps.noAutoShowMediaControls;
		delete mediaProps.noMediaSliderFeedback;
		delete mediaProps.onBack;
		delete mediaProps.onControlsAvailable;
		delete mediaProps.onFastForward;
		delete mediaProps.onJumpBackward;
		delete mediaProps.onJumpForward;
		delete mediaProps.onPause;
		delete mediaProps.onPlay;
		delete mediaProps.onRewind;
		delete mediaProps.onWillFastForward;
		delete mediaProps.onWillJumpBackward;
		delete mediaProps.onWillJumpForward;
		delete mediaProps.onWillPause;
		delete mediaProps.onWillPlay;
		delete mediaProps.onWillRewind;
		delete mediaProps.onScrub;
		delete mediaProps.onSeekFailed;
		delete mediaProps.onSeekOutsideSelection;
		delete mediaProps.onToggleMore;
		delete mediaProps.pauseAtEnd;
		delete mediaProps.playbackRateHash;
		delete mediaProps.seekDisabled;
		delete mediaProps.setApiProvider;
		delete mediaProps.thumbnailUnavailable;
		delete mediaProps.titleHideDelay;
		delete mediaProps.videoPath;

		mediaProps.autoPlay = !noAutoPlay;
		mediaProps.className = css.video;
		mediaProps.controls = false;
		mediaProps.mediaComponent = 'video';
		mediaProps.onLoadStart = this.handleLoadStart;
		mediaProps.onUpdate = this.handleEvent;
		mediaProps.ref = this.setVideoRef;

		const controlsAriaProps = this.getControlsAriaProps();

		let proportionSelection = selection;
		if (proportionSelection != null && this.state.duration) {
			proportionSelection = selection.map(t => t / this.state.duration);
		}

		const durFmt = getDurFmt(locale);
		const controlsHandleAboveHoldConfig = getControlsHandleAboveHoldConfig({frequency: jumpDelay, time: initialJumpDelay});

		return (
			<RootContainer
				className={css.videoPlayer + ' enact-fit' + (className ? ' ' + className : '')}
				onClick={this.activityDetected}
				ref={this.playerRef}
				spotlightDisabled={spotlightDisabled}
				spotlightId={spotlightId}
				style={style}
			>
				{/* Video Section */}
				{
					// Duplicating logic from <ComponentOverride /> until enzyme supports forwardRef
					VideoComponent && (
						(typeof VideoComponent === 'function' || typeof VideoComponent === 'string') && (
							<VideoComponent {...mediaProps} />
						) || isValidElement(VideoComponent) && (
							cloneElement(VideoComponent, mediaProps)
						)
					) || null
				}

				<Overlay
					bottomControlsVisible={this.state.mediaControlsVisible}
					onClick={this.onVideoClick}
				>
					{!noSpinner && (this.state.loading || loading) ? <Spinner centered /> : null}
				</Overlay>

				{this.state.bottomControlsRendered ?
					<div className={css.fullscreen} {...controlsAriaProps}>
						<FeedbackContent
							className={css.miniFeedback}
							playbackRate={this.pulsedPlaybackRate || this.selectPlaybackRate(this.speedIndex)}
							playbackState={this.pulsedPlaybackState || this.prevCommand}
							visible={this.state.miniFeedbackVisible && !noMiniFeedback}
						>
							{secondsToTime(this.state.sliderTooltipTime, durFmt)}
						</FeedbackContent>
						{
							this.state.mediaControlsVisible ?
								<Button
									aria-label={backButtonAriaLabel == null ? $L('go to previous') : backButtonAriaLabel}
									className={css.back}
									icon="arrowhookleft"
									iconFlip="auto"
									onClick={this.handleBack}
									size="small"
								/> :
								null
						}
						<ControlsContainer
							className={css.bottom + (this.state.mediaControlsVisible ? '' : ' ' + css.hidden) + (this.state.infoVisible ? ' ' + css.lift : '')}
							spotlightDisabled={spotlightDisabled || !this.state.mediaControlsVisible}
						>
							{/*
								Info Section: Title, Description, Times
								Only render when `this.state.mediaControlsVisible` is true in order for `Marquee`
								to make calculations correctly in `MediaTitle`.
							*/}
							{this.state.mediaSliderVisible ?
								<div className={css.infoFrame}>
									<MediaTitle
										id={`${this.id}_mediaTitle`}
										infoVisible={this.state.infoVisible}
										ref={this.setTitleRef}
										title={title}
										visible={this.state.titleVisible && this.state.mediaControlsVisible}
									>
										{infoComponents}
									</MediaTitle>
									{noSlider ?
										<Times current={this.state.currentTime} total={this.state.duration} formatter={durFmt} /> :
										null
									}
								</div> :
								null
							}
							{noSlider ?
								null :
								<div className={css.sliderContainer}>
									{this.state.mediaSliderVisible ?
										<Times noTotalTime current={this.state.currentTime} formatter={durFmt} /> :
										null
									}
									<MediaSlider
										backgroundProgress={this.state.proportionLoaded}
										disabled={disabled || this.state.sourceUnavailable}
										forcePressed={this.state.slider5WayPressed}
										onBlur={this.handleSliderBlur}
										onChange={this.onSliderChange}
										onFocus={this.handleSliderFocus}
										onKeyDown={this.handleSliderKeyDown}
										onKnobMove={this.handleKnobMove}
										selection={proportionSelection}
										spotlightDisabled={spotlightDisabled || !this.state.mediaControlsVisible}
										value={this.state.proportionPlayed}
										visible={this.state.mediaSliderVisible}
									>
										<FeedbackTooltip
											action={this.state.feedbackAction}
											duration={this.state.duration}
											formatter={durFmt}
											hidden={!this.state.feedbackVisible || this.state.sourceUnavailable}
											playbackRate={this.selectPlaybackRate(this.speedIndex)}
											playbackState={this.prevCommand}
											thumbnailComponent={thumbnailComponent}
											thumbnailDeactivated={this.props.thumbnailUnavailable}
											thumbnailSrc={thumbnailSrc}
										/>
									</MediaSlider>
									{this.state.mediaSliderVisible ?
										<Times noCurrentTime total={this.state.duration} formatter={durFmt} /> :
										null
									}
								</div>
							}
							<ComponentOverride
								component={mediaControlsComponent}
								id={`${this.id}_mediaControls`}
								initialJumpDelay={initialJumpDelay}
								jumpDelay={jumpDelay}
								mediaDisabled={disabled || this.state.sourceUnavailable}
								no5WayJump={no5WayJump}
								onClose={this.handleMediaControlsClose}
								onFastForward={this.handleFastForward}
								onJumpBackwardButtonClick={this.onJumpBackward}
								onJumpForwardButtonClick={this.onJumpForward}
								onPause={this.handlePause}
								onPlay={this.handlePlay}
								onRewind={this.handleRewind}
								onToggleMore={this.handleToggleMore}
								paused={this.state.paused}
								spotlightId={this.mediaControlsSpotlightId}
								spotlightDisabled={!this.state.mediaControlsVisible || spotlightDisabled}
								visible={this.state.mediaControlsVisible}
							/>
						</ControlsContainer>
					</div> :
					null
				}
				<SpottableDiv
					// This captures spotlight focus for use with 5-way.
					// It's non-visible but lives at the top of the VideoPlayer.
					className={css.controlsHandleAbove}
					holdConfig={controlsHandleAboveHoldConfig}
					onDown={this.handleControlsHandleAboveDown}
					onHold={this.handleControlsHandleAboveHold}
					onKeyDown={this.handleControlsHandleAboveKeyDown}
					onKeyUp={this.handleControlsHandleAboveKeyUp}
					onSpotlightDown={this.showControls}
					selectionKeys={controlsHandleAboveSelectionKeys}
					spotlightDisabled={this.state.mediaControlsVisible || spotlightDisabled}
				/>
				<Announce ref={this.setAnnounceRef} />
			</RootContainer>
		);
	}
};

/**
 * A standard HTML5 video player for Sandstone. It behaves, responds to, and operates like a
 * `<video>` tag in its support for `<source>`.  It also accepts custom tags such as
 * `<infoComponents>` for displaying additional information in the title area and `<MediaControls>`
 * for handling media playback controls and adding more controls.
 *
 * Example usage:
 * ```
 *	<VideoPlayer title="Hilarious Cat Video" poster="https://my.cat.videos/boots-poster.jpg">
 *		<source src="https://my.cat.videos/boots.mp4" type="video/mp4" />
 *		<infoComponents>A video about my cat Boots, wearing boots.</infoComponents>
 *		<MediaControls>
 *			<leftComponents><Button backgroundOpacity="translucent" icon="star" /></leftComponents>
 *			<rightComponents><Button backgroundOpacity="translucent" icon="notification" /></rightComponents>
 *
 *			<Button backgroundOpacity="translucent">Add To Favorites</Button>
 *			<Button backgroundOpacity="translucent" icon="search" />
 *		</MediaControls>
 *	</VideoPlayer>
 * ```
 *
 * To invoke methods (e.g.: `fastForward()`) or get the current state (`getMediaState()`), store a
 * ref to the `VideoPlayer` within your component:
 *
 * ```
 * 	...
 *
 * 	setVideoPlayer = (node) => {
 * 		this.videoPlayer = node;
 * 	}
 *
 * 	play () {
 * 		this.videoPlayer.play();
 * 	}
 *
 * 	render () {
 * 		return (
 * 			<VideoPlayer ref={this.setVideoPlayer} />
 * 		);
 * 	}
 * ```
 *
 * @class VideoPlayer
 * @memberof sandstone/VideoPlayer
 * @mixes ui/Slottable.Slottable
 * @ui
 * @public
 */
const VideoPlayer = ApiDecorator(
	{api: [
		'areControlsVisible',
		'fastForward',
		'getMediaState',
		'getVideoNode',
		'hideControls',
		'jump',
		'pause',
		'play',
		'rewind',
		'seek',
		'setPlaybackSpeed',
		'showControls',
		'showFeedback',
		'toggleControls'
	]},
	I18nContextDecorator(
		{localeProp: 'locale'},
		Slottable(
			{slots: ['infoComponents', 'mediaControlsComponent', 'source', 'thumbnailComponent', 'videoComponent']},
			FloatingLayerDecorator(
				{floatLayerId: 'videoPlayerFloatingLayer'},
				Skinnable(
					VideoPlayerBase
				)
			)
		)
	)
);

export default VideoPlayer;
export {
	Video,
	VideoPlayer,
	VideoPlayerBase
};
