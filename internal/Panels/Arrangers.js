import {arrange} from '@enact/ui/ViewManager';

const quadInOut = 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
const animationOptions = {easing: quadInOut};

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
const BasicArranger = {
	enter: (config) => {
		return arrange(config, [
			{transform: 'translateX(100%)', offset: 0},
			{transform: 'none', offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return arrange(config, [
			{transform: 'none', offset: 0},
			{transform: 'translateX(-100%)', offset: 1}
		], animationOptions);
	}
};

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
const FadeAndSlideArranger = {
	enter: (config) => {
		return arrange(config, [
			{transform: 'translateX(100%)', opacity: 0, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: 'none', opacity: 1, offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return arrange(config, [
			{transform: 'none', opacity: 1, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: 'translateX(-100%)', opacity: 0, offset: 1}
		], animationOptions);
	}
};

/**
 * Arranger that cross fade between panels.
 *
 * @type {Arranger}
 * @private
 */
const CrossFadeArranger = {
	enter: (config) => {
		return arrange(config, [
			{opacity: 0, offset: 0},
			{opacity: 0, offset: 0.5},
			{opacity: 1, offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return arrange(config, [
			{opacity: 1, offset: 0},
			{opacity: 0, offset: 0.5},
			{opacity: 0, offset: 1}
		], animationOptions);
	}
};

export {
	BasicArranger,
	CrossFadeArranger,
	FadeAndSlideArranger
};
