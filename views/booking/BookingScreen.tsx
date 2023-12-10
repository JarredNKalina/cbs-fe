import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { RootBottomTabsParamList } from "../../components/navigation"
import { StackNavigationProp } from "@react-navigation/stack"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllServices } from "../../services/services/api"
import { useEffect, useState } from "react"
import { Services } from "../../components/bookings/Services"
import { getBookingProfiles, postBooking } from "../../services/bookings/api"
import { Barbers } from "../../components/bookings/Barbers"
import { ChevronLeftIcon } from "../../icons"
import { Appointment } from "../../components/bookings/Appointment"
import { Confirmation } from "../../components/bookings/Confirmation"
import { Availability } from "../../components/bookings/Appointment/utils"
import { useClerk } from "@clerk/clerk-expo"
import { formatRFC3339 } from "date-fns"

export type BookingsTabs = 1 | 2 | 3 | 4
type BookingScreenProp = StackNavigationProp<RootBottomTabsParamList, "Booking">
export function BookingScreen() {
	const navigation = useNavigation<BookingScreenProp>()

	const [selectedServiceId, setSelectedServiceId] = useState<null | string>(null)
	const [selectedBarberId, setSelectedBarberId] = useState<null | string>(null)
	const [selectedDate, setSelectedDate] = useState<null | Availability>(null)
	const [selectedTime, setSelectedTime] = useState<null | string>(null)
	const [locationId, setLocationId] = useState<null | string>(null)
	const [additionalInformation, setAdditionalInformation] = useState("")

	const [tab, setTab] = useState<BookingsTabs>(1)

	const { user } = useClerk()
	const {
		data: services,
		isLoading: areServicesLoading,
		isError: isServicesError,
	} = useQuery({
		queryFn: () => getAllServices(),
		queryKey: ["services"],
	})

	const {
		data: barberProfiles,
		isLoading: areProfilesLoading,
		isError: isProfilesError,
	} = useQuery({
		queryFn: () => getBookingProfiles(),
		queryKey: ["booking-profiles"],
	})

	function resetState() {
		setTab(1)
		setSelectedServiceId(null)
		setSelectedBarberId(null)
		setSelectedDate(null)
		setSelectedTime(null)
		setLocationId(null)
		setAdditionalInformation("")
	}
	const createBooking = useMutation({
		mutationFn: postBooking,
		onSuccess: async id => {
			resetState()

			navigation.navigate("Home")
			// Dispatch some sort of toast
		},
	})

	useEffect(() => {
		navigation.setOptions({
			headerLeft: props => {
				const newTab = tab - 1
				if (newTab === 1 || newTab === 2 || newTab === 3) {
					return (
						<Pressable onPress={() => setTab(newTab)} style={{ paddingLeft: 24 }}>
							<ChevronLeftIcon fill="black" />
						</Pressable>
					)
				}
			},
		})
	}, [tab])
	function confirmBooking() {
		if (
			!selectedBarberId ||
			!selectedServiceId ||
			!selectedDate ||
			!selectedTime ||
			!locationId
		)
			return null

		const service = services?.find(service => service.variation.id === selectedServiceId)
		if (!service) return null

		const date = new Date(`${selectedDate.date.split("T")[0]}T${selectedTime}:00Z`)

		const year = date.getUTCFullYear()
		const month = date.getUTCMonth()
		const day = date.getUTCDate()
		const hour = date.getUTCHours()
		const minute = date.getUTCMinutes()

		const startAt = formatRFC3339(new Date(year, month, day, hour, minute))

		createBooking.mutate({
			appointmentSegments: {
				serviceId: selectedServiceId,
				teamMemberId: selectedBarberId,
				serviceVariationVersion: service.variation.version,
			},
			customerId: user?.publicMetadata.squareCustomerId as string,
			locationId: locationId,
			startAt,
			customerNote: additionalInformation === "" ? undefined : additionalInformation,
		})
	}
	if (isServicesError || isProfilesError) {
		return (
			<View>
				<Text>Something went wrong.</Text>
			</View>
		)
	}

	if (areServicesLoading || areProfilesLoading) {
		return (
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		)
	}

	const tabContent: Record<BookingsTabs, JSX.Element> = {
		1: (
			<Services
				selectedId={selectedServiceId}
				services={services}
				setSelectedId={setSelectedServiceId}
				setTab={setTab}
			/>
		),
		2: (
			<Barbers
				selectedId={selectedBarberId}
				setSelectedId={setSelectedBarberId}
				barberProfiles={barberProfiles}
				setTab={setTab}
			/>
		),
		3: (
			<Appointment
				selectedBarberId={selectedBarberId ? selectedBarberId : ""}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				selectedTime={selectedTime}
				setSelectedTime={setSelectedTime}
				selectedServiceId={selectedServiceId ? selectedServiceId : ""}
				setTab={setTab}
				setLocationId={setLocationId}
			/>
		),
		4: (
			<Confirmation
				barber={barberProfiles.find(barber => barber.teamMemberId === selectedBarberId)}
				time={selectedTime}
				date={selectedDate}
				service={services.find(service => service.variation.id === selectedServiceId)}
				additionalInformation={additionalInformation}
				setAdditionalInformation={setAdditionalInformation}
				confirmFn={confirmBooking}
				setTab={setTab}
			/>
		),
	}

	return tabContent[tab]
}

const styles = StyleSheet.create({
	spinnerContainer: { flex: 1, justifyContent: "center" },
})
