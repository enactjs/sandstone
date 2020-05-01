import {arrange} from '@enact/ui/ViewManager/Arranger';

const quadInOut = 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
const animationOptions = {easing: quadInOut};

const getHorizontalTranslation = (node, factor = 1) => {
	const width = node.getBoundingClientRect().width;

	return `translateX(${width * factor}px)`;
};

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
export const BasicArranger = {
	enter: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node);

		return arrange(config, [
			{transform, offset: 0},
			{transform: 'none', offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node, -1);

		return arrange(config, [
			{transform: 'none', offset: 0},
			{transform, offset: 1}
		], animationOptions);
	}
};

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
export const FadeAndSlideArranger = {
	enter: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node);

		return arrange(config, [
			{transform, opacity: 0, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: 'none', opacity: 1, offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		const {node} = config;
		const transform = getHorizontalTranslation(node, -1);

		return arrange(config, [
			{transform: 'none', opacity: 1, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform, opacity: 0, offset: 1}
		], animationOptions);
	}
};

/**
 * Arranger that cross fade between panels.
 *
 * @type {Arranger}
 * @private
 */
export const CrossFadeArranger = {
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
