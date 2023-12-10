import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function LocationIcon({ fill = "#2C55BE" }: IconsProps) {
	return (
		<View style={styles.container}>
			<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<Path
					d="M15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5Z"
					stroke={fill}
					stroke-linecap="round"
					strokeWidth="2"
					stroke-linejoin="round"
				/>
				<Path
					d="M19.5 10.5C19.5 17.642 12 21.75 12 21.75C12 21.75 4.5 17.642 4.5 10.5C4.5 8.51088 5.29018 6.60322 6.6967 5.1967C8.10322 3.79018 10.0109 3 12 3C13.9891 3 15.8968 3.79018 17.3033 5.1967C18.7098 6.60322 19.5 8.51088 19.5 10.5Z"
					stroke={fill}
					strokeWidth="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
