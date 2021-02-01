import { boolean, text, select } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import UiBodyText, { BodyTextBase as UiBodyTextBase } from '@enact/ui/BodyText';
import React from 'react';

import BodyText, { BodyTextBase } from '@enact/sandstone/BodyText';

BodyText.displayName = 'BodyText';
const Config = mergeComponentMetadata(
  'BodyText',
  UiBodyTextBase,
  UiBodyText,
  BodyTextBase,
  BodyText
);

export default {
  title: 'Sandstone',
};

export const _BodyText = () => (
  <BodyText
    centered={boolean('centered', Config)}
    noWrap={boolean('noWrap', Config)}
    size={select('size', ['', 'large', 'small'], Config)}
  >
    {text('children', Config, 'This is Body Text')}
  </BodyText>
);

_BodyText.story = {
  name: 'BodyText',

  parameters: {
    info: {
      text: 'The basic BodyText',
    },
  },
};
