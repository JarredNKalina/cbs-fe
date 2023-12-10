import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import { RootBottomTabsParamList } from "../../components/navigation"

type InspirationScreenProp = StackNavigationProp<RootBottomTabsParamList, "Inspiration">

export function InspirationScreen() {
	const navigation = useNavigation<InspirationScreenProp>()

	return (
		<View>
			<Text>Inspirations</Text>
		</View>
	)
}
