import DateFmt from 'ilib/lib/DateFmt';

const defaultLabelProps = {
	date: 'dwmy',
	length: 'full',
	timezone: 'local',
	type: 'date',
	useNative: false
};

const dateTimeLabelFormatter = ({
	date,
	length,
	timezone,
	type,
	useNative
} = defaultLabelProps) => new DateFmt({
	date,
	length,
	timezone,
	type,
	useNative
});

export default dateTimeLabelFormatter;
export {dateTimeLabelFormatter};
