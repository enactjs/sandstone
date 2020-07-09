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
		const firstKeyframe = keyframes[reverse ? keyframes.length - 1 : 0];
		const lastKeyframe = keyframes[reverse ? 0 : keyframes.length - 1];

		this._onfinish = null;
		this._oncancel = null;
		this._finish = false;
		this._cancel = false;
		this._reverse = false;

		this.fill(node, firstKeyframe);

		idle(() => {
			this.animation = node.animate(keyframes, {
				duration,
				direction: reverse ? 'reverse' : 'normal',
				fill: 'none',
				...options
			});

			this.animation.onfinish = () => {
				this.fill(node, lastKeyframe);
				if (this._onfinish) this._onfinish();
			};
			this.animation.oncancel = () => {
				this.fill(node, firstKeyframe);
				if (this._oncancel) this._oncancel();
			};

			if (this._reverse) {
				this.animation.reverse();
			}

			if (this._cancel) {
				this.animation.cancel();
			} else if (this._finish) {
				this.animation.finish();
			}
		});
	}

	fill (node, keyframe) {
		// NOTE: this is naive atm to only address transform. We can extend it later.
		node.style.transform = keyframe.transform;
	}

	set onfinish (value) {
		if (this.animation) {
			this.animation.onfinish = value;
		} else {
			this._onfinish = value;
		}
	}

	set oncancel (value) {
		if (this.animation) {
			this.animation.oncancel = value;
		} else {
			this._oncancel = value;
		}
	}

	finish () {
		if (this.animation) {
			this.animation.finish();
		} else {
			this._finish = true;
		}
	}

	cancel () {
		if (this.animation) {
			this.animation.cancel();
		} else {
			this._cancel = true;
		}
	}

	reverse () {
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
			{transform: 'translateX(100%)', offset: 0},
			{transform: 'none', offset: 1}
		], animationOptions);
	},
	leave: (config) => {
		return deferArrange(config, [
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
