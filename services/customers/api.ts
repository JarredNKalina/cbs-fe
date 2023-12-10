import { fetchNoToken } from "../fetchNoToken"
import { z } from "zod"

type CustomerCreateDTO = {
	firstName: string
	lastName: string
	phoneNumber: string
	createdUserId: string | null
}
export async function createCustomer(customer: CustomerCreateDTO) {
	const res = await fetchNoToken("/customers", JSON.stringify(customer), "POST")
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()

	return z.string().parse(data.id)
}

