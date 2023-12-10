import { StyleSheet, Text, TouchableOpacity } from "react-native"

type ButtonProps = {
	onPress: () => void
	children: string
	variant?: "primary" | "secondary" | "warning"
	disabled?: boolean
}
export function Button({ onPress, children, variant = "primary", disabled = false }: ButtonProps) {
	if (variant === "primary") {
		return (
			<TouchableOpacity
				style={[styles.primaryButton, disabled ? styles.disabledPrimary : undefined]}
				onPress={onPress}
				disabled={disabled}
			>
				<Text
					style={[
						styles.primaryButtonText,
						disabled ? styles.disabledPrimaryText : undefined,
					]}
				>
					{children}
				</Text>
			</TouchableOpacity>
		)
	} else if (variant === "secondary") {
		return (
			<TouchableOpacity
				style={[styles.secondaryButton, disabled ? styles.disabledSecondary : undefined]}
				onPress={onPress}
				disabled={disabled}
			>
				<Text
					style={[
						styles.secondaryButtonText,
						disabled ? styles.disabledSecondaryText : undefined,
					]}
				>
					{children}
				</Text>
			</TouchableOpacity>
		)
	} else if (variant === "warning") {
		return (
			<TouchableOpacity style={styles.warningButton} onPress={onPress} disabled={disabled}>
				<Text style={[styles.warningButtonText]}>{children}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: "#2C55BE",
		padding: 12,
		borderRadius: 4,
		alignItems: "center",
	},
	primaryButtonText: { color: "white", fontSize: 18, fontFamily: "Lato_700Bold" },
	secondaryButton: {
		borderColor: "#2C55BE",
		borderWidth: 2,
		flex: 1,
		padding: 12,
		borderRadius: 4,
		alignItems: "center",
	},
	secondaryButtonText: { color: "#2C55BE", fontSize: 18, fontFamily: "Lato_700Bold" },
	warningButton: {
		borderColor: "#FF0000",
		borderWidth: 2,
		padding: 12,
		borderRadius: 4,
		alignItems: "center",
	},
	warningButtonText: {
		color: "#FF0000",
		fontSize: 18,
		fontFamily: "Lato_700Bold",
	},
	disabledSecondaryText: { color: "#7E869A" },
	disabledSecondary: { borderColor: "#7E869A" },
	disabledPrimaryText: { color: "#FFFFFF" },
	disabledPrimary: { backgroundColor: "#7E869A" },
})
