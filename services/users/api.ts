import { fetchNoToken } from "../fetchNoToken"

import { userValidator } from "./validators"

type UserCreateDTO = {
	firstName: string
	lastName: string
	email: string
	password: string
	squareId: string
}
export async function createUser(user: UserCreateDTO) {
	const res = await fetchNoToken("/users", JSON.stringify(user), "POST")
	if (!res.ok) throw new Error("Network response was not ok")
	const data = await res.json()
	const userRes = userValidator.parse(data.user)

	return userRes
}
