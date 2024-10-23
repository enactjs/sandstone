import handle, {forProp, forwardCustom, forwardCustomWithPrevent, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {Cell, Column, Row} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import ForwardRef from '@enact/ui/ForwardRef';
import ViewManager from '@enact/ui/ViewManager';
import classNames from 'classnames';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Button from '../Button';
import $L from '../internal/$L';
import {BasicArranger, CancelDecorator, NavigationButton} from '../internal/Panels';
import PanelsRouter from '../internal/Panels/PanelsRouter';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import css from './QuickGuidePanels.module.less';

/**
 * A QuickGuidePaenls that has steps with corresponding panels and panels have full screen size content.
 *
 * @example
 * 	<QuickGuidePanels>
 *		<QuickGuidePanels.Panel>
 *			QuickGuidePanelsContent
 *		</QuickGuidePanels.Panel>
 *	</QuickGuidePanels>
 *
 * @class QuickGuidePanelsBase
 * @memberof sandstone/QuickGuidePanels
 * @ui
 * @public
 */
const QuickGuidePanelsBase = kind({
	name: 'QuickGuidePanels',

	propTypes: /** @lends sandstone/QuickGuidePanels.QuickGuidePanelsBase.prototype */ {
		'aria-label': PropTypes.string,

		/**
		 * Hint string read when focusing the close button.
		 *
		 * @type {String}
		 * @default 'Exit Quick Guide'
		 * @private
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Obtains a reference to the root node.
		 *
		 * @type {Function|Object}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * The current step.
		 *
		 * This is 1-based, not 0-based; as in the first step is `1`. If omitted, this will equal
		 * the currently selected panel.
		 *
		 * @type {Number}
		 * @public
		 */
		current: PropTypes.number,

		/**
		* The currently selected panel.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		 * The button to use in place of the standard next button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance, or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of `nextButtonVisibility`.
		 *
 		 * Example:
 		 * ```
		 * nextButton={<Button icon="closex" aria-label="Quit">Close</Button>}
		 * ```
		 *
		 * @type {Boolean|Component}
		 * @private
		 */
		nextButton: PropTypes.oneOfType([PropTypes.bool, EnactPropTypes.componentOverride]),

		/**
		 * Specifies when and how to show `nextButton` on QuickGuidePanel.
		 *
		 * * `'auto'` will display the `nextButton` on every `QuickGuidePanels.Panel` except the last
		 * * `'always'` will always display the `nextButton`
		 * * `'never'` will always hide the `nextButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on QuickGuidePanels.Panel will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

		/**
		 * Called when the close button is clicked.
		 *
		 * @type {Function}
		 * @private
		 */
		onClose: PropTypes.func,

		/**
		 * Called when the next button is clicked in QuickGuidePanel.
		 *
		 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextClick: PropTypes.func,

		/**
		 * Called when previous button is clicked in QuickGuidePanel.
		 *
		 * Calling `preventDefault` on the passed event will prevent navigation to the previous panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevClick: PropTypes.func,

		/**
		 * Called when a transition completes.
		 *
		 * @type {Function}
		 */
		onTransition: PropTypes.func,

		/**
		 * Called before a transition begins.
		 *
		 * @type {Function}
		 */
		onWillTransition: PropTypes.func,

		/**
		 * The button to use in place of the standard prev button.
		 *
		 * This prop accepts a component (e.g. `Button`), a component instance, or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of `prevButtonVisibility`.
		 *
 		 * Example:
 		 * ```
		 * prevButton={<Button icon="closex" aria-label="Back">Back</Button>}
		 * ```
		 *
		 * @type {Boolean|Component}
		 * @private
		 */
		prevButton: PropTypes.oneOfType([PropTypes.bool, EnactPropTypes.componentOverride]),

		/**
		 * Specifies when and how to show `prevButton` on QuickGuidePanel.
		 *
		 * * `'auto'` will display the `prevButton` on every `QuickGuidePanels.Panel` except the first
		 * * `'always'` will always display the `prevButton`
		 * * `'never'` will always hide the `prevButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on QuickGuidePanels.Panel will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * The total number of steps.
		 *
		 * If omitted, this will equal the total number of Panels.
		 *
		 * @type {Number}
		 * @public
		 */
		total: PropTypes.number,

		/**
		* The total panels in QuickGuidePanels.
		*
		* @type {Number}
		* @private
		*/
		totalPanels: PropTypes.number
	},

	defaultProps: {
		index: 0,
		nextButtonVisibility: 'auto',
		prevButtonVisibility: 'auto'
	},

	styles: {
		css,
		className: 'quickGuidePanels'
	},

	handlers: {
		onClose: forwardCustom('onClose'),
		onNextClick: handle(
			forwardCustomWithPrevent('onNextClick'),
			(ev, {'data-spotlight-id': spotlightId, index, onChange, totalPanels}) => {
				Spotlight.set(spotlightId, {enterTo: 'last-focused'});
				if (onChange && index !== totalPanels) {
					const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;

					onChange({type: 'onChange', index: nextIndex});
				}
			}
		),
		onPrevClick: handle(
			forwardCustomWithPrevent('onPrevClick'),
			(ev, {index, onChange}) => {
				if (onChange && index !== 0) {
					const prevIndex = index > 0 ? (index - 1) : index;

					onChange({type: 'onChange', index: prevIndex});
				}
			}
		),
		onTransition: (ev, {index, onTransition}) => {
			if (onTransition) {
				onTransition({type: 'onTransition', index});
			}
		},
		onWillTransition: (ev, {index, onWillTransition}) => {
			if (onWillTransition) {
				onWillTransition({type: 'onWillTransition', index});
			}
		}
	},

	computed: {
		'aria-label': ({'aria-label': label, current, index}) => {
			if (label) return label;

			const stepNum = (typeof current === 'number' && current > 0) ? current : (index + 1);
			const step = new IString($L('step {num}')).format({num: stepNum}) + ' ';
			return `${step}`;
		},
		closeButton: ({closeButtonAriaLabel, onClose, totalPanels}) => {
			return (
				totalPanels ? <Button
					aria-label={closeButtonAriaLabel == null ? $L('Exit Quick Guide') : closeButtonAriaLabel}
					className={css.close}
					icon="closex"
					onClick={onClose}
					size="small"
				/> : null
			);
		},
		nextNavigationButton: ({index, nextButton, nextButtonVisibility, onNextClick, totalPanels}) => {
			const isNextButtonVisible = nextButtonVisibility === 'always' || (nextButtonVisibility === 'auto' && index < totalPanels - 1);

			return (
				<NavigationButton
					aria-label={$L('Next')}
					backgroundOpacity="transparent"
					className={css.navigationButton}
					component={nextButton}
					focusEffectIconOnly
					icon="arrowlargeright"
					iconFlip="auto"
					iconPosition="after"
					id="nextButton"
					minWidth={false}
					onClick={onNextClick}
					visible={isNextButtonVisible}
				/>
			);
		},
		prevNavigationButton: ({index, onPrevClick, prevButton, prevButtonVisibility}) => {
			const isPrevButtonVisible = prevButtonVisibility === 'always' || (prevButtonVisibility === 'auto' && index !== 0);

			return (
				<NavigationButton
					aria-label={$L('Previous')}
					backgroundOpacity="transparent"
					className={css.navigationButton}
					component={prevButton}
					focusEffectIconOnly
					icon="arrowlargeleft"
					iconFlip="auto"
					minWidth={false}
					onClick={onPrevClick}
					visible={isPrevButtonVisible}
				/>
			);
		},
		steps: ({current, index, total, totalPanels}) => {
			const currentStep = (typeof current === 'number' && current > 0) ? current : (index + 1);
			const totalSteps = (typeof total === 'number' && total > 0) ? total : totalPanels;

			return (
				<Steps
					css={css}
					current={currentStep}
					highlightCurrentOnly
					total={totalSteps}
				/>
			);
		}
	},

	render: ({
		'aria-label': ariaLabel,
		children,
		closeButton,
		index,
		nextNavigationButton,
		onTransition,
		onWillTransition,
		prevNavigationButton,
		steps,
		...rest
	}) => {
		delete rest.closeButtonAriaLabel;
		delete rest.current;
		delete rest.nextButton;
		delete rest.nextButtonVisibility;
		delete rest.onClose;
		delete rest.onNextClick;
		delete rest.onPrevClick;
		delete rest.prevButton;
		delete rest.prevButtonVisibility;
		delete rest.total;
		delete rest.totalPanels;
		// eslint-disable-next-line enact/prop-types
		delete rest.hideChildren;

		return (
			<article role="region" aria-labelledby={`quickguidepanel_index_${index}`} ref={rest.componentRef}>
				<Column aria-label={ariaLabel} id={`quickguidepanel_index_${index}`} {...rest}>
					<Row className={css.contentHeader}>
						{steps}
						{closeButton}
					</Row>
					<Row className={css.navigationButtonContainer}>
						<Cell shrink>
							{prevNavigationButton}
						</Cell>
						<Cell />
						<Cell shrink>
							{nextNavigationButton}
						</Cell>
					</Row>
					<ViewManager
						arranger={BasicArranger}
						duration={400}
						noAnimation
						onTransition={onTransition}
						onWillTransition={onWillTransition}
					>
						{children}
					</ViewManager>
				</Column>
			</article>
		);
	}
});

const QuickGuidePanelsDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Changeable({prop: 'index'}),
	CancelDecorator({
		cancel: 'onChange',
		shouldCancel: handle(
			forwardCustomWithPrevent('onBack'),
			not(forProp('noPrevButton', true))
		)
	}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, 'header > *', `#nextButton`, `.${css.close} *`],
		enterTo: 'default-element'
	}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	PanelsRouter({type: 'quickGuide'}),
	Skinnable
);

/**
 * A QuickGuidePanels that can step through different panels.
 * Expects {@link sandstone/QuickGuidePanels.Panel|Panel} as children.
 *
 * @class QuickGuidePanels
 * @memberof sandstone/QuickGuidePanels
 * @extends sandstone/QuickGuidePanels.QuickGuidePanelsBase
 * @mixes ui/Changeable.Changeable
 * @ui
 * @public
 */
const QuickGuidePanels = QuickGuidePanelsDecorator(QuickGuidePanelsBase);

/**
 * Called when the back button is pressed.
 *
 * If `ev.preventDefault` is called, `QuickGuidePanels` will not process the event further. If it is
 * not called, the index of the panel will be decremented unless `noPrevButton` is set.
 *
 * @name onBack
 * @memberof sandstone/QuickGuidePanels.QuickGuidePanels.prototype
 * @type {Function}
 */

export default QuickGuidePanels;
export {
	QuickGuidePanels,
	QuickGuidePanelsBase,
	QuickGuidePanelsDecorator
};
