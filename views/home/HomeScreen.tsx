import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native"
import { Loyalty } from "../../components/Loyalty"
import { AppointmentSummary } from "../../components/appointments/AppointmentSummary"
import { Button } from "../../components"
import { useQuery } from "@tanstack/react-query"
import { getAllBookings, getBookingProfiles } from "../../services/bookings/api"
import { getUserLoyalty } from "../../services/loyalty/api"
import { useClerk } from "@clerk/clerk-expo"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootBottomTabsParamList } from "../../components/navigation"
import { getAllServices } from "../../services/services/api"

export function HomeScreen() {
	const { user } = useClerk()
	type BookingScreenProp = StackNavigationProp<RootBottomTabsParamList, "Home">
	const navigation = useNavigation<BookingScreenProp>()
	const {
		data: pastBookings,
		isLoading: arePastBookingsLoading,
		isError: isPastBookingsError,
	} = useQuery({
		queryFn: () => getAllBookings(user?.publicMetadata.squareCustomerId as string, -30),
		queryKey: ["pastBookings"],
	})

	const {
		data: upcomingBookings,
		isLoading: areUpcomingBookingsLoading,
		isError: isUpcomingBookingsError,
	} = useQuery({
		queryFn: () => getAllBookings(user?.publicMetadata.squareCustomerId as string, 30),
		queryKey: ["upcomingBookings"],
	})

	const { isLoading: areServicesLoading, isError: isServicesError } = useQuery({
		queryFn: () => getAllServices(),
		queryKey: ["services"],
	})

	const { isLoading: areProfilesLoading, isError: isProfilesError } = useQuery({
		queryFn: () => getBookingProfiles(),
		queryKey: ["booking-profiles"],
	})

	const {
		data: loyalty,
		isLoading: isLoyaltyLoading,
		isError: isLoyaltyError,
	} = useQuery({
		queryFn: () => getUserLoyalty(user?.publicMetadata.squareCustomerId as string),
		queryKey: ["loyalty"],
	})

	if (
		isLoyaltyError ||
		isUpcomingBookingsError ||
		isPastBookingsError ||
		isServicesError ||
		isProfilesError
	) {
		return (
			<View>
				<Text>Something went wrong.</Text>
			</View>
		)
	}

	if (
		isLoyaltyLoading ||
		areUpcomingBookingsLoading ||
		arePastBookingsLoading ||
		areServicesLoading ||
		areProfilesLoading
	) {
		return (
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Loyalty loyalty={loyalty} />
			<View style={styles.divider} />
			<AppointmentSummary pastBookings={pastBookings} upcomingBookings={upcomingBookings} />
			<Button
				onPress={() => {
					navigation.navigate("Booking")
				}}
			>
				Book Next Appointment
			</Button>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 24,
		paddingHorizontal: 16,
		gap: 24,
	},
	divider: { backgroundColor: "#616A7D", opacity: 0.5, height: 2 },
	spinnerContainer: { flex: 1, justifyContent: "center" },
})
