import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { Header } from "./Header"
import { useClerk } from "@clerk/clerk-expo"
import { LocationIcon, MailIcon } from "../icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function HomePageHeader({ layout, navigation, options, route }: BottomTabHeaderProps) {
	const { user } = useClerk()
	const insets = useSafeAreaInsets()

	async function handleLocation() {
		const latitude = "40.88730622959476" // Replace with the desired latitude
		const longitude = "-80.65001792547432" // Replace with the desired longitude
		const platform = Platform.OS

		if (platform === "ios") {
			Linking.openURL(`maps://app?daddr=${latitude},${longitude}`)
		} else {
			Linking.openURL(`geo:${latitude},${longitude}?q=${latitude},${longitude}`)
		}
	}

	const styles = StyleSheet.create({
		container: {
			backgroundColor: "#E3E4E8",
			paddingTop: insets.top,
			paddingBottom: 8,
			paddingLeft: 16,
			gap: 8,
		},
		multipleIcons: { flexDirection: "row", gap: 20, paddingLeft: 12 },
		iconsFlex: {
			flexDirection: "row",
			gap: 16,
			alignItems: "center",
			fontSize: 16,
		},
	})

	return (
		<View style={styles.container}>
			<Header>Welcome, {user?.firstName}</Header>
			<View style={styles.multipleIcons}>
				<View style={styles.iconsFlex}>
					<MailIcon />
					<Text>Inbox</Text>
					{/* TODO: Make a message page thing. Figure out how to do push notifications or add messages here or something*/}
				</View>
				<Pressable onPress={handleLocation}>
					<View style={styles.iconsFlex}>
						<LocationIcon />
						<Text>Location</Text>
					</View>
				</Pressable>
			</View>
		</View>
	)
}
