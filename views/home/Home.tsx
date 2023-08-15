import { signOut } from "firebase/auth"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { auth } from "../../firebase"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../App"

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Login">

export function Home() {
	const navigation = useNavigation<HomeScreenProp>()

	function handleSignOut() {
		signOut(auth)
			.then(() => {
				navigation.navigate("Login")
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log({ errorCode, errorMessage })
			})
	}

	return (
		<View>
			<Text>Email: {auth.currentUser?.email}</Text>
			<TouchableOpacity style={styles.button} onPress={handleSignOut}>
				<Text>Sign Out</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	button: { backgroundColor: "#0782F9", width: "100%", padding: 15, borderRadius: 10 },
	buttonOutline: {
		backgroundColor: "white",
		marginTop: 5,
		borderWidth: 2,
		borderColor: "#0782F9",
	},
	buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
	buttonOutlineText: { color: "#0782F9", fontWeight: "700", fontSize: 16 },
})
