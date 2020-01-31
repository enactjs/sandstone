import kind from '@enact/core/kind';
import {Row, Cell} from '@enact/ui/Layout';
import React from 'react';

import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';

import css from './MainPanel.module.less';



const Section = kind({
	name: 'MainPanel',

	styles: {
		css,
		className: 'section'
	},

	render: ({children, title, ...rest}) => (
		<Cell size={1500} {...rest}>
			<Heading showLine>{title}</Heading>
			{React.Children.map(children, child => (
				<Row className={css.componentDemo} align="center">
					<Cell component="label" size="30%">{child.props.alt}</Cell>
					<Cell>{child}</Cell>
				</Row>
			))}
		</Cell>
	)
});

const MainPanel = kind({
	name: 'MainPanel',

	styles: {
		css,
		className: 'mainPanel'
	},

	render: (props) => (
		<Panel {...props}>
			<Header title="Button Kitchen Sink" />
			<Scroller>
				<Row style={{flexWrap: 'wrap'}}>
					<Section title="Small Buttons" size="50%">
						<Button size="small" alt="Normal">Button</Button>
						<Button size="small" alt="Selected" selected>Button</Button>
						<Button size="small" alt="Disabled" disabled>Button</Button>
						<Button size="small" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="small" alt="With Icon" icon="home">Button</Button>
						<Button size="small" alt="With Icon after" type="round" icon="home" iconPosition="after">Button</Button>
					</Section>

					<Section title="&quot;Round&quot; Small Buttons - no effect" size="50%">
						<Button size="small" type="round" alt="Normal">Button</Button>
						<Button size="small" type="round" alt="Selected" selected>Button</Button>
						<Button size="small" type="round" alt="Disabled" disabled>Button</Button>
						<Button size="small" type="round" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="small" type="round" alt="With Icon" icon="home">Button</Button>
						<Button size="small" type="round" alt="With Icon after" icon="home" iconPosition="after">Button</Button>
					</Section>

					<Section title="Large Buttons" size="50%">
						<Button size="large" alt="Normal">Button</Button>
						<Button size="large" alt="Selected" selected>Button</Button>
						<Button size="large" alt="Disabled" disabled>Button</Button>
						<Button size="large" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="large" alt="With Icon" icon="home">Button</Button>
						<Button size="large" alt="With Icon after" type="round" icon="home" iconPosition="after">Button</Button>
					</Section>

					<Section title="&quot;Round&quot; Large Buttons - no effect" size="50%">
						<Button size="large" type="round" alt="Normal">Button</Button>
						<Button size="large" type="round" alt="Selected" selected>Button</Button>
						<Button size="large" type="round" alt="Disabled" disabled>Button</Button>
						<Button size="large" type="round" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button size="large" type="round" alt="With Icon" icon="home">Button</Button>
						<Button size="large" type="round" alt="With Icon after" icon="home" iconPosition="after">Button after</Button>
					</Section>

					<Section title="&quot;Grid&quot; Small Icon Button" size="25%">
						<Button size="small" icon="play" alt="Normal" />
						<Button size="small" icon="play" alt="Selected" selected />
						<Button size="small" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="&quot;Grid&quot; Large Icon Button" size="25%">
						<Button size="large" icon="play" alt="Normal" />
						<Button size="large" icon="play" alt="Selected" selected />
						<Button size="large" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="&quot;Round&quot; Small Icon Button" size="25%">
						<Button type="round" size="small" icon="play" alt="Normal" />
						<Button type="round" size="small" icon="play" alt="Selected" selected />
						<Button type="round" size="small" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="&quot;Round&quot; Large Icon Button" size="25%">
						<Button type="round" size="large" icon="play" alt="Normal" />
						<Button type="round" size="large" icon="play" alt="Selected" selected />
						<Button type="round" size="large" icon="play" alt="Disabled" disabled />
					</Section>

					<Section title="Small Transparent Buttons" size="50%">
						<Button backgroundOpacity="transparent" size="small" alt="Normal">Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Selected" selected>Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Disabled" disabled>Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="With Icon" icon="home">Button</Button>
						<Button backgroundOpacity="transparent" size="small" alt="With Icon after" type="round" icon="home" iconPosition="after">Button</Button>
					</Section>

					<Section title="Large Transparent Buttons" size="50%">
						<Button backgroundOpacity="transparent" size="large" alt="Normal">Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Selected" selected>Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Disabled" disabled>Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="Long Text">Super-duper long text string inside a button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="With Icon" icon="home">Button</Button>
						<Button backgroundOpacity="transparent" size="large" alt="With Icon after" type="round" icon="home" iconPosition="after">Button</Button>
					</Section>
				</Row>
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
