import kind from '@enact/core/kind';
import {Column, Cell} from '@enact/ui/Layout';
import Changeable from '@enact/ui/Changeable';
import Slottable from '@enact/ui/Slottable';
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Steps from '../Steps';

import Header from './Header';
import Panel from './Panel';
import {PanelTypeContext} from './Viewport';

import css from './WizardPanels.module.less';

const WizardPanelsContext = React.createContext(null);

/**
 * A WizardPanels that has steps with corresponding views.
 * Takes [View]{@link sandstone/Panels.WizardPanels.View} as children.
 *
 * @example
 * 	<WizardPanels>
 *		<WizardPanels.View title="a" subtitle="b" footer="c">
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
 *		</WizardPanels.View>
 *	</WizardPanels>
 *
 * @class WizardPanels
 * @memberof sandstone/Panels
 * @ui
 * @public
 */
const WizardPanelsBase = kind({
	name: 'WizardPanels',

	contextType: PanelTypeContext,

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
		* @type {node}
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
		* The last index.
		*
		* @type {Number}
		* @public
		*/
		lastIndex: PropTypes.number,

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
		title: PropTypes.string
	},

	defaultProps: {
		index: 0
	},

	styles: {
		css,
		className: 'wizardPanels'
	},

	handlers: {
		onIncrementStep: (ev, {index, onChange, lastIndex}) => {
			if (onChange && index !== lastIndex) {
				const nextIndex = index < (lastIndex) ? (index + 1) : index;

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

	computed: {
	},

	render: ({buttons, children, footer, index, lastIndex, nextButtonText, onIncrementStep, onDecrementStep, prevButtonText, reverseTransition, subtitle, title, ...rest}) => {
		return (
			<Panel {...rest}>
				<Header
					centered
					subtitle={subtitle}
					title={title}
					type="wizard"
				>
					<Steps current={index + 1} slot="slotAbove" total={lastIndex + 1} />
					<Button
						disabled={index === lastIndex}
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

const WizardPanelsDecorator = (Wrapped) => {
	const WizardPanelsProvider = ({children, index = 0, ...rest}) => {
		const [view, setView] = React.useState(null);
		const reverseTransition = useReverseTransition(index);
		const totalViews = React.Children.count(children);

		return (
			<WizardPanelsContext.Provider value={setView}>
				{React.Children.toArray(children)[index]}
				<Wrapped {...rest} {...view} index={index} lastIndex={totalViews - 1} reverseTransition={reverseTransition}>
					{view && view.children ? (
						<div className="enact-fit" key={`view${index}`}>
							{view.children}
						</div>
					) : null}
				</Wrapped>
			</WizardPanelsContext.Provider>
		);
	};

	WizardPanelsProvider.propTypes = {
		index: PropTypes.number
	};

	return WizardPanelsProvider;
};

const WizardPanels = Changeable(
	{prop: 'index'},
	WizardPanelsDecorator(
		WizardPanelsBase
	)
);

function ViewBase ({buttons, children, footer, subtitle, title}) {
	const set = React.useContext(WizardPanelsContext);

	React.useEffect(() => {
		set({buttons, children, footer, subtitle, title});
	}, [buttons, children, footer, subtitle, set, title]);

	return null;
}

/**
 * View for [WizardPanels]{@link sandstone/Panels.WizardPanels}.
 *
 * @class View
 * @memberof sandstone/Panels.WizardPanels
 * @ui
 * @public
 */
const View = Slottable(
	{slots: ['buttons', 'footer', 'subtitle', 'title']},
	ViewBase
);

WizardPanels.View = View;

export default WizardPanels;
export {WizardPanels, WizardPanelsBase, View};
