import React from 'react';
import {Header, Panel} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import css from './UseCaseSkin.module.less';

class ApplySkins extends React.Component {
	render () {
		return (
			<Panel>
				<Header type="compact" title="style" />
				<div className={css.top}>
					<Button data-hello css={css}>hello</Button>
					<Button css={css} icon={'star'} />
				</div>
			</Panel>
		);
	}
}

export default ApplySkins;
