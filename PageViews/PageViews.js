import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
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
import {CrossFadeArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import {PageViewsRouter} from './PageViewsRouter';

import * as css from './PageViews.module.less';

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
		'aria-label': PropTypes.string,

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
		 * {@link sandstone/PageViews.Page|Page} to be rendered
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
		 * Offset to apply to the position of the navigation buttons.
		 *
		 * @type {Number}
		 * @private
		 */
		navigationButtonOffset: PropTypes.number,

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
		 * Type of page indicator.
		 *
		 * There are two types:
		 *
		 * * `dot` - Indicates pages by dots. Used for pages less than 10 pages.
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
		arranger: CrossFadeArranger,
		pageIndicatorType: 'dot'
	},
	styles: {
		css,
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
		'aria-label': ({children, index, totalIndex}) => {
			const pageHint = new IString($L('Page {current} out of {total}')).format({current: index + 1, total: totalIndex});
			return `${pageHint} ${children?.[index]?.props['aria-label'] || ''}`;
		},
		className: ({fullContents, pageIndicatorType, styler}) => {
			return styler.append({fullContents}, pageIndicatorType);
		},
		renderPrevButton: ({index, onPrevClick, navigationButtonOffset}) => {
			const isPrevButtonVisible = index !== 0;
			const navigationButtonStyle = {
				top: typeof navigationButtonOffset === 'number' ? (navigationButtonOffset) : null
			};
			return (
				<Cell className={css.navButton} shrink>
					{isPrevButtonVisible ? <Button aria-label={$L('Previous')} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} size="small" style={navigationButtonStyle} /> : null}
				</Cell>
			);
		},
		renderNextButton: ({onNextClick, index, totalIndex, navigationButtonOffset}) => {
			const isNextButtonVisible = index < totalIndex - 1;
			const navigationButtonStyle = {
				top: typeof navigationButtonOffset === 'number' ? (navigationButtonOffset) : null
			};
			return (
				<Cell className={css.navButton} shrink>
					{isNextButtonVisible ? <Button aria-label={$L('Next')} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} size="small" style={navigationButtonStyle} /> : null}
				</Cell>
			);
		},
		renderViewManager: ({arranger, index, noAnimation, onTransition, onWillTransition, reverseTransition, children}) => {
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
		steps: ({index, onNextClick, onPrevClick, pageIndicatorType, totalIndex}) => {
			const isPrevButtonVisible = index !== 0;
			const isNextButtonVisible = index < totalIndex - 1;
			const isStepVisible = totalIndex !== 1;
			return (
				<>
					{pageIndicatorType !== 'number' ?
						<Row className={classNames(css.steps, {[css.hidden]: !isStepVisible})}>
							<Steps
								current={index + 1}
								pastIcon={'circle'}
								currentIcon={'circle'}
								futureIcon={'circle'}
								layout="quickGuidePanels"
								total={totalIndex}
							/>
						</Row> :
						<Row className={css.steps}>
							<Cell className={css.navButton} shrink>
								{isPrevButtonVisible ? <Button aria-label={$L('Previous')} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} size="small" /> : null}
							</Cell>
							<Cell className={css.pageNumber} shrink>{index + 1}</Cell><Cell className={css.separator} shrink>/</Cell><Cell className={css.pageNumber} shrink>{totalIndex}</Cell>
							<Cell className={css.navButton} shrink>
								{isNextButtonVisible ? <Button aria-label={$L('Next')} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} size="small" /> : null}
							</Cell>
						</Row>}
				</>
			);
		}
	},
	render: ({
		'aria-label': ariaLabel,
		componentRef,
		fullContents,
		index,
		pageIndicatorType,
		steps,
		renderPrevButton,
		renderNextButton,
		renderViewManager,
		...rest
	}) => {
		delete rest.arranger;
		delete rest.children;
		delete rest.componentRef;
		delete rest.noAnimation;
		delete rest.onTransition;
		delete rest.onNextClick;
		delete rest.onPrevClick;
		delete rest.onWillTransition;
		delete rest.reverseTransition;
		delete rest.totalIndex;

		return (
			<div role="region" aria-labelledby={`pageViews_index_${index}`} ref={componentRef} {...rest}>
				{!fullContents && pageIndicatorType === 'dot' ? steps : null}
				<Column aria-label={ariaLabel} className={css.contentsArea} id={`pageViews_index_${index}`} >
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
				{!fullContents && pageIndicatorType === 'number' ? steps : null}
			</div>
		);
	}
});

const PageViewsDecorator = compose(
	Changeable({prop: 'index'}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `.${css.viewManager} *`, `.${css.navButton} *`],
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
