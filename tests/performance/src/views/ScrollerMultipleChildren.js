import PropTypes from 'prop-types';
import React from 'react';
import MultipleComponents from '../components/MultipleComponents';
import SandstoneScroller from '@enact/sandstone/Scroller';
import UiScrollerJS, {ScrollerNative as UiScrollerNative} from '@enact/ui/Scroller';
import qs from 'qs';

const types = {
	SandstoneScroller,
	UiScrollerJS,
	UiScrollerNative
};

const ScrollerMultipleChildren = ({location}) => {
	const search = qs.parse(location.search, {ignoreQueryPrefix: true});
	const type = search.type;
	const Scroller = types[type] || SandstoneScroller;

	return (
		<Scroller id="Scroller" animate>
			<MultipleComponents location={location} />
		</Scroller>
	);
};

ScrollerMultipleChildren.propTypes = {
	location: PropTypes.object
};

export default ScrollerMultipleChildren;
export {
	types
};
