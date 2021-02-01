import { action } from '@enact/storybook-utils/addons/actions';
import { boolean, select, text } from '@enact/storybook-utils/addons/knobs';
import { mergeComponentMetadata } from '@enact/storybook-utils';
import React from 'react';

import { InputField, InputFieldBase } from '@enact/sandstone/Input';

import icons from '../helper/icons';

const iconNames = ['', ...icons];

InputField.displayName = 'InputField';
const Config = mergeComponentMetadata('InputField', InputFieldBase, InputField);

// Set up some defaults for info and knobs
const prop = {
  type: ['text', 'number', 'password'],
};

export default {
  title: 'Sandstone',
};

export const InputInputField = () => (
  <InputField
    autoFocus={boolean('autoFocus', Config)}
    onBeforeChange={action('onBeforeChange')}
    onChange={action('onChange')}
    disabled={boolean('disabled', Config)}
    dismissOnEnter={boolean('dismissOnEnter', Config)}
    iconAfter={select('iconAfter', iconNames, Config)}
    iconBefore={select('iconBefore', iconNames, Config)}
    invalid={boolean('invalid', Config)}
    invalidMessage={text('invalidMessage', Config)}
    placeholder={text('placeholder', Config)}
    size={select('size', ['small', 'large'], Config)}
    type={select('type', prop.type, Config, prop.type[0])}
  />
);

InputInputField.story = {
  name: 'Input.InputField',

  parameters: {
    info: {
      text: 'The basic InputField',
    },
  },
};
