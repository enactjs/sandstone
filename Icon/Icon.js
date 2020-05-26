/**
 * Provides Sandstone styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module sandstone/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import UiIcon from '@enact/ui/Icon';
import Pure from '@enact/ui/internal/Pure';
import {scaleToRem} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import iconList from './IconList.js';

import componentCss from './Icon.module.less';

/**
 * Renders a sandstone-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof sandstone/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */
const IconBase = kind({
	name: 'Icon',

	propTypes: /** @lends sandstone/Icon.IconBase.prototype */ {
		/**
		 * The icon content.
		 *
		 * @see {@link ui/Icon.Icon.children}
		 * @type {String|Object}
		 * @public
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * No publicClassNames supported
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * The size of the icon.
		 *
		 * A collection of preset sizes is available in addition to a numeric size option.
		 * A number represents the design-time pixel dimensions of the icon. The final value will
		 * automatically adapt to the screen resolutions, as defined in the `screenTypes` file of
		 * this theme.
		 *
		 * @type {('large'|'medium'|'small'|'tiny')|Number}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOfType([
			PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
			PropTypes.number
		])
	},

	defaultProps: {
		size: 'small'
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({size, styler}) => styler.append(
			(typeof size === 'string' ? size : null)
		),
		style: ({size, style}) => ({
			...style,
			'--icon-size': (typeof size === 'number') ? scaleToRem(size) : null
		})
	},

	render: ({css, size, ...rest}) => UiIcon.inline({
		...rest,
		size: (typeof size === 'string' ? size : void 0),
		css,
		iconList
	})
});

// Let's find a way to import this list directly, and bonus feature, render our icons in the docs
// next to their names.
/**
 * An object whose keys can be used as the child of an [Icon]{@link sandstone/Icon.Icon} component.
 *
 * List of Icons:
 * ```
 * plus
 * minus
 * arrowhookleft
 * arrowhookright
 * ellipsis
 * check
 * circle
 * stop
 * play
 * pause
 * forward
 * backward
 * skipforward
 * skipbackward
 * pauseforward
 * pausebackward
 * pausejumpforward
 * pausejumpbackward
 * jumpforward
 * jumpbackward
 * denselist
 * bulletlist
 * list
 * drawer
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * arrowsmallup
 * arrowsmalldown
 * arrowsmallleft
 * arrowsmallright
 * closex
 * search
 * rollforward
 * rollbackward
 * exitfullscreen
 * fullscreen
 * arrowshrinkleft
 * arrowshrinkright
 * arrowextend
 * arrowshrink
 * flag
 * funnel
 * trash
 * star
 * hollowstar
 * halfstar
 * gear
 * plug
 * lock
 * forward15
 * back15
 * continousplay
 * playlist
 * resumeplay
 * image
 * audio
 * music
 * languages
 * cc
 * ccon
 * ccoff
 * sub
 * recordings
 * livezoom
 * liveplayback
 * liveplaybackoff
 * repeat
 * repeatoff
 * series
 * repeatdownload
 * view360
 * view360off
 * info
 * repeattrack
 * bluetoothoff
 * verticalellipsis
 * arrowcurveright
 * picture
 * home
 * warning
 * scroll
 * densedrawer
 * starminus
 * liverecord
 * liveplay
 * contrast
 * edit
 * trashlock
 * arrowrightskip
 * volumecycle
 * movecursor
 * refresh
 * question
 * questionreversed
 * s
 * repeatone
 * repeatall
 * repeatnone
 * speakers
 * koreansubtitles
 * chinesesubtitles
 * arrowleftprevious
 * searchfilled
 * zoomin
 * zoomout
 * playlistadd
 * files
 * arrowupdown
 * brightness
 * download
 * playlistedit
 * font
 * musicon
 * musicoff
 * liverecordone
 * liveflagone
 * shuffle
 * sleep
 * notification
 * notificationoff
 * checkselection
 * ```
 *
 * @name iconList
 * @memberof sandstone/Icon
 * @constant
 * @type {Object}
 * @public
 */

/**
 * Sandstone-specific behaviors to apply to [IconBase]{@link sandstone/Icon.IconBase}.
 *
 * @hoc
 * @memberof sandstone/Icon
 * @mixes sandstone/Skinnable.Skinnable
 * @public
 */
const IconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A Sandstone-styled icon.
 *
 * @class Icon
 * @memberof sandstone/Icon
 * @extends sandstone/Icon.IconBase
 * @mixes sandstone/Icon.IconDecorator
 * @ui
 * @public
 */
const Icon = IconDecorator(IconBase);


export default Icon;
export {
	Icon,
	IconBase,
	IconDecorator,
	iconList as icons
};
