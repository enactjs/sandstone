import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ViewManager, {shape} from '@enact/ui/ViewManager';
import Button from '../Button';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

import {CrossFadeArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';
import {PageViewsRouter} from './PageViewsRouter';

import css from './PageViews.module.less';

const PageViewsBase = kind({
	name: 'PageViews',
	propTypes: {
		arranger: shape,
		componentRef: EnactPropTypes.ref,
		current: PropTypes.number,
		index: PropTypes.number,
		noAnimation: PropTypes.bool,
		onTransition: PropTypes.func,
		onWillTransition: PropTypes.func,
		reverseTransition: PropTypes.bool,
		totalIndex: PropTypes.number
	},
	defaultProps: {
		arranger: CrossFadeArranger
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
		steps: ({index, totalIndex}) => {
			return (
				<Steps
					pastIcon={'circle'}
					currentIcon={'circle'}
					futureIcon={'circle'}
					current={index + 1}
					layout="quickGuidePanels"
					total={totalIndex}
				/>
			);
		}
	},
	render: ({
		arranger,
		children,
		index,
		noAnimation,
		onNextClick,
		onPrevClick,
		onTransition,
		onWillTransition,
		reverseTransition,
		totalIndex,
		steps,
		...rest
	}) => {
		const isPrevButtonVisible = index !== 0;
		const isNextButtonVisible = index < totalIndex - 1;
		delete rest.componentRef;

		return (
			<div {...rest}>
				<Column style={{overflow: 'hidden'}}>
					<Row style={{height: '100%'}}>
						<Cell className={css.navButton} shrink>
							{isPrevButtonVisible ? <Button id="PrevNavButton" icon="arrowlargeleft" onClick={onPrevClick} /> : null}
						</Cell>
						<Cell
							component={ViewManager}
							id="Content"
							arranger={arranger}
							duration={400}
							style={{overflow: 'hidden'}}
							index={index}
							noAnimation={noAnimation}
							onTransition={onTransition}
							onWillTransition={onWillTransition}
							reverseTransition={reverseTransition}
						>
							{children}
						</Cell>
						<Cell className={css.navButton} shrink>
							{isNextButtonVisible ? <Button id="NextNavButton" icon="arrowlargeright" onClick={onNextClick} /> : null}
						</Cell>
					</Row>
					<Cell className={css.steps} shrink>
						{steps}
					</Cell>
				</Column>
			</div>
		);
	}
});

const PageViewsDecorator = compose(
	Changeable({prop: 'index'}),
	SpotlightContainerDecorator({
		continue5WayHold: true,
		defaultElement: [`.${spotlightDefaultClass}`, `#Content *`, '#NextNavButton', '#PrevNavButton'],
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
