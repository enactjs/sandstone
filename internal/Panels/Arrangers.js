import {arrange} from '@enact/ui/ViewManager';

const quadInOut = 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
const animationOptions = {easing: quadInOut};

// Batches animations together so that all views start/end at the same time
const callbacks = [];
const idle = (callback) => {
	callbacks.push(callback);
	if (callbacks.length === 1) {
		const next = typeof window !== 'undefined' && window.requestIdleCallback || setTimeout;
		next(() => {
			callbacks.forEach(fn => fn());
			callbacks.length = 0;
		});
	}
};

class AnimateOnIdle {
	constructor (node, keyframes, {duration, reverse, ...options}) {
		this.animation = null;

		// used to "fill" when the animation completes
		this.keyframes = [
			keyframes[reverse ? keyframes.length - 1 : 0],
			keyframes[reverse ? 0 : keyframes.length - 1]
		];

		this._onfinish = null;
		this._oncancel = null;
		this._reverse = false;
		this._playState = 'idle';

		this.fill(node, this.keyframes[0]);

		this.handleFinish = () => {
			this._playState = 'finished';
			this.fill(node, this.keyframes[1]);
			if (this._onfinish) this._onfinish();
		};

		this.handleCancel = () => {
			this._playState = 'finished';
			this.fill(node, this.keyframes[0]);
			if (this._oncancel) this._oncancel();
		};

		idle(() => {
			// if the animation was finished/cancelled before the idle callback occurs, bail out
			if (this._playState === 'finished') return;

			this.animation = node.animate(keyframes, {
				duration,
				direction: reverse ? 'reverse' : 'normal',
				fill: 'none',
				...options
			});

			this.animation.onfinish = this.handleFinish;
			this.animation.oncancel = this.handleCancel;

			if (this._reverse) {
				this.animation.reverse();
			}
		});
	}

	fill (node, keyframe) {
		// NOTE: this is naive atm to only address transform. We can extend it later.
		node.style.transform = keyframe.transform;
	}

	get playState () {
		return this.animation ? this.animation.playState : this._playState;
	}

	set onfinish (value) {
		this._onfinish = value;
	}

	set oncancel (value) {
		this._oncancel = value;
	}

	finish () {
		if (this.animation) {
			this.animation.finish();
		} else {
			this.handleFinish();
		}
	}

	cancel () {
		if (this.animation) {
			this.animation.cancel();
		} else {
			this.handleCancel();
		}
	}

	reverse () {
		// swap the first/last keyframe so we fill the correct frame
		this.keyframes.reverse();

		if (this.animation) {
			this.animation.reverse();
		} else {
			// do we need to account for re-reversing? seems unlikely but a possibility perhaps
			this._reverse = true;
		}
	}
}

const deferArrange = (config, keyframes, options) => {
	const {node, duration, reverse} = config;

	return new AnimateOnIdle(node, keyframes, {
		duration,
		reverse,
		...options
	});
};

/**
 * Arranger that slides panels in from the right and out to the left.
 *
 * @type {Arranger}
 * @private
 */
const BasicArranger = {
	enter: (config) => {
		return deferArrange(config, [
			{transform: `translateX(${config.rtl ? '-' : ''}100%)`, offset: 0},
			{transform: 'none', offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return deferArrange(config, [
			{transform: 'none', offset: 0},
			{transform: `translateX(${config.rtl ? '' : '-'}100%)`, offset: 1}
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
			{transform: `translateX(${config.rtl ? '-' : ''}100%)`, opacity: 0, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: 'none', opacity: 1, offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return arrange(config, [
			{transform: 'none', opacity: 1, offset: 0},
			{opacity: 0, offset: 0.5},
			{transform: `translateX(${config.rtl ? '' : '-'}100%)`, opacity: 0, offset: 1}
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
