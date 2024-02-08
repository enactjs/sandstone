/* eslint-disable react/jsx-no-bind */

import Scroller from '@enact/sandstone/Scroller';
import ToggleButton from '@enact/sandstone/SwitchItem';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useState} from 'react';

const ScrollerView = () => {
	const [native, setNative] = useState(true);
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const scrollMode = native ? 'native' : 'translate';

	const handleChangeJSNativeButton = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);

	return (
		<Layout orientation="vertical">
			<Cell shrink>
				<ToggleButton
					onClick={handleChangeAriaLabelButton}
					selected={customAriaLabel}
				>
					Customizable aria-labels on ScrollThumbs
				</ToggleButton>
				<ToggleButton
					onClick={handleChangeJSNativeButton}
					selected={native}
				>
					Native
				</ToggleButton>
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar="byEnter"
				scrollMode={scrollMode}
				verticalScrollThumbAriaLabel={customAriaLabel ? 'This is vertical scroll thumb' : null}
				horizontalScrollThumbAriaLabel={customAriaLabel ? 'This is horizontal scroll thumb' : null}
			>
				<div style={{width: ri.scaleToRem(6000)}}>
					Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />
					Foo<br />Bar<br />Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. <br />Foo<br />Bar<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />
					Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow<br />Foo<br />Bar<br />Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
					Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow.
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerView;
