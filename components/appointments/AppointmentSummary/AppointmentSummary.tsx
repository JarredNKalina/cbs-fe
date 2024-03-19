import { StyleSheet, View } from "react-native"
import { Header } from "../../Header"
import { useState } from "react"
import { Booking } from "../../../services/bookings/validators"
import { TabRenderer } from "../TabRenderer"
import { Tab } from "../Tab"

export type ValidTabs = "upcoming" | "last month"

type AppointmentSummaryProps = {
	pastBookings: Booking[]
	upcomingBookings: Booking[]
}
export function AppointmentSummary({ pastBookings, upcomingBookings }: AppointmentSummaryProps) {
	const [tab, setTab] = useState<ValidTabs>("upcoming")

	const pastBookingsDates = pastBookings.filter(booking => {
		return new Date(booking.startAt) < new Date()
	})

	//TODO: consider doing 2 fetch calls, one for upcoming and one for previous
	//consider making a route that takes a number, the number will determine how many bookings to return

	const upcomingBookingsDates = upcomingBookings.filter(booking => {
		return new Date(booking.startAt) > new Date()
	})

	return (
		<View style={styles.container}>
			<Header>Appointments</Header>
			<View style={styles.appointmentContent}>
				<View style={styles.tabContainer}>
					<Tab tabName="upcoming" setTab={setTab} isActive={"upcoming" === tab} />
					<Tab tabName="last month" setTab={setTab} isActive={"last month" === tab} />
				</View>
			</View>
			<TabRenderer
				tab={tab}
				upcomingBookings={upcomingBookingsDates}
				previousBookings={pastBookingsDates}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 24,
	},
	appointmentContent: { gap: 24 },
	tabContainer: {
		padding: 4,
		gap: 8,
		borderRadius: 8,
		backgroundColor: "#E3E4E8",
		opacity: 0.7,
		flexDirection: "row",
	},
})
