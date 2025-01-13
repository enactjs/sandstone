// Calendar utils.js
//

const getStartDayOfMonth = (day) => {
	const startDate = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
	return startDate === 0 ? 7 : startDate;
};

const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export {
	getStartDayOfMonth,
	isLeapYear
};
