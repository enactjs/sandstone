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
import ViewManager, {SlideLeftArranger} from '@enact/ui/ViewManager';

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

	render: ({buttons, children, footer, reverseTransition, subtitle, title, ...rest}) => {
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
						{/* skip creating ViewManager when there aren't children to avoid animating
						    the first view into the viewport */}
						{children ? (
							<ViewManager
								arranger={SlideLeftArranger}
								duration={400}
								reverseTransition={reverseTransition}
							>
								{children}
							</ViewManager>
						) : null}
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

// single-index ViewManagers need some help knowing when the transition direction needs to change
// because the index is always 0 from its perspective.
function useReverseTransition (index = -1) {
	const [prevIndex, setPrevIndex] = React.useState(-1);
	let [reverse, setReverse] = React.useState(false);

	if (prevIndex !== index) {
		reverse = index < prevIndex;
		setReverse(reverse);
		setPrevIndex(index);
	}

	return reverse;
}

const WizardLayoutDecorator = (Wrapped) => ({children, index = 0, ...rest}) => {
	const [view, setView] = React.useState(null);
	const reverseTransition = useReverseTransition(index);

	return (
		<WizardLayoutContext.Provider value={setView}>
			{React.Children.toArray(children)[index]}
			<Wrapped {...rest} {...view} reverseTransition={reverseTransition}>
				{view && view.children ? (
					<div className="enact-fit" key={'view'+index}>
						{view.children}
					</div>
				) : null}
			</Wrapped>
		</WizardLayoutContext.Provider>
	);
};

const WizardLayout = WizardLayoutDecorator(WizardLayoutBase);

function ViewBase ({buttons, children, footer, subtitle, title}) {
	const set = React.useContext(WizardLayoutContext);

	React.useEffect(() => {
		set({buttons, children, footer, subtitle, title});
	}, []);

	return null;
}

const View = Slottable(
	{slots: ['buttons', 'subtitle', 'title']},
	ViewBase
);

WizardLayout.View = View;

export default WizardLayout;
export {WizardLayout, WizardLayoutBase, View};
