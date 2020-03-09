/**
 * Panels provides a way to manage different screens of an app.
 *
 * @module sandstone/Panels
 * @exports ActivityPanels
 * @exports AlwaysViewingPanels
 * @exports Breadcrumb
 * @exports Header
 * @exports Panel
 * @exports Panels
 * @exports PanelsBase
 * @exports Routable
 * @exports Route
 */

import Routable, {Route} from '@enact/ui/Routable';

import ActivityPanels from './ActivityPanels';
import AlwaysViewingPanels from './AlwaysViewingPanels';
import Breadcrumb from './Breadcrumb';
import Header, {HeaderBase} from './Header';
import OptionPanels from './OptionPanels';
import Panel from './Panel';
import Panels from './Panels';
import WizardPanel, {View, WizardPanelBase} from './WizardPanel';

export default Panels;
export {
	ActivityPanels,
	AlwaysViewingPanels,
	Breadcrumb,
	Header,
	HeaderBase,
	OptionPanels,
	Panel,
	Panels,
	Panels as PanelsBase,
	View,
	WizardPanel,
	WizardPanelBase,

	/**
	 * A higher-order component that provides support for mapping Routes as children of a component
	 * which are selected via `path` instead of the usual flat array.
	 *
	 * @see {@link ui/Routable.Routable}
	 * @hoc
	 * @name Routable
	 * @extends ui/Routable.Routable
	 * @memberof sandstone/Panels
	 * @public
	 */
	Routable,

	/**
	 * Used with {@link sandstone/Panels.Routable} to define the `path` segment and the
	 * `component` to render.
	 *
	 * @see {@link ui/Routable.Route}
	 * @ui
	 * @name Route
	 * @extends ui/Routable.Route
	 * @memberof sandstone/Panels
	 * @public
	 */
	Route
};
