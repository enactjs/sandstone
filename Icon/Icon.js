/**
 * Provides Sandstone styled icon components and behaviors.
 *
 * @example
 * <Icon>plus</Icon>
 *
 * @module sandstone/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
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
		 * Flips the icon
		 *
		 * When `'auto'` and `rtl`, the icon is flipped horizontally.
		 *
		 * @type {('auto'|'both'|'horizontal'|'vertical')}
		 * @public
		 */
		flip: PropTypes.oneOf(['auto', 'both', 'horizontal', 'vertical']),

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * This is set automatically when using {@link ui/Icon.Icon}.
		 *
		 * @type {Boolean}
		 * @public
		 */
		rtl: PropTypes.bool,

		/**
		 * The size of the icon.
		 *
		 * A collection of preset sizes is available in addition to a numeric size option.
		 * A number represents the design-time pixel dimensions of the icon. The final value will
		 * automatically adapt to the screen resolutions, as defined in the `screenTypes` file of
		 * this theme.
		 *
		 * @type {('large'|'medium'|'small'|'tiny'|Number)}
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
		flip: ({flip, rtl}) => {
			if (flip === 'auto') {
				return rtl ? 'horizontal' : null;
			}

			return flip;
		},
		style: ({size, style}) => ({
			...style,
			'--icon-size': (typeof size === 'number') ? scaleToRem(size) : null
		})
	},

	render: ({css, size, ...rest}) => {
		delete rest.rtl;

		return UiIcon.inline({
			...rest,
			size: (typeof size === 'string' ? size : void 0),
			css,
			iconList
		});
	}
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
 * record
 * circle
 * stop
 * square
 * play
 * pause
 * forward
 * backward
 * jumpforward
 * jumpbackward
 * list
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
 * exitfullscreen
 * fullscreen
 * trash
 * star
 * gear
 * plug
 * lock
 * music
 * view360
 * info
 * verticalellipsis
 * arrowcurveright
 * picture
 * home
 * liverecord
 * liveplay
 * trashlock
 * movecursor
 * repeatone
 * repeatall
 * repeatnone
 * zoomin
 * zoomout
 * download
 * shuffle
 * notification
 * voice
 * soundmute
 * stargroup
 * checker
 * transponder
 * selected
 * bgm
 * bgmoff
 * playcircle
 * pausecircle
 * lockcircle
 * unlockcircle
 * powercircle
 * wifi1
 * wifi2
 * wifi3
 * wifi4
 * wifilock1
 * wifilock2
 * wifilock3
 * wifilock4
 * dashboard1
 * dashboard2
 * dashboard3
 * subtitle
 * rotate
 * lyrics
 * screenpower
 * miniplayer
 * nowplaying
 * playspeed
 * folder
 * folderupper
 * support
 * soundout
 * mobile
 * keyboard
 * mouse
 * controller
 * btspeaker
 * headset
 * dns
 * speaker
 * speakersurround
 * speakercenter
 * speakerbass
 * router
 * demosync
 * browser
 * sound
 * wisa
 * demooptions
 * newfeature
 * triangleup
 * triangleright
 * triangledown
 * triangleleft
 * arrowupdown
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
	Skinnable,
	I18nContextDecorator({rtlProp: 'rtl'})
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
