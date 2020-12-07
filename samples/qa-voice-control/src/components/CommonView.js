import {Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';


const CommonViewBase = kind({
	name: 'CommonViewBase',

	propTypes: {
		noHeader: PropTypes.bool,
		noScroller: PropTypes.bool,
		scrollerDirection: PropTypes.string,
		subtitle: PropTypes.string,
		title: PropTypes.string
	},

	render: ({children, noHeader, noScroller, scrollerDirection, subtitle, title}) => (
		<Fragment>
			{!noHeader ?
				<Header title={title} subtitle={subtitle} /> : null
			}
			{!noScroller ?
				<Scroller
					direction={scrollerDirection}
				>
					{children}
				</Scroller> :
				children
			}
		</Fragment>
	)
});

CommonViewBase.defaultProps = {
	scrollerDirection: 'vertical',
	subtitle: '',
	title: ''
};

export default CommonViewBase;
