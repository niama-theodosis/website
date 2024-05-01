import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod"

export const env = createEnv({
  server: {
    HASHNODE_GQL_ENDPOINT: z.string().url(),
    HASHNODE_PUBLICATION_HOST: z.string(),
    HASHNODE_PUBLICATION_ID: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    POSTGRES_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    TURNSTILE_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },
  runtimeEnv: {
    HASHNODE_GQL_ENDPOINT: process.env.HASHNODE_GQL_ENDPOINT,
    HASHNODE_PUBLICATION_HOST: process.env.HASHNODE_PUBLICATION_HOST,
    HASHNODE_PUBLICATION_ID: process.env.HASHNODE_PUBLICATION_ID,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_URL: process.env.POSTGRES_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
