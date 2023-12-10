import { AccountIcon, BarberIcon, BookingsIcon, HomeIcon, InspirationIcon } from "../../icons"
import { RootBottomTabsParamList } from "./BottomTabs"

type NavigationIcon = { routeName: keyof RootBottomTabsParamList | string; fill?: string }
export function NavigationIcon({ routeName, fill }: NavigationIcon) {
	if (routeName === "Barber") {
		return <BarberIcon fill={fill} />
	} else if (routeName === "Booking") {
		return <BookingsIcon fill={fill} />
	} else if (routeName === "Home") {
		return <HomeIcon fill={fill} />
	} else if (routeName === "Inspiration") {
		return <InspirationIcon fill={fill} />
	} else if (routeName === "Profile") {
		return <AccountIcon fill={fill} />
	}
	return null
}
