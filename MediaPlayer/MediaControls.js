import ApiDecorator from '@enact/core/internal/ApiDecorator';
import Cancelable from '@enact/ui/Cancelable';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {is} from '@enact/core/keymap';
import {on, off} from '@enact/core/dispatcher';
import Pause from '@enact/spotlight/Pause';
import Slottable from '@enact/ui/Slottable';
import Spotlight from '@enact/spotlight';
import {SpotlightContainerDecorator, spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {forward} from '@enact/core/handle';
import {Job} from '@enact/core/util';
import PropTypes from 'prop-types';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import $L from '../internal/$L';
import {compareChildren, onlyUpdateForProps} from '../internal/util';
import ActionGuide from '../ActionGuide';
import Button from '../Button';

import {countReactChildren} from './util';

import css from './MediaControls.module.less';

const OuterContainer = SpotlightContainerDecorator({
	defaultElement: [
		`.${spotlightDefaultClass}`
	],
	leaveFor: {left: '', right: ''}
}, 'div');
const Container = SpotlightContainerDecorator({
	enterTo: 'default-element'
}, 'div');
const MediaButton = onlyUpdateForProps(Button, [
	'children',
	'className',
	'disabled',
	'icon',
	'onClick',
	'spotlightDisabled'
]);

const forwardToggleMore = forward('onToggleMore');

const animationDuration = 300;

/**
 * A set of components for controlling media playback and rendering additional components.
 *
 * @class MediaControlsBase
 * @memberof sandstone/MediaPlayer
 * @ui
 * @private
 */
const MediaControlsBase = kind({
	name: 'MediaControls',

	// intentionally assigning these props to MediaControls instead of Base (which is private)
	propTypes: /** @lends sandstone/MediaPlayer.MediaControls.prototype */ {
		/**
		 * DOM id for the component.
		 *
		 * This child component `ActionGuide`'s id is generated from the id.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		id: PropTypes.string.isRequired,

		/**
		 * The `aria-label` for the action guide.
		 *
		 * @type {String}
		 * @public
		 */
		actionGuideAriaLabel: PropTypes.string,

		/**
		 * The label for the action guide.
		 *
		 * @type {String}
		 * @public
		 */
		actionGuideLabel: PropTypes.string,

		/**
		 * These components are placed below the action guide. Typically these will be media playlist controls.
		 *
		 * @type {Node}
		 * @public
		 */
		bottomComponents: PropTypes.node,

		/**
		 * Jump backward [icon]{@link sandstone/Icon.Icon} name. Accepts any
		 * [icon]{@link sandstone/Icon.Icon} component type.
		 *
		 * @type {String}
		 * @default 'jumpbackward'
		 * @public
		 */
		jumpBackwardIcon: PropTypes.string,

		/**
		 * Disables state on the media "jump" buttons; the outer pair.
		 *
		 * @type {Boolean}
		 * @public
		 */
		jumpButtonsDisabled: PropTypes.bool,

		/**
		 * Jump forward [icon]{@link sandstone/Icon.Icon} name. Accepts any
		 * [icon]{@link sandstone/Icon.Icon} component type.
		 *
		 * @type {String}
		 * @default 'jumpforward'
		 * @public
		 */
		jumpForwardIcon: PropTypes.string,

		/**
		 * Disables the media buttons.
		 *
		 * @type {Boolean}
		 * @public
		 */
		mediaDisabled: PropTypes.bool,

		/**
		 * When `true`, more components are rendered. This does not indicate the visibility of more components.
		 *
		 * @type {Boolean}
		 * @public
		 */
		moreComponentsRendered: PropTypes.bool,

		/**
		 * The spotlight ID for the moreComponent container.
		 *
		 * @type {String}
		 * @public
		 * @default 'moreComponents'
		 */
		moreComponentsSpotlightId: PropTypes.string,

		/**
		 * Removes the "jump" buttons. The buttons that skip forward or backward in the video.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noJumpButtons: PropTypes.bool,

		/**
		 * Called when cancel/back key events are fired.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called when the user flicks on the action guide.
		 *
		 * @type {Function}
		 * @private
		 */
		onFlickFromActionGuide: PropTypes.func,

		/**
		 * Called when the user clicks the JumpBackward button
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpBackwardButtonClick: PropTypes.func,

		/**
		 * Called when the user clicks the JumpForward button.
		 *
		 * @type {Function}
		 * @public
		 */
		onJumpForwardButtonClick: PropTypes.func,

		/**
		 * Called when the user presses a media control button.
		 *
		 * @type {Function}
		 * @public
		 */
		onKeyDownFromMediaButtons: PropTypes.func,

		/**
		 * Called when the user clicks the Play button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlayButtonClick: PropTypes.func,

		/**
		 * `true` when the video is paused.
		 *
		 * @type {Boolean}
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * A string which is sent to the `pause` icon of the player controls. This can be
		 * anything that is accepted by [Icon]{@link sandstone/Icon.Icon}. This will be temporarily replaced by
		 * the [playIcon]{@link sandstone/MediaPlayer.MediaControls.playIcon} when the
		 * [paused]{@link sandstone/MediaPlayer.MediaControls.paused} boolean is `false`.
		 *
		 * @type {String}
		 * @default 'pause'
		 * @public
		 */
		pauseIcon: PropTypes.string,

		/**
		 * A string which is sent to the `play` icon of the player controls. This can be
		 * anything that is accepted by {@link sandstone/Icon.Icon}. This will be temporarily replaced by
		 * the [pauseIcon]{@link sandstone/MediaPlayer.MediaControls.pauseIcon} when the
		 * [paused]{@link sandstone/MediaPlayer.MediaControls.paused} boolean is `true`.
		 *
		 * @type {String}
		 * @default 'play'
		 * @public
		 */
		playIcon: PropTypes.string,

		/**
		 * Disables the media "play"/"pause" button.
		 *
		 * @type {Boolean}
		 * @public
		 */
		playPauseButtonDisabled: PropTypes.bool,

		/**
		 * When `true`, more components are visible.
		 *
		 * @type {Boolean}
		 * @private
		 */
		showMoreComponents: PropTypes.bool,

		/**
		 * `true` controls are disabled from Spotlight.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The spotlight ID for the media controls container.
		 *
		 * @type {String}
		 * @public
		 * @default 'mediaControls'
		 */
		spotlightId: PropTypes.string,

		/**
		 * The visibility of the component. When `false`, the component will be hidden.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		visible: PropTypes.bool
	},

	defaultProps: {
		jumpBackwardIcon: 'jumpbackward',
		jumpForwardIcon: 'jumpforward',
		moreComponentsSpotlightId: 'moreComponents',
		spotlightId: 'mediaControls',
		pauseIcon: 'pause',
		playIcon: 'play',
		visible: true
	},

	styles: {
		css,
		className: 'controlsFrame'
	},

	computed: {
		actionGuideClassName: ({styler, showMoreComponents}) => styler.join({hidden: showMoreComponents}),
		actionGuideShowing: ({bottomComponents, children}) => countReactChildren(children) || bottomComponents,
		className: ({visible, styler}) => styler.append({hidden: !visible}),
		moreButtonsClassName: ({styler}) => styler.join('mediaControls', 'moreButtonsComponents'),
		moreComponentsRendered: ({showMoreComponents, moreComponentsRendered}) => showMoreComponents || moreComponentsRendered
	},

	render: ({
		actionGuideAriaLabel,
		actionGuideLabel,
		actionGuideShowing,
		children,
		id,
		jumpBackwardIcon,
		jumpButtonsDisabled,
		jumpForwardIcon,
		bottomComponents,
		mediaDisabled,
		moreComponentsSpotlightId,
		noJumpButtons,
		onFlickFromActionGuide,
		onJumpBackwardButtonClick,
		onJumpForwardButtonClick,
		onKeyDownFromMediaButtons,
		onPlayButtonClick,
		paused,
		pauseIcon,
		playIcon,
		playPauseButtonDisabled,
		showMoreComponents,
		moreComponentsRendered,
		moreButtonsClassName,
		actionGuideClassName,
		spotlightDisabled,
		spotlightId,
		...rest
	}) => {
		delete rest.onClose;
		delete rest.visible;
		return (
			<OuterContainer {...rest} id={id} spotlightId={spotlightId}>
				<Container className={css.mediaControls} spotlightDisabled={spotlightDisabled} onKeyDown={onKeyDownFromMediaButtons}>
					{noJumpButtons ? null : <MediaButton aria-label={$L('Previous')} backgroundOpacity="transparent" css={css} disabled={mediaDisabled || jumpButtonsDisabled} icon={jumpBackwardIcon} onClick={onJumpBackwardButtonClick} size="large" spotlightDisabled={spotlightDisabled} />}
					<MediaButton aria-label={paused ? $L('Play') : $L('Pause')} className={spotlightDefaultClass} backgroundOpacity="transparent" css={css} disabled={mediaDisabled || playPauseButtonDisabled} icon={paused ? playIcon : pauseIcon} onClick={onPlayButtonClick} size="large" spotlightDisabled={spotlightDisabled} />
					{noJumpButtons ? null : <MediaButton aria-label={$L('Next')} backgroundOpacity="transparent" css={css} disabled={mediaDisabled || jumpButtonsDisabled} icon={jumpForwardIcon} onClick={onJumpForwardButtonClick} size="large" spotlightDisabled={spotlightDisabled} />}
				</Container>
				{actionGuideShowing ?
					<ActionGuide id={`${id}_actionGuide`} aria-label={actionGuideAriaLabel != null ? actionGuideAriaLabel : null} css={css} className={actionGuideClassName} icon="arrowsmalldown" onFlick={onFlickFromActionGuide}>{actionGuideLabel}</ActionGuide> :
					null
				}
				{moreComponentsRendered ?
					<Container spotlightId={moreComponentsSpotlightId} className={css.moreComponents} spotlightDisabled={!showMoreComponents || spotlightDisabled}>
						<Container className={moreButtonsClassName} >
							{children}
						</Container>
						<div>
							{bottomComponents}
						</div>
					</Container> :
					null
				}
			</OuterContainer>
		);
	}
});

/**
 * Media control behaviors to apply to [MediaControlsBase]{@link sandstone/MediaPlayer.MediaControlsBase}.
 * Provides built-in support for showing more components and key handling for basic playback
 * controls.
 *
 * @class MediaControlsDecorator
 * @memberof sandstone/MediaPlayer
 * @mixes ui/Slottable.Slottable
 * @hoc
 * @private
 */
const MediaControlsDecorator = hoc((config, Wrapped) => {
	class MediaControlsDecoratorHOC extends Component {
		static displayName = 'MediaControlsDecorator';

		static propTypes = /** @lends sandstone/MediaPlayer.MediaControlsDecorator.prototype */ {
			/**
			 * The label for the action guide.
			 *
			 * @type {String}
			 * @public
			 */
			actionGuideLabel: PropTypes.string,

			/**
			 * These components are placed below the children. Typically these will be media playlist items.
			 *
			 * @type {Node}
			 * @public
			 */
			bottomComponents: PropTypes.node,

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
			 * The number of milliseconds that the player will throttle before firing a
			 * jump event on a right or left pulse.
			 *
			 * @type {Number}
			 * @default 200
			 * @public
			 */
			jumpDelay: PropTypes.number,

			/**
			 * Disables the media buttons.
			 *
			 * @type {Boolean}
			 * @public
			 */
			mediaDisabled: PropTypes.bool,

			/**
			 * Disables showing more components.
			 *
			 * @type {Boolean}
			 * @public
			 */
			moreActionDisabled: PropTypes.bool,

			/**
			 * Setting this to `true` will disable left and right keys for seeking.
			 *
			 * @type {Boolean}
			 * @public
			 */
			no5WayJump: PropTypes.bool,

			/**
			 * Called when media fast forwards.
			 *
			 * @type {Function}
			 * @public
			 */
			onFastForward: PropTypes.func,

			/**
			 * Called when media jumps.
			 *
			 * @type {Function}
			 * @public
			 */
			onJump: PropTypes.func,

			/**
			 * Called when media gets paused.
			 *
			 * @type {Function}
			 * @public
			 */
			onPause: PropTypes.func,

			/**
			 * Called when media starts playing.
			 *
			 * @type {Function}
			 * @public
			 */
			onPlay: PropTypes.func,

			/**
			 * Called when media rewinds.
			 *
			 * @type {Function}
			 * @public
			 */
			onRewind: PropTypes.func,

			/**
			 * Called when the visibility of more components is changed
			 *
 			 * Event payload includes:
			 *
			 * * `type` - Type of event, `'onToggleMore'`
			 * * `showMoreComponents` - `true` when the components are visible`
			 * * `liftDistance` - The distance, in pixels, the component animates
			 *
			 * @type {Function}
			 * @public
			 */
			onToggleMore: PropTypes.func,

			/**
			 * The video pause state.
			 *
			 * @type {Boolean}
			 * @public
			 */
			paused: PropTypes.bool,

			/**
			 * Disables state on the media "play"/"pause" button
			 *
			 * @type {Boolean}
			 * @public
			 */
			playPauseButtonDisabled: PropTypes.bool,

			/**
			 * Disables the media playback-rate control via rewind and fast forward keys
			 *
			 * @type {Boolean}
			 * @public
			 */
			rateChangeDisabled: PropTypes.bool,

			/**
			 * Registers the MediaControls component with an
			 * [ApiDecorator]{@link core/internal/ApiDecorator.ApiDecorator}.
			 *
			 * @type {Function}
			 * @private
			 */
			setApiProvider: PropTypes.func,

			/**
			 * The visibility of the component. When `false`, the component will be hidden.
			 *
			 * @type {Boolean}
			 * @public
			 */
			visible: PropTypes.bool
		};

		static defaultProps = {
			initialJumpDelay: 400,
			jumpDelay: 200
		};

		constructor (props) {
			super(props);
			this.mediaControlsNode = null;
			this.moreComponentsNode = null;

			this.actionGuideHeight = 0;
			this.animation = null;
			this.bottomComponentsHeight = 0;
			this.keyLoop = null;
			this.pulsingKeyCode = null;
			this.pulsing = null;
			this.paused = new Pause('MediaPlayer');

			this.state = {
				showMoreComponents: false,
				moreComponentsRendered: false
			};

			if (props.setApiProvider) {
				props.setApiProvider(this);
			}
		}

		static getDerivedStateFromProps (props) {
			if (!props.visible) {
				return {
					showMoreComponents: false
				};
			}
			return null;
		}

		componentDidMount () {
			on('keydown', this.handleKeyDown, document);
			on('keyup', this.handleKeyUp, document);
			on('blur', this.handleBlur, window);
			on('wheel', this.handleWheel, document);
		}

		componentDidUpdate (prevProps, prevState) {
			// Need to render `moreComponents` to show it. For performance, render `moreComponents` if it is actually shown.
			if (!prevState.showMoreComponents && this.state.showMoreComponents && !this.state.moreComponentsRendered) {
				this.moreComponentsRenderingJob.startRafAfter();
			} else if (prevState.showMoreComponents && !this.state.showMoreComponents) {
				this.moreComponentsRenderingJob.stop();
			}

			if (!prevState.moreComponentsRendered && this.state.moreComponentsRendered ||
				this.state.moreComponentsRendered && prevProps.bottomComponents !== this.props.bottomComponents ||
				!compareChildren(this.props.children, prevProps.children)
			) {
				this.calculateMoreComponentsHeight();
			}

			if (this.state.showMoreComponents && !prevState.moreComponentsRendered && this.state.moreComponentsRendered ||
				this.state.moreComponentsRendered && prevState.showMoreComponents !== this.state.showMoreComponents
			) {
				forwardToggleMore({
					type: 'onToggleMore',
					showMoreComponents: this.state.showMoreComponents,
					liftDistance: this.bottomComponentsHeight - this.actionGuideHeight
				}, this.props);

				if (this.state.showMoreComponents) {
					this.moreComponentsNode = this.moreComponentsNode || this.mediaControlsNode.querySelector(`.${css.moreComponents}`);
					this.paused.pause();
					this.animation = this.moreComponentsNode.animate([
						{transform: 'none', opacity: 0, offset: 0},
						{transform: `translateY(${-this.actionGuideHeight}px)`, opacity: 1, offset: 1}
					], {
						duration: animationDuration,
						fill: 'forwards'
					});
					this.animation.onfinish = this.handleFinish;
					this.animation.oncancel = this.handleCancel;
				} else if (this.animation != null) {
					this.animation.cancel();
				}
			}

			// if media controls disabled, reset key loop
			if (!prevProps.mediaDisabled && this.props.mediaDisabled) {
				this.stopListeningForPulses();
				this.paused.resume();
			}
		}

		componentWillUnmount () {
			off('keydown', this.handleKeyDown, document);
			off('keyup', this.handleKeyUp, document);
			off('blur', this.handleBlur, window);
			off('wheel', this.handleWheel, document);
			this.stopListeningForPulses();
			this.moreComponentsRenderingJob.stop();
			if (this.animation) {
				this.animation.cancel();
			}
		}

		moreComponentsRenderingJob = new Job(() => {
			this.setState({
				moreComponentsRendered: true
			});
		});

		calculateMoreComponentsHeight = () => {
			if (!this.mediaControlsNode) {
				this.bottomComponentsHeight = 0;
				return;
			}

			const bottomElement = this.mediaControlsNode.querySelector(`.${css.moreComponents}`);
			this.bottomComponentsHeight = bottomElement ? bottomElement.scrollHeight : 0;
		};

		canShowMoreComponents = () => (!this.props.moreActionDisabled && !this.state.showMoreComponents);

		handleKeyDownFromMediaButtons = (ev) => {
			if (is('down', ev.keyCode) && this.canShowMoreComponents()) {
				this.showMoreComponents();
				ev.stopPropagation();
			}
		};

		handleFlickFromActionGuide = ({direction, velocityY}) => {
			if (direction === 'vertical' && velocityY < 0 && this.canShowMoreComponents()) {
				this.showMoreComponents();
			}
		};

		handleKeyDown = (ev) => {
			const {
				mediaDisabled,
				no5WayJump,
				visible
			} = this.props;

			const current = Spotlight.getCurrent();

			if (!no5WayJump &&
					!visible &&
					!mediaDisabled &&
					!current &&
					(is('left', ev.keyCode) || is('right', ev.keyCode))) {
				this.paused.pause();
				this.startListeningForPulses(ev.keyCode);
			}
		};

		handleKeyUp = (ev) => {
			const {
				mediaDisabled,
				no5WayJump,
				rateChangeDisabled,
				playPauseButtonDisabled
			} = this.props;

			if (mediaDisabled) return;

			if (!playPauseButtonDisabled) {
				if (is('play', ev.keyCode)) {
					forward('onPlay', ev, this.props);
				} else if (is('pause', ev.keyCode)) {
					forward('onPause', ev, this.props);
				}
			}

			if (!no5WayJump && (is('left', ev.keyCode) || is('right', ev.keyCode))) {
				this.stopListeningForPulses();
				this.paused.resume();
			}

			if (!rateChangeDisabled) {
				if (is('rewind', ev.keyCode)) {
					forward('onRewind', ev, this.props);
				} else if (is('fastForward', ev.keyCode)) {
					forward('onFastForward', ev, this.props);
				}
			}
		};

		handleBlur = () => {
			this.stopListeningForPulses();
			this.paused.resume();
		};

		handleWheel = (ev) => {
			if (this.canShowMoreComponents() && this.props.visible && ev.deltaY > 0) {
				this.showMoreComponents();
			}
		};

		startListeningForPulses = (keyCode) => {
			// Ignore new pulse calls if key code is same, otherwise start new series if we're pulsing
			if (this.pulsing && keyCode !== this.pulsingKeyCode) {
				this.stopListeningForPulses();
			}
			if (!this.pulsing) {
				this.pulsingKeyCode = keyCode;
				this.pulsing = true;
				this.keyLoop = setTimeout(this.handlePulse, this.props.initialJumpDelay);
				forward('onJump', {keyCode}, this.props);
			}
		};

		handlePulse = () => {
			forward('onJump', {keyCode: this.pulsingKeyCode}, this.props);
			this.keyLoop = setTimeout(this.handlePulse, this.props.jumpDelay);
		};

		handlePlayButtonClick = (ev) => {
			forward('onPlayButtonClick', ev, this.props);
			if (this.props.paused) {
				forward('onPlay', ev, this.props);
			} else {
				forward('onPause', ev, this.props);
			}
		};

		stopListeningForPulses () {
			this.pulsing = false;
			if (this.keyLoop) {
				clearTimeout(this.keyLoop);
				this.keyLoop = null;
			}
		}

		getMediaControls = (node) => {
			if (!node) {
				this.actionGuideHeight = 0;
				return;
			}
			this.mediaControlsNode = ReactDOM.findDOMNode(node); // eslint-disable-line react/no-find-dom-node

			const guideElement = this.mediaControlsNode.querySelector(`.${css.actionGuide}`);
			this.actionGuideHeight = guideElement ? guideElement.scrollHeight : 0;
		};

		areMoreComponentsAvailable = () => {
			return this.state.showMoreComponents;
		};

		showMoreComponents = () => {
			this.setState({showMoreComponents: true});
		};

		hideMoreComponents = () => {
			this.setState({showMoreComponents: false});
		};

		toggleMoreComponents () {
			this.setState((prevState) => {
				return {
					showMoreComponents: !prevState.showMoreComponents
				};
			});
		}

		handleClose = (ev) => {
			if (this.props.visible) {
				forward('onClose', ev, this.props);
			}
		};

		handleFinish = () => {
			if (this.state.showMoreComponents) {
				this.paused.resume();
				if (!Spotlight.getPointerMode()) {
					Spotlight.move('down');
				}
			}
		};

		handleCancel = () => {
			this.paused.resume();
		};

		render () {
			const props = Object.assign({}, this.props);
			delete props.initialJumpDelay;
			delete props.jumpDelay;
			delete props.moreActionDisabled;
			delete props.no5WayJump;
			delete props.onFastForward;
			delete props.onJump;
			delete props.onPause;
			delete props.onPlay;
			delete props.onRewind;
			delete props.onToggleMore;
			delete props.rateChangeDisabled;
			delete props.setApiProvider;

			return (
				<Wrapped
					ref={this.getMediaControls}
					{...props}
					moreComponentsRendered={this.state.moreComponentsRendered}
					onClose={this.handleClose}
					onFlickFromActionGuide={this.handleFlickFromActionGuide}
					onKeyDownFromMediaButtons={this.handleKeyDownFromMediaButtons}
					onPlayButtonClick={this.handlePlayButtonClick}
					onTransitionEnd={this.handleTransitionEnd}
					showMoreComponents={this.state.showMoreComponents}
				/>
			);
		}
	}

	return Slottable({slots: ['bottomComponents']}, MediaControlsDecoratorHOC);
});

const handleCancel = (ev, {onClose}) => {
	if (onClose) {
		onClose(ev);
	}
};

/**
 * A set of components for controlling media playback and rendering additional components.
 *
 * This uses [Slottable]{@link ui/Slottable} to accept the custom tags, `<bottomComponents>`
 * to add components to the bottom of the media controls. Any additional children will be
 * rendered into the "more" controls area. Showing the additional components is handled by
 * `MediaControls` when the user navigates down from the media buttons.
 *
 * @class MediaControls
 * @memberof sandstone/MediaPlayer
 * @mixes ui/Cancelable.Cancelable
 * @ui
 * @public
 */
const MediaControls = ApiDecorator(
	{api: [
		'areMoreComponentsAvailable',
		'showMoreComponents',
		'hideMoreComponents'
	]},
	MediaControlsDecorator(
		Cancelable({modal: true, onCancel: handleCancel},
			MediaControlsBase
		)
	)
);

MediaControls.defaultSlot = 'mediaControlsComponent';

export default MediaControls;
export {
	MediaControlsBase,
	MediaControls,
	MediaControlsDecorator
};
