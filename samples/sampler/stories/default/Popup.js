import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, select, text } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import React from 'react';

import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/sandstone/BodyText';

const Config = mergeComponentMetadata('Popup', Popup);

export default {
  title: 'Sandstone',
};

export const _Popup = () => (
  <div>
    <Popup
      open={boolean('open', Config)}
      position={select(
        'position',
        ['bottom', 'center', 'fullscreen', 'left', 'right', 'top'],
        Config,
        'bottom'
      )}
      noAnimation={boolean('noAnimation', Config)}
      noAutoDismiss={boolean('noAutoDismiss', Config)}
      onClose={action('onClose')}
      onHide={action('onHide')}
      onShow={action('onShow')}
      scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
      spotlightRestrict={select(
        'spotlightRestrict',
        ['self-first', 'self-only'],
        Config,
        'self-only'
      )}
    >
      <div>{text('children', Config, 'Hello Popup')}</div>
    </Popup>
    <BodyText centered>Use KNOBS to interact with Popup.</BodyText>
  </div>
);

_Popup.story = {
  parameters: {
    info: {
      text: 'Basic usage of Popup',
    },
  },
};
