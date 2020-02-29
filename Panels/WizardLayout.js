import {forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import React from 'react';

import SharedStateDecorator from '../internal/SharedStateDecorator';
import Steps from '../Steps';

import Header from './Header';
import Panel from './Panel';
import {PanelTypeContext} from './Viewport';

import css from './Panel.module.less';
import {Column, Cell} from '@enact/ui/Layout/Layout';

const WizardLayoutContext = React.createContext(null);

/**
 * @example
 * 			<WizardLayout>
 *				<WizardLayout.View title="a" subtitle="b">
 *					<buttons>
 *						<Button>OK</Button>
 *						<Button>Cancel</Button>
 *					</buttons>
 *					<Scroller>
 *						lorem ipsum ...
 *					</Scroller>
 *				</WizardLayout.View>
 *			</WizardLayout>
 */
const WizardLayoutBase = kind({
	name: 'WizardLayout',

	contextType: PanelTypeContext,

	propTypes: {
		title: PropTypes.string,
		subtitle: PropTypes.string,
		children: PropTypes.node,
		buttons: PropTypes.node,
		footer: PropTypes.string
	},

	styles: {
		css,
		className: 'panel'
	},

	handlers: {
	},

	computed: {
	},

	render: ({buttons, children, footer, subtitle, title, ...rest}) => {
		delete rest.autoFocus;
		delete rest.hideChildren;

		return (
			<Panel {...rest}>
				<Header title={title} subtitle={subtitle}>
					<Steps slot="slotAbove" total={5} />
				</Header>
				<Column>
					<Cell>
						{/* This should probably use portals */}
						{children}
					</Cell>
					<Cell shrink>
						{/* This should probably use portals */}
						{buttons}
					</Cell>
					<Cell shrink>
						{footer}
					</Cell>
				</Column>
			</Panel>
		);
	}
});

const WizardLayoutDecorator = (Wrapped) => ({children, index = 0, ...rest}) => {
	const [state, setState] = React.useState(null);

	return (
		<WizardLayoutContext.Provider value={setState}>
			{React.Children.toArray(children)[index]}
			<Wrapped {...rest} {...state} />
		</WizardLayoutContext.Provider>
	);
};

const WizardLayout = WizardLayoutDecorator(Slottable({slots: ['buttons', 'subtitle', 'title']}, WizardLayoutBase));

function View ({buttons, children, footer, subtitle, title}) {
	const set = React.useContext(WizardLayoutContext);

	React.useEffect(() => {
		set({buttons, children, footer, subtitle, title});
	}, []);

	return null;
}

WizardLayout.View = View;

export default WizardLayout;
export {WizardLayout, WizardLayoutBase, View};
