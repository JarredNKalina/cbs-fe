import { StyleSheet, Text, TouchableOpacity } from "react-native"

type ButtonProps = { onPress: () => void; children: string }
export function Button({ onPress, children }: ButtonProps) {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2C55BE",
		width: "100%",
		padding: 12,
		borderRadius: 4,
		alignItems: "center",
	},
	buttonText: { color: "white", fontSize: 18, fontFamily: "Lato_700Bold" },
})
