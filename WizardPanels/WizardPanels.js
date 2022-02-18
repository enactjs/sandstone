import handle, {adaptEvent, forProp, forwardWithPrevent, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import useChainRefs from '@enact/core/useChainRefs';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import ForwardRef from '@enact/ui/ForwardRef';
import ViewManager from '@enact/ui/ViewManager';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {createContext, useRef, useState, useCallback, Children} from 'react';

import $L from '../internal/$L';
import {Header} from '../Panels';
import {PanelBase} from '../Panels/Panel';
import {BasicArranger, CrossFadeArranger, CancelDecorator, FloatingLayerIdProvider, NavigationButton, useAutoFocus} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import useFocusOnTransition from './useFocusOnTransition';
import useToggleRole from './useToggleRole';

import css from './WizardPanels.module.less';

const WizardPanelsContext = createContext(null);
const DecoratedPanelBase = FloatingLayerIdProvider(PanelBase);
const HeaderContainer = SpotlightContainerDecorator(Header);

/**
 * A WizardPanels that has steps with corresponding panels.
 *
 * @example
 * 	<WizardPanels>
 *		<WizardPanels.Panel subtitle="Subtitle" title="Title">
 *			<Scroller>
 *				lorem ipsum ...
 *			</Scroller>
 *			<footer>
 *				<Button>OK</Button>
 *				<Button>Cancel</Button>
 *			</footer>
 *		</WizardPanels.Panel>
 *	</WizardPanels>
 *
 * @class WizardPanelsBase
 * @memberof sandstone/WizardPanels
 * @ui
 * @public
 */
const WizardPanelsBase = kind({
	name: 'WizardPanels',

	propTypes: /** @lends sandstone/WizardPanels.WizardPanelsBase.prototype */ {
		/**
		 * The "aria-label" for the Panel.
		 *
		 * By default, the panel will be labeled by its [Header]{@link sandstone/Panels.Header}.
		 * When `aria-label` is set, it will be used instead to provide an accessibility label for
		 * the panel.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

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
		* Components to be included under the primary content.
		*
		* Typically, up to 2 buttons may be included.
		*
		* @type {Element|Element[]}
		* @public
		*/
		footer: PropTypes.node,

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
		 * Specifies when and how to show `nextButton` on WizardPanel.
		 *
		 * * `'auto'` will display the `nextButton` on every `WizardPanel.Panel` except the last
		 * * `'always'` will always display the `nextButton`
		 * * `'never'` will always hide the `nextButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this
		 * case, a customized `nextButton` on WizardPanel.Panel will take precedence over the
		 * `nextButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		* Omits the steps component.
		*
		* @type {Boolean}
		* @public
		*/
		noSteps: PropTypes.bool,

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

		/**
		 * Called when the next button is clicked in WizardPanel.
		 *
		 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextClick: PropTypes.func,

		/**
		 * Called when previous button is clicked in WizardPanel.
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
		 * Specifies when and how to show `prevButton` on WizardPanel.
		 *
		 * * `'auto'` will display the `prevButton` on every `WizardPanel.Panel` except the first
		 * * `'always'` will always display the `prevButton`
		 * * `'never'` will always hide the `prevButton`
		 *
		 * Note, children values will override the generalized parent visibility settings. In this case,
		 * if user provides a customized `prevButton` on WizardPanel.Panel will take precedence over the `prevButtonVisibility` value.
		 *
		 * @type {('auto'|'always'|'never')}
		 * @default 'auto'
		 * @public
		 */
		prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

		/**
		 * Explicitly sets the ViewManager transition direction.
		 *
		 * @type {Boolean}
		 * @private
		 */
		reverseTransition: PropTypes.bool,

		/**
		* The subtitle to display.
		*
		* @type {String}
		* @public
		*/
		subtitle: PropTypes.string,

		/**
		* The title to display.
		*
		* @type {String}
		* @public
		*/
		title: PropTypes.string,

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
		* The total panels in WizardPanels.
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
		className: 'wizardPanels'
	},

	handlers: {
		onNextClick: handle(
			adaptEvent(() => ({type: 'onNextClick'}), forwardWithPrevent('onNextClick')),
			(ev, {index, onChange, totalPanels}) => {
				if (onChange && index !== totalPanels) {
					const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;

					onChange({type: 'onChange', index: nextIndex});
				}
			}
		),
		onPrevClick: handle(
			adaptEvent(() => ({type: 'onPrevClick'}), forwardWithPrevent('onPrevClick')),
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
		'aria-label': ({'aria-label': label, index, noSteps, subtitle, title}) => {
			if (label) return label;

			const step = noSteps ? '' : new IString($L('step {num}')).format({num: index + 1}) + ' ';
			return `${step}${title} ${subtitle}`;
		},
		className: ({noSteps, styler}) => styler.append({noSteps}),
		steps: ({current, index, noSteps, total, totalPanels}) => {
			const currentStep = (noSteps && 1) || ((typeof current === 'number' && current > 0) ? current : (index + 1));
			const totalSteps = (noSteps && 1) || ((typeof total === 'number' && total > 0) ? total : totalPanels);

			return (
				<Steps
					className={css.steps}
					current={currentStep}
					slot="slotAbove"
					total={totalSteps}
				/>
			);
		}
	},

	render: ({
		'aria-label': ariaLabel,
		children,
		footer,
		index,
		nextButton,
		nextButtonVisibility,
		noAnimation,
		onNextClick,
		onPrevClick,
		onTransition,
		onWillTransition,
		prevButton,
		prevButtonVisibility,
		reverseTransition,
		steps,
		subtitle,
		title,
		totalPanels,
		...rest
	}) => {
		delete rest.noSteps;
		delete rest.current;
		delete rest.total;

		const isPrevButtonVisible = prevButtonVisibility === 'always' || (prevButtonVisibility === 'auto' && index !== 0);
		const isNextButtonVisible = nextButtonVisibility === 'always' || (nextButtonVisibility === 'auto' && index < totalPanels - 1);

		return (
			<DecoratedPanelBase
				{...rest}
				header={
					<HeaderContainer
						aria-label={ariaLabel}
						arranger={noAnimation ? null : CrossFadeArranger}
						centered
						css={css}
						noCloseButton
						subtitle={subtitle}
						title={title}
						type="wizard"
					>
						{steps}
						<NavigationButton
							aria-label={$L('Previous')}
							backgroundOpacity="transparent"
							component={prevButton}
							focusEffectIconOnly
							icon="arrowlargeleft"
							iconFlip="auto"
							minWidth={false}
							onClick={onPrevClick}
							slot="slotBefore"
							visible={isPrevButtonVisible}
						/>
						<NavigationButton
							aria-label={$L('Next')}
							backgroundOpacity="transparent"
							component={nextButton}
							focusEffectIconOnly
							icon="arrowlargeright"
							iconFlip="auto"
							iconPosition="after"
							minWidth={false}
							onClick={onNextClick}
							slot="slotAfter"
							visible={isNextButtonVisible}
						/>
					</HeaderContainer>
				}
				panelType="wizard"
			>
				<Column>
					<Cell className={css.content}>
						{/* skip creating ViewManager when there aren't children to avoid animating
							the first panel into the viewport */}
						{children ? (
							<ViewManager
								arranger={BasicArranger}
								duration={400}
								onTransition={onTransition}
								onWillTransition={onWillTransition}
								noAnimation={noAnimation}
								reverseTransition={reverseTransition}
							>
								{children}
							</ViewManager>
						) : null}
					</Cell>
					<Cell className={css.footer} component="footer" key={index} shrink>
						{/* This should probably use portals */}
						{footer}
					</Cell>
				</Column>
			</DecoratedPanelBase>
		);
	}
});

// single-index ViewManagers need some help knowing when the transition direction needs to change
// because the index is always 0 from its perspective.
function useReverseTransition (index = -1, rtl) {
	const prevIndex = useRef(index);
	const reverse = useRef(rtl);
	// If the index was changed, the panel transition is occured on the next cycle by `Panel`
	const prev = {reverseTransition: reverse.current, prevIndex: prevIndex.current};

	if (prevIndex.current !== index) {
		reverse.current = rtl ? (index > prevIndex.current) : (index < prevIndex.current);
		prevIndex.current = index;
	}

	return prev;
}

/**
 * WizardPanelsRouter passes the children, footer, subtitle, and title from
 * [WizardPanel]{@link sandstone/WizardPanels.Panel} to
 * [WizardPanelsBase]{@link sandstone/WizardPanels.WizardPanelsBase}.
 *
 * @class WizardPanelsRouter
 * @memberof sandstone/WizardPanels
 * @private
 */
const WizardPanelsRouter = (Wrapped) => {
	const WizardPanelsProvider = ({
		children,
		componentRef,
		'data-spotlight-id': spotlightId,
		index,
		onTransition,
		onWillTransition,
		subtitle,
		title,
		rtl,
		...rest
	}) => {
		const [panel, setPanel] = useState(null);
		const {ref: a11yRef, onWillTransition: a11yOnWillTransition} = useToggleRole();
		const autoFocus = useAutoFocus({autoFocus: 'default-element', hideChildren: panel == null});
		const ref = useChainRefs(autoFocus, a11yRef, componentRef);
		const {reverseTransition, prevIndex} = useReverseTransition(index, rtl);
		const {
			onWillTransition: focusOnWillTransition,
			...transition
		} = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const handleWillTransition = useCallback((ev) => {
			focusOnWillTransition(ev);
			a11yOnWillTransition(ev);
		}, [a11yOnWillTransition, focusOnWillTransition]);

		const totalPanels = panel ? Children.count(children) : 0;
		const currentTitle = panel && panel.title ? panel.title : title;
		const currentSubTitle = panel && panel.subtitle ? panel.subtitle : subtitle;
		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<WizardPanelsContext.Provider value={setPanel}>
				{Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...panel}
					{...transition}
					componentRef={ref}
					data-spotlight-id={spotlightId}
					index={index}
					onWillTransition={handleWillTransition}
					title={currentTitle}
					subtitle={currentSubTitle}
					totalPanels={totalPanels}
					reverseTransition={reverseTransition}
				>
					{panel && panel.children ? (
						<div className="enact-fit" key={`panel${prevIndex}`}>
							{panel.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelsContext.Provider>
		);
	};

	WizardPanelsProvider.propTypes =  /** @lends sandstone/WizardPanels.WizardPanelsRouter.prototype */  {
		/**
		 * Obtains a reference to the root node.
		 *
		 * @type {Function|Object}
		 * @private
		 */
		componentRef: EnactPropTypes.ref,

		/**
		* The spotlight id for the panel
		*
		* @type {String}
		* @private
		*/
		'data-spotlight-id': PropTypes.string,

		/**
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		* Called when a transition completes
		*
		* @type {Function}
		* @private
		*/
		onTransition: PropTypes.func,

		/**
		* Called when a transition begins
		*
		* @type {Function}
		* @private
		*/
		onWillTransition: PropTypes.func,

		/**
		 * Used to determine the transition direction
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		* The "default" subtitle for WizardPanels if subtitle isn't explicitly set in
		* [Panel]{@link sandstone/WizardPanels.Panel}.
		* @example
		* 	<WizardPanels subtitle="Subtitle">
		*		<WizardPanels.Panel>
		*			lorem ipsum ...
		*		</WizardPanels.Panel>
		*	</WizardPanels>
		*
		* @type {String}
		* @private
		*/
		subtitle: PropTypes.string,

		/**
		* The "default" title for WizardPanels if title isn't explicitly set in
		* [Panel]{@link sandstone/WizardPanels.Panel}.
		* @example
		* 	<WizardPanels title="Title">
		*		<WizardPanels.Panel>
		*			lorem ipsum ...
		*		</WizardPanels.Panel>
		*	</WizardPanels>
		*
		* @type {String}
		* @private
		*/
		title: PropTypes.string
	};

	WizardPanelsProvider.defaultProps = {
		index: 0,
		subtitle: '',
		title: ''
	};

	return WizardPanelsProvider;
};

const WizardPanelsDecorator = compose(
	ForwardRef({prop: 'componentRef'}),
	Changeable({prop: 'index'}),
	CancelDecorator({
		cancel: 'onChange',
		shouldCancel: handle(
			adaptEvent(() => ({type: 'onBack'}), forwardWithPrevent('onBack')),
			not(forProp('noPrevButton', true))
		)
	}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		// prefer any spottable within the panel body (content or footer) followed by header
		defaultElement: [`.${spotlightDefaultClass}`, `.${css.content} *, .${css.footer} *`, 'header > *'],
		enterTo: 'default-element'
	}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	WizardPanelsRouter,
	Skinnable
);

/**
 * A WizardPanels that can step through different panels.
 * Expects [WizardPanel]{@link sandstone/WizardPanels.Panel} as children.
 *
 * @class WizardPanels
 * @memberof sandstone/WizardPanels
 * @extends sandstone/WizardPanels.WizardPanelsBase
 * @mixes ui/Changeable.Changeable
 * @ui
 * @public
 */
const WizardPanels = WizardPanelsDecorator(WizardPanelsBase);

/**
 * Called when the back button is pressed.
 *
 * If `ev.preventDefault` is called, `WizardPanels` will not process the event further. If it is
 * not called, the index of the panel will be decremented unless `noPrevButton` is set.
 *
 * @name onBack
 * @memberof sandstone/WizardPanels.WizardPanels.prototype
 * @type {Function}
 */

export default WizardPanels;
export {
	WizardPanels,
	WizardPanelsBase,
	WizardPanelsContext,
	WizardPanelsDecorator
};
