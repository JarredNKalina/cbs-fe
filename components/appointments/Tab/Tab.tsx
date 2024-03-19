import { Dispatch, SetStateAction } from "react"
import { Pressable, StyleSheet, Text } from "react-native"

type TabsProps = {
	setTab: Dispatch<SetStateAction<ValidTabs>>
	tabName: ValidTabs
	isActive: boolean
}
type ValidTabs = "upcoming" | "last month"

export function Tab({ setTab, tabName, isActive }: TabsProps) {
	if (isActive) {
		return (
			<Pressable style={styles.activeTab} onPress={() => setTab(tabName)}>
				<Text style={styles.tabText}>{tabName}</Text>
			</Pressable>
		)
	}
	return (
		<Pressable style={styles.tab} onPress={() => setTab(tabName)}>
			<Text style={[styles.tabText, styles.inactiveText]}>{tabName}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	tab: {
		borderRadius: 8,
		height: 36,
		flex: 1,
		paddingVertical: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	tabText: {
		textTransform: "capitalize",
		fontFamily: "Lato_700Bold",
		fontSize: 16,
	},
	inactiveText: {
		color: "#7E869A",
	},
	activeTab: {
		backgroundColor: "#FFFFFF",
		paddingVertical: 8,
		borderRadius: 8,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
