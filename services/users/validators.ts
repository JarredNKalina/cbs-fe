import { z } from "zod"

export const userValidator = z.object({
    uid: z.string(),
    email: z.string().email(),
    displayName: z.string(),
    emailVerified: z.boolean(),
    disabled: z.boolean(),
    metadata: z.object({
        creationTime: z.string().nullable(),
        lastSignInTime: z.string().nullable(),
        lastRefreshTime: z.string().nullable()
    }),
    tokensValidAfterTime: z.string(),

})