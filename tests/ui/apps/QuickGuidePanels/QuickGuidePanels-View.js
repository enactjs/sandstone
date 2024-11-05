import BodyText from '../../../../BodyText/BodyText';
import QuickGuidePanels from '../../../../QuickGuidePanels';
import ThemeDecorator from '../../../../ThemeDecorator/ThemeDecorator';
import spotlight from '@enact/spotlight';

import UrlPropsDecorator from '../../components/UrlPropsDecorator';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => (
	<QuickGuidePanels
		id="quickguidepanels"
		{...props}
	>
		<QuickGuidePanels.Panel subtitle="A subtitle for View 1" title="QuickGuidePanels View 1">
			<div id="view1" />
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel subtitle="A subtitle for View 2" title="QuickGuidePanels View 2">
			<div id="view2" />
			<BodyText>A simple view</BodyText>
		</QuickGuidePanels.Panel>
		<QuickGuidePanels.Panel subtitle="A subtitle for View 3" title="QuickGuidePanels View 3">
			<div id="view3" />
			<BodyText>Several buttons!</BodyText>
		</QuickGuidePanels.Panel>
	</QuickGuidePanels>
);

export default UrlPropsDecorator(ThemeDecorator(app));
