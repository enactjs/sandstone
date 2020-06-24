import {Button} from '../../../../../Button/Button';
import {Row, Column, Cell} from '@enact/ui/Layout';
import ThemeDecorator from '../../../../../ThemeDecorator/ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '../../../../../Panels';
import Scroller from '../../../../../Scroller/Scroller';

const fullHeightStyle = {
	height: '100%'
};

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const Page = ({children, ...rest}) => (
	<div style={fullHeightStyle} {...rest}>
		<Row align="center" style={fullHeightStyle}>
			<Cell>
				<Column align="center" style={fullHeightStyle}>
					<Cell shrink>{children}</Cell>
				</Column>
			</Cell>
		</Row>
	</div>
);

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			hideScrollbar: false,
			keyDownEvents: 0,
			wrap: false
		};
	}

	render () {
		return (
			<Panel className="enact-fit" {...this.props}>
				<Header title="Header" />
				<Scroller>
					<Page>
						<Button id="Page_1_Button">Page 1 Button</Button>
					</Page>
					<Page>
						<Button id="Page_2_Button">Page 2 Button</Button>
					</Page>
					<Page>
						<Button id="Page_3_Button">Page 3 Button</Button>
					</Page>
					<Page>
						<Button id="Page_4_Button">Page 4 Button</Button>
					</Page>
				</Scroller>
			</Panel>
		);
	}
}

export default ThemeDecorator(app);
