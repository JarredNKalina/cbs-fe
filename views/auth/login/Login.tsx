import { useEffect, useState } from "react"
import { KeyboardAvoidingView, Text } from "react-native"
import { StyleSheet, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, DismissKeyboard, Header, Input, Label } from "../../../components"
import { getPasswordError, getPhoneNumberError, isFieldTouched } from "../validation/authValidation"
import { useSignIn } from "@clerk/clerk-expo"

type LoginScreenProp = StackNavigationProp<RootStackParamList, "Login">
type FormInputs = "phoneNumber" | "password"
type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>

export function Login() {
	const [wasSubmitted, setWasSubmitted] = useState(false)
	const [formInfo, setFormInfo] = useState<Form>({
		phoneNumber: { errorMessage: null, touched: false, text: "" },
		password: { errorMessage: null, touched: false, text: "" },
	})

	const { isLoaded, setActive, signIn } = useSignIn()
	const navigation = useNavigation<LoginScreenProp>()

	useEffect(() => {
		if (
			wasSubmitted ||
			isFieldTouched(formInfo, "phoneNumber") ||
			isFieldTouched(formInfo, "password")
		)
			validateForm()
	}, [formInfo.password.touched, formInfo.password.text])

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function validateForm() {
		let newFormInfo = { ...formInfo }

		if (formInfo.password.touched || wasSubmitted) {
			newFormInfo.password.errorMessage = getPasswordError(newFormInfo)
		}

		if (newFormInfo.phoneNumber.touched || wasSubmitted)
			newFormInfo.phoneNumber.errorMessage = getPhoneNumberError(newFormInfo)

		setFormInfo(newFormInfo)

		return [formInfo.phoneNumber.errorMessage, formInfo.password.errorMessage]
	}

	async function handleLogin() {
		setWasSubmitted(true)
		const errors = validateForm()
		console.log({ errors })
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors || !isLoaded) return

		const completeSignIn = await signIn.create({
			password: formInfo.password.text,
			identifier: formInfo.phoneNumber.text,
		})
		await setActive({ session: completeSignIn.createdSessionId })

		try {
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	function handleNavigateToRegister() {
		navigation.navigate("Register")
	}

	function handleNavigateToForgotPassword() {
		navigation.navigate("ForgotPassword")
	}

	return (
		<DismissKeyboard>
			<KeyboardAvoidingView style={styles.container} behavior="height">
				<Header>Sign in</Header>
				<View>
					<View style={styles.inputContainer}>
						<View>
							<Label>Phone Number</Label>
							<Input
								placeholder="Enter Phone Number"
								keyboardType="phone-pad"
								value={formInfo.phoneNumber.text}
								onChange={text => setText(text, "phoneNumber")}
								wasSubmitted={wasSubmitted}
								errorMessage={formInfo.phoneNumber.errorMessage}
								onBlur={() => {
									handleWasInputTouched("phoneNumber")
								}}
								touched={formInfo.phoneNumber.touched}
							/>
						</View>
						<View>
							<Label>Password</Label>
							<Input
								placeholder="Enter Password"
								secureText={true}
								value={formInfo.password.text}
								onChange={text => setText(text, "password")}
								wasSubmitted={wasSubmitted}
								errorMessage={formInfo.password.errorMessage}
								touched={formInfo.password.touched}
								onBlur={() => {
									handleWasInputTouched("password")
								}}
							/>
						</View>
					</View>
					<Text style={styles.forgotPassword} onPress={handleNavigateToForgotPassword}>
						Forgot your password?
					</Text>
					<View style={styles.actionContainer}>
						<Button onPress={async () => await handleLogin()}>Sign in</Button>
					</View>
					<View style={styles.noAccountContainer}>
						<Text style={styles.noAccount}>Don't have an account? </Text>
						<Text style={styles.signUpNow} onPress={handleNavigateToRegister}>
							Sign up now.
						</Text>
					</View>
				</View>
			</KeyboardAvoidingView>
		</DismissKeyboard>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#F8F9FB",
		paddingHorizontal: 24,
		gap: 16,
	},
	forgotPassword: {
		textDecorationLine: "underline",
		paddingTop: 4,
		alignSelf: "flex-end",
		color: "#7E869A",
		fontSize: 14,
		fontFamily: "Lato_400Regular",
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
