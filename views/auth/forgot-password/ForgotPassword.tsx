import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { Button, Header, Input, Label } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect, useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../firebase"
import { getEmailError, isFieldTouched } from "../validation/authValidation"

type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>
type FormInputs = "email"

type LoginScreenProp = StackNavigationProp<RootStackParamList, "ForgotPassword">
export function ForgotPassword() {
	const [wasSubmitted, setWasSubmitted] = useState(false)
	const [formInfo, setFormInfo] = useState<Form>({
		email: { errorMessage: null, touched: false, text: "" },
	})

	const navigation = useNavigation<LoginScreenProp>()

	function handleNavigateToLogin() {
		navigation.navigate("Login")
	}

	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	useEffect(() => {
		if (wasSubmitted) validateForm()
	}, [formInfo.email.text])

	function validateForm() {
		let newFormInfo = { ...formInfo }

		if (formInfo.email.touched) {
			newFormInfo.email.errorMessage = getEmailError(newFormInfo)
		}

		setFormInfo(newFormInfo)
		return [formInfo.email.errorMessage]
	}

	useEffect(() => {
		if (wasSubmitted) validateForm() || isFieldTouched(formInfo, "email")
	}, [formInfo.email.text, formInfo.email.touched])

	async function handleForgotPassword() {
		setWasSubmitted(true)
		const errors = validateForm()
		console.log({ auth, errors })
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors) {
			return
		}

		await sendPasswordResetEmail(auth, formInfo.email.text).catch(error => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log({ errorCode, errorMessage })
		})
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<View>
				<Header>Want to reset your password?</Header>
				<Text style={styles.forgotPasswordInfo}>
					Enter your email address and we'll send you a link to reset your password.
				</Text>
				<View style={styles.inputContainer}>
					<View>
						<Label>Email</Label>
						<Input
							placeholder="Enter Email"
							value={formInfo.email.text}
							onChange={text => setText(text, "email")}
							wasSubmitted={wasSubmitted}
							errorMessage={formInfo.email.errorMessage}
							onBlur={() => {
								handleWasInputTouched("email")
							}}
							touched={formInfo.email.touched}
						/>
					</View>
				</View>
				<View style={styles.actionContainer}>
					<Button onPress={async () => await handleForgotPassword()}>Sign in</Button>
				</View>
				<View style={styles.noAccountContainer}>
					<Text style={styles.noAccount}>Don't need to reset your password? </Text>
					<Text style={styles.signUpNow} onPress={handleNavigateToLogin}>
						Log in.
					</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#F8F9FB",
		paddingHorizontal: 24,
	},
	forgotPassword: {
		textDecorationLine: "underline",
		paddingTop: 4,
		alignSelf: "flex-end",
		color: "#7E869A",
		fontSize: 14,
		fontFamily: "Lato_400Regular",
	},
	forgotPasswordInfo: {
		paddingBottom: 16,
	},
	inputContainer: {
		alignContent: "center",
		justifyContent: "center",
		gap: 24,
	},
	actionContainer: { paddingTop: 32 },
	noAccountContainer: { flexDirection: "row", paddingTop: 16 },
	noAccount: { fontFamily: "Lato_400Regular", fontSize: 14, color: "#3E3E3E" },
	signUpNow: { fontFamily: "Lato_700Bold", color: "#2C55BE", textDecorationLine: "underline" },
})
