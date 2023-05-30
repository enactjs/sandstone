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
	 * Specifies when and how to show `nextButton` on QuickGuidePanels.
	 *
	 * * `'auto'` will display the `nextButton` on every `QuickGuidePanels.Panel` except the last
	 * * `'always'` will always display the `nextButton`
	 * * `'never'` will always hide the `nextButton`
	 *
	 * Note, children values will override the generalized parent visibility settings. In this
	 * case, a customized `nextButton` on QuickGuidePanels.Panel will take precedence over the
	 * `nextButtonVisibility` value.
	 *
	 * @type {('auto'|'always'|'never')}
	 * @default 'auto'
	 * @public
	 */
	nextButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

	/**
	 * Called when the index value is changed.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @public
	 */
	onChange: PropTypes.func,

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
	onPrevClick: PropTypes.func,

	/**
	 * Specifies when and how to show `prevButton` on QuickGuidePanels.
	 *
	 * * `'auto'` will display the `prevButton` on every `QuickGuidePanels.Panel` except the first
	 * * `'always'` will always display the `prevButton`
	 * * `'never'` will always hide the `prevButton`
	 *
	 * Note, children values will override the generalized parent visibility settings. In this case,
	 * if user provides a customized `prevButton` on QuickGuidePanels.Panel will take precedence over the `prevButtonVisibility` value.
	 *
	 * @type {('auto'|'always'|'never')}
	 * @default 'auto'
	 * @public
	 */
	prevButtonVisibility: PropTypes.oneOf(['auto', 'always', 'never']),

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
	 * The total panels in QuickGuidePanels.
	 *
	 * @type {Number}
	 * @private
	 */
	totalPanels: PropTypes.number
};

export default QuickGuidePanels;
export {
	QuickGuidePanels
};
