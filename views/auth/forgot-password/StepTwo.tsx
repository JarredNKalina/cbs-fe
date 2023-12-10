import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Header, Input, Label } from "../../../components"
import { StyleSheet, Text, View } from "react-native"
import { getCodeError, getPasswordError } from "../validation/authValidation"
import { useSignIn } from "@clerk/clerk-expo"

type Form = Record<FormInputs, { errorMessage: string | null; touched: boolean; text: string }>
type FormInputs = "password" | "code"

type StepTwoProps = { setIsCompleted: Dispatch<SetStateAction<boolean>> }
export function StepTwo({ setIsCompleted }: StepTwoProps) {
	const [formInfo, setFormInfo] = useState<Form>({
		code: { errorMessage: null, touched: false, text: "" },
		password: { errorMessage: null, touched: false, text: "" },
	})

	const [wasSubmitted, setWasSubmitted] = useState(false)

	const { isLoaded, signIn } = useSignIn()
	function setText(text: string, input: FormInputs) {
		setFormInfo({ ...formInfo, [input]: { ...formInfo[input], text } })
	}

	function handleWasInputTouched(formInputs: FormInputs) {
		setFormInfo({ ...formInfo, [formInputs]: { ...formInfo[formInputs], touched: true } })
	}

	useEffect(() => {
		if (wasSubmitted) validateStep()
	}, [formInfo.code.text, formInfo.code.text])

	function validateStep() {
		let newFormInfo = { ...formInfo }

		if (formInfo.password.touched) {
			newFormInfo.password.errorMessage = getPasswordError(newFormInfo)
		}

		if (formInfo.code.touched) {
			newFormInfo.code.errorMessage = getCodeError(newFormInfo)
		}

		setFormInfo(newFormInfo)
		return [formInfo.code.errorMessage, formInfo.code.errorMessage]
	}

	async function setNewPassword() {
		setWasSubmitted(true)
		const errors = validateStep()
		const areThereErrors = errors.some(error => error !== null)
		if (areThereErrors || !isLoaded) {
			return
		}

		await signIn
			.attemptFirstFactor({
				strategy: "reset_password_phone_code",
				code: formInfo.code.text,
				password: formInfo.password.text,
			})
			.then(result => {
				if (result.status === "complete") {
					setIsCompleted(true)
				} else {
					console.log({ result })
				}
			})
	}

	return (
		<View style={styles.gapFlex}>
			<Header>Reset your password.</Header>
			<View>
				<Text style={styles.forgotPasswordInfo}>Enter code and set your new password.</Text>
				<View style={styles.inputContainer}>
					<View>
						<Label>Reset Code</Label>
						<Input
							placeholder="Enter Reset Code"
							value={formInfo.code.text}
							onChange={code => setText(code, "code")}
							wasSubmitted={wasSubmitted}
							errorMessage={formInfo.code.errorMessage}
							onBlur={() => {
								handleWasInputTouched("code")
							}}
							touched={formInfo.code.touched}
						/>
					</View>
					<View>
						<Label>New Password</Label>
						<Input
							placeholder="Enter New Password"
							secureText={true}
							value={formInfo.password.text}
							onChange={password => setText(password, "password")}
							wasSubmitted={wasSubmitted}
							errorMessage={formInfo.password.errorMessage}
							onBlur={() => {
								handleWasInputTouched("password")
							}}
							touched={formInfo.password.touched}
						/>
					</View>
				</View>
				<View style={styles.actionContainer}>
					<Button onPress={async () => await setNewPassword()}>Send Code</Button>
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
		paddingBottom: 24,
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
