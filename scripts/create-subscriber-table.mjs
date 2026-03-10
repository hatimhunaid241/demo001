/**
 * Creates the Subscriber table in Neon.
 * Run once: node scripts/create-subscriber-table.mjs
 */

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS "Subscriber" (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email       TEXT        UNIQUE NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'pending',
    "subscribedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

console.log('✓ Subscriber table ready');
process.exit(0);
