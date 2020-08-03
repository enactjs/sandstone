import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {ScrollerBase} from '@enact/sandstone/Scroller';
import Skinnable from '@enact/sandstone/Skinnable';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const nop = () => {};

const Scroller = Skinnable(
	SpotlightContainerDecorator(
		{
			enterTo: 'last-focused',
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			ScrollerBase
		)
	)
);

Scroller.defaultProps = {
	'data-spotlight-container-disabled': false,
	cbScrollTo: nop,
	direction: 'both',
	fadeOut: false,
	focusableScrollbar: false,
	horizontalScrollbar: 'auto',
	noScrollByDrag: false,
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		track: false,
		wheel: true
	},
	scrollMode: 'native',
	verticalScrollbar: 'auto'
};

export default Scroller;
export {
	Scroller
}
