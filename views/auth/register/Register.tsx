import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../App"
import { useNavigation } from "@react-navigation/native"
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Label, Header, Input, Button } from "../../../components"
import {
	getEmailError,
	getFullNameError,
	getPasswordError,
	isFieldTouched,
} from "../validation/authValidation"

type RegisterScreenProp = StackNavigationProp<RootStackParamList, "Login">
type FormInputs = "email" | "password" | "fullName"
type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>

export function Register() {
	const navigation = useNavigation<RegisterScreenProp>()

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [wasSubmitted, setWasSubmitted] = useState(false)
	const [formInfo, setFormInfo] = useState<Form>({
		email: { errorMessage: null, touched: false, text: "" },
		password: { errorMessage: null, touched: false, text: "" },
		fullName: { errorMessage: null, touched: false, text: "" },
	})

	function validateForm() {
		let newFormInfo = { ...formInfo }

		if (newFormInfo.password.touched) {
			newFormInfo.password.errorMessage = getPasswordError(newFormInfo)
		}
		if (newFormInfo.email.touched) {
			newFormInfo.email.errorMessage = getEmailError(newFormInfo)
		}
		if (newFormInfo.fullName.touched) {
			newFormInfo.fullName.errorMessage = getFullNameError(newFormInfo)
		}

		setFormInfo(newFormInfo)
		return [
			formInfo.email.errorMessage,
			formInfo.password.errorMessage,
			formInfo.fullName.errorMessage,
		]
	}

	useEffect(() => {
		if (
			wasSubmitted ||
			isFieldTouched(formInfo, "email") ||
			isFieldTouched(formInfo, "password") ||
			isFieldTouched(formInfo, "fullName")
		)
			validateForm()
	}, [
		formInfo.email.text,
		formInfo.password.text,
		formInfo.fullName.text,
		formInfo.fullName.touched,
		formInfo.email.touched,
		formInfo.password.touched,
	])

	async function handleRegister() {
		setWasSubmitted(true)
		const errors = validateForm()
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors) {
			return
		}

		await createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				console.log({ user })
				try {
					AsyncStorage.setItem("username", fullName)
					navigation.navigate("Home")
				} catch (error) {
					console.log({ error })
				}
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log({ errorCode, errorMessage })
			})
	}

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	function handleNavigateToRegister() {
		navigation.navigate("Login")
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<View>
				<Header>Register</Header>
				<View style={styles.inputContainer}>
					<View>
						<Label>Full name</Label>
						<Input
							placeholder="Enter Full Name"
							value={fullName}
							onChange={text => setFullName(text)}
							wasSubmitted={wasSubmitted}
							errorMessage={formInfo.fullName.errorMessage}
							touched={formInfo.fullName.touched}
							onBlur={() => {
								handleWasInputTouched("fullName")
							}}
						/>
					</View>
					<View>
						<Label>Email</Label>
						<Input
							placeholder="Enter Email"
							value={email}
							onChange={text => setEmail(text)}
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
							value={password}
							onChange={text => setPassword(text)}
							wasSubmitted={wasSubmitted}
							errorMessage={formInfo.password.errorMessage}
							touched={formInfo.password.touched}
							onBlur={() => {
								handleWasInputTouched("password")
							}}
						/>
					</View>
				</View>
				<View style={styles.actionContainer}>
					<Button
						onPress={async () => {
							await handleRegister()
						}}
					>
						Sign in
					</Button>
				</View>
				<View style={styles.noAccountContainer}>
					<Text style={styles.noAccount}>Already have an account? </Text>
					<Text style={styles.signUpNow} onPress={handleNavigateToRegister}>
						Login.
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
