import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Booking } from "../../../services/bookings/validators"
import { AppointmentCard } from "../AppointmentCard/AppointmentCard"
import { ValidTabs } from "../AppointmentSummary/AppointmentSummary"

type TabRendererProps = {
	tab: ValidTabs
	upcomingBookings: Booking[]
	previousBookings: Booking[]
}

export function TabRenderer({ tab, upcomingBookings, previousBookings }: TabRendererProps) {
	if (tab === "upcoming") {
		return upcomingBookings.length > 0 ? (
			<View style={{ maxHeight: 210 }}>
				<ScrollView contentContainerStyle={{ gap: 8 }}>
					{upcomingBookings.map(booking => (
						<AppointmentCard booking={booking} key={booking.id} />
					))}
				</ScrollView>
			</View>
		) : (
			<NoBookings type="upcoming" />
		)
	} else if (tab === "previous") {
		return previousBookings.length > 0 ? (
			<View style={{ maxHeight: 210 }}>
				<ScrollView contentContainerStyle={{ gap: 8 }}>
					{previousBookings.map(booking => (
						<AppointmentCard booking={booking} key={booking.id} />
					))}
				</ScrollView>
			</View>
		) : (
			<ScrollView contentContainerStyle={{ gap: 8 }}>
				{previousBookings.map(booking => (
					<AppointmentCard booking={booking} key={booking.id} />
				))}
				<NoBookings type="previous" />
			</ScrollView>
		)
	}
}
// TODO: invalidate queries

type NoBookingsProps = {
	type: ValidTabs
}
function NoBookings({ type }: NoBookingsProps) {
	return (
		<View style={styles.noBookings}>
			<Text style={styles.noBookingsText}>No {type} bookings.</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	noBookings: {
		gap: 24,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	noBookingsText: {
		fontFamily: "Lato_700Bold",
		fontSize: 16,
	},
})
