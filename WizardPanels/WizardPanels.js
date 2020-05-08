import kind from '@enact/core/kind';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import {Header, Panel} from '../Panels';
import Steps from '../Steps';

import css from './WizardPanels.module.less';

const WizardPanelsContext = React.createContext(null);

/**
 * A WizardPanels that has steps with corresponding views.
 *
 * @example
 * 	<WizardPanels>
 *		<WizardPanels.WizardPanel subtitle="Subtitle" title="Title">
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
 *		</WizardPanels.WizardPanel>
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
		* The footer for WizardLayout.
		*
		* @type {Node}
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
		 * The currently selected step.
		 *
		 * If omitted, this will equal the currently selected view.
		 *
		 * @type {Number}
		 * @public
		 */
		stepCurrent: PropTypes.number,

		/**
		 * The total steps in WizardPanels.
		 *
		 * If omitted, this will equal the total views.
		 *
		 * @type {Number}
		 * @public
		 */
		stepTotal: PropTypes.number,

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
		* The total views in WizardPanels.
		*
		* @type {Number}
		* @private
		*/
		total: PropTypes.number
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
		onIncrementStep: (ev, {index, onChange, total}) => {
			if (onChange && index !== total) {
				const nextIndex = index < (total - 1) ? (index + 1) : index;

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
		steps: ({index, noSteps, stepCurrent, stepTotal, total}) => {
			if (noSteps) {
				return null;
			}

			return (
				<Steps
					current={typeof stepCurrent === 'number' ? stepCurrent : index + 1}
					slot="slotAbove"
					total={typeof stepTotal === 'number' ? stepTotal : total}
				/>
			);
		}
	},

	render: ({
		buttons,
		children,
		footer,
		index,
		total,
		nextButtonAriaLabel,
		nextButtonText,
		noNextButton,
		noPrevButton,
		noAnimation,
		onIncrementStep,
		onDecrementStep,
		onTransition,
		onWillTransition,
		prevButtonAriaLabel,
		prevButtonText,
		reverseTransition,
		steps,
		subtitle,
		title,
		...rest
	}) => {
		delete rest.noSteps;
		delete rest.stepCurrent;
		delete rest.stepTotal;

		return (
			<Panel {...rest}>
				<Header
					centered
					css={css}
					noCloseButton
					subtitle={subtitle}
					title={title}
					type="wizard"
				>
					{steps}
					{index < total - 1 && !noNextButton ? (
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
				<Column>
					<Cell className={css.content}>
						{/* This should probably use portals */}
						{/* skip creating ViewManager when there aren't children to avoid animating
							the first view into the viewport */}
						{children ? (
							<ViewManager
								arranger={SlideLeftArranger}
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
 * subtitle, and title from [WizardPanel]{@link sandstone/WizardPanels.WizardPanel} to [WizardPanelsBase]{@link sandstone/WizardPanels.WizardPanelsBase}.
 *
 * @class WizardPanelsDecorator
 * @memberof sandstone/WizardPanels
 * @ui
 */
const WizardPanelsDecorator = (Wrapped) => {
	const WizardPanelsProvider = ({children, index, title, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const totalViews = React.Children.count(children);
		const currentTitle = view && view.title ? view.title : title;

		return (
			<WizardPanelsContext.Provider value={setView}>
				{React.Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...view}
					index={index}
					title={currentTitle}
					total={totalViews}
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
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		* The "default" title for WizardPanels if title isn't explicitly set in [View]{@link sandstone/WizardPanels.WizardPanel}.
		* @example
		* 	<WizardPanels title="Title">
		*		<WizardPanels.WizardPanel>
		*			lorem ipsum ...
		*		</WizardPanels.WizardPanel>
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
 * A WizardPanels that can step through different views.
 * Expects [WizardPanel]{@link sandstone/WizardPanels.WizardPanel} as children.
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
	WizardPanelsDecorator(
		WizardPanelsBase
	)
);

export default WizardPanels;
export {
	WizardPanels,
	WizardPanelsBase,
	WizardPanelsContext,
	WizardPanelsDecorator
};
