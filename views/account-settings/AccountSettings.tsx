import { useNavigation } from "@react-navigation/native"
import { Pressable, StyleSheet, Switch, Text, View } from "react-native"
import { RootBottomTabsParamList } from "../../components/navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, Header } from "../../components"
import { useClerk } from "@clerk/clerk-expo"

import { ChevronLeftIcon } from "../../icons"
import { useState } from "react"

type AccountSettingsScreenProp = StackNavigationProp<RootBottomTabsParamList, "Profile">
export function AccountSettingsScreen() {
	const navigation = useNavigation<AccountSettingsScreenProp>()
	const { user, signOut } = useClerk()

	const [areAppointmentRemindersEnabled, setAreAppointmentRemindersEnabled] = useState(false)

	return (
		<View style={styles.container}>
			<Text style={styles.nameText}>{user?.fullName}</Text>
			<View style={{ justifyContent: "space-between", flex: 1 }}>
				<View style={{ gap: 32 }}>
					<View style={styles.itemGroup}>
						<Header>Profile</Header>
						<View style={{ gap: 16 }}>
							<Item action={() => {}} name="Personal Info" />
							{/* TODO: create above action */}
							{/* <Item action={() => {}} name="Payment" /> */}
							{/* <Item action={() => {}} name="Transaction History" /> */}
						</View>
					</View>
					<View style={styles.itemGroup}>
						<Header>Notification Preferences</Header>
						<View style={{ gap: 16 }}>
							{/* <Item action={() => {}} name="Receipts" toggle /> */}
							<View style={styles.item}>
								<Text style={styles.itemText}>Appointment Reminders</Text>
								<Switch
									trackColor={{ false: "#B5B9C4", true: "#2C55BE" }}
									thumbColor={"#FFFFFF"}
									ios_backgroundColor="#B5B9C4"
									onValueChange={() =>
										setAreAppointmentRemindersEnabled(
											!areAppointmentRemindersEnabled
										)
									}
									value={areAppointmentRemindersEnabled}
								/>
								{/* TODO: figure out how to set appointment Reminders */}
							</View>
						</View>
					</View>
				</View>
				<View style={{ gap: 12 }}>
					<Button onPress={signOut} variant="primary">
						Sign out
					</Button>
					{/* TODO: figure out how to delete account */}
					<Button onPress={() => {}} variant="warning">
						Delete Account
					</Button>
				</View>
			</View>
		</View>
	)
}

type ItemProps = {
	name: string
	action: () => void
}
function Item({ action, name }: ItemProps) {
	return (
		<Pressable style={styles.item} onPress={action}>
			<Text style={styles.itemText}>{name}</Text>
			<View style={{ transform: [{ rotate: "180deg" }] }}>
				<ChevronLeftIcon />
			</View>
		</Pressable>
	)
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 24,
		paddingHorizontal: 16,
		gap: 24,
	},
	nameText: { fontFamily: "Lato_700Bold", fontSize: 32 },
	itemGroup: { gap: 20 },
	item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	itemText: { fontFamily: "Lato_400Regular", fontSize: 16 },
	divider: { backgroundColor: "#616A7D", opacity: 0.5, height: 2 },
	spinnerContainer: { flex: 1, justifyContent: "center" },
})
