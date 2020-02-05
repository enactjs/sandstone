import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Button
			id="button1"
		>
			Default Button
		</Button>
		<Button
			id="button2"
			disabled
		>
			Button disabled
		</Button>
		<Button
			id="button3"
			backgroundOpacity="transparent"
		>
			Transparent Button
		</Button>
		<Button
			id="button4"
			icon="check"
		>
			Button icon check
		</Button>
		<Button
			id="button5"
			icon="check"
			iconPosition="after"
		>
			Button icon position after
		</Button>
		<Button
			id="button6"
			minWidth={false}
		>
			Button minWidth false
		</Button>
		<Button
			id="button7"
			size="small"
		>
			Button size small
		</Button>
		<Button
			id="button8"
			icon="home"
		/>
	</div>
</div>;

export default ThemeDecorator(app);
