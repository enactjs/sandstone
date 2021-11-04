import Region from '../../../../Region';

const RegionTests = [
	<Region title="Region" />,
	<Region title="Region">Region Body</Region>,
	{
		locale: 'ar-SA',
		component: <Region title="Region" />
	},
	{
		locale: 'ar-SA',
		component: <Region title="Region">Region Body</Region>
	}
];
export default RegionTests;
