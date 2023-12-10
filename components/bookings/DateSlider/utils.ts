import { addDays, eachDayOfInterval, eachWeekOfInterval, getDay } from "date-fns"

export const sliderDates = eachWeekOfInterval(
	{
		start: new Date(),
		end: addDays(new Date(), 14),
	},
	{ weekStartsOn: getDay(new Date()) }
).reduce((acc: Date[][], cur) => {
	const allDays = eachDayOfInterval({ end: addDays(cur, 6), start: cur })

	acc.push(allDays)

	return acc
}, [])
