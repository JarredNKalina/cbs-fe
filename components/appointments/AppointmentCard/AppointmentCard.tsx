import { Image, StyleSheet, Text, View } from "react-native"
import { Booking } from "../../../services/bookings/validators"
import { format } from "date-fns"
import { getDate } from "../../bookings/Times/Times"
import { useQuery } from "@tanstack/react-query"
import { getBookingProfiles } from "../../../services/bookings/api"
import { getAllServices } from "../../../services/services/api"

type AppointmentCardProps = {
	booking: Booking
}
export function AppointmentCard({ booking }: AppointmentCardProps) {
	const { data: services } = useQuery({
		queryFn: () => getAllServices(),
		queryKey: ["services"],
	})

	const { data: barberProfiles } = useQuery({
		queryFn: () => getBookingProfiles(),
		queryKey: ["booking-profiles"],
	})

	const service = services?.find(
		service => service.variation.id === booking.appointmentInfo.serviceVariationId
	)
	const barber = barberProfiles?.find(
		barberProfile => barberProfile.teamMemberId === booking.appointmentInfo.teamMemberId
	)
	if (!barber || !service) {
		return null
	}
	return (
		<View style={styles.appointmentCard}>
			<View style={styles.appointmentInfo}>
				<Image
					source={{
						uri: barber?.profileImageUrl
							? barber?.profileImageUrl
							: require("../../../assets/default-pic.png"),
					}}
					style={{ width: 48, height: 48, borderRadius: 8 }}
					// placeholder={}
					// TODO: place barbershop logo as placeholder
				/>
				<View style={{ justifyContent: "center", gap: 2 }}>
					<Text style={styles.dateText}>
						{getDate(format(new Date(booking.startAt), "PPPP"))}
					</Text>
					<Text style={styles.barberNameText}>{barber?.displayName}</Text>
				</View>
			</View>
			<View style={{ justifyContent: "flex-end" }}>
				<View style={styles.priceTag}>
					<Text style={styles.priceText}>
						${service.variation.itemVariationData.priceMoney.amount / 100}
					</Text>
				</View>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	appointmentCard: {
		padding: 8,
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		paddingRight: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	// add shadow to appointmentCard
	appointmentInfo: { flexDirection: "row", gap: 12 },
	dateText: { color: "#2C55BE", fontFamily: "Lato_900Black", fontSize: 16 },
	barberNameText: { color: "#7E869A", fontFamily: "Lato_400Regular" },
	pic: {
		width: 48,
		height: 48,
		borderRadius: 4,
		backgroundColor: "red",
	},
	priceTag: {
		backgroundColor: "#2C55BE",
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
		justifyContent: "center",
		paddingHorizontal: 12,
		alignItems: "center",
		paddingVertical: 4,
		height: 32,
	},
	priceText: { color: "#FFFFFF", fontFamily: "Lato_700Bold", fontSize: 18 },
})
