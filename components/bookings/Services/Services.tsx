import { Pressable, StyleSheet, Text, View } from "react-native"
import { Service } from "../../../services/services/validators"
import { Dispatch, SetStateAction } from "react"
import { ChevronDownIcon } from "../../../icons"
import { BookingsTabs } from "../../../views/booking/BookingScreen"
import { Button } from "../../Button"

type ServiceProps = {
	services: Service[]
	selectedId: string | null
	setSelectedId: Dispatch<SetStateAction<string | null>>
	setTab: Dispatch<SetStateAction<BookingsTabs>>
}
export function Services({ services, selectedId, setSelectedId, setTab }: ServiceProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>Select a service</Text>
			<View style={styles.servicesContainer}>
				{services.map(service => {
					return (
						<Pressable
							style={
								selectedId === service.variation.id
									? styles.selectedServiceCard
									: styles.serviceCard
							}
							onPress={() => setSelectedId(service.variation.id)}
							key={service.id}
						>
							<View style={styles.serviceTextContainer}>
								<Text style={styles.serviceName}>{service.itemData.name}</Text>
								<View style={styles.infoContainer}>
									{/* TODO: TURN THIS VIEW INTO A POPUP EXPLAINING THE SERVICE */}
									<Text style={{ fontFamily: "Lato_400Regular", fontSize: 16 }}>
										{service.variation.itemVariationData.serviceDuration
											? service.variation.itemVariationData.serviceDuration /
													60 /
													1000 +
											  " Minutes"
											: "Time Varies"}
									</Text>
									<View style={styles.serviceInfo}>
										<Text
											style={{
												fontFamily: "Lato_400Regular",
												fontSize: 16,
												color: "#2C55BE",
											}}
										>
											Service Info
										</Text>
										<ChevronDownIcon />
									</View>
								</View>
							</View>
							<View style={styles.priceTag}>
								<Text style={styles.priceText}>
									${service.variation.itemVariationData.priceMoney?.amount / 100}
								</Text>
							</View>
						</Pressable>
					)
				})}
				<Button
					onPress={() => {
						setTab(2)
					}}
					disabled={selectedId === null}
				>
					Continue
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 24,
		paddingHorizontal: 24,
		gap: 24,
	},
	headerText: { fontFamily: "Lato_700Bold", fontSize: 24 },
	servicesContainer: { gap: 24 },
	serviceCard: {
		paddingVertical: 20,
		paddingLeft: 24,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
		borderWidth: 2,
		borderColor: "#FFFFFF",
	},
	selectedServiceCard: {
		paddingVertical: 20,
		paddingLeft: 24,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
		borderWidth: 2,
		borderColor: "#2C55BE",
	},
	serviceTextContainer: { gap: 8 },
	serviceName: { fontFamily: "Lato_700Bold", fontSize: 18 },
	serviceDescriptionContainer: { flexDirection: "row", gap: 16 },
	priceTag: {
		backgroundColor: "#2C55BE",
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
		justifyContent: "center",
		paddingHorizontal: 12,
		alignItems: "center",
		paddingVertical: 4,
		height: 32,
	},
	priceText: { color: "#FFFFFF", fontFamily: "Lato_700Bold", fontSize: 18 },
	serviceInfo: { flexDirection: "row", gap: 4, alignItems: "center" },
	infoContainer: { flexDirection: "row", gap: 8 },
})
