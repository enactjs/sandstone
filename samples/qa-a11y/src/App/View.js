import {Header, Panel} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Layout, {Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

const View = ({debugProps = false, handleDebug, isAriaHidden = false, isDebugMode = false, isHeader = true, noCloseButton = false, title, view: ComponentView}) => {
	const
		header = isHeader ? <Header aria-hidden={isAriaHidden} noCloseButton={noCloseButton} title={title} type="compact" /> : null,
		props = debugProps ? {handleDebug, isDebugMode} : null;

	return (
		<Panel aria-owns="floatLayer" style={{padding: 0}}>
			{header}
			<Layout orientation="vertical">
				<Cell component={Scroller}>
					<ComponentView {...props} />
				</Cell>
			</Layout>
		</Panel>
	);
};

View.propTypes = {
	debugProps: PropTypes.bool,
	handleDebug: PropTypes.func,
	isAriaHidden: PropTypes.bool,
	isDebugMode: PropTypes.bool,
	isHeader: PropTypes.bool,
	noCloseButton: PropTypes.bool,
	title: PropTypes.string,
	view: PropTypes.func
};

export default View;
