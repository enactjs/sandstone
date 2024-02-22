/* eslint-disable react/jsx-no-bind */

import Scroller from '@enact/sandstone/Scroller';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import ToggleButton from '@enact/sandstone/SwitchItem';
import Layout, {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {Fragment, useState} from 'react';

import css from './Scroller.module.less';

const ScrollerView = () => {
	const [spottable, setSpottable] = useState(false);
	const [customAriaLabel, setCustomAriaLabel] = useState(false);
	const [native, setNative] = useState(true);
	const scrollMode = native ? 'native' : 'translate';

	const handleChangeJSNativeButton = () => setNative(!native);
	const handleChangeAriaLabelButton = () => setCustomAriaLabel(!customAriaLabel);
	const handleChangeSpottableButton = () => setSpottable(!spottable);

	const bodyText = [
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>,
		<>Foo<br />Bar<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br />Boom boom pow<br /></>,
		<>Foo<br />Bar<br /></>,
		<>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br /></>
	];

	const Container = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
	const SpottableDiv = Spottable('div');

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
				<ToggleButton
					onClick={handleChangeSpottableButton}
					selected={spottable}
				>
					Scroller with Spottable
				</ToggleButton>
			</Cell>
			<Cell
				component={Scroller}
				focusableScrollbar={spottable ? false : "byEnter"}
				scrollMode={scrollMode}
				verticalScrollThumbAriaLabel={customAriaLabel ? 'This is vertical scroll thumb' : null}
				horizontalScrollThumbAriaLabel={customAriaLabel ? 'This is horizontal scroll thumb' : null}
			>
				<div style={spottable ? null : {width: ri.scaleToRem(6000)}}>
					{spottable ?
						<Container>
							{bodyText.map((x, i) => <SpottableDiv className={css.focusableBodyText} key={i}>{x}</SpottableDiv>)}
						</Container> :
						bodyText.map((x, i) => <Fragment key={i}>{x}</Fragment>)
					}
				</div>
			</Cell>
		</Layout>
	);
};

export default ScrollerView;
