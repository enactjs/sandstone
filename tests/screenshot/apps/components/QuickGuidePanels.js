import QuickGuidePanels, {Panel} from '../../../../QuickGuidePanels';

const defaultQuickGuidePanelsTests = [
    <QuickGuidePanels>
        <Panel>View 1</Panel>
        <Panel>View 2</Panel>
        <Panel>View 3</Panel>
    </QuickGuidePanels>,
    <QuickGuidePanels index={1}>
        <Panel>View 1</Panel>
        <Panel>View 2</Panel>
        <Panel>View 3</Panel>
    </QuickGuidePanels>
];

export default defaultQuickGuidePanelsTests;
