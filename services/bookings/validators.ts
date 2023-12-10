import { z } from "zod"

export type Booking = z.infer<typeof bookingValidator>
export const bookingValidator = z.object({
	id: z.string(),
	version: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	startAt: z.string(),
	locationId: z.string().nullable().optional(),
	customerId: z.string(),
	customerNote: z.string().optional().nullable(),
	transitionTimeMinutes: z.number().optional(),
	allDay: z.boolean().optional(),
	appointmentInfo: z.object({
		durationInMinutes: z.number(),
		serviceVariationId: z.string(),
		anyTeamMember: z.boolean().optional(),
		teamMemberId: z.string(),
	}),
})

export type BookingProfile = z.infer<typeof bookingProfile>
export const bookingProfile = z.object({
	teamMemberId: z.string(),
	description: z.string().optional(),
	displayName: z.string(),
	isBookable: z.boolean(),
	profileImageUrl: z.string().optional(),
})

export type Appointment = z.infer<typeof availabilityValidator>
export const availabilityValidator = z.object({
	startAt: z.string(),
	locationId: z.string(),
	appointmentSegments: z.array(
		z.object({
			durationMinutes: z.number(),
			serviceVariationId: z.string(),
			teamMemberId: z.string(),
			serviceVariationVersion: z.number(),
		})
	),
})

export type BookingCreateDTO = z.infer<typeof bookingCreateDTOValidator>
export const bookingCreateDTOValidator = z.object({
	locationId: z.string(),
	startAt: z.string(),
	customerId: z.string(),
	customerNote: z.string().optional(),
	appointmentSegments: z.object({
		teamMemberId: z.string(),
		serviceId: z.string(),
		serviceVariationVersion: z.number(),
	}),
})
