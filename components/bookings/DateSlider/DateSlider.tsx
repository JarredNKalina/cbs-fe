import PagerView from "react-native-pager-view"
import { format } from "date-fns"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { sliderDates } from "./utils"
import { Availability } from "../Appointment/utils"
import { Dispatch, SetStateAction } from "react"

type DateSliderProps = {
	setSelectedDate: Dispatch<SetStateAction<null | Availability>>
	parsedAvailability: Availability[]
	setSelectedTime: Dispatch<SetStateAction<string | null>>
	selectedDate: null | Availability
}

export function DateSlider({
	setSelectedDate,
	parsedAvailability,
	setSelectedTime,
	selectedDate,
}: DateSliderProps) {
	return (
		<PagerView style={{ height: 60 }}>
			{sliderDates.map((week, i) => {
				return (
					<View key={i} style={styles.row}>
						{week.map((day, i) => {
							const text = format(day, "EEEEE")
							//Show 'selected' design. circle around?
							const isAvailable = parsedAvailability.some(availability => {
								return availability.date === day.toISOString().split("T")[0]
							})
							function getAvailableTimes() {
								const times = parsedAvailability.find(availability => {
									return availability.date === day.toISOString().split("T")[0]
								})?.times
								if (!times) return []
								return times
							}
							const isSelected = selectedDate?.date === day.toISOString()

							if (isSelected) {
								return (
									<View style={{ alignItems: "center", gap: 6 }} key={i}>
										<View
											style={{
												borderRadius: 360,
												borderWidth: 2,
												padding: 2,
											}}
										>
											<View style={styles.selectedCircle}>
												<Text style={styles.dayOfTheWeek}>
													{day.getDate()}
												</Text>
											</View>
										</View>
										<Text style={styles.dayLetter}>{text}</Text>
									</View>
								)
							}
							return (
								<Pressable
									key={i}
									style={styles.day}
									disabled={!isAvailable}
									onPress={() => {
										setSelectedDate({
											date: day.toISOString(),
											times: getAvailableTimes(),
											day: format(day, "EEEE"),
										})
										setSelectedTime(null)
									}}
								>
									<View
										style={
											isAvailable ? styles.availableCircle : styles.dayCircle
										}
									>
										<Text style={styles.dayOfTheWeek}>{day.getDate()}</Text>
									</View>
									<Text style={styles.dayLetter}>{text}</Text>
								</Pressable>
							)
						})}
					</View>
				)
			})}
		</PagerView>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: "100%",
		alignItems: "flex-start",
	},
	day: { alignItems: "center", gap: 6 },
	dayCircle: {
		borderRadius: 360,
		backgroundColor: "#9d9d9d",
		width: 34,
		height: 34,
		alignItems: "center",
		justifyContent: "center",
	},
	availableCircle: {
		borderRadius: 360,
		backgroundColor: "black",
		width: 34,
		height: 34,
		alignItems: "center",
		justifyContent: "center",
	},
	selectedCircle: {
		borderRadius: 360,
		backgroundColor: "black",
		width: 26,
		height: 26,
		alignItems: "center",
		justifyContent: "center",
	},
	dayOfTheWeek: { fontFamily: "Lato_700Bold", color: "white" },
	dayLetter: { fontFamily: "Lato_700Bold" },
})
