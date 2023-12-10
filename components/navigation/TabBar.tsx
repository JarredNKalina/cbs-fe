import {
	BottomTabDescriptorMap,
	BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"
import { NavigationIcon } from "./NavigationIcon"

type TabBarProps = {
	descriptors: BottomTabDescriptorMap
	insets: EdgeInsets
	navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
	state: TabNavigationState<ParamListBase>
}
export function TabBar({ navigation, state }: TabBarProps) {
	const insets = useSafeAreaInsets()

	const styles = StyleSheet.create({
		navigationContainer: {
			flexDirection: "row",
			backgroundColor: "#E3E4E8",
			paddingBottom: insets.bottom,
		},
		itemContainer: {
			paddingTop: 8,
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 1,
			borderColor: "#333B42",
			display: "flex",
			gap: 4,
		},
		tabText: {
			fontFamily: "SourceSansPro_400Regular",
			fontSize: 12,
			color: "#333B42",
			textAlign: "center",
		},
	})
	
	return (
		<View style={styles.navigationContainer}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index

				function onPress() {
					const event = navigation.emit({
						canPreventDefault: true,
						type: "tabPress",
						target: route.key,
					})
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				return (
					<Pressable onPress={onPress} style={[styles.itemContainer]} key={index}>
						<NavigationIcon
							routeName={route.name}
							fill={isFocused ? "#2C55BE" : undefined}
						/>
						<Text
							style={[styles.tabText, { color: isFocused ? "#2C55BE" : "#333B42" }]}
						>
							{route.name}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

