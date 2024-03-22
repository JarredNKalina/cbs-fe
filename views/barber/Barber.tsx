import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { RootBottomTabsParamList } from "../../components/navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { useQuery } from "@tanstack/react-query"
import { getBookingProfiles } from "../../services/bookings/api"
import { Image } from "expo-image"
import { ChevronLeftIcon } from "../../icons"
import { BookingProfile } from "../../services/bookings/validators"

type BarberScreenProp = StackNavigationProp<RootBottomTabsParamList, "Barber">
const DefaultImage = require("../../assets/default-pic.png")

export function BarberScreen() {
	const {
		data: barberProfiles,
		isLoading: areProfilesLoading,
		isError: isProfilesError,
	} = useQuery({
		queryFn: () => getBookingProfiles(),
		queryKey: ["booking-profiles"],
	})

	if (isProfilesError) {
		return (
			<View>
				<Text>Something went wrong.</Text>
			</View>
		)
	}

	if (areProfilesLoading) {
		return (
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={barberProfiles}
				renderItem={item => {
					return <Barber profile={item.item} />
				}}
				keyExtractor={item => item.teamMemberId}
				numColumns={2}
				contentContainerStyle={{ gap: 16 }}
			/>
		</View>
	)
}

function Barber({ profile }: { profile: BookingProfile }) {
	const navigation = useNavigation<BarberScreenProp>()

	return (
		<View style={styles.bookingCard} key={profile.teamMemberId}>
			<Image
				source={profile.profileImageUrl ? { uri: profile.profileImageUrl } : DefaultImage}
				style={{
					width: "100%",
					height: 164,
					borderRadius: 8,
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				}}
				// placeholder={}
				// TODO: place barbershop logo as placeholder
			/>
			<View style={{ padding: 8 }}>
				<Text style={styles.profileName}>{profile.displayName}</Text>
				<View
					style={{
						backgroundColor: "#5C677D",
						height: 1,
						opacity: 0.5,
						marginVertical: 8,
					}}
				/>
				<Pressable
					style={styles.cardAction}
					onPress={() => {
						navigation.navigate("Booking")
					}}
				>
					<Text style={styles.actionText}>Book Now</Text>
					<View style={{ transform: [{ rotate: "180deg" }] }}>
						<ChevronLeftIcon />
					</View>
				</Pressable>
				{/* <Pressable style={styles.cardAction}>
					<Text style={styles.actionText}>View Testimonials</Text>
					<View style={{ transform: [{ rotate: "180deg" }] }}>
						<ChevronLeftIcon fill="#2C55BE" />
					</View>
				</Pressable> */}
				{/* TODO: figure out testimonials */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 24,
		paddingHorizontal: 16,
		gap: 24,
		flexWrap: "wrap",
	},
	bookingCard: {
		width: "45%",
		backgroundColor: "#F8F9FB",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
		borderWidth: 2,
		borderColor: "#FFFFFF",
		marginHorizontal: 8,
	},
	profileName: { fontFamily: "Lato_700Bold", fontSize: 20 },
	spinnerContainer: { flex: 1, justifyContent: "center" },
	cardAction: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		// width: "100%",
	},
	actionText: { color: "#2C55BE", fontFamily: "Lato_700Bold", fontSize: 16 },
})
