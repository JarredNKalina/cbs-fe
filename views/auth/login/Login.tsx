import { useEffect, useState } from "react"
import { KeyboardAvoidingView, Text } from "react-native"
import { StyleSheet, View } from "react-native"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, Header, Input, Label } from "../../../components"
import { getEmailError, getPasswordError, isFieldTouched } from "../validation/authValidation"

type LoginScreenProp = StackNavigationProp<RootStackParamList, "Login">
type FormInputs = "email" | "password"
type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>

export function Login() {
	const [wasSubmitted, setWasSubmitted] = useState(false)
	const [formInfo, setFormInfo] = useState<Form>({
		email: { errorMessage: null, touched: false, text: "" },
		password: { errorMessage: null, touched: false, text: "" },
	})

	const navigation = useNavigation<LoginScreenProp>()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				navigation.navigate("Home")
			}
		})
	}, [])

	useEffect(() => {
		if (
			wasSubmitted ||
			isFieldTouched(formInfo, "email") ||
			isFieldTouched(formInfo, "password")
		)
			validateForm()
	}, [
		formInfo.email.text,
		formInfo.email.touched,
		formInfo.password.touched,
		formInfo.password.text,
	])

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function validateForm() {
		let newFormInfo = { ...formInfo }

		if (formInfo.password.touched) {
			newFormInfo.password.errorMessage = getPasswordError(newFormInfo)
		}

		if (newFormInfo.email.touched) newFormInfo.email.errorMessage = getEmailError(newFormInfo)

		setFormInfo(newFormInfo)

		return [formInfo.email.errorMessage, formInfo.password.errorMessage]
	}

	async function handleLogin() {
		setWasSubmitted(true)
		const errors = validateForm()
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors) {
			return
		}

		await signInWithEmailAndPassword(auth, formInfo.email.text, formInfo.email.text)
			.then(userCredential => {
				const user = userCredential.user
				console.log({ user })
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log({ errorCode, errorMessage })
			})
	}

	function handleNavigateToRegister() {
		navigation.navigate("Register")
	}

	function handleNavigateToForgotPassword() {
		navigation.navigate("ForgotPassword")
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<View>
				<Header>Sign in</Header>
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
