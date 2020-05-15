import handle, {forProp, forwardWithPrevent, not, adaptEvent, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import ViewManager from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import {BasicArranger, CrossFadeArranger, CancelDecorator} from '../internal/Panels';
import {Header, Panel} from '../Panels';
import Steps from '../Steps';

import css from './WizardPanels.module.less';

const WizardPanelsContext = React.createContext(null);

/**
 * A WizardPanels that has steps with corresponding panels.
 *
 * @example
 * 	<WizardPanels>
 *		<WizardPanels.Panel subtitle="Subtitle" title="Title">
 *			<Scroller>
 *				lorem ipsum ...
 *			</Scroller>
 *			<buttons>
 *				<Button>OK</Button>
 *				<Button>Cancel</Button>
 *			</buttons>
 *			<footer>
 *				<CheckboxItem inline>Confirm</CheckboxItem>
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
		* Buttons to be included under the component.
		*
		* Typically, up to 2 buttons are used.
		*
		* @type {Element|Element[]}
		* @public
		*/
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

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
		* The footer for WizardLayout.
		*
		* @type {Node}
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
		 * Hint string read when focusing the next button.
		 *
		 * @type {String}
		 * @default 'Next'
		 * @public
		 */
		nextButtonAriaLabel: PropTypes.string,

		/**
		* Icon for next button.
		*
		* @type {String}
		* @default 'arrowlargeright'
		* @public
		*/
		nextButtonIcon: PropTypes.string,

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
		* Icon for Prev button.
		*
		* @type {String}
		* @default 'arrowlargeleft'
		* @public
		*/
		prevButtonIcon: PropTypes.string,

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
		* The total panels in WizardPanels.
		*
		* @type {Number}
		* @private
		*/
		totalPanels: PropTypes.number
	},

	defaultProps: {
		index: 0,
		nextButtonAriaLabel: $L('Next'),
		prevButtonAriaLabel: $L('Previous'),
		prevButtonIcon: 'arrowlargeleft',
		nextButtonIcon: 'arrowlargeright'
	},

	styles: {
		css,
		className: 'wizardPanels'
	},

	handlers: {
		onNextClick: handle(
			adaptEvent(
				(ev, {index}) => ({index}),
				forward('onNextClick')
			),
			(ev, {index, onChange, totalPanels}) => {
				if (onChange && index !== totalPanels) {
					const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;

					onChange({index: nextIndex});
				}
			}
		),
		onPrevClick: handle(
			adaptEvent(
				(ev, {index}) => ({index}),
				forward('onPrevClick')
			),
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
		buttons,
		children,
		footer,
		nextButtonAriaLabel,
		nextButtonText,
		nextButtonIcon,
		noAnimation,
		noNextButton,
		noPrevButton,
		onNextClick,
		onPrevClick,
		onTransition,
		onWillTransition,
		prevButtonIcon,
		prevButtonAriaLabel,
		prevButtonText,
		reverseTransition,
		steps,
		subtitle,
		title,
		...rest
	}) => {
		delete rest.noSteps;
		delete rest.current;
		delete rest.totalPanels;
		delete rest.total;

		return (
			<Panel {...rest}>
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
					{!noNextButton ? (
						<Button
							aria-label={nextButtonAriaLabel}
							backgroundOpacity="transparent"
							icon={nextButtonIcon}
							iconPosition="after"
							minWidth={false}
							onClick={onNextClick}
							slot="slotAfter"
						>
							{nextButtonText}
						</Button>
					) : null}
					{!noPrevButton ? (
						<Button
							aria-label={prevButtonAriaLabel}
							backgroundOpacity="transparent"
							icon={prevButtonIcon}
							minWidth={false}
							onClick={onPrevClick}
							slot="slotBefore"
						>
							{prevButtonText}
						</Button>
					) : null}
				</Header>
				<Column>
					<Cell className={css.content}>
						{/* This should probably use portals */}
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
					<Cell className={css.bottom} component="footer" shrink>
						<div className={css.buttonContainer}>
							{/* This should probably use portals */}
							{buttons}
						</div>
						<div className={css.footer}>
							{footer}
						</div>
					</Cell>
				</Column>
			</Panel>
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
 * @class WizardPanelsDecorator
 * @memberof sandstone/WizardPanels
 * @ui
 */
const WizardPanelsDecorator = (Wrapped) => {
	const WizardPanelsProvider = ({
		children,
		index,
		...rest
	}) => {
		const [panel, setPanel] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const totalPanels = React.Children.count(children);

		const sharedPropsList = [
			'title',
			'subtitle',
			'onPrevClick',
			'onNextClick',
			'prevButtonIcon',
			'prevButtonText',
			'prevButtonAriaLabel',
			'nextButtonAriaLabel',
			'nextButtonIcon',
			'nextButtonText',
			'noNextButton',
			'noPrevButton'
		];
		const sharedProps = {};
		sharedPropsList.forEach( p => {
			if (panel && typeof panel[p] !== 'undefined') {
				sharedProps[p] = panel[p];
			} else if (typeof rest[p] !== 'undefined') {
				sharedProps[p] = rest[p];
			}
			delete rest[p];
		});

		// eslint-disable-next-line enact/prop-types
		delete rest.onBack;

		return (
			<WizardPanelsContext.Provider value={setPanel}>
				{React.Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...panel}
					index={index}
					totalPanels={totalPanels}
					reverseTransition={reverseTransition}
					{...sharedProps}
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
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

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
const WizardPanels = Changeable(
	{prop: 'index'},
	CancelDecorator(
		{cancel: 'onChange', shouldCancel: handle(
			forwardWithPrevent('onBack'),
			not(forProp('noPrevButton', true))
		)},
		WizardPanelsDecorator(
			WizardPanelsBase
		)
	)
);

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
