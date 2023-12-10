const baseURL = process.env.EXPO_PUBLIC_API_URL

export async function fetchNoToken(route: string, body: any, method?: string) {
	return await fetch(`${baseURL}${route}`, {
		method,
		body,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
