// Calendar utils.js
//

const createYearList = () => {
	let years = [];
	let startingPoint = 1900;
	while (years.length < 200) {
		years = [...years, startingPoint.toString()];
		startingPoint++;
	}
	return years;
};

const getStartDayOfMonth = (firstDayOfWeek, month, year) => {
	const startDate = new Date(year, month, 1).getDay() + firstDayOfWeek;
	return startDate === 0 ? 7 : startDate;
};

const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const isToday = (today, day, month, year) => {
	return (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year);
};

export {
	createYearList,
	getStartDayOfMonth,
	isLeapYear,
	isToday
};
