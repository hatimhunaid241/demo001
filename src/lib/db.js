import { neon } from "@neondatabase/serverless";

// Singleton — reused across hot-reloads in dev and across requests in prod
const sql = neon(process.env.DATABASE_URL);

export default sql;
