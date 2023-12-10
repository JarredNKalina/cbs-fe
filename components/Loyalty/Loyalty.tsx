import { StyleSheet, Text, View } from "react-native"
import { Header } from "../Header"
import { BarberIcon } from "../../icons"
import { Button } from "../Button"
import { LoyaltyInfo } from "../../services/loyalty/validators"

type LoyaltyProps = { loyalty: LoyaltyInfo }
export function Loyalty({ loyalty }: LoyaltyProps) {
	return (
		<View style={styles.container}>
			<View style={styles.headerFlex}>
				<Header>Clip points</Header>
				<View style={styles.totalDiv}>
					<Header color="#2C55BE">{loyalty.balance}</Header>
					<BarberIcon fill={"#2C55BE"} style={styles.smallIcon} width="16" height="16" />
				</View>
			</View>
			<View style={styles.loyaltyContainer}>
				<LoyaltyTier loyalty={loyalty} tier={1} />
				<LoyaltyTier loyalty={loyalty} tier={2} />
				<LoyaltyTier loyalty={loyalty} tier={3} />
				<LoyaltyTier loyalty={loyalty} tier={4} />
				<LoyaltyTier loyalty={loyalty} tier={5} />
			</View>
			<View style={styles.loyaltyButtonContainer}>
				<Button onPress={() => {}} variant="secondary">
					Details
				</Button>
				<Button onPress={() => {}} variant="secondary" disabled>
					Redeem
				</Button>
			</View>
		</View>
	)
}

type LoyaltyTierProps = { tier: 1 | 2 | 3 | 4 | 5; loyalty: LoyaltyInfo }
function LoyaltyTier({ tier, loyalty }: LoyaltyTierProps) {
	function getFill(tier: 1 | 2 | 3 | 4 | 5) {
		const targetPoints = loyalty.rewardTiers.map(tier => tier.points)[0]
		const currentPoints = loyalty.balance

		const step = (targetPoints / 5) * tier

		if (currentPoints >= step) {
			return "#2C55BE"
		} else return "#BCBCBC"
	}

	const currentPoints = loyalty.balance
	const targetPoints = loyalty.rewardTiers.map(tier => tier.points)[0]
	const stepSize = targetPoints / 5

	function getPercentage(tier: 1 | 2 | 3 | 4 | 5) {
		if (!loyalty) return 0

		const divider = currentPoints - stepSize * (tier - 1)
		const percentage = (divider / stepSize) * 100

		if (percentage > 100) return 100
		if (currentPoints === 0 || percentage < 0) return 0
		else return percentage
	}

	function getColor() {
		if (getPercentage(tier) === 100) return "#2C55BE"
		else return "#BCBCBC"
	}
	return (
		<>
			<View style={styles.loyaltyBar}>
				<View
					style={{
						width: `${getPercentage(tier)}%`,
						backgroundColor: "#2C55BE",
						height: 3,
						borderRadius: 24,
					}}
				/>
			</View>
			<View style={{ alignItems: "center", gap: 8 }}>
				<BarberIcon style={styles.icon} fill={getFill(tier)} />
				<Text style={{ fontFamily: "Lato_700Bold", color: getColor() }}>
					{stepSize * tier}
				</Text>
			</View>
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		gap: 24,
	},

	headerFlex: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	totalDiv: { flexDirection: "row", gap: 8, alignItems: "center" },
	loyaltyContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	smallIcon: {
		transform: [{ rotate: "90deg" }],
	},
	icon: {
		transform: [{ rotate: "90deg" }],
	},
	loyaltyBar: {
		width: 32,
		height: 3,
		marginBottom: 16,
		backgroundColor: "#BCBCBC",
		borderRadius: 24,
	},
	loyaltyButtonContainer: {
		flexDirection: "row",
		gap: 16,
	},
})
