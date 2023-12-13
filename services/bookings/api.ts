import { z } from "zod"
import { fetchNoToken } from "../fetchNoToken"
import { BookingCreateDTO, bookingProfile, bookingValidator } from "./validators"

export async function getAllBookings(squareCustomerId: string, days: number) {
	const res = await fetchNoToken(`/bookings/${squareCustomerId}?days=${days}`, null)
	if (!res.ok) throw new Error("Network response was not ok")
	const data = Object.values(await res.json())
	return z.array(bookingValidator).parse(data)
}

export async function getBookingProfiles() {
	const res = await fetchNoToken(`/bookings`, null)
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()

	// TODO add soonest available time to this response somehow.
	return z.array(bookingProfile).parse(data)
}


export async function postBooking(bookingDTO: BookingCreateDTO) {
	const res = await fetchNoToken(`/bookings`, JSON.stringify(bookingDTO), "POST")
	if (!res.ok) throw new Error("Network response was not ok")
	await res.json()
}
