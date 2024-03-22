import { Dispatch, SetStateAction } from "react"
import { BookingProfile } from "../../../services/bookings/validators"
import { BookingsTabs } from "../../../views/booking"
import { Pressable, StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { Button } from "../../Button"

type BarbersProps = {
	barberProfiles: BookingProfile[]
	setTab: Dispatch<SetStateAction<BookingsTabs>>
	selectedId: string | null
	setSelectedId: Dispatch<SetStateAction<string | null>>
}
const DefaultImage = require("../../../assets/default-pic.png")

export function Barbers({ barberProfiles, selectedId, setSelectedId, setTab }: BarbersProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Select a barber</Text>
			<ScrollView contentContainerStyle={styles.barbersContainer}>
				{barberProfiles.map(barberProfile => {
					return (
						<Pressable
							style={
								selectedId === barberProfile.teamMemberId
									? styles.selectedBarberCard
									: styles.barberCard
							}
							key={barberProfile.teamMemberId}
							onPress={() => setSelectedId(barberProfile.teamMemberId)}
						>
							<Image
								source={
									barberProfile.profileImageUrl
										? { uri: barberProfile.profileImageUrl }
										: DefaultImage
								}
								style={{ width: 72, height: 72, borderRadius: 16 }}
								// placeholder={DefaultImage}
								// TODO: place barbershop logo as placeholder
							/>
							<Text
								style={{
									fontFamily: "Lato_700Bold",
									fontSize: 16,
									textAlign: "center",
									marginTop: 8,
								}}
							>
								{barberProfile.displayName}
							</Text>
							<View
								style={{
									width: 68,
									marginVertical: 16,
									height: 1,
									backgroundColor: "#5C677D",
								}}
							/>
							<Text
								style={{
									fontFamily: "Lato_400Regular",
									fontSize: 16,
									textAlign: "center",
								}}
							>
								Available June 21st
								{/* TODO: fix above */}
							</Text>
						</Pressable>
					)
				})}
			</ScrollView>
			<Button
				onPress={() => {
					setTab(3)
				}}
				disabled={selectedId === null}
			>
				Continue
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 24,
		paddingHorizontal: 24,
		gap: 16,
		justifyContent: "flex-start",
	},
	headerText: { fontFamily: "Lato_700Bold", fontSize: 24 },
	barbersContainer: {
		flexGrow: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		rowGap: 16,
		columnGap: 24,
		paddingBottom: 16,

	},
	barberCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		width: "45%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	selectedBarberCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		width: 152,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		borderWidth: 2,
		borderColor: "#2C55BE",
	},
})
