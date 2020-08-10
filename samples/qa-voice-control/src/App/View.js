import {Panel} from '@enact/sandstone/Panels';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';


const View = ({view: ComponentView}) => {
	return (
		<Panel style={{padding: 0}}>
			<Layout orientation="vertical">
				<Cell>
					<ComponentView />
				</Cell>
			</Layout>
		</Panel>
	);
};

View.propTypes = {
	title: PropTypes.string,
	view: PropTypes.func
};

export default View;
