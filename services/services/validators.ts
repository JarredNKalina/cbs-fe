import { z } from "zod"

export type Service = z.infer<typeof servicesValidator>

export const ItemVariation = z.object({
	type: z.literal("ITEM_VARIATION"),
	id: z.string(), // You can use BigInt if you prefer
	updatedAt: z.string(),
	version: z.number(),
	isDeleted: z.boolean(),
	presentAtAllLocations: z.boolean(),
	itemVariationData: z.object({
		itemId: z.string(), // You can use BigInt if you prefer
		name: z.string(),
		ordinal: z.number(),
		pricingType: z.string(), // You might want to use an enum for valid values
		priceMoney: z.object({
			amount: z.number(),
			currency: z.string(),
		}),
		serviceDuration: z.number(),
		availableForBooking: z.boolean(),
		sellable: z.boolean(),
		stockable: z.boolean(),
		teamMemberIds: z.array(z.string()), // You can use an array of BigInt if you prefer
	}),
})

export const servicesValidator = z.object({
	type: z.literal("ITEM"),
	id: z.string(), // You can use BigInt if you prefer
	updatedAt: z.string(),
	version: z.number(),
	isDeleted: z.boolean(),
	presentAtAllLocations: z.boolean(),
	itemData: z.object({
		name: z.string(),
		description: z.string(),
		productType: z.string(), // You might want to use an enum for valid values
		skipModifierScreen: z.boolean(),
		descriptionHtml: z.string(),
		descriptionPlaintext: z.string(),
		isArchived: z.boolean(),
	}),
	variation: ItemVariation,
})
