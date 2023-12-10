import { Dispatch, SetStateAction } from "react"
import { Availability } from "../Appointment/utils"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { format } from "date-fns"

export function getDate(day: string) {
	const parts = day.split(", ")
	const dateWithoutYear = parts[0] + ",  " + parts[1]
	return dateWithoutYear
}

export function getTime(time: string) {
	const timeParts = time.split(":")
	const hours = parseInt(timeParts[0], 10)
	const minutes = timeParts[1]
	const amPm = hours >= 12 ? "pm" : "am"
	const displayHours = hours > 12 ? hours - 12 : hours
	return `${displayHours}:${minutes}${amPm}`
}

type TimesProps = {
	selectedDate: Availability | null
	setSelectedTime: Dispatch<SetStateAction<string | null>>
	selectedTime: string | null
}
export function Times({ selectedDate, setSelectedTime, selectedTime }: TimesProps) {
	if (!selectedDate) return null

	const morningTimes = selectedDate?.times.filter(time => {
		return time < "12:00"
	})

	const afternoonTimes = selectedDate?.times.filter(time => {
		return time > "12:00" && time < "17:00"
	})

	const eveningTimes = selectedDate?.times.filter(time => {
		return time > "17:00"
	})

	return (
		<View style={{ gap: 16 }}>
			<View style={{ gap: 8 }}>
				<Text style={styles.dateText}>
					{getDate(format(new Date(selectedDate.date), "PPPP"))}
				</Text>
				<Text style={styles.availableText}>
					{selectedDate.times.length === 1
						? "1 time available"
						: `${selectedDate.times.length} Times Available`}
				</Text>
				{/* show here ___ times available */}
			</View>
			{morningTimes.length ? (
				<View style={{ gap: 12 }}>
					<Text style={styles.headerText}>Morning Times</Text>
					<Time
						times={morningTimes}
						setTime={setSelectedTime}
						selectedTime={selectedTime}
					/>
				</View>
			) : null}
			{afternoonTimes.length ? (
				<View style={{ gap: 12 }}>
					<Text style={styles.headerText}>Afternoon Times</Text>
					<Time
						times={afternoonTimes}
						setTime={setSelectedTime}
						selectedTime={selectedTime}
					/>
				</View>
			) : null}
			{eveningTimes.length ? (
				<View style={{ gap: 12 }}>
					<Text style={styles.headerText}>Evening Times</Text>
					<Time
						times={eveningTimes}
						setTime={setSelectedTime}
						selectedTime={selectedTime}
					/>
				</View>
			) : null}
		</View>
	)
}

type Time = {
	times: string[]
	setTime: Dispatch<SetStateAction<string | null>>
	selectedTime: string | null
}
function Time({ times, setTime, selectedTime }: Time) {
	return (
		<View style={styles.timeContainer} collapsable={false}>
			{times.map(time => {
				const isSelected = selectedTime === time

				return (
					<Pressable
						key={time}
						style={isSelected ? styles.selectedTime : styles.time}
						onPress={() => setTime(time)}
					>
						<Text style={isSelected ? styles.selectedTimeText : styles.timeText}>
							{getTime(time)}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	timeContainer: { flexDirection: "row", columnGap: 32, rowGap: 8, flexWrap: "wrap" },
	time: {
		borderColor: "black",
		borderWidth: 1.5,
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 20,
		alignItems: "center",
		width: 110,
	},
	timeText: { fontFamily: "Lato_700Bold", fontSize: 16 },
	selectedTime: {
		backgroundColor: "#2C55BE",
		borderColor: "#2C55BE",
		borderWidth: 1,
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 20,
		alignItems: "center",
		width: 110,
	},
	selectedTimeText: {
		color: "#ffffff",
		fontFamily: "Lato_700Bold",
		fontSize: 16.2,
	},
	dateText: { fontFamily: "Lato_700Bold", fontSize: 18 },
	headerText: { fontFamily: "Lato_700Bold", fontSize: 16 },
	availableText: { fontFamily: "Lato_400Regular", fontSize: 16 },
})
