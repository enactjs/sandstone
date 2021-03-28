import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Button from '@enact/sandstone/Button';
import Header from '@enact/sandstone/Heading';

import componentCss from './MainPanel.module.less';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		css: PropTypes.object
	},

	styles: {
		css: componentCss
	},

	render: ({css}) => (
		<div>
			<Header>Testing that Button text marquees at loading time</Header>
			<Button css={css} className={css.button}>Loooooooooooong text to test Marquee</Button>
		</div>
	)
});

export default MainPanel;
