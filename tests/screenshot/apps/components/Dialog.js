import Dialog from '../../../../Dialog';
import React from 'react';

const DialogTests = [
	// showCloseButton = false(default)
	// [GT-23453] in Light Skin only
	// Test GT-25406 - need test below as comparison - see jira for details
	// <Dialog open title="Hello Dialog" titleBelow="This is a simple organized dialog" />,
	// showCloseButton = true
	// Test GT-25406 - need test above as comparison - see jira for details
	<Dialog open showCloseButton title="Hello Dialog" titleBelow="This is an organized dialog showing CloseButton" />,
	// [GT-24996] Step 4 - no Divider
	<Dialog open showCloseButton title="Hello Dialog" titleBelow="This is an organized dialog without a Divider" noDivider />,
	// noDivider: false (default) [GT-24996] Step 5
	<Dialog open showCloseButton title="hEllo dIalog" titleBelow="This is an organized dialog with uppercase in title" />,
	// 'large text' = true - showCloseButton = true
	// There should be no change with Large text in Dialog. Dialog is unaffected by textSize.
	// Only buttons size will change with Large text.
	{
		textSize: 'large',
		component: <Dialog open showCloseButton title="Hello Dialog" titleBelow="Dialog text does not change size with Large text" />
	},
	// 'titleBelow' String Does NOT Display When Title Knob Is Blank - [GT-25010]
	// Title here is set to empty quotes but it is not the same as 'null' or 'undefined'.
	// However, it tests the same code.
	<Dialog open title="" titleBelow="This is an organized dialog with empty title" />,
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	// showCloseButton = false(default)
	// [GT-23453] in Light Skin only
	// Test GT-25406 - need test below as comparison - see jira for details
	{
		locale: 'ar-SA',
		component: <Dialog open title="Hello Dialog" titleBelow="This is a simple organized dialog" />
	},
	// showCloseButton = true
	// Test GT-25406 - need test above as comparison - see jira for details
	{
		locale: 'ar-SA',
		component: <Dialog open showCloseButton title="Hello Dialog" titleBelow="This is an organized dialog showing CloseButton" />
	},
	// RTL for [GT-24996] Step 4
	{
		locale: 'ar-SA',
		component: <Dialog open showCloseButton title="Hello Dialog" titleBelow="This is an organized dialog without a Divider" noDivider />
	},
	{
		locale: 'ar-SA',
		component: <Dialog open showCloseButton title="hEllo dIalog" titleBelow="This is an organized dialog with Upper case in title" />
	},
	// 'large text' = true - showCloseButton = true
	// There should be no change with Large text in Dialog. Dialog is unaffected by textSize.
	// Only buttons would change with Large text.
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <Dialog open showCloseButton title="Hello Dialog" titleBelow="Dialog text does not change size with Large text" />
	},
	// 'titleBelow' String Does NOT Display When Title Knob Is Blank - [GT-25010]
	// Title here is set to empty quotes but it is not the same as 'null' or 'undefined'.
	// However, it tests the same code.
	{
		locale: 'ar-SA',
		component: <Dialog open title="" titleBelow="This is an organized dialog with empty title" />
	},
	{
		locale: 'ur-PK',
		component: <Dialog open title="Hello Dialog" titleBelow="This is an organized dialog" />
	},
	// showCloseButton = false(default)  [GT-21538]
	{
		locale: 'ur-PK',
		component: <Dialog open showCloseButton title="Hello Dialog" titleBelow="This is an organized dialog" />
	}
];
export default DialogTests;
