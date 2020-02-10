import EditableIntegerPicker from '../../../../EditableIntegerPicker';
import React from 'react';

// ***NOTE:***
// 'min' and 'max' are required for the image to be valid.
// 'value' is needed if we want to display a value different from 0.
//

const EditableIntegerPickerTests = [
	<EditableIntegerPicker min={0} max={5} />,
	<EditableIntegerPicker min={5} max={5} value={5} unit="cm" />,
	<EditableIntegerPicker min={-10} max={10} value={0} />,
	<EditableIntegerPicker min={0} max={100} />,
	<EditableIntegerPicker min={0} max={100} value={5} />,

	// Width: 'medium' is default
	<EditableIntegerPicker width="small" min={0} max={5} />,
	<EditableIntegerPicker width="large" min={5} max={5} unit="cm" />,
	<EditableIntegerPicker orientation="vertical" min={-10} max={10} value={0} />,
	<EditableIntegerPicker orientation="vertical" min={0} max={100} />,
	<EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} />,
	<EditableIntegerPicker orientation="vertical" width="small" min={0} max={5} value={5} />,
	<EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} />,
	{
		textSize: 'large',
		component: 	<EditableIntegerPicker width="large" min={5} max={5} unit="cm" />
	},
	{
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} />
	},
	{
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="small" min={0} max={100} value={5} />
	},
	{
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={100} value={5} />
	},

	// Disabled
	<EditableIntegerPicker min={0} max={5} disabled />,
	<EditableIntegerPicker min={5} max={5} unit="cm" disabled />,
	<EditableIntegerPicker min={-10} max={10} value={0} disabled />,
	<EditableIntegerPicker min={0} max={100} disabled />,
	<EditableIntegerPicker min={0} max={100} value={5} disabled />,
	<EditableIntegerPicker width="small" min={0} max={5} disabled />,
	<EditableIntegerPicker width="large" min={5} max={5} unit="cm" disabled />,
	{
		textSize: 'large',
		component: <EditableIntegerPicker width="small" min={0} max={100} value={5} disabled />
	},
	<EditableIntegerPicker orientation="vertical" min={-10} max={10} value={0} disabled />,
	<EditableIntegerPicker orientation="vertical" min={0} max={100} disabled />,
	<EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} disabled />,
	<EditableIntegerPicker orientation="vertical" width="small" min={0} max={5} value={5} disabled />,
	<EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} disabled />,
	{
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} disabled />
	},

	// Wrap
	<EditableIntegerPicker min={0} max={5} wrap />,
	<EditableIntegerPicker min={0} max={5} wrap disabled />,
	<EditableIntegerPicker min={0} max={5} width="small" wrap />,
	<EditableIntegerPicker min={0} max={5} width="large" wrap />,
	{
		textSize: 'large',
		component: <EditableIntegerPicker min={0} max={5} width="large" wrap />
	},
	<EditableIntegerPicker min={0} max={5} orientation="vertical" wrap />,
	<EditableIntegerPicker min={0} max={5} orientation="vertical" wrap disabled />,
	<EditableIntegerPicker min={0} max={5} orientation="vertical" width="small" wrap />,
	<EditableIntegerPicker min={0} max={5} orientation="vertical" width="large" wrap />,
	{
		textSize: 'large',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" width="large" wrap />
	},

	// Icon changed
	<EditableIntegerPicker incrementIcon="forward" min={0} max={10} />,

	// A 'value' is needed for the decrementIcon to show, else decrementIcon will not show.
	<EditableIntegerPicker decrementIcon="backward" min={0} max={10} value={5} />,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={5} max={5} value={5} unit="cm" />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={-10} max={10} value={0} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={100} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={100} value={5} />
	},

	// Width: 'medium' is default
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker width="small" min={0} max={5} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker width="large" min={5} max={5} unit="cm" />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={-10} max={10} value={0} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={0} max={100} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" width="small" min={0} max={5} value={5} />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} />},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: 	<EditableIntegerPicker width="large" min={5} max={5} unit="cm" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: 	<EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="small" min={0} max={100} value={5} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={100} value={5} />
	},

	// Disabled
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={5} max={5} unit="cm" disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={-10} max={10} value={0} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={100} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={100} value={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker width="small" min={0} max={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker width="large" min={5} max={5} unit="cm" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker width="small" min={0} max={100} value={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={-10} max={10} value={0} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={0} max={100} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" min={0} max={100} value={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" width="small" min={0} max={5} value={5} disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker orientation="vertical" width="large" min={0} max={5} value={5} disabled />
	},

	// Wrap
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} wrap />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} wrap disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} width="small" wrap  />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} width="large" wrap  />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker min={0} max={5} width="large" wrap />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" wrap />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" wrap disabled />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" width="small" wrap />
	},
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" width="large" wrap />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <EditableIntegerPicker min={0} max={5} orientation="vertical" width="large" wrap />
	},

	// Icon changed
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker incrementIcon="forward" min={0} max={10} />
	},
	// A 'value' is needed for the decrementIcon to show, else decrementIcon will not show.
	{
		locale: 'ar-SA',
		component: <EditableIntegerPicker decrementIcon="backward" min={0} max={10} value={5} />
	}
];
export default EditableIntegerPickerTests;
