import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';
import React from 'react';

const CheckboxItemTests = [
	<CheckboxItem />,
	<CheckboxItem>CheckboxItem</CheckboxItem>, 					// not selected
	<CheckboxItem disabled>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem inline>CheckboxItem</CheckboxItem>,		// not selected
	<CheckboxItem disabled inline>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem defaultSelected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem defaultSelected disabled>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem defaultSelected inline>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>,
	// itemIcon
	<CheckboxItem itemIcon={<Icon>bulletlist</Icon>}>CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'before'
	<CheckboxItem itemIcon={<Icon>denselist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'beforeChildren'
	<CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'after'
	<CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + inline = true
	<CheckboxItem itemIcon={<Icon>drawer</Icon>} inline>CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'before' + inline = true
	<CheckboxItem itemIcon={<Icon>playlist</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'beforeChildren' + inline = true
	<CheckboxItem itemIcon={<Icon>denselist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>,
	// iconPosition = before (Default) + itemIcon + itemIconPosition = 'after' + inline = true
	<CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>,
	// iconPosition = 'after'
	<CheckboxItem iconPosition="after">CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" disabled>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" inline>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" disabled inline>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" defaultSelected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem iconPosition="after" defaultSelected disabled>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem iconPosition="after" defaultSelected inline>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem iconPosition="after" defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>,
	// itemPosition = 'after' + itemIcon
	<CheckboxItem iconPosition="after" itemIcon={<Icon>denselist</Icon>}>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>drawer</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>playlist</Icon>} inline>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>denselist</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>,
	<CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>,
	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <CheckboxItem>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem defaultSelected>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem defaultSelected disabled>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem defaultSelected inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>}>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>denselist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>list</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>drawer</Icon>} inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>playlist</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>denselist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" disabled>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" disabled inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" defaultSelected>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" defaultSelected disabled>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" defaultSelected inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" defaultSelected disabled inline>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>denselist</Icon>}>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="before">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="beforeChildren">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>drawer</Icon>} itemIconPosition="after">CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>playlist</Icon>} inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem itemIcon={<Icon>denselist</Icon>} itemIconPosition="before" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>bulletlist</Icon>} itemIconPosition="beforeChildren" inline>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem iconPosition="after" itemIcon={<Icon>list</Icon>} itemIconPosition="after" inline>CheckboxItem</CheckboxItem>
	}
];
export default CheckboxItemTests;
