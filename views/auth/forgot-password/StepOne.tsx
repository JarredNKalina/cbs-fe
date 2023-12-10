import { StyleSheet, Text, View } from "react-native"
import { Button, Header, Input, Label } from "../../../components"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { getPhoneNumberError } from "../validation/authValidation"
import { useSignIn } from "@clerk/clerk-expo"

type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>
type FormInputs = "phoneNumber"
type StepOneProps = { setIsCodeCreated: Dispatch<SetStateAction<boolean>> }
export function StepOne({ setIsCodeCreated }: StepOneProps) {
	const [formInfo, setFormInfo] = useState<Form>({
		phoneNumber: { errorMessage: null, touched: false, text: "" },
	})

	const { isLoaded, signIn } = useSignIn()

	const [wasSubmitted, setWasSubmitted] = useState(false)

	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	useEffect(() => {
		if (wasSubmitted) validateStep()
	}, [formInfo.phoneNumber.text])

	function validateStep() {
		let newFormInfo = { ...formInfo }

		if (formInfo.phoneNumber.touched) {
			newFormInfo.phoneNumber.errorMessage = getPhoneNumberError(newFormInfo)
		}

		setFormInfo(newFormInfo)
		return [formInfo.phoneNumber.errorMessage]
	}

	async function handleSendCode() {
		setWasSubmitted(true)
		const errors = validateStep()
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors || !isLoaded) {
			return
		}

		await signIn
			.create({
				strategy: "reset_password_phone_code",
				identifier: formInfo.phoneNumber.text,
			})
			.then(() => {
				setIsCodeCreated(true)
			})
	}

	return (
		<View style={styles.gapFlex}>
			<Header>Want to reset your password?</Header>
			<View>
				<Text style={styles.forgotPasswordInfo}>
					Enter your phone number to recieve a Reset Password Code.
				</Text>
				<View style={styles.inputContainer}>
					<Label>Phone Number</Label>
					<Input
						placeholder="Enter Phone Number"
						keyboardType="phone-pad"
						value={formInfo.phoneNumber.text}
						onChange={text => setText(text, "phoneNumber")}
						wasSubmitted={wasSubmitted}
						errorMessage={formInfo.phoneNumber.errorMessage}
						touched={formInfo.phoneNumber.touched}
						onBlur={() => {
							handleWasInputTouched("phoneNumber")
						}}
					/>
				</View>
				<View style={styles.actionContainer}>
					<Button onPress={async () => await handleSendCode()}>Send Code</Button>
				</View>
			</View>
		</View>
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
	gapFlex: { gap: 16 },
})
