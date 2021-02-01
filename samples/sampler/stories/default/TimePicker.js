import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, text } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import React from 'react';

import TimePicker from '@enact/sandstone/TimePicker';

const Config = mergeComponentMetadata('TimePicker', TimePicker);
TimePicker.displayName = 'TimePicker';

export default {
  title: 'Sandstone',
};

export const _TimePicker = () => (
  <TimePicker
    disabled={boolean('disabled', Config)}
    spotlightDisabled={boolean('spotlightDisabled', Config)}
    hourAriaLabel={text('hourAriaLabel', Config, '')}
    minuteAriaLabel={text('minuteAriaLabel', Config, '')}
    meridiemAriaLabel={text('meridiemAriaLabel', Config, '')}
    onChange={action('onChange')}
    onComplete={action('onComplete')}
  />
);

_TimePicker.story = {
  name: 'TimePicker',

  parameters: {
    info: {
      text: 'The basic TimePicker',
    },
  },
};
