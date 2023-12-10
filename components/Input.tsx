import {
	StyleSheet,
	TextInput,
	Text,
	KeyboardTypeOptions,
	ReturnKeyTypeOptions,
} from "react-native"

type InputProps = {
	value: string
	onChange: (text: string) => void
	placeholder: string
	wasSubmitted: boolean
	onBlur?: () => void
	touched?: boolean
	keyboardType?: KeyboardTypeOptions
	errorMessage?: string | null
	secureText?: boolean
	returnKeyType?: ReturnKeyTypeOptions
	multiline?: boolean
	height?: number
}
export function Input({
	value,
	onChange,
	placeholder,
	onBlur,
	secureText = false,
	touched,
	wasSubmitted,
	keyboardType,
	returnKeyType,
	errorMessage,
	multiline = false,
	height,
}: InputProps) {
	const displayErrorMessage = (wasSubmitted || touched) && errorMessage

	return (
		<>
			<TextInput
				placeholder={placeholder}
				style={[styles.input, { height: height }]}
				value={value}
				onBlur={onBlur}
				returnKeyType={returnKeyType}
				onChangeText={onChange}
				keyboardType={keyboardType}
				secureTextEntry={secureText}
				placeholderTextColor={"#7E869A"}
				multiline={multiline}
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
