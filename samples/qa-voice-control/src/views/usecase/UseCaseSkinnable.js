import Button from '@enact/sandstone/Button';
import {Header} from '@enact/sandstone/Panels';
import React from 'react';

import css from './UseCaseSkinnable.module.less';


class UseCaseSkinnable extends React.Component {
	render () {
		return (
			<>
				<Header type="compact" title="style" />
				<div className={css.top}>
					<Button data-hello css={css}>hello</Button>
					<Button css={css} icon="star" />
				</div>
			</>
		);
	}
}

export default UseCaseSkinnable;
