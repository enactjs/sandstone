# Sandstone

Sandstone library is the set of React components for an Enact-based application targeting smart TVs.

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