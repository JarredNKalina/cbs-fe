import { ReactNode } from "react"
import { StyleSheet, Text } from "react-native"

type HeaderProps = { children: ReactNode }
export function Header({ children }: HeaderProps) {
	return <Text style={styles.header}>{children}</Text>
}

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 20,
		fontFamily: "Lato_700Bold",
		color: "#212C3F",
	},
})
