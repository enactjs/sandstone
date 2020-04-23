import PropTypes from 'prop-types';
import React from 'react';
import kind from '@enact/core/kind';
import UiVirtualListJS, {VirtualListNative as UiVirtualListNative} from '@enact/ui/VirtualList';
import SandstoneVirtualList from '@enact/sandstone/VirtualList';
import qs from 'qs';
import DelayedRender from '../components/DelayedRender';

const items = [];

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	return (
		<div {...rest}>
			{items[index]}
		</div>
	);
};

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

const itemSize = 60;

const types = {
	SandstoneVirtualList,
	UiVirtualListJS,
	UiVirtualListNative
};

const VirtualListClientSizeView = kind({
	name: 'VirtualListClientSizeView',

	propTypes: {
		location: PropTypes.object
	},

	render: ({location}) => {
		const search = qs.parse(location.search, {ignoreQueryPrefix: true});
		const clientSize = search.clientSize ? {clientWidth: 1280, clientHeight: 720} : null;
		const VirtualList = types[search.type] || SandstoneVirtualList;

		return (
			<div style={{width: '1280px', height: '720px'}}>
				<DelayedRender>
					<VirtualList
						id="virtualList"
						clientSize={clientSize}
						dataSize={items.length}
						itemRenderer={renderItem}
						itemSize={itemSize}
					/>
				</DelayedRender>
			</div>
		);
	}
});

export default VirtualListClientSizeView;
