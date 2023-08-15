import { createStackNavigator } from "@react-navigation/stack"
import { Home } from "./views/home"
import { Login } from "./views/auth/login"
import { NavigationContainer } from "@react-navigation/native"
import * as SplashScreen from "expo-splash-screen"
import {
	useFonts,
	Lato_300Light,
	Lato_400Regular,
	Lato_700Bold,
	Lato_900Black,
} from "@expo-google-fonts/lato"
import { SourceSansPro_400Regular } from "@expo-google-fonts/source-sans-pro"
import { Register } from "./views/auth/register"
import { ForgotPassword } from "./views/auth/forgot-password/ForgotPassword"

export type RootStackParamList = {
	Login: undefined
	Home: undefined
	Register: undefined
	ForgotPassword: undefined
}
const Stack = createStackNavigator<RootStackParamList>()

SplashScreen.preventAutoHideAsync()

export default function App() {
	let [fontsLoaded] = useFonts({
		Lato_300Light,
		Lato_400Regular,
		Lato_700Bold,
		Lato_900Black,
		SourceSansPro_400Regular,
	})

	if (!fontsLoaded) {
		return null
	} else {
		SplashScreen.hideAsync()
	}
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
				<Stack.Screen
					options={{ headerShown: false }}
					name="Register"
					component={Register}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="ForgotPassword"
					component={ForgotPassword}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
