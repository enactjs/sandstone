import LabeledIcon from '../../../../LabeledIcon';
import React from 'react';

const LabeledIconTests = [
	<LabeledIcon />,

	// When Children Has Tall Characters, Label is Not Truncated and Stays Centered with Icon - [GT-25517]
	<LabeledIcon icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIcon>,
	// endof [GT-25517]`

	<LabeledIcon labelPosition="above" icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIcon>,
	// When Children has long text, label Stays Centered to Icon - [GT-25518]
	<LabeledIcon labelPosition="below" icon="fullscreen">Hello LabeledItem</LabeledIcon>,
	<LabeledIcon labelPosition="below" icon="fullscreen">-Lorem</LabeledIcon>,

	// labeled position - 'below' is default
	// LTR locations of all labelPositions and Label is aligned with Icon - [GT-25514]
	<LabeledIcon labelPosition="above" icon="fullscreen">Hello LabeledItem</LabeledIcon>,
	<LabeledIcon labelPosition="after" icon="fullscreen">Hello LabeledItem</LabeledIcon>,  // (= 'right')
	<LabeledIcon labelPosition="right" icon="fullscreen">Hello LabeledItem</LabeledIcon>, // (= 'after')
	<LabeledIcon labelPosition="before" icon="fullscreen">Hello LabeledItem</LabeledIcon>, // (= 'left')
	<LabeledIcon labelPosition="left" icon="fullscreen">Hello LabeledItem</LabeledIcon>, // (= 'before')
	// end of [GT-25514]

	// labeled position - 'inline' - 'below' is default
	<LabeledIcon labelPosition="above" inline icon="fullscreen">-Lorem</LabeledIcon>,
	<LabeledIcon labelPosition="after" inline icon="fullscreen">-Lorem</LabeledIcon>,  // (= 'right')
	<LabeledIcon labelPosition="right" inline icon="fullscreen">-Lorem</LabeledIcon>, // (= 'after')
	<LabeledIcon labelPosition="before" inline icon="fullscreen">-Lorem</LabeledIcon>, // (= 'left')
	<LabeledIcon labelPosition="left" inline icon="fullscreen">-Lorem</LabeledIcon>, // (= 'before')

	<LabeledIcon flip="vertical" icon="question">Hello LabeledItem</LabeledIcon>,
	<LabeledIcon flip="horizontal" icon="question">Hello LabeledItem</LabeledIcon>,
	<LabeledIcon flip="both" icon="question">Hello LabeledItem</LabeledIcon>,
	<LabeledIcon flip="both" size="small" icon="question">Hello LabeledItem</LabeledIcon>,

	// Change 'size' to 'large' increases the Icon size but Label stays Same Size Centered with Icon - [GT-25516]
	// Size 'large' is the default and does not need to be specified
	<LabeledIcon size="small" icon="question">Hello LabeledItem</LabeledIcon>,

	// When Disabled is Checked, Label, Button, and Icon are Grayed out - [GT-25522]
	<LabeledIcon disabled icon="fullscreen">Hello LabeledItem</LabeledIcon>,

	<LabeledIcon disabled size="small" icon="fullscreen">Hello LabeledItem</LabeledIcon>,

	// inline
	<LabeledIcon inline icon="fullscreen">-Lorem</LabeledIcon>,
	<LabeledIcon inline size="small" icon="fullscreen">-Lorem</LabeledIcon>,
	<LabeledIcon inline disabled icon="fullscreen">-Lorem</LabeledIcon>,
	<LabeledIcon inline disabled size="small" icon="fullscreen">-Lorem</LabeledIcon>,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <LabeledIcon />
	},
	// When Children Has Tall Characters, Label is Not Truncated and Stays Centered with Icon - [GT-25517]
	{
		locale: 'ar-SA',
		component: <LabeledIcon icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIcon>
	},
	// endof [GT-25517]`

	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="above" icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIcon>
	},
	// When Children has long text, label Stays Centered to Icon - [GT-25518]
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="below" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="below" icon="fullscreen">-Lorem</LabeledIcon>
	},

	// labeled position - 'below' is default
	// RTL locations of all labelPositions and Label is aligned with Icon - [GT-25514]
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="above" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="after" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	},  // (= 'left')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="left" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	}, // (= 'after')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="before" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	}, // (= 'right')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="right" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	}, // (= 'before')
	// end of [GT-25514]

	// labeled position - 'inline' - 'below' is default
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="above" inline icon="fullscreen">-Lorem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="after" inline icon="fullscreen">-Lorem</LabeledIcon>
	},  // (= 'left')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="left" inline icon="fullscreen">-Lorem</LabeledIcon>
	}, // (= 'after')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="before" inline icon="fullscreen">-Lorem</LabeledIcon>
	}, // (= 'right')
	{
		locale: 'ar-SA',
		component: <LabeledIcon labelPosition="right" inline icon="fullscreen">-Lorem</LabeledIcon>
	}, // (= 'before')

	{
		locale: 'ar-SA',
		component: <LabeledIcon flip="vertical" icon="question">Hello LabeledItem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon flip="horizontal" icon="question">Hello LabeledItem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon flip="both" icon="question">Hello LabeledItem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon flip="both" size="small" icon="question">Hello LabeledItem</LabeledIcon>
	},

	// Change 'size' to 'large' increases the Icon size but Label stays Same Size Centered with Icon - [GT-25516]
	// Size 'large' is the default and does not need to be specified
	{
		locale: 'ar-SA',
		component: <LabeledIcon size="small" icon="question">Hello LabeledItem</LabeledIcon>
	},

	// When Disabled is Checked, Label, Button, and Icon are Grayed out - [GT-25522]
	{
		locale: 'ar-SA',
		component: <LabeledIcon disabled icon="fullscreen">Hello LabeledItem</LabeledIcon>
	},

	{
		locale: 'ar-SA',
		component: <LabeledIcon disabled size="small" icon="fullscreen">Hello LabeledItem</LabeledIcon>
	},

	// inline
	{
		locale: 'ar-SA',
		component: <LabeledIcon inline icon="fullscreen">-Lorem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon inline size="small" icon="fullscreen">-Lorem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon inline disabled icon="fullscreen">-Lorem</LabeledIcon>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIcon inline disabled size="small" icon="fullscreen">-Lorem</LabeledIcon>
	}

];
export default LabeledIconTests;
