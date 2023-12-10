import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"
import { IconsProps } from "../@types/icons"

export function MailIcon({ fill = "#2C55BE" }: IconsProps) {
	return (
		<View style={styles.container}>
			<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<Path
					d="M21.75 6.75V17.25C21.75 17.8467 21.5129 18.419 21.091 18.841C20.669 19.2629 20.0967 19.5 19.5 19.5H4.5C3.90326 19.5 3.33097 19.2629 2.90901 18.841C2.48705 18.419 2.25 17.8467 2.25 17.25V6.75M21.75 6.75C21.75 6.15326 21.5129 5.58097 21.091 5.15901C20.669 4.73705 20.0967 4.5 19.5 4.5H4.5C3.90326 4.5 3.33097 4.73705 2.90901 5.15901C2.48705 5.58097 2.25 6.15326 2.25 6.75M21.75 6.75V6.993C21.75 7.37715 21.6517 7.75491 21.4644 8.0903C21.2771 8.42569 21.0071 8.70754 20.68 8.909L13.18 13.524C12.8252 13.7425 12.4167 13.8582 12 13.8582C11.5833 13.8582 11.1748 13.7425 10.82 13.524L3.32 8.91C2.99292 8.70854 2.72287 8.42669 2.53557 8.0913C2.34827 7.75591 2.24996 7.37815 2.25 6.994V6.75"
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
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
