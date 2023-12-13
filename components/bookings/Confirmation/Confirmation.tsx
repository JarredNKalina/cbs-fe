import {
	Image,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native"
import { Availability } from "../Appointment/utils"
import { Service } from "../../../services/services/validators"
import { BookingProfile } from "../../../services/bookings/validators"
import { format } from "date-fns"
import { getTime } from "../Times/Times"
import { useClerk } from "@clerk/clerk-expo"
import { Input } from "../../Input"
import { Dispatch, SetStateAction } from "react"
import { DismissKeyboard } from "../../DismissKeyboard"
import { Button } from "../../Button"
import { PenIcon } from "../../../icons/PenIcon"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootBottomTabsParamList } from "../../navigation"
import { BookingsTabs } from "../../../views/booking"

type ConfirmationProps = {
	barber?: BookingProfile | null
	time: string | null
	date: Availability | null
	service?: Service | null
	additionalInformation: string
	setAdditionalInformation: Dispatch<SetStateAction<string>>
	confirmFn: () => void
	setTab: Dispatch<SetStateAction<BookingsTabs>>
}

function addMinutesToTime(time: string, minutesToAdd: number) {
	const [hours, minutes] = time.split(":").map(Number)
	const totalMinutes = hours * 60 + minutes
	const newTotalMinutes = totalMinutes + minutesToAdd
	const newHours = Math.floor(newTotalMinutes / 60)
	const newMinutes = newTotalMinutes % 60
	const formattedHours = String(newHours).padStart(2, "0")
	const formattedMinutes = String(newMinutes).padStart(2, "0")

	return `${formattedHours}:${formattedMinutes}`
}

function formatPhoneNumber(phoneNumber: string) {
	const cleaned = ("" + phoneNumber).replace(/\D/g, "")
	const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
	if (match) {
		const intlCode = match[1] ? "+1 " : ""
		return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("")
	}
	return null
}

type BookingScreenProp = StackNavigationProp<RootBottomTabsParamList, "Booking">

export function Confirmation({
	barber,
	date,
	time,
	service,
	additionalInformation,
	setAdditionalInformation,
	confirmFn,
	setTab,
}: ConfirmationProps) {
	const { user } = useClerk()
	function getPhoneNumber() {
		if (!user?.phoneNumbers) return null
		return formatPhoneNumber(user.phoneNumbers[0].toString())
	}
	const navigation = useNavigation<BookingScreenProp>()

	if (!date || !time || !barber || !service) return null
	return (
		<DismissKeyboard>
			<ScrollView contentContainerStyle={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<View style={{ gap: 16 }}>
						<Text style={styles.headerText}>Confirm Details</Text>
						<View style={styles.section}>
							<View>
								<Text style={styles.sectionHeader}>Service Info</Text>
								<Text style={styles.itemText}>{service.itemData.name}</Text>
								<Text style={styles.itemText}>
									{service.variation.itemVariationData.serviceDuration
										? service.variation.itemVariationData.serviceDuration /
												60 /
												1000 +
										  " Minutes"
										: "Time Varies"}
								</Text>
							</View>
							<Pressable
								style={styles.edit}
								onPress={() => {
									setTab(1)
								}}
							>
								<Text style={styles.editText}>Edit</Text>
								<PenIcon />
							</Pressable>
						</View>
						<View style={styles.section}>
							<View style={{ flexDirection: "row", gap: 16}}>
								<View>
									<Text style={styles.sectionHeader}>Barber Info</Text>
									<Text style={styles.itemText}>{barber.displayName}</Text>
								</View>
								<Image
									source={{
										uri: barber.profileImageUrl
											? barber.profileImageUrl
											: require("../../../assets/default-pic.png"),
									}}
									style={{ width: 72, height: 72, borderRadius: 16 }}
									// placeholder={}
									// TODO: place barbershop logo as placeholder
								/>
							</View>
							<Pressable
								style={styles.edit}
								onPress={() => {
									setTab(2)
								}}
							>
								<Text style={styles.editText}>Edit</Text>
								<PenIcon />
							</Pressable>
						</View>
						<View style={styles.section}>
							<View>
								<Text style={styles.sectionHeader}>Date and Time</Text>
								<Text style={styles.itemText}>
									{format(new Date(date.date), "PPPP")}
								</Text>
								<Text style={styles.itemText}>
									{getTime(time)} -{" "}
									{getTime(
										addMinutesToTime(
											time,
											service.variation.itemVariationData.serviceDuration /
												60 /
												1000
										)
									)}{" "}
									EDT
								</Text>
							</View>
							<Pressable
								style={styles.edit}
								onPress={() => {
									setTab(3)
								}}
							>
								<Text style={styles.editText}>Edit</Text>
								<PenIcon />
							</Pressable>
						</View>
						<View style={styles.section}>
							<View>
								<Text style={styles.sectionHeader}>Personal Info</Text>
								<Text style={styles.itemText}>{user?.fullName}</Text>
								<Text style={styles.itemText}>{getPhoneNumber()}</Text>
							</View>
							<Pressable
								style={styles.edit}
								onPress={() => {
									navigation.navigate("Profile")
								}}
							>
								<Text style={styles.editText}>Edit</Text>
								<PenIcon />
							</Pressable>
						</View>
					</View>
					<View style={{ paddingTop: 16, gap: 4 }}>
						<Text style={styles.sectionHeader}>Additional Info</Text>
						<Input
							onChange={e => {
								setAdditionalInformation(e)
							}}
							placeholder="Additional Information (optional)"
							multiline
							wasSubmitted={false}
							height={100}
							value={additionalInformation}
						/>
					</View>
					<View style={{ paddingTop: 16 }}>
						<Button onPress={confirmFn}>Book Appointment</Button>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</DismissKeyboard>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		paddingTop: 24,
		paddingBottom: 64,
		paddingHorizontal: 24,
		gap: 16,
	},
	headerText: { fontFamily: "Lato_700Bold", fontSize: 24 },
	sectionHeader: { fontFamily: "Lato_700Bold", fontSize: 18 },
	itemText: { fontFamily: "Lato_400Regular", fontSize: 16 },
	section: {
		gap: 4,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		padding: 12,
	},
	edit: { flexDirection: "row", justifyContent: "center", gap: 4 },
	editText: { fontFamily: "SourceSansPro_400Regular", fontSize: 16, color: "#2C55BE" },
})
