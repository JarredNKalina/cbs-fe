import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { StepOne } from "./StepOne"
import { StepTwo } from "./StepTwo"
import { DismissKeyboard, Header } from "../../../components"

type LoginScreenProp = StackNavigationProp<RootStackParamList, "ForgotPassword">
export function ForgotPassword() {
	const [isCodeCreated, setIsCodeCreated] = useState(false)
	const [completed, setIsCompleted] = useState(false)
	const navigation = useNavigation<LoginScreenProp>()

	function handleNavigateToLogin() {
		navigation.navigate("Login")
	}
	2

	return (
		<DismissKeyboard>
			<KeyboardAvoidingView style={styles.container} behavior="height">
				<View>
					{!isCodeCreated && !completed && (
						<StepOne setIsCodeCreated={setIsCodeCreated} />
					)}
					{isCodeCreated && !completed && <StepTwo setIsCompleted={setIsCompleted} />}
					{completed && <Header>You successfully changed you password</Header>}
					{!completed ? (
						<View style={styles.noAccountContainer}>
							<Text style={styles.noAccount}>
								Don't need to reset your password?{" "}
							</Text>
							<Text style={styles.signUpNow} onPress={handleNavigateToLogin}>
								Log in.
							</Text>
						</View>
					) : (
						<View style={styles.noAccountContainer}>
							<Text style={styles.signUpNow} onPress={handleNavigateToLogin}>
								Go To Login Page.
							</Text>
						</View>
					)}
				</View>
			</KeyboardAvoidingView>
		</DismissKeyboard>
	)
}

//REFACTOR STEP TWO STUFF INTO ANOTHER FORMDATA OBJECT
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
