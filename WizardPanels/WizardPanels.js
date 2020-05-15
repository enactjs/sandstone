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

/**
 * A WizardPanels that has steps with corresponding views.
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
		 * the currently selected view.
		 *
		 * @type {Number}
		 * @public
		 */
		current: PropTypes.number,

		/**
		* .... to be included under the component.
		*
		* Typically, up to 2 buttons are used.
		*
		* @type {Element|Element[]}
		* @public
		*/
		footer: PropTypes.node,

		/**
		* The currently selected view.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		 * Hint string read when focusing the next button.
		 *
		 * @type {String}
		 * @default 'Next'
		 * @public
		 */
		nextButtonAriaLabel: PropTypes.string,

		/**
		* The text for next button.
		*
		* @type {String}
		* @public
		*/
		nextButtonText: PropTypes.string,

		/**
		 * Disables panel transitions.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		* Omits the next button component.
		*
		* @type {Boolean}
		* @public
		*/
		noNextButton: PropTypes.bool,

		/**
		* Omits the previous button component.
		*
		* When set, the back key will be disabled.
		*
		* @type {Boolean}
		* @public
		*/
		noPrevButton: PropTypes.bool,

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
		 * Hint string read when focusing the previous button.
		 *
		 * @type {String}
		 * @default 'Previous'
		 * @public
		 */
		prevButtonAriaLabel: PropTypes.string,

		/**
		* The text for previous button.
		*
		* @type {String}
		* @public
		*/
		prevButtonText: PropTypes.string,

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
		* The total views in WizardPanels.
		*
		* @type {Number}
		* @private
		*/
		totalPanels: PropTypes.number
	},

	defaultProps: {
		index: 0,
		nextButtonAriaLabel: $L('Next'),
		prevButtonAriaLabel: $L('Previous')
	},

	styles: {
		css,
		className: 'wizardPanels'
	},

	handlers: {
		onIncrementStep: (ev, {index, onChange, totalPanels}) => {
			if (onChange && index !== totalPanels) {
				const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;

				onChange({index: nextIndex});
			}
		},
		onDecrementStep: (ev, {index, onChange}) => {
			if (onChange && index !== 0) {
				const prevIndex = index > 0 ? (index - 1) : index;

				onChange({index: prevIndex});
			}
		},
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
		nextButtonAriaLabel,
		nextButtonText,
		noAnimation,
		noNextButton,
		noPrevButton,
		onDecrementStep,
		onIncrementStep,
		onTransition,
		onWillTransition,
		prevButtonAriaLabel,
		prevButtonText,
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

		return (
			<PanelBase
				{...rest}
				autoFocus="default-element"
				header={
					<Header
						arranger={noAnimation ? null : CrossFadeArranger}
						centered
						noCloseButton
						subtitle={subtitle}
						title={title}
						type="wizard"
					>
						{steps}
						{index < totalPanels - 1 && !noNextButton ? (
							<Button
								aria-label={nextButtonAriaLabel}
								backgroundOpacity="transparent"
								icon="arrowlargeright"
								iconPosition="after"
								minWidth={false}
								onClick={onIncrementStep}
								slot="slotAfter"
							>
								{nextButtonText}
							</Button>
						) : null}
						{index !== 0 && !noPrevButton ? (
							<Button
								aria-label={prevButtonAriaLabel}
								backgroundOpacity="transparent"
								icon="arrowlargeleft"
								minWidth={false}
								onClick={onDecrementStep}
								slot="slotBefore"
							>
								{prevButtonText}
							</Button>
						) : null}
					</Header>
				}
			>
				<Column>
					<Cell className={css.content}>
						{/* skip creating ViewManager when there aren't children to avoid animating
							the first view into the viewport */}
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
 * WizardPanelsDecorator passes the buttons, children, footer,
 * subtitle, and title from [WizardPanel]{@link sandstone/WizardPanels.Panel} to
 * [WizardPanelsBase]{@link sandstone/WizardPanels.WizardPanelsBase}.
 *
 * @class WizardPanelsRouter
 * @memberof sandstone/WizardPanels
 * @ui
 */
const WizardPanelsRouter = (Wrapped) => {
	const WizardPanelsProvider = ({children, 'data-spotlight-id': spotlightId, index, onTransition, onWillTransition, title, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const transition = useFocusOnTransition({onTransition, onWillTransition, spotlightId});

		const totalPanels = React.Children.count(children);
		const currentTitle = view && view.title ? view.title : title;
		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<WizardPanelsContext.Provider value={setView}>
				{React.Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...view}
					{...transition}
					data-spotlight-id={spotlightId}
					index={index}
					title={currentTitle}
					totalPanels={totalPanels}
					reverseTransition={reverseTransition}
				>
					{view && view.children ? (
						<div className="enact-fit" key={`view${index}`}>
							{view.children}
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
 * A WizardPanels that can step through different views.
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
