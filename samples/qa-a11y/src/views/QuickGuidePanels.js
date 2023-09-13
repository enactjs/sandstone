/* eslint-disable react/jsx-no-bind */

import QuickGuidePanels from '@enact/sandstone/QuickGuidePanels';
import {Header} from '@enact/sandstone/Panels';

const QuickGuidePanelsView = () => (
    <>
        <Header title="QuickGuidePanels" />
        <QuickGuidePanels>
            <QuickGuidePanels.Panel aria-label={'Panel 0'} >
                <div style={{marginTop: 150}}>
                    This is Panel 0
                </div>
            </QuickGuidePanels.Panel>
            <QuickGuidePanels.Panel aria-label={'Panel 1'} >
                <div style={{marginTop: 150}}>
                    This is Panel 1
                </div>
            </QuickGuidePanels.Panel>
            <QuickGuidePanels.Panel >
                <div style={{marginTop: 150}}>
                    This is Panel 2
                </div>
            </QuickGuidePanels.Panel>
        </QuickGuidePanels>
    </>
);

export default QuickGuidePanelsView;
