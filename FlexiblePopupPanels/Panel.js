import classnames from 'classnames';
import handle, {forwardCustom, forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
import {NavigationButton, PanelsStateContext} from '../internal/Panels';
import {PanelBase as DefaultPanel, PanelDecorator} from '../Panels/Panel';

import css from './FlexiblePopupPanels.module.less';

function clamp (val, total) {
	// The extra two `total` values here accommodate negative values
	return (((val % total) + total) % total);
}

/**
 * The standard view container used inside a {@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels|FlexiblePopupPanels} view
 * manager instance.
 *
 * @class Panel
 * @extends sandstone/Panels.Panel
 * @memberof sandstone/FlexiblePopupPanels
 * @ui
 * @public
 */
const PanelBase = kind({
	name: 'Panel',

	contextType: PanelsStateContext,

	propTypes: /** @lends sandstone/FlexiblePopupPanels.Panel.prototype */ {

		/**
		 * The button to use in place of the standard next button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of
		 * {@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels.nextButtonVisibility|nextButtonVisibility}.
		 *
		 * Example:
		 * ```
		 * nextButton={<Button icon="closex" aria-label="Quit">Close</Button>}
		 * ```
		 *
		 * @type {Boolean|Component}
		 * @public
		 */
		nextButton: PropTypes.any,

		/**
		 * Specifies when and how to show `nextButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `nextButton` if more than one `FlexiblePopupPanels.Panel` exists
		 * * `'always'` will always display the `nextButton`
		 * * `'never'` will always hide the `nextButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on `FlexiblePopupPanels.Panel` will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @private
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * Called when the index value is changed.
		 *
		 * @type {Function}
		 * @private
		 */
		onChange: PropTypes.func,

		/**
		 * Called when the next button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
		 *
		 * @type {Function}
		 * @private
		 */
		onNextClick: PropTypes.func,

		/**
		 * Called when the previous button is clicked in `FlexiblePopupPanels.Panel`.
		 *
		 * Calling `preventDefault` on the passed event will prevent navigation to the previous panel.
		 *
		 * @type {Function}
		 * @private
		 */
		onPrevClick: PropTypes.func,

		/**
		 * The button to use in place of the standard prev button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of
		 * {@link sandstone/FlexiblePopupPanels.FlexiblePopupPanels.prevButtonVisibility|prevButtonVisibility}.
		 *
		 * Example:
		 * ```
		 * prevButton={<Button icon="closex" aria-label="Back">Back</Button>}
		 * ```
		 *
		 * @type {Boolean|Component}
		 * @public
		 */
		prevButton: PropTypes.any,

		/**
		 * Specifies when and how to show `prevButton` on `FlexiblePopupPanels.Panel`.
		 *
		 * * `'auto'` will display the `prevButton` if more than one `FlexiblePopupPanels.Panel` exists
		 * * `'always'` will always display the `prevButton`
		 * * `'never'` will always hide the `prevButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on `FlexiblePopupPanels.Panel` will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @private
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * Sets a pre-determined width on this panel.
		 *
		 * The 'auto' value will attempt to adjust the panel size to the content size.
		 * Note: the `title` may not match in width.
		 *
		 * @type {('auto'|'small'|'large')}
		 * @default 'auto'
		 * @public
		 */
		size: PropTypes.oneOf(['auto', 'small', 'large'])
	},

	defaultProps: {
		size: 'auto'
	},

	styles: {
		css
	},

	handlers: {
		onNextClick: handle(
			forwardCustomWithPrevent('onNextClick'),
			forwardCustom('onChange', (ev, props, {count, index}) => ({index: clamp(index + 1, count)})) // wrap around
		),
		onPrevClick: handle(
			forwardCustomWithPrevent('onPrevClick'),
			forwardCustom('onChange', (ev, props, {count, index}) => ({index: clamp(index - 1, count)})) // wrap around
		)
	},

	computed: {
		className: ({size, styler}) => styler.append(size),
		contentCellSize: ({size}) => {
			// These values must be kept in sync with their LESS variable counterparts
			switch (size) {
				case 'small': return 600;
				case 'large': return 1320;
				default: return null;
			}
		}
	},

	render: ({
		children,
		nextButton,
		nextButtonVisibility,
		onNextClick,
		onPrevClick,
		prevButton,
		prevButtonVisibility,
		contentCellSize,
		...rest
	}, {count}) => {
		const isPrevButtonVisible = Boolean(prevButtonVisibility === 'always' || (prevButtonVisibility === 'auto' && count > 1));
		const isNextButtonVisible = Boolean(nextButtonVisibility === 'always' || (nextButtonVisibility === 'auto' && count > 1));

		delete rest.onChange;
		delete rest.size;

		return (
			<DefaultPanel {...rest} css={css}>
				<Row className={css.bodyLayout} inline>
					<Cell align="center" shrink className={css.navCellBefore}>
						<NavigationButton
							aria-label={$L('Previous')}
							backgroundOpacity="transparent"
							component={prevButton}
							className={css.navButton}
							icon="arrowlargeleft"
							iconFlip="auto"
							onClick={onPrevClick}
							size="small"
							visible={isPrevButtonVisible}
						/>
					</Cell>
					<Cell
						className={classnames(css.content, (typeof ENACT_PACK_NO_ANIMATION !== 'undefined' && ENACT_PACK_NO_ANIMATION) ? css.noAnimation : null)}
						shrink={!contentCellSize}
						size={contentCellSize}
					>
						{children}
					</Cell>
					<Cell align="center" shrink className={css.navCellAfter}>
						<NavigationButton
							aria-label={$L('Next')}
							backgroundOpacity="transparent"
							component={nextButton}
							className={css.navButton}
							icon="arrowlargeright"
							iconFlip="auto"
							onClick={onNextClick}
							size="small"
							visible={isNextButtonVisible}
						/>
					</Cell>
				</Row>
			</DefaultPanel>
		);
	}
});

const Panel = PanelDecorator({
	// favor content but fall back to body if the content lacks spottable elements
	defaultElement: [`.${css.content} *`, `.${css.body} *`]
}, PanelBase);

export default Panel;
export {
	Panel,
	PanelBase
};
