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
		 * The currently selected step.
		 *
		 * If omitted, this will equal the currently selected view.
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
		 * The total steps in WizardPanels.
		 *
		 * If omitted, this will equal the total views.
		 *
		 * @type {Number}
		 * @public
		 */
		total: PropTypes.number,

		/**
		* The currently selected view.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		viewIndex: PropTypes.number,

		/**
		* The total views in WizardPanels.
		*
		* @type {Number}
		* @private
		*/
		viewTotal: PropTypes.number
	},

	defaultProps: {
		viewIndex: 0,
		nextButtonAriaLabel: $L('Next'),
		prevButtonAriaLabel: $L('Previous')
	},

	styles: {
		css,
		className: 'wizardPanels'
	},

	handlers: {
		onIncrementStep: (ev, {viewIndex, onChange, viewTotal}) => {
			if (onChange && viewIndex !== viewTotal) {
				const nextIndex = viewIndex < (viewTotal - 1) ? (viewIndex + 1) : viewIndex;

				onChange({viewIndex: nextIndex});
			}
		},
		onDecrementStep: (ev, {viewIndex, onChange}) => {
			if (onChange && viewIndex !== 0) {
				const prevIndex = viewIndex > 0 ? (viewIndex - 1) : viewIndex;

				onChange({viewIndex: prevIndex});
			}
		},
		onTransition: (ev, {viewIndex, onTransition}) => {
			if (onTransition) {
				onTransition({index: viewIndex});
			}
		},
		onWillTransition: (ev, {viewIndex, onWillTransition}) => {
			if (onWillTransition) {
				onWillTransition({index: viewIndex});
			}
		}
	},

	computed: {
		steps: ({current, noSteps, total, viewIndex, viewTotal}) => {
			if (noSteps) {
				return null;
			}

			return (
				<Steps
					current={typeof current === 'number' && current > 0 ? current : viewIndex + 1}
					slot="slotAbove"
					total={typeof total === 'number' && total > 0 ? total : viewTotal}
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
		viewIndex,
		viewTotal,
		...rest
	}) => {
		delete rest.noSteps;
		delete rest.current;
		delete rest.total;

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
					{viewIndex < viewTotal - 1 && !noNextButton ? (
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
					{viewIndex !== 0 && !noPrevButton ? (
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
	const WizardPanelsProvider = ({children, title, viewIndex, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(viewIndex);
		const totalViews = React.Children.count(children);
		const currentTitle = view && view.title ? view.title : title;

		return (
			<WizardPanelsContext.Provider value={setView}>
				{React.Children.toArray(children)[viewIndex]}
				<Wrapped
					{...rest}
					{...view}
					viewIndex={viewIndex}
					title={currentTitle}
					viewTotal={totalViews}
					reverseTransition={reverseTransition}
				>
					{view && view.children ? (
						<div className="enact-fit" key={`view${viewIndex}`}>
							{view.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelsContext.Provider>
		);
	};

	WizardPanelsProvider.propTypes =  /** @lends sandstone/WizardPanels.WizardPanelsProvider.prototype */  {
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
		title: PropTypes.string,

		/**
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		viewIndex: PropTypes.number
	};

	WizardPanelsProvider.defaultProps = {
		title: '',
		viewIndex: 0
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
	{prop: 'viewIndex'},
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
