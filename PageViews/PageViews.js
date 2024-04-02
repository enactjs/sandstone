import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import IString from 'ilib/lib/IString';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Button from '../Button';
import $L from '../internal/$L';
import {CrossFadeArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import {PageViewsRouter} from './PageViewsRouter';

import css from './PageViews.module.less';

/**
 * A PageViews that has page indicator with corresponding pages.
 *
 * @example
 * 	<PageViews>
 *		<PageViews.Page>
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
			return `${pageHint} ${children[index].props['aria-label'] || ''}`;
		},
		className: ({pageIndicatorType, styler}) => {
			return styler.append(pageIndicatorType);
		},
		prevNavigationButton: ({index, onPrevClick}) => {
			const isPrevButtonVisible = index !== 0;
			return (
				<Cell className={css.navButton} shrink>
					{isPrevButtonVisible ? <Button aria-label={$L('Previous')} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} /> : null}
				</Cell>
			);
		},
		nextNavigationButton: ({index, onNextClick, totalIndex}) => {
			const isNextButtonVisible = index < totalIndex - 1;

			return (
				<Cell className={css.navButton} shrink>
					{isNextButtonVisible ? <Button aria-label={$L('Next')} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} /> : null}
				</Cell>
			);
		},
		steps: ({index, onNextClick, onPrevClick, pageIndicatorType, totalIndex}) => {
			const isPrevButtonVisible = index !== 0;
			const isNextButtonVisible = index < totalIndex - 1;
			return (
				pageIndicatorType === 'dot' ?
					<Column align="center center" className={css.stepsArea}>
						<Steps
							current={index + 1}
							pastIcon={'circle'}
							currentIcon={'circle'}
							futureIcon={'circle'}
							layout="quickGuidePanels"
							total={totalIndex}
						/>
					</Column> :
					<Column align="center center" className={css.stepsArea}>
						<Row className={css.steps}>
							<Cell className={css.navButton} shrink>
								{isPrevButtonVisible ? <Button aria-label={$L('Previous')} icon="arrowlargeleft" iconFlip="auto" id="PrevNavButton" onClick={onPrevClick} /> : null}
							</Cell>
							<Cell shrink>{index + 1} / {totalIndex}</Cell>
							<Cell className={css.navButton} shrink>
								{isNextButtonVisible ? <Button aria-label={$L('Next')} icon="arrowlargeright" iconFlip="auto" id="NextNavButton" onClick={onNextClick} /> : null}
							</Cell>
						</Row>
					</Column>
			);
		}
	},
	render: ({
		'aria-label': ariaLabel,
		arranger,
		children,
		componentRef,
		index,
		nextNavigationButton,
		noAnimation,
		onTransition,
		onWillTransition,
		pageIndicatorType,
		prevNavigationButton,
		reverseTransition,
		steps,
		...rest
	}) => {

		delete rest.componentRef;
		delete rest.onNextClick;
		delete rest.onPrevClick;
		delete rest.totalIndex;

		return (
			<div role="region" aria-labelledby={`pageViews_index_${index}`} ref={componentRef} {...rest}>
				{pageIndicatorType === 'dot' ? steps : null}
				<Column aria-label={ariaLabel} className={css.contentsArea} id={`pageViews_index_${index}`} >
					<Row className={css.horizontalLayout}>
						{pageIndicatorType === 'dot' ? prevNavigationButton : null}
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
						{pageIndicatorType === 'dot' ? nextNavigationButton : null}
					</Row>
				</Column>
				{pageIndicatorType === 'number' ? steps : null}
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
