import handle, {forProp, forwardWithPrevent, not} from '@enact/core/handle';
import kind from '@enact/core/kind';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Skinnable from '@enact/ui/Skinnable';
import ViewManager from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import {Header} from '../Panels';
import {PanelBase} from '../Panels/Panel';
import {BasicArranger, CrossFadeArranger, CancelDecorator} from '../internal/Panels';
import Steps from '../Steps';

import useFocusOnTransition from './useFocusOnTransition';

import css from './WizardPanels.module.less';

const WizardPanelsContext = React.createContext(null);

const NavigationButton = kind({
	name: 'NavigationButton',

	propTypes: {
		button: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.element,
			PropTypes.func
		]),
		onClick: PropTypes.func,
		visible: PropTypes.bool
	},

	render: ({button, visible, ...rest}) => {

		if (React.isValidElement(button)) {

			Object.keys(button.props).forEach(key => {
				// Using the provided prop values as defaults for any button.props value that is
				// strictly undefined. This follows React's convention for default props in which a
				// default is used when a prop is either explicitly undefined or omitted and
				// therefore implicitly undefined.
				//
				// eslint-disable-next-line no-undefined
				if (button.props[key] !== undefined) {
					rest[key] = button.props[key];
				}
			});

			const Type = button.type;
			return (
				<Type {...rest} />
			);
		} else if (
			// Explicitly disabled via false/null or visible is set to false
			(button === false || button === null) ||
			// Using the default config and hidden at this time
			// eslint-disable-next-line no-undefined
			(button === undefined && !visible)
		) {
			return null;
		}

		const Component = typeof button === 'function' ? button : Button;

		return (
			<Component {...rest} />
		);
	}
});

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
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of `nextButtonVisibility`.
		 *
 		 * Example:
 		 * ```
		 * nextButton={<Button icon="closex" aria-label="Quit">Close</Button>}
		 * ```
		 *
		 * @type {Boolean|Function|Element}
		 * @private
		 */
		nextButton: PropTypes.any,

		/**
		 * Specifies when and how to show `nextButton` on WizardPanel.
		 *
		 * * `'auto'` will display the `nextButton` on every `WizardPanel.Panel` except the last,
		 * * `'always'`will display `nextButton` button on every Panel in the `WizardPanel.Panel`
		 * * `'never'` will always hide the `nextButton` on the every `WizardPanel.Panel`
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
		 * This prop accepts a component (e.g. `Button`), a component instance or a boolean value.
		 *
		 * If `false`, the button will not show. If set to a component, or `true`, the button will
		 * show. This will override the setting of `prevButtonVisibility`.
		 *
 		 * Example:
 		 * ```
		 * prevButton={<Button icon="closex" aria-label="Back">Back</Button>}
		 * ```
		 *
		 * @type {Boolean|Function|Element}
		 * @private
		 */
		prevButton: PropTypes.any,

		/**
		 * Specifies when and how to show `prevButton` on WizardPanel.
		 *
		 * * `'auto'` will display the `prevButton` on every `WizardPanel.Panel` except the first,
		 * * `'always'`will display `prevButton` button on every Panel in the `WizardPanel.Panel`
		 * * `'never'` will always hide the `prevButton` on the every `WizardPanel.Panel`
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
		handleNextClick: handle(
			forwardWithPrevent('handleNextClick'),
			(ev, {index, onChange, totalPanels}) => {
				if (onChange && index !== totalPanels) {
					const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;

					onChange({index: nextIndex});
				}
			}
		),
		handlePrevClick: handle(
			forwardWithPrevent('handlePrevClick'),
			(ev, {index, onChange}) => {
				if (onChange && index !== 0) {
					const prevIndex = index > 0 ? (index - 1) : index;

					onChange({index: prevIndex});
				}
			}
		),
		onTransition: (ev, {index, onTransition}) => {
			if (onTransition) {
				onTransition({index});
			}
		},
		onWillTransition: (ev, {index, onWillTransition}) => {
			if (onWillTransition) {
				onWillTransition({index});
			}
		}
	},

	computed: {
		steps: ({current, index, noSteps, total, totalPanels}) => {
			if (noSteps) {
				return null;
			}

			return (
				<Steps
					current={typeof current === 'number' && current > 0 ? current : index + 1}
					slot="slotAbove"
					total={typeof total === 'number' && total > 0 ? total : totalPanels}
				/>
			);
		}
	},

	render: ({
		children,
		footer,
		index,
		nextButton,
		nextButtonVisibility,
		noAnimation,
		handleNextClick,
		handlePrevClick,
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

		const isPrevButtonVisibility =  prevButtonVisibility === 'always' || (prevButtonVisibility === 'auto' && index !== 0);
		const isNextButtonVisibility = nextButtonVisibility === 'always' || (nextButtonVisibility === 'auto' && index < totalPanels - 1);

		return (
			<PanelBase {...rest} autoFocus="default-element">
				<Header
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
						backgroundOpacity="transparent"
						button={prevButton}
						icon="arrowlargeleft"
						minWidth={false}
						onClick={handlePrevClick}
						slot="slotBefore"
						visible={isPrevButtonVisibility}
					>
						{$L('Previous')}
					</NavigationButton>
					<NavigationButton
						backgroundOpacity="transparent"
						button={nextButton}
						icon="arrowlargeright"
						iconPosition="after"
						minWidth={false}
						onClick={handleNextClick}
						slot="slotAfter"
						visible={isNextButtonVisibility}
					>
						{$L('Next')}
					</NavigationButton>
				</Header>
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
					<Cell className={css.footer} component="footer" shrink>
						{/* This should probably use portals */}
						{footer}
					</Cell>
				</Column>
			</PanelBase>
		);
	}
});

// single-index ViewManagers need some help knowing when the transition direction needs to change
// because the index is always 0 from its perspective.
function useReverseTransition (index = -1) {
	const [prevIndex, setPrevIndex] = React.useState(-1);
	let [reverse, setReverse] = React.useState(false);

	if (prevIndex !== index) {
		reverse = index < prevIndex;
		setReverse(reverse);
		setPrevIndex(index);
	}

	return reverse;
}

/**
 * WizardPanelsRouter passes the  buttons, children, footer, subtitle, and title from
 * [WizardPanel]{@link sandstone/WizardPanels.Panel} to
 * [WizardPanelsBase]{@link sandstone/WizardPanels.WizardPanelsBase}.
 *
 * @class WizardPanelsRouter
 * @memberof sandstone/WizardPanels
 * @ui
 */
const WizardPanelsRouter = (Wrapped) => {
	const WizardPanelsProvider = ({
		children,
		'data-spotlight-id': spotlightId,
		index,
		onTransition,
		onWillTransition,
		title,
		...rest
	}) => {
		const [panel, setPanel] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const transition = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const totalPanels = React.Children.count(children);
		const currentTitle = panel && panel.title ? panel.title : title;
		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<WizardPanelsContext.Provider value={setPanel}>
				{React.Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...panel}
					{...transition}
					data-spotlight-id={spotlightId}
					index={index}
					title={currentTitle}
					totalPanels={totalPanels}
					reverseTransition={reverseTransition}
				>
					{panel && panel.children ? (
						<div className="enact-fit" key={`panel${index}`}>
							{panel.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelsContext.Provider>
		);
	};

	WizardPanelsProvider.propTypes =  /** @lends sandstone/WizardPanels.WizardPanelsProvider.prototype */  {
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
		* The "default" title for WizardPanels if title isn't explicitly set in
		* [Panel]{@link sandstone/WizardPanels.Panel}.
		* @example
		* 	<WizardPanels title="Title">
		*		<WizardPanels.Panel>
		*			lorem ipsum ...
		*		</WizardPanels.Panel>
		*	</WizardPanels>
		*
		* @type {Number}
		* @private
		*/
		title: PropTypes.string
	};

	WizardPanelsProvider.defaultProps = {
		index: 0,
		title: ''
	};

	return WizardPanelsProvider;
};

const WizardPanelsDecorator = compose(
	Changeable({prop: 'index'}),
	CancelDecorator({
		cancel: 'onChange',
		shouldCancel: handle(
			forwardWithPrevent('onBack'),
			not(forProp('noPrevButton', true))
		)
	}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		// prefer any spottable within the panel body (content or footer) followed by header
		defaultElement: [`.${css.content} *, .${css.footer} *`, 'header > *'],
		enterTo: 'default-element'
	}),
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
