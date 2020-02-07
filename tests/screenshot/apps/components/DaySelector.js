import DaySelector from '../../../../DaySelector';
import React from 'react';

const DaySelectorTests = [
	<DaySelector />,
	<DaySelector title="DaySelector" selected={[]} />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} />,
	<DaySelector title="DaySelector" selected={[]} disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} disabled />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="short" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="short" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" disabled />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="medium" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="medium" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" disabled />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="full" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" />,
	<DaySelector title="DaySelector" selected={[]} dayNameLength="full" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" disabled />,
	<DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" disabled />,
	// *************************************************************
	// textSize: 'large'
	// *************************************************************
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" disabled />
	},
	{
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" disabled />
	},
	// *************************************************************
	// locale = 'ar-SA'
	// *************************************************************
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" disabled />
	},
	// *************************************************************
	// locale = 'ar-SA'
	// textSize: 'large'
	// *************************************************************
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="short" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="medium" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" selected={[]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 1, 2, 3, 4, 5, 6]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[1, 2, 3, 4, 5]} dayNameLength="full" disabled />
	},
	{
		locale: 'ar-SA',
		textSize: 'large',
		component: <DaySelector title="DaySelector" defaultOpen selected={[0, 6]} dayNameLength="full" disabled />
	}
];
export default DaySelectorTests;
