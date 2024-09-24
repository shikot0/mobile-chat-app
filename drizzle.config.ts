import type {Config} from 'drizzle-kit';

export default {
    dialect: 'sqlite',
    driver: 'expo',
    schema: './drizzle/schema.ts',
    out: './drizzle/migrations',
    // out: './drizzle',
} satisfies Config;