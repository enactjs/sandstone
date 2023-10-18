import PropTypes from 'prop-types';

import WizardPanels from '../WizardPanels';

/**
 * A QuickGuidePaenls that has steps with corresponding panels and panels have full screen size content.
 *
 * @example
 * 	<QuickGuidePanels>
 *		<QuickGuidePanels.Panel>
 *			<Scroller>
 *				lorem ipsum ...
 *			</Scroller>
 *			<footer>
 *				<Button>OK</Button>
 *				<Button>Cancel</Button>
 *			</footer>
 *		</QuickGuidePanels.Panel>
 *	</QuickGuidePanels>
 *
 * @class QuickGuidePanels
 * @memberof sandstone/QuckGuidePanels
 * @ui
 * @public
 */

const QuickGuidePanels = (props) => <WizardPanels fullScreenContent {...props} />;

QuickGuidePanels.propTypes = {
	/**
	 * Hint string read when focusing the close button.
	 *
	 * @type {String}
	 * @default 'Exit quick guide'
	 * @private
	 */
	closeButtonAriaLabel: PropTypes.string,

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
	 * @public
	 */
	onClose: PropTypes.func,

	/**
	 * Called when the next button is clicked in QuickGuidePanels.
	 *
	 * Calling `preventDefault` on the passed event will prevent advancing to the next panel.
	 *
	 * @type {Function}
	 * @public
	 */
	onNextClick: PropTypes.func,

	/**
	 * Called when previous button is clicked in QuickGuidePanels.
	 *
	 * Calling `preventDefault` on the passed event will prevent navigation to the previous panel.
	 *
	 * @type {Function}
	 * @public
	 */
	onPrevClick: PropTypes.func
};

export default QuickGuidePanels;
export {
	QuickGuidePanels
};
