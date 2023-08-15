import { ReactNode } from "react"
import { StyleSheet, Text } from "react-native"

type LabelProps = { children: ReactNode }
export function Label({ children }: LabelProps) {
	return <Text style={styles.label}>{children}</Text>
}

const styles = StyleSheet.create({
	label: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		fontFamily: "SourceSansPro_400Regular",
		color: "#212C3F",
	},
})
