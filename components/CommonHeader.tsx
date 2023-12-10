import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { Text, View } from "react-native"
import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ReactNode } from "react"

export function CommonHeader({
	layout,
	navigation,
	options,
	route,
	children,
}: BottomTabHeaderProps & { children?: ReactNode }) {
	const insets = useSafeAreaInsets()
	const styles = StyleSheet.create({
		container: {
			textAlign: "center",

			justifyContent: "center",
			backgroundColor: "red",
			width: "100%",
			// backgroundColor: "#E3E4E8",
			paddingTop: insets.top,
			paddingBottom: 8,
			paddingHorizontal: 16,
		},
		text: {
			fontSize: 16,
			fontFamily: "Lato_700Bold",
		},
	})

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{children}</Text>
		</View>
	)
}
