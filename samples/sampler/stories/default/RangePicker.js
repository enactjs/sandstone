import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import RangePicker, {RangePickerBase} from '@enact/sandstone/RangePicker';

import {decrementIcons, incrementIcons} from '../helper/icons';

const Config = mergeComponentMetadata('RangePicker', RangePickerBase, RangePicker);

// Set up some defaults for info and knobs
const prop = {
	orientation: ['horizontal', 'vertical'],
	width: [null, 'small', 'medium', 'large', 1, 2, 3, 4, 5, 6]
};
const parseIntOrNullify = (v) => {
	if (!isNaN(parseInt(v))) {
		return parseInt(v);
	} else {
		return nullify(v);
	}
};

RangePicker.displayName = 'RangePicker';

export default {
	title: 'Sandstone/RangePicker',
	component: 'RangePicker'
};

export const _RangePicker = () => (
	<RangePicker
		max={number('max', Config, 100)}
		min={number('min', Config, 0)}
		decrementIcon={select('decrementIcon', ['', ...decrementIcons], Config)}
		defaultValue={0}
		disabled={boolean('disabled', Config)}
		incrementIcon={select('incrementIcon', ['', ...incrementIcons], Config)}
		inlineTitle={boolean('inlineTitle', Config)}
		joined={boolean('joined', Config)}
		noAnimation={boolean('noAnimation', Config)}
		onChange={action('onChange')}
		orientation={select('orientation', prop.orientation, Config, 'horizontal')}
		step={number('step', Config, 5)}
		title={text('title', Config)}
		width={parseIntOrNullify(select('width', prop.width, Config, 'small'))}
		wrap={boolean('wrap', Config)}
	/>
);

_RangePicker.storyName = 'RangePicker';
_RangePicker.parameters = {
	info: {
		text: 'Basic usage of RangePicker'
	}
};
