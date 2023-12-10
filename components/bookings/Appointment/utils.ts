import { Appointment } from "../../../services/bookings/validators"

export type Availability = {
	day: string
	date: string
	times: string[]
}

export function transformAppointmentsToAvailability(appointments: Appointment[]) {
	const availability: Availability[] = []
	const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	const appointmentsByDate = new Map<string, Date[]>()

	for (const appointment of appointments) {
		const startAt = new Date(appointment.startAt)
		const date = startAt.toISOString().split("T")[0]

		if (!appointmentsByDate.has(date)) {
			appointmentsByDate.set(date, [])
		}

		appointmentsByDate.get(date)?.push(startAt)
	}

	for (const [date, appointments] of appointmentsByDate) {
		const day = dayOfWeek[new Date(date).getDay()] // Get day of the week
		const times = appointments.map(appointment => {
			const hours = appointment.getHours().toString().padStart(2, "0")
			const minutes = appointment.getMinutes().toString().padStart(2, "0")
			return `${hours}:${minutes}`
		})

		availability.push({ day, date, times })
	}

	return availability
}
