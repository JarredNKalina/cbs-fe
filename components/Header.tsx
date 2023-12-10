import { ReactNode } from "react"
import { StyleSheet, Text } from "react-native"

type HeaderProps = { children: ReactNode; color?: string }
export function Header({ children, color = "#212C3F" }: HeaderProps) {
	return <Text style={[styles.header, { color: color }]}>{children}</Text>
}

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		fontWeight: "700",
		fontFamily: "Lato_700Bold",
		color: "#212C3F",
	},
})
