import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';
import FormCheckboxItem from '../../../../FormCheckboxItem';
import Icon from '../../../../Icon';
import ThemeDecorator from '../../../../ThemeDecorator';
import Scroller from '../../../../Scroller';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const icon = <Icon>arrowup</Icon>;

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(1800)}}>
			<FormCheckboxItem
				id="formCheckboxItem1"
			>
				FormCheckbox Item
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem2"
				defaultSelected
			>
				FormCheckbox Item selected
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem3"
				indeterminate
			>
				FormCheckbox Item indeterminate
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem4"
				slotBefore={icon}
				defaultSelected
			>
				FormCheckbox Item slotBefore
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem5"
				defaultSelected
				inline
			>
				FormCheckbox Item inline
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem6"
				slotBefore={icon}
				defaultSelected
				inline
			>
				FormCheckbox Item inline slotBefore
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem7"
				defaultSelected
				label="Label Below"
				labelPosition="below"
			>
				FormCheckbox Item label below
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem8"
				defaultSelected
				label="Label Above"
				labelPosition="above"
			>
				FormCheckbox Item label above
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem9"
				defaultSelected
				label="Label Before"
				labelPosition="before"
			>
				FormCheckbox Item label before
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem10"
				defaultSelected
				label="Label After"
				labelPosition="after"
			>
				FormCheckbox Item label after
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem11"
				defaultSelected
				disabled
			>
				FormCheckbox Item disabled
			</FormCheckboxItem>
			<FormCheckboxItem
				id="formCheckboxItem12"
				defaultSelected
				inline
				disabled
			>
				FormCheckbox Item inline disabled
			</FormCheckboxItem>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
