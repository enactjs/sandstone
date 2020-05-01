import CancelDecorator from './CancelDecorator';
import PopupDecorator from './PopupDecorator';
import Viewport, {PanelsStateContext} from './Viewport';

const quadInOut = 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
const animationOptions = {easing: quadInOut};

const getHorizontalTranslation = (node, factor = 1) => {
	const width = node.getBoundingClientRect().width;

	return `translateX(${width * factor}px)`;
};

export {
	animationOptions,
	getHorizontalTranslation,
	CancelDecorator,
	PanelsStateContext,
	PopupDecorator,
	Viewport
};
