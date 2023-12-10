import { Dispatch, SetStateAction } from "react"
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { BookingsTabs } from "../../../views/booking"
import { Button } from "../../Button"
import { getAvailability } from "../../../services/services/api"
import { useQuery } from "@tanstack/react-query"
import { Availability, transformAppointmentsToAvailability } from "./utils"
import { DateSlider } from "../DateSlider"
import { Times } from "../Times"

type DateProps = {
	setTab: Dispatch<SetStateAction<BookingsTabs>>
	selectedDate: null | Availability
	setSelectedDate: Dispatch<SetStateAction<null | Availability>>
	selectedServiceId: string
	selectedBarberId: string
	selectedTime: string | null
	setSelectedTime: Dispatch<SetStateAction<string | null>>
	setLocationId: Dispatch<SetStateAction<string | null>>
}

export function Appointment({
	setTab,
	selectedDate,
	setSelectedDate,
	selectedBarberId,
	selectedTime,
	setSelectedTime,
	selectedServiceId,
	setLocationId,
}: DateProps) {
	const {
		data: availability,
		isLoading: isAvailabilityLoading,
		isError: isAvailabilityError,
	} = useQuery({
		queryFn: () => {
			return getAvailability(selectedServiceId, selectedBarberId)
		},
		queryKey: ["availability"],
	})

	if (isAvailabilityError) {
		return (
			<View>
				<Text>Something went wrong.</Text>
			</View>
		)
	}

	if (isAvailabilityLoading) {
		return (
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	const parsedAvailability = transformAppointmentsToAvailability(availability)
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.headerText}>Select a {selectedDate ? "time" : "date"}</Text>
			<DateSlider
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				setSelectedTime={setSelectedTime}
				parsedAvailability={parsedAvailability}
			/>
			<Times
				selectedDate={selectedDate}
				setSelectedTime={setSelectedTime}
				selectedTime={selectedTime}
			/>
			{selectedDate !== null ? (
				<Button
					onPress={() => {
						setTab(4)
						setLocationId(availability[0].locationId)
					}}
					disabled={selectedTime === null || selectedDate === null}
				>
					Continue
				</Button>
			) : null}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		paddingHorizontal: 24,
		gap: 16,
		justifyContent: "flex-start",
	},
	headerText: { fontFamily: "Lato_700Bold", fontSize: 24 },
	spinnerContainer: { flex: 1, justifyContent: "center" },
	timeContainer: { flexDirection: "row", columnGap: 32, rowGap: 8, flexWrap: "wrap" },
	time: {
		borderColor: "#2C55BE",
		borderWidth: 2,
		borderRadius: 4,
		paddingVertical: 8,
		paddingHorizontal: 20,
	},
	timeText: { fontFamily: "Lato_700Bold", fontSize: 16 },
	selectedTime: {
		backgroundColor: "#2C55BE",
	},
	selectedTimeText: {
		color: "#ffffff",
	},
})
