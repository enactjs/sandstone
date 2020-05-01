import kind from '@enact/core/kind';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Slottable from '@enact/ui/Slottable';
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button/Button';
import Steps from '../Steps/Steps';

import {CrossFadeArranger} from './Arrangers';
import Header from './Header';
import Panel from './Panel';

import css from './WizardPanel.module.less';

const WizardPanelContext = React.createContext(null);

/**
 * A WizardPanel that has steps with corresponding views.
 *
 * @example
 * 	<WizardPanel>
 *		<WizardPanel.View subtitle="Subtitle" title="Title">
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
 *		</WizardPanel.View>
 *	</WizardPanel>
 *
 * @class WizardPanelBase
 * @memberof sandstone/Panels.WizardPanel
 * @ui
 * @public
 */
const WizardPanelBase = kind({
	name: 'WizardPanel',

	propTypes: /** @lends sandstone/Panels.WizardPanel.WizardPanelBase.prototype */ {
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
		* The currently selected step.
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
		* The total views in WizardPanel.
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
		className: 'wizardPanel'
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

	render: ({buttons, children, footer, index, total, nextButtonAriaLabel, nextButtonText, noNextButton, noPrevButton, noSteps, noAnimation, onIncrementStep, onDecrementStep, onTransition, onWillTransition, prevButtonAriaLabel, prevButtonText, reverseTransition, subtitle, title, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header
					arranger={CrossFadeArranger}
					centered
					css={css}
					noCloseButton
					subtitle={subtitle}
					title={title}
					type="wizard"
					index={index}
				>
					{!noSteps ? (
						<Steps current={index + 1} slot="slotAbove" total={total} />
					) : null}
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
 * WizardPanelDecorator passes the buttons, children, footer,
 * subtitle, and title from [View]{@link sandstone/Panels.WizardPanel.View} to [WizardPanelBase]{@link sandstone/Panels.WizardPanel.WizardPanelBase}.
 *
 * @class WizardPanelDecorator
 * @memberof sandstone/Panels.WizardPanel
 * @ui
 */
const WizardPanelDecorator = (Wrapped) => {
	const WizardPanelProvider = ({children, index, subtitle, title, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const totalViews = React.Children.count(children);

		// If `subtitle` and/or `title` is not provided by `view`, fallback to the `subtitle` and `title` from `WizardPanel`
		const fallbackSubtitle = subtitle ? subtitle : '';
		const fallbackTitle = title ? title : '';
		const subtitles = [];
		const titles = [];

		// Extract titles and subtitles into arrays for Header crossfade animation
		React.Children.forEach(children, (child) => {
			subtitles.push(child.props && child.props.subtitle ? child.props.subtitle : fallbackSubtitle);
			titles.push(child.props && child.props.title ? child.props.title : fallbackTitle);
		});

		return (
			<WizardPanelContext.Provider value={setView}>
				{React.Children.toArray(children)[index]}
				<Wrapped
					{...rest}
					{...view}
					index={index}
					reverseTransition={reverseTransition}
					subtitle={subtitles}
					title={titles}
					total={totalViews}
				>
					{view && view.children ? (
						<div className="enact-fit" key={`view${index}`}>
							{view.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelContext.Provider>
		);
	};

	WizardPanelProvider.propTypes =  /** @lends sandstone/Panels.WizardPanel.WizardPanelProvider.prototype */  {
		/**
		* The currently selected step.
		*
		* @type {Number}
		* @default 0
		* @private
		*/
		index: PropTypes.number,

		/**
		* The "default" subtitle for WizardPanel if subtitle isn't explicitly set in [View]{@link sandstone/Panels.WizardPanel.View}.
		*
		* Example:
		* ```
		* 	<WizardPanel subtitle="Subtitle">
		*		<WizardPanel.View>
		*			lorem ipsum ...
		*		</WizardPanel.View>
		*	</WizardPanel>
		* ```
		*
		* @type {String}
		* @private
		*/
		subtitle: PropTypes.string,

		/**
		* The "default" title for WizardPanel if title isn't explicitly set in [View]{@link sandstone/Panels.WizardPanel.View}.
		*
		* Example:
		* ```
		* 	<WizardPanel title="Title">
		*		<WizardPanel.View>
		*			lorem ipsum ...
		*		</WizardPanel.View>
		*	</WizardPanel>
		* ```
		*
		* @type {String}
		* @private
		*/
		title: PropTypes.string
	};

	WizardPanelProvider.defaultProps = {
		index: 0,
		title: ''
	};

	return WizardPanelProvider;
};

/**
 * A WizardPanel that can step through different views.
 * Expects [View]{@link sandstone/Panels.WizardPanel.View} as children.
 *
 * @class WizardPanel
 * @memberof sandstone/Panels
 * @extends sandstone/Panels.WizardPanel
 * @mixes ui/Changeable.Changeable
 * @ui
 * @public
 */
const WizardPanel = Changeable(
	{prop: 'index'},
	WizardPanelDecorator(
		WizardPanelBase
	)
);

/**
 * ViewBase that sets the buttons, children, footer,
 * subtitle, and title for [WizardPanelBase]{@link sandstone/Panels.WizardPanel.WizardPanelBase}.
 *
 * @class ViewBase
 * @memberof sandstone/Panels.WizardPanel
 * @ui
 */
function ViewBase ({buttons, children, footer}) {
	const set = React.useContext(WizardPanelContext);

	React.useEffect(() => {
		if (set) {
			set({buttons, children, footer});
		}
	}, [buttons, children, footer, set]);

	return null;
}

/**
 * View for [WizardPanel]{@link sandstone/Panels.WizardPanel}.
 *
 * @class View
 * @memberof sandstone/Panels.WizardPanel
 * @ui
 * @public
 */
const View = Slottable(
	{slots: ['buttons', 'footer', 'subtitle', 'title']},
	ViewBase
);

WizardPanel.View = View;

export default WizardPanel;
export {
	WizardPanel,
	WizardPanelBase,
	WizardPanelDecorator,
	View
};
