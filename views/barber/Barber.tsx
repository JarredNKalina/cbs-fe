import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { RootBottomTabsParamList } from "../../components/navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { useQuery } from "@tanstack/react-query"
import { getBookingProfiles } from "../../services/bookings/api"
import { Image } from "expo-image"
import { ChevronLeftIcon } from "../../icons"

type BarberScreenProp = StackNavigationProp<RootBottomTabsParamList, "Barber">
export function BarberScreen() {
	const navigation = useNavigation<BarberScreenProp>()

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
			{barberProfiles.map(profile => {
				return (
					<View style={styles.bookingCard} key={profile.teamMemberId}>
						<Image
							source={{
								uri: profile.profileImageUrl
									? profile.profileImageUrl
									: require("../../assets/default-pic.png"),
							}}
							style={{ width: "100%", height: 164, borderRadius: 16 }}
							// placeholder={}
							// TODO: place barbershop logo as placeholder
						/>
						<View>
							<Text style={styles.profileName}>{profile.displayName}</Text>
							<View />
							<Text>{profile.description}</Text>
							<Pressable style={styles.cardAction}>
								<Text style={styles.actionText}>
									Book With {profile.displayName}
								</Text>
								<View style={{ transform: [{ rotate: "180deg" }] }}>
									<ChevronLeftIcon />
								</View>
							</Pressable>
							<Pressable style={styles.cardAction}>
								<Text style={styles.actionText}>View Testimonials</Text>
								<View style={{ transform: [{ rotate: "180deg" }] }}>
									<ChevronLeftIcon fill="#2C55BE" />
								</View>
							</Pressable>
							{/* TODO: figure out testimonials */}
						</View>
					</View>
				)
			})}
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
		backgroundColor: "#FFFFFF",
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
		width: 176,
	},
	profileName: { fontFamily: "Lato_700Bold", fontSize: 24 },
	spinnerContainer: { flex: 1, justifyContent: "center" },
	cardAction: {
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		// width: "100%",
	},
	actionText: { color: "#2C55BE", fontFamily: "Lato_700Bold", fontSize: 16 },
})
