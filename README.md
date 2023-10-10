# @enact/sandstone [![npm (scoped)](https://img.shields.io/npm/v/@enact/sandstone.svg?style=flat-square)](https://www.npmjs.com/package/@enact/sandstone)

> The set of components for an Enact-based application targeting smart TVs.

![image](https://github.com/enactjs/sandstone/assets/4288375/169e675e-7e82-41d2-a83e-94a83f2b8f8d)

## Usage

```
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import React from 'react';

const MyApp = kind({
	name: 'MyApp',
	render: () => (<Button>Hello, Enact!</Button>)
});

const MySandstoneApp = ThemeDecorator(MyApp);

export default MySandstoneApp;
```

> Note: The `@enact/sandstone/ThemeDecorator` must be applied to the base component. This decorator also applies
`@enact/i18n/I18nDecorator`, `@enact/spotlight` and `@enact/ui/resolution` decorators.

## Install

```
npm install --save @enact/sandstone
```

## Test

Unit tests are implemented in Testing Library and are run with Jest. To execute them:

```
npm test
```

## Links
* [Sandstone API Docs](https://enactjs.com/docs/modules/sandstone/ActionGuide/)
* [Sandstone Component Sampler](https://enactjs.com/sampler)

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and documentation files in this repository are:

Copyright (c) 2012-2023 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content, including all source code files and documentation files in this repository are: Licensed under the Apache License, Version 2.0 (the "License"); you may not use this content except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
