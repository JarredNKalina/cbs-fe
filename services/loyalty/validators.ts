import { z } from "zod"

export type LoyaltyInfo = z.infer<typeof loyaltyValidator>
export const loyaltyValidator = z.object({
	id: z.string(),
	programId: z.string(),
	balance: z.number(),
	lifetimePoints: z.number(),
	customerId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	rewardTiers: z.array(
		z.object({
			id: z.string(),
			points: z.number(),
			name: z.string(),
			definition: z.object({
				scope: z.string(),
				discountType: z.string(),
				percentageDiscount: z.string(),
				catalogObjectIds: z.array(z.string()),
			}),
			createdAt: z.string(),
		})
	),
})
