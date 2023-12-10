import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Login } from "./views/auth/login"
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
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { BottomTabs } from "./components/navigation"

export type RootStackParamList = {
	Login: undefined
	Register: undefined
	ForgotPassword: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync()

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key)
		} catch (err) {
			return null
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value)
		} catch (err) {
			return
		}
	},
}

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
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<SignedOut>
						<NavigationContainer>
							<Stack.Navigator initialRouteName="Login">
								<Stack.Screen
									options={{ headerShown: false }}
									name="Login"
									component={Login}
								/>
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
					</SignedOut>
					<SignedIn>
						<NavigationContainer>
							<BottomTabs />
						</NavigationContainer>
					</SignedIn>
				</SafeAreaProvider>
			</QueryClientProvider>
		</ClerkProvider>
	)
}
