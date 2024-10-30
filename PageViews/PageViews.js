import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {cap} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import classNames from 'classnames';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Button from '../Button';
import $L from '../internal/$L';
import {BasicArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import {PageViewsRouter} from './PageViewsRouter';

import componentCss from './PageViews.module.less';

/**
 * A PageViews that has page indicator with corresponding pages.
 *
 * @example
 * 	<PageViews>
 *		<PageViews.Page aria-label="This is a description for page">
 *			lorem ipsum ...
 *		</PageViews.Page>
 *	</PageViews>
 *
 * @class PageViewsBase
 * @memberof sandstone/PageViews
 * @ui
 * @public
 */
const PageViewsBase = kind({
	name: 'PageViews',

	propTypes: /** @lends sandstone/PageViews.PageViewsBase.prototype */ {
		/**
		 * Set of functions that control how the pages are transitioned into and out of the
		 * viewport.
		 *
		 * @see {@link ui/ViewManager.SlideArranger}
		 * @type {ui/ViewManager.Arranger}
		 * @default ui/ViewManager.SlideLeftArranger
		 * @private
		 */
		arranger: shape,

		/**
		 * {@link sandstone/PageViews.Page|Page} to be rendered.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Obtains a reference to the root node.
		 *
		 * @type {Function|Object}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `pageViews` - The root component class
		 * * `contentsArea` - The contentsArea component class
		 * * `navButton` - The navButton component class
		 * * `navButtonContainer` - Applied to the container containing navButtons in fullContents mode
		 * * `stepsRow` - The step component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * When `true`, maximize its contents area.
		 *
		 * @type {Boolean}
		 * @public
		 */
		fullContents: PropTypes.bool,

		/**
		 * Index of the active page.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Disables page transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when a transition completes.
		 *
		 * @type {Function}
		 * @public
		 */
		onTransition: PropTypes.func,

		/**
		 * Called before a transition begins.
		 *
		 * @type {Function}
		 * @public
		 */
		onWillTransition: PropTypes.func,

		/**
		 * Specifies on which side (`'top'` or `'bottom'`) the page indicator appears.
		 *
		 * @type {('top'|'bottom')}
		 * @default 'bottom'
		 * @private
		 */
		pageIndicatorPosition: PropTypes.oneOf(['top', 'bottom']),

		/**
		 * Type of page indicator.
		 *
		 * There are two types:
		 *
		 * * `dot` - Indicates pages by dots.
		 * * `number` - Indicates pages by current page number and total number of pages.
		 *
		 * @type {('dot'|'number')}
		 * @default 'dot'
		 * @public
		 */
		pageIndicatorType: PropTypes.oneOf(['dot', 'number']),

		/**
		 * Explicitly sets the ViewManager transition direction.
		 *
		 * @type {Boolean}
		 * @private
		 */
		reverseTransition: PropTypes.bool,

		/**
		 * The total number of pages.
		 *
		 * @type {Number}
		 * @private
		 */
		totalIndex: PropTypes.number
	},

	defaultProps: {
		arranger: BasicArranger,
		pageIndicatorPosition: 'bottom',
		pageIndicatorType: 'dot'
	},

	styles: {
		css: componentCss,
		className: 'pageViews',
		publicClassNames: true
	},

	handlers: {
		onNextClick: handle(
			forwardCustomWithPrevent('onNextClick'),
			(ev, {index, onChange, totalIndex}) => {
				if (onChange && index !== totalIndex) {
					const nextIndex = index < (totalIndex - 1) ? (index + 1) : index;

					onChange({type: 'onChange', index: nextIndex});
				}
			}
		),
		onPrevClick: handle(
			forwardCustomWithPrevent('onPrevClick'),
			(ev, {index, onChange}) => {
				if (onChange && index !== 0) {
					const prevIndex = index > 0 ? (index - 1) : index;

					onChange({type: 'onChange', index: prevIndex});
				}
			}
		),
		onTransition: (ev, {index, onTransition}) => {
			if (onTransition) {
				onTransition({type: 'onTransition', index});
			}
		},
		onWillTransition: (ev, {index, onWillTransition}) => {
			if (onWillTransition) {
				onWillTransition({type: 'onWillTransition', index});
			}
		}
	},

	computed: {
		className: ({fullContents, pageIndicatorPosition, pageIndicatorType, styler}) => styler.append({fullContents}, `indicator${cap(pageIndicatorPosition)}`, pageIndicatorType),
		renderNextButton: ({css, onNextClick, index, totalIndex}) => {
			const isNextButtonVisible = index < totalIndex - 1;

			return (
				<Cell className={css.navButtonCell} shrink>
					{isNextButtonVisible ? <Button aria-label={$L('Next')} className={css.navButton} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} size="small" /> : null}
				</Cell>
			);
		},
		renderPrevButton: ({css, index, onPrevClick}) => {
			const isPrevButtonVisible = index !== 0;

			return (
				<Cell className={css.navButtonCell} shrink>
					{isPrevButtonVisible ? <Button aria-label={$L('Previous')} className={css.navButton} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} size="small" /> : null}
				</Cell>
			);
		},
		renderViewManager: ({arranger, css, index, noAnimation, onTransition, onWillTransition, reverseTransition, children}) => {
			return (
				<Cell
					arranger={arranger}
					className={css.viewManager}
					component={ViewManager}
					duration={400}
					index={index}
					noAnimation={noAnimation}
					onTransition={onTransition}
					onWillTransition={onWillTransition}
					reverseTransition={reverseTransition}
				>
					{children}
				</Cell>
			);
		},
		stepHintAriaLabel: ({children, index, totalIndex}) => {
			const pageHint = new IString($L('Page {current} out of {total}')).format({current: index + 1, total: totalIndex});
			return `${pageHint} ${children?.[index]?.props['aria-label'] || ''}`;
		},
		steps: ({css, index, onNextClick, onPrevClick, pageIndicatorType, totalIndex}) => {
			const isPrevButtonVisible = index !== 0;
			const isNextButtonVisible = index < totalIndex - 1;
			const isStepVisible = totalIndex !== 1;

			return (
				<>
					{pageIndicatorType !== 'number' ?
						<Row className={classNames(css.stepsRow, {[css.hidden]: !isStepVisible})}>
							<Steps
								css={css}
								current={index + 1}
								highlightCurrentOnly
								total={totalIndex}
							/>
						</Row> :
						<Row className={css.stepsRow}>
							<Cell className={css.navButtonCell} shrink>
								{isPrevButtonVisible ? <Button aria-label={$L('Previous')} className={css.navButton} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} size="small" /> : null}
							</Cell>
							<Cell className={css.pageNumber} shrink>{index + 1}</Cell><Cell className={css.separator} shrink>/</Cell><Cell className={css.pageNumber} shrink>{totalIndex}</Cell>
							<Cell className={css.navButtonCell} shrink>
								{isNextButtonVisible ? <Button aria-label={$L('Next')} className={css.navButton} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} size="small" /> : null}
							</Cell>
						</Row>}
				</>
			);
		}
	},

	render: ({
		css,
		componentRef,
		fullContents,
		index,
		pageIndicatorPosition,
		pageIndicatorType,
		renderNextButton,
		renderPrevButton,
		renderViewManager,
		stepHintAriaLabel,
		steps,
		...rest
	}) => {
		delete rest.arranger;
		delete rest.children;
		delete rest.noAnimation;
		delete rest.onTransition;
		delete rest.onNextClick;
		delete rest.onPrevClick;
		delete rest.onWillTransition;
		delete rest.reverseTransition;
		delete rest.totalIndex;

		return (
			<div role="region" aria-labelledby={`pageViews_index_${index}`} ref={componentRef} {...rest}>
				{!fullContents && pageIndicatorPosition === 'top' ? steps : null}
				<Column aria-label={stepHintAriaLabel} className={css.contentsArea} id={`pageViews_index_${index}`} >
					{fullContents ?
						<>
							<Row className={css.horizontalLayout}>{renderViewManager}</Row>
							<Row className={css.navButtonContainer}>{pageIndicatorType === 'dot' ? renderPrevButton : null}<Cell />{pageIndicatorType === 'dot' ? renderNextButton : null}</Row>
							{steps}
						</> :
						<Row className={css.horizontalLayout}>
							{pageIndicatorType === 'dot' ? renderPrevButton : null}
							{renderViewManager}
							{pageIndicatorType === 'dot' ? renderNextButton : null}
						</Row>
					}
				</Column>
				{!fullContents && pageIndicatorPosition === 'bottom' ? steps : null}
			</div>
		);
	}
});

/**
 * Sets the strategy used to automatically focus an element within the PageViews upon render.
 * When set to 'none', focus is not set only on the first render.
 *
 * @name autoFocus
 * @type {('default-element'|'last-focused'|'none'|String)}
 * @memberof sandstone/PageViews.PageViews.prototype
 * @default 'last-focused'
 * @public
 */

const PageViewsDecorator = compose(
	Changeable({prop: 'index'}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `.${componentCss.viewManager} *`, `.${componentCss.navButtonCell} *`],
		enterTo: 'last-focused'
	}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	PageViewsRouter,
	Skinnable
);

/**
 * A PageViews that can navigate through different pages.
 * Expects {@link sandstone/PageViews.Page|Page} as children.
 *
 * @class PageViews
 * @memberof sandstone/PageViews
 * @extends sandstone/PageViews.PageViewsBase
 * @mixes ui/Changeable.Changeable
 * @ui
 * @public
 */
const PageViews = PageViewsDecorator(PageViewsBase);

export default PageViews;
export {
	PageViews
};
