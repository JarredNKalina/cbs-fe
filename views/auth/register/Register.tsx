import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../App"
import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { Label, Header, Input, Button, DismissKeyboard } from "../../../components"
import {
	getLastNameError,
	getPasswordError,
	getPhoneNumberError,
	isFieldTouched,
} from "../validation/authValidation"
import { getFirstNameError } from "../validation/authValidation"
import { useMutation } from "@tanstack/react-query"
import { createCustomer } from "../../../services/customers/api"
import { useSignUp } from "@clerk/clerk-expo"

type RegisterScreenProp = StackNavigationProp<RootStackParamList, "Login">
type FormInputs = "password" | "firstName" | "lastName" | "phoneNumber"
type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>

export function Register() {
	const navigation = useNavigation<RegisterScreenProp>()
	const [wasSubmitted, setWasSubmitted] = useState(false)
	const [code, setCode] = useState("")
	const [pendingVerification, setPendingVerification] = useState(false)
	const { isLoaded, signUp, setActive } = useSignUp()

	const [formInfo, setFormInfo] = useState<Form>({
		password: { errorMessage: null, touched: false, text: "" },
		firstName: { errorMessage: null, touched: false, text: "" },
		lastName: { errorMessage: null, touched: false, text: "" },
		phoneNumber: { errorMessage: null, touched: false, text: "" },
	})

	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function validateForm() {
		let newFormInfo = { ...formInfo }

		if (newFormInfo.password.touched || wasSubmitted) {
			newFormInfo.password.errorMessage = getPasswordError(newFormInfo)
		}
		if (newFormInfo.firstName.touched || wasSubmitted) {
			newFormInfo.firstName.errorMessage = getFirstNameError(newFormInfo)
		}
		if (newFormInfo.lastName.touched || wasSubmitted) {
			newFormInfo.lastName.errorMessage = getLastNameError(newFormInfo)
		}
		if (newFormInfo.phoneNumber.touched || wasSubmitted) {
			newFormInfo.phoneNumber.errorMessage = getPhoneNumberError(newFormInfo)
		}

		setFormInfo(newFormInfo)
		return [
			formInfo.password.errorMessage,
			formInfo.firstName.errorMessage,
			formInfo.lastName.errorMessage,
			formInfo.phoneNumber.errorMessage,
		]
	}

	const createCustomerMutation = useMutation({
		mutationFn: createCustomer,
		onSuccess: async id => {},
	})

	useEffect(() => {
		if (
			wasSubmitted ||
			isFieldTouched(formInfo, "password") ||
			isFieldTouched(formInfo, "firstName") ||
			isFieldTouched(formInfo, "lastName") ||
			isFieldTouched(formInfo, "phoneNumber")
		)
			validateForm()
	}, [
		formInfo.password.text,
		formInfo.firstName.text,
		formInfo.firstName.touched,
		formInfo.lastName.text,
		formInfo.lastName.touched,
		formInfo.password.touched,
		formInfo.phoneNumber.text,
		formInfo.phoneNumber.touched,
	])

	async function handleRegister() {
		setWasSubmitted(true)
		const errors = validateForm()

		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors || !isLoaded) return

		try {
			await signUp.create({
				password: formInfo.password.text,
				phoneNumber: formInfo.phoneNumber.text,
				firstName: formInfo.firstName.text,
				lastName: formInfo.lastName.text,
			})

			await signUp.preparePhoneNumberVerification({ strategy: "phone_code" })
			setPendingVerification(true)
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	async function onPressVerify() {
		if (!isLoaded) return

		try {
			const completeSignUp = await signUp.attemptPhoneNumberVerification({
				code,
			})

			await createCustomerMutation.mutateAsync({
				firstName: formInfo.firstName.text,
				lastName: formInfo.lastName.text,
				phoneNumber: formInfo.phoneNumber.text,
				createdUserId: completeSignUp.createdUserId,
			})

			await setActive({ session: completeSignUp.createdSessionId })
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	function handleNavigateToLogin() {
		navigation.navigate("Login")
	}

	if (createCustomerMutation.isLoading) {
		return (
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	return (
		<DismissKeyboard>
			<KeyboardAvoidingView style={styles.container} behavior="height">
				{!pendingVerification && (
					<>
						<Header>Register</Header>
						<View>
							<View style={styles.inputContainer}>
								<View>
									<Label>First name</Label>
									<Input
										placeholder="Enter First Name"
										value={formInfo.firstName.text}
										onChange={text => setText(text, "firstName")}
										wasSubmitted={wasSubmitted}
										errorMessage={formInfo.firstName.errorMessage}
										touched={formInfo.firstName.touched}
										onBlur={() => {
											handleWasInputTouched("firstName")
										}}
									/>
								</View>
								<View>
									<Label>Last name</Label>

									<Input
										placeholder="Enter Last Name"
										value={formInfo.lastName.text}
										onChange={text => setText(text, "lastName")}
										wasSubmitted={wasSubmitted}
										errorMessage={formInfo.lastName.errorMessage}
										touched={formInfo.lastName.touched}
										onBlur={() => {
											handleWasInputTouched("lastName")
										}}
									/>
								</View>
								<View>
									<Label>Phone Number</Label>
									<Input
										placeholder="Enter Phone Number"
										value={formInfo.phoneNumber.text}
										onChange={text => setText(text, "phoneNumber")}
										wasSubmitted={wasSubmitted}
										errorMessage={formInfo.phoneNumber.errorMessage}
										touched={formInfo.phoneNumber.touched}
										keyboardType="phone-pad"
										onBlur={() => {
											handleWasInputTouched("phoneNumber")
										}}
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
								<Text style={styles.signUpNow} onPress={handleNavigateToLogin}>
									Login.
								</Text>
							</View>
						</View>
					</>
				)}
				{pendingVerification && (
					<View style={styles.verifyEmailContainer}>
						<View style={styles.gapFlex}>
							<Header>Code sent to {formInfo.phoneNumber.text}</Header>
							<View>
								<Label>Enter confirmation code</Label>
								<Input
									value={code}
									placeholder="Enter Code"
									onChange={code => setCode(code)}
									wasSubmitted={false}
								/>
							</View>
						</View>
						<Button onPress={onPressVerify}>Verify Email</Button>
					</View>
				)}
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
	inputContainer: {
		alignContent: "center",
		justifyContent: "center",
		gap: 24,
	},
	actionContainer: { paddingTop: 32 },
	noAccountContainer: { flexDirection: "row", paddingTop: 16 },
	noAccount: { fontFamily: "Lato_400Regular", fontSize: 14, color: "#3E3E3E" },
	signUpNow: { fontFamily: "Lato_700Bold", color: "#2C55BE", textDecorationLine: "underline" },
	spinnerContainer: { flex: 1, justifyContent: "center" },
	verifyEmailContainer: { flex: 1, gap: 24, justifyContent: "center" },
	gapFlex: { gap: 16 },
})
