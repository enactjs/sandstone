import kind from '@enact/core/kind';
import {Knob} from '@enact/ui/Slider';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Knob for the MediaSlider in {@link sandstone/VideoPlayer}.
 *
 * @class MediaKnob
 * @memberof sandstone/VideoPlayer
 * @ui
 * @private
 */
const MediaKnob = kind({
	name: 'MediaKnob',

	propTypes: {
		preview: PropTypes.bool,
		previewProportion: PropTypes.number,
		value: PropTypes.number
	},

	computed: {
		style: ({style, preview, previewProportion}) => {
			if (!preview) {
				return style;
			}

			return {
				...style,
				'--ui-slider-proportion-end-knob': previewProportion
			};
		}
	},

	render: ({preview, previewProportion, value, ...rest}) => {
		if (preview) {
			value = previewProportion;
		}

		return (
			<Knob
				{...rest}
				proportion={value}
				value={value}
			/>
		);
	}
});

export default MediaKnob;
export {
	MediaKnob
};
