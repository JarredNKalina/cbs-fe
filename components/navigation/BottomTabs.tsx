import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "../../views/home"
import { BarberScreen } from "../../views/barber"
import { InspirationScreen } from "../../views/inspiration"
import { AccountSettingsScreen } from "../../views/account-settings"
import { BookingScreen } from "../../views/booking"
import { TabBar } from "./TabBar"
import { HomePageHeader } from "../index"

export type RootBottomTabsParamList = {
	Home: undefined
	Profile: undefined
	Booking: undefined
	Inspiration: undefined
	Barber: undefined
}
const Tab = createBottomTabNavigator<RootBottomTabsParamList>()

export function BottomTabs() {
	return (
		<Tab.Navigator initialRouteName={"Home"} tabBar={props => <TabBar {...props} />}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ header: props => <HomePageHeader {...props} /> }}
			/>
			<Tab.Screen
				name="Inspiration"
				component={InspirationScreen}
				options={{ headerStyle: { backgroundColor: "#E3E4E8" } }}
			/>
			<Tab.Screen
				name="Booking"
				component={BookingScreen}
				options={{
					headerStyle: { backgroundColor: "#E3E4E8" },
				}}
			/>
			<Tab.Screen
				name="Barber"
				component={BarberScreen}
				options={{ headerStyle: { backgroundColor: "#E3E4E8" } }}
			/>
			<Tab.Screen
				name="Profile"
				component={AccountSettingsScreen}
				options={{ headerStyle: { backgroundColor: "#E3E4E8" } }}
			/>
		</Tab.Navigator>
	)
}
