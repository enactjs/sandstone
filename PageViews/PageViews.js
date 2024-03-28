import handle, {forwardCustomWithPrevent} from '@enact/core/handle';
import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import Button from '../Button';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

import {BasicArranger} from '../internal/Panels';
import Skinnable from '../Skinnable';
import Steps from '../Steps';
import {WizardPanelsRouter} from './PageViewsRouter';

import css from './PageViews.module.less';

const PageViewsBase = kind({
	name: 'PageViews',
	propTypes: {
		componentRef: EnactPropTypes.ref,
		current: PropTypes.number,
		index: PropTypes.number,
		onTransition: PropTypes.func,
		onWillTransition: PropTypes.func,
		reverseTransition: PropTypes.bool,
		total: PropTypes.number,
		totalPanels: PropTypes.number
	},
	styles: {
		css,
		className: 'pageViews',
		publicClassNames: true
	},
	handlers: {
		onNextClick: handle(
			forwardCustomWithPrevent('onNextClick'),
			(ev, {index, onChange, totalPanels}) => {
				if (onChange && index !== totalPanels) {
					const nextIndex = index < (totalPanels - 1) ? (index + 1) : index;
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
		steps: ({current, index, total, totalPanels}) => {
			const currentStep = (typeof current === 'number' && current > 0) ? current : (index + 1);
			const totalSteps = (typeof total === 'number' && total > 0) ? total : totalPanels;

			return (
				<Steps
					pastIcon={'circle'}
					currentIcon={'circle'}
					futureIcon={'circle'}
					current={currentStep}
					layout="quickGuidePanels"
					total={totalSteps}
				/>
			);
		}
	},
	render: ({
		children,
		index,
		onNextClick,
		onPrevClick,
		onTransition,
		onWillTransition,
		reverseTransition,
		steps,
		totalPanels,
		...rest
	}) => {
		const isPrevButtonVisible = index !== 0;
		const isNextButtonVisible = index < totalPanels - 1;
		delete rest.componentRef;

		return (
			<div {...rest}>
				<Column>
					<Row style={{height: '100%'}}>
						<Cell className={css.navButton} shrink>
							{isPrevButtonVisible ? <Button id="NavButton" icon="arrowlargeleft" onClick={onPrevClick} /> : null}
						</Cell>
						<Cell className={css.page}>
							<ViewManager
								arranger={BasicArranger}
								duration={400}
								onTransition={onTransition}
								onWillTransition={onWillTransition}
								noAnimation
								reverseTransition={reverseTransition}
							>
								{children}
							</ViewManager>
						</Cell>
						<Cell className={css.navButton} shrink>
							{isNextButtonVisible ? <Button id="NavButton" icon="arrowlargeright" onClick={onNextClick} /> : null}
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
		defaultElement: [`.${spotlightDefaultClass}`, '#NavButton'],
		enterTo: 'last-focused'
	}),
	I18nContextDecorator({rtlProp: 'rtl'}),
	WizardPanelsRouter,
	Skinnable
);

const PageViews = PageViewsDecorator(PageViewsBase);

export default PageViews;
export {
	PageViews
};
