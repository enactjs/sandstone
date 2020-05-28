import LabeledIconButton from '../../../../LabeledIconButton';
import React from 'react';

const LabeledIconButtonTests = [
	<LabeledIconButton />,
	<LabeledIconButton icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIconButton>,

	<LabeledIconButton labelPosition="above" icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIconButton>,
	<LabeledIconButton labelPosition="below" icon="fullscreen">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton labelPosition="below" icon="fullscreen">-Lorem</LabeledIconButton>,

	// When Label Text is blank, Space Below Button is Blank - [GT-25531]
	<LabeledIconButton icon="fullscreen" />,


	// labeled position - 'below' is default
	// LTR locations of all labelPosition and Label is aligned with Button and Icon - [GT-25533]
	<LabeledIconButton labelPosition="above" icon="fullscreen">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton labelPosition="after" icon="fullscreen">Hello LabeledItem</LabeledIconButton>,  // (= 'right')
	<LabeledIconButton labelPosition="right" icon="fullscreen">Hello LabeledItem</LabeledIconButton>, // (= 'after')
	<LabeledIconButton labelPosition="before" icon="fullscreen">Hello LabeledItem</LabeledIconButton>, // (= 'left')
	<LabeledIconButton labelPosition="left" icon="fullscreen">Hello LabeledItem</LabeledIconButton>, // (= 'before')
	// end of [GT-GT-25533]

	// labeled position - 'inline' - 'below' is default
	<LabeledIconButton labelPosition="above" inline icon="fullscreen">-Lorem</LabeledIconButton>,
	<LabeledIconButton labelPosition="after" inline icon="fullscreen">-Lorem</LabeledIconButton>,  // (= 'right')
	<LabeledIconButton labelPosition="right" inline icon="fullscreen">-Lorem</LabeledIconButton>, // (= 'after')
	<LabeledIconButton labelPosition="before" inline icon="fullscreen">-Lorem</LabeledIconButton>, // (= 'left')
	<LabeledIconButton labelPosition="left" inline icon="fullscreen">-Lorem</LabeledIconButton>, // (= 'before')

	<LabeledIconButton flip="vertical" icon="question">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton flip="horizontal" icon="question">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton flip="both" icon="question">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton flip="both" size="small" icon="question">Hello LabeledItem</LabeledIconButton>,

	<LabeledIconButton size="small" icon="question">Hello LabeledItem</LabeledIconButton>,

	// When Disabled is Checked, Label, Button, and Icon are Grayed out - [GT-25525]
	<LabeledIconButton disabled icon="fullscreen">Hello LabeledItem</LabeledIconButton>,

	<LabeledIconButton disabled size="small" icon="fullscreen">Hello LabeledItem</LabeledIconButton>,

	// inline
	<LabeledIconButton inline icon="fullscreen">-Lorem</LabeledIconButton>,
	<LabeledIconButton inline size="small" icon="fullscreen">-Lorem</LabeledIconButton>,
	<LabeledIconButton inline disabled icon="fullscreen">-Lorem</LabeledIconButton>,
	<LabeledIconButton inline disabled size="small" icon="fullscreen">-Lorem</LabeledIconButton>,

	<LabeledIconButton selected inline icon="fullscreen">-Lorem</LabeledIconButton>,
	<LabeledIconButton selected inline disabled icon="fullscreen">-Lorem</LabeledIconButton>,

	// When Selected is Checked, Red Circle Stays Around Large (or Small Icon) - [GT-25527]
	// Size 'large' is the default and does not need to be specified
	<LabeledIconButton selected icon="fullscreen">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton selected size="small" icon="fullscreen">Hello LabeledItem</LabeledIconButton>,
	// end of [GT-25527]
	<LabeledIconButton selected disabled icon="fullscreen">Hello LabeledItem</LabeledIconButton>,
	<LabeledIconButton selected size="small" disabled icon="fullscreen">Hello LabeledItem</LabeledIconButton>,

	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <LabeledIconButton />
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="above" icon="fullscreen"> ฟิ้  ไั  ஒ  து</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="below" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="below" icon="fullscreen">-Lorem</LabeledIconButton>
	},
	// labeled position - 'below' is default
	// RTL locations of all labelPosition and Label is aligned with Button and Icon - [GT-25523]
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="above" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="after" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},  // (= 'left')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="left" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	}, // (= 'after')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="before" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	}, // (= 'right')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="right" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	}, // (= 'before')
	// end of [GT-25523]

	// labeled position - 'inline' - 'below' is default
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="above" inline icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="after" inline icon="fullscreen">-Lorem</LabeledIconButton>
	},  // (= 'left')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="left" inline icon="fullscreen">-Lorem</LabeledIconButton>
	}, // (= 'after')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="before" inline icon="fullscreen">-Lorem</LabeledIconButton>
	}, // (= 'right')
	{
		locale: 'ar-SA',
		component: <LabeledIconButton labelPosition="right" inline icon="fullscreen">-Lorem</LabeledIconButton>
	}, // (= 'before')

	{
		locale: 'ar-SA',
		component: <LabeledIconButton flip="vertical" icon="question">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton flip="horizontal" icon="question">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton flip="both" icon="question">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton flip="both" size="small" icon="question">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton size="small" icon="question">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton disabled icon="fullscreen" >Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton disabled size="small" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},

	// inline
	{
		locale: 'ar-SA',
		component: <LabeledIconButton inline icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton inline size="small" icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton inline disabled icon="fullscreen" >-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton inline disabled size="small" icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected inline icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected inline disabled icon="fullscreen">-Lorem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},
	// When Selected is Checked, Red Circle Stays Around Large (or Small Icon) - [GT-25527]
	// Size 'large' is the default and does not need to be specified
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected size="small" icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},
	// end of [GT-25527] fpr RTL
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected disabled icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	},
	{
		locale: 'ar-SA',
		component: <LabeledIconButton selected size="small" disabled icon="fullscreen">Hello LabeledItem</LabeledIconButton>
	}
];
export default LabeledIconButtonTests;
