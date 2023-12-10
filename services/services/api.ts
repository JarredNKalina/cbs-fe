import { z } from "zod"
import { fetchNoToken } from "../fetchNoToken"
import { servicesValidator } from "./validators"
import { availabilityValidator } from "../bookings/validators"

export async function getAllServices() {
	const res = await fetchNoToken(`/services`, null)
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()

	return z.array(servicesValidator).parse(data)
}

export async function getAvailability(serviceId: string, teamMemberId: string) {
	const res = await fetchNoToken(
		`/bookings/${serviceId}/availability?teamMemberId=${teamMemberId}`,
		null
	)
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()

	return z.array(availabilityValidator).parse(data)
}

//bookings/:serviceId/availability?teamMemberId=TMo-ySs5vE9dqpkM
