import {mergeComponentMetadata, nullify} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';
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

export const _RangePicker = (args) => (
	<RangePicker
		max={args['max']}
		min={args['min']}
		decrementIcon={args['decrementIcon']}
		defaultValue={0}
		disabled={args['disabled']}
		incrementIcon={args['incrementIcon']}
		inlineTitle={args['inlineTitle']}
		joined={args['joined']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		step={args['step']}
		title={args['title']}
		width={parseIntOrNullify(args['width'])}
		wrap={args['wrap']}
	/>
);

number('max', _RangePicker, Config, 100);
number('min', _RangePicker, Config, 0);
select('decrementIcon', _RangePicker, ['', ...decrementIcons], Config);
boolean('disabled', _RangePicker, Config);
select('incrementIcon', _RangePicker, ['', ...incrementIcons], Config);
boolean('inlineTitle', _RangePicker, Config);
boolean('joined', _RangePicker, Config);
boolean('noAnimation', _RangePicker, Config);
select('orientation', _RangePicker, prop.orientation, Config, 'horizontal');
number('step', _RangePicker, Config, 5);
text('title', _RangePicker, Config);
select('width', _RangePicker, prop.width, Config, 'small');
boolean('wrap', _RangePicker, Config);

_RangePicker.storyName = 'RangePicker';
_RangePicker.parameters = {
	info: {
		text: 'Basic usage of RangePicker'
	}
};
