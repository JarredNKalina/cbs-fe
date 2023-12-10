import { auth } from "../app.config"

const baseURL = process.env.EXPO_PUBLIC_API_URL

export async function fetchWithToken(route: string, body: any, method?: string) {
	const token = await auth.currentUser?.getIdToken()

	return await fetch(`${baseURL}${route}`, {
		method,
		body,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	})
}
