import kind from '@enact/core/kind';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Slottable from '@enact/ui/Slottable';
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button/Button';
import Steps from '../Steps/Steps';

import Header from './Header';
import Panel from './Panel';

import css from './WizardPanel.module.less';

const WizardPanelContext = React.createContext(null);

/**
 * A WizardPanel that has steps with corresponding views.
 * Takes [View]{@link sandstone/Panels.WizardPanel.View} as children.
 *
 * @example
 * 	<WizardPanel>
 *		<WizardPanel.View title="a" subtitle="b" footer="c">
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
 * @class WizardPanel
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const WizardPanelBase = kind({
	name: 'WizardPanel',

	propTypes: {
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
		* @public
		*/
		index: PropTypes.number,

		/**
		* The text for next button.
		*
		* @type {String}
		* @public
		*/
		nextButtonText: PropTypes.string,

		/**
		* Called when the index value is changed.
		*
		* @type {Function}
		* @param {Object} event
		* @public
		*/
		onChange: PropTypes.func,

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
		 */
		reverseTransition: PropTypes.bool,

		/**
		* The subtitle to display.
		*
		* @type {String}
		* @required
		* @public
		*/
		subtitle: PropTypes.string,

		/**
		* The title to display.
		*
		* @type {String}
		* @required
		* @public
		*/
		title: PropTypes.string,

		/**
		* The total views in WizardPanel.
		*
		* @type {Number}
		* @public
		*/
		total: PropTypes.number
	},

	defaultProps: {
		index: 0
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
		}
	},

	render: ({buttons, children, footer, index, total, nextButtonText, onIncrementStep, onDecrementStep, prevButtonText, reverseTransition, subtitle, title, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header
					centered
					subtitle={subtitle}
					title={title}
					type="wizard"
				>
					<Steps current={index + 1} slot="slotAbove" total={total} />
					<Button
						disabled={index === (total - 1)}
						icon="arrowlargeright"
						onClick={onIncrementStep}
						slot="slotAfter"
					>
						{nextButtonText}
					</Button>
					<Button
						disabled={index === 0}
						icon="arrowlargeleft"
						onClick={onDecrementStep}
						slot="slotBefore"
					>
						{prevButtonText}
					</Button>
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
								reverseTransition={reverseTransition}
							>
								{children}
							</ViewManager>
						) : null}
					</Cell>
					<Cell className={css.bottomContainer} shrink>
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

const WizardPanelDecorator = (Wrapped) => {
	const WizardPanelProvider = ({children, index = 0, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const totalViews = React.Children.count(children);

		return (
			<WizardPanelContext.Provider value={setView}>
				{React.Children.toArray(children)[index]}
				<Wrapped {...rest} {...view} index={index} total={totalViews} reverseTransition={reverseTransition}>
					{view && view.children ? (
						<div className="enact-fit" key={`view${index}`}>
							{view.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelContext.Provider>
		);
	};

	WizardPanelProvider.propTypes = {
		index: PropTypes.number
	};

	return WizardPanelProvider;
};

const WizardPanel = Changeable(
	{prop: 'index'},
	WizardPanelDecorator(
		WizardPanelBase
	)
);

function ViewBase ({buttons, children, footer, subtitle, title}) {
	const set = React.useContext(WizardPanelContext);

	React.useEffect(() => {
		if (set) {
			set({buttons, children, footer, subtitle, title});
		}
	}, [buttons, children, footer, subtitle, set, title]);

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
export {WizardPanel, WizardPanelBase, View};
