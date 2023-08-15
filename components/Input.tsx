import { StyleSheet, TextInput, Text } from "react-native"

type InputProps = {
	value: string
	onChange: (text: string) => void
	placeholder: string
	wasSubmitted: boolean
	onBlur?: () => void
	touched?: boolean
	errorMessage?: string | null
	secureText?: boolean
}
export function Input({
	value,
	onChange,
	placeholder,
	onBlur,
	secureText = false,
	touched,
	wasSubmitted,
	errorMessage,
}: InputProps) {
	const displayErrorMessage = (wasSubmitted || touched) && errorMessage

	return (
		<>
			<TextInput
				placeholder={placeholder}
				style={styles.input}
				value={value}
				onBlur={onBlur}
				onChangeText={onChange}
				secureTextEntry={secureText}
				placeholderTextColor={"#7E869A"}
			/>
			{displayErrorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: "white",
		paddingHorizontal: 12,
		paddingVertical: 14,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#B5B9C4",
		fontFamily: "Lato_400Regular",
	},
	errorMessage: {
		fontSize: 12,
		color: "red",
	},
})
