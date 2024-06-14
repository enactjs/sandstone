import Checkbox from "../../../../Checkbox";
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
    <div style={{padding:'20px'}}>
        <Checkbox
            id='Checkbox1'
        ></Checkbox>
    </div>
    <div style={{padding:'20px'}}>
        <Checkbox
            id='Checkbox2'
            selected={true}
        ></Checkbox>
    </div>
    <div style={{padding:'20px'}}>
        <Checkbox
            id='Checkbox3'
            indeterminate={true}
        ></Checkbox>
    </div>
    <div style={{padding:'20px'}}>
        <Checkbox
            id='Checkbox4'
            disabled={true}
        ></Checkbox>
    </div>
</div>;

export default ThemeDecorator(app);
