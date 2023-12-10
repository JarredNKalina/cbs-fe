import { fetchNoToken } from "../fetchNoToken"
import { loyaltyValidator } from "./validators"

export async function getUserLoyalty(squareCustomerId: string) {
	const res = await fetchNoToken(`/loyalty/${squareCustomerId}`, null)
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()

	return loyaltyValidator.parse(data)
}
