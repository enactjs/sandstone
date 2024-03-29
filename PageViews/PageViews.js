import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Button from '../Button';
import $L from '../internal/$L';
import {CrossFadeArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';

import {PageViewsRouter} from './PageViewsRouter';

import css from './PageViews.module.less';

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
		 * @public
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
		 */
		onTransition: PropTypes.func,

		/**
		 * Called before a transition begins.
		 *
		 * @type {Function}
		 */
		onWillTransition: PropTypes.func,

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
		totalIndex: PropTypes.number,

		/**
		 * Type of PageViews.
		 *
		 * There are two types: //TODO: update type name
		 *
		 * * `default` -
		 * * `list` -
		 *
		 * @type {('default'|'list')}
		 * @default 'default'
		 * @public
		 */
		type: PropTypes.oneOf(['default', 'list'])
	},
	defaultProps: {
		arranger: CrossFadeArranger,
		type: 'default'
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
		className: ({styler, type}) => {
			return styler.append(type);
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
		steps: ({index, onNextClick, onPrevClick, totalIndex, type}) => {
			const isPrevButtonVisible = index !== 0;
			const isNextButtonVisible = index < totalIndex - 1;
			return (
				type === 'default' ?
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
		arranger,
		children,
		index,
		nextNavigationButton,
		noAnimation,
		onTransition,
		onWillTransition,
		prevNavigationButton,
		reverseTransition,
		steps,
		type,
		...rest
	}) => {

		delete rest.componentRef;
		delete rest.onNextClick;
		delete rest.onPrevClick;
		delete rest.totalIndex;

		return (
			<div {...rest}>
				{type === 'default' ? steps : null}
				<Column style={{overflow: 'hidden'}}>
					<Row style={{height: '100%'}}>
						{type === 'default' ? prevNavigationButton : null}
						<Cell
							arranger={arranger}
							component={ViewManager}
							duration={400}
							id="PageViewsContent"
							index={index}
							noAnimation={noAnimation}
							onTransition={onTransition}
							onWillTransition={onWillTransition}
							reverseTransition={reverseTransition}
							style={{overflow: 'hidden'}}
						>
							{children}
						</Cell>
						{type === 'default' ? nextNavigationButton : null}
					</Row>
				</Column>
				{type === 'list' ? steps : null}
			</div>
		);
	}
});

const PageViewsDecorator = compose(
	Changeable({prop: 'index'}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `#PageViewsContent *`, '#NextNavButton', '#PrevNavButton'],
		enterTo: 'last-focused'
	}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	PageViewsRouter,
	Skinnable
);

const PageViews = PageViewsDecorator(PageViewsBase);

export default PageViews;
export {
	PageViews
};
