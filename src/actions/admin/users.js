"use server";

import bcrypt from "bcryptjs";
import sql from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function createUser(prevState, formData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const email    = (formData.get("email") || "").trim().toLowerCase();
  const name     = (formData.get("name") || "").trim();
  const password = formData.get("password") || "";

  if (!email)          return { error: "Email is required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const [existing] = await sql`SELECT id FROM "User" WHERE email = ${email} LIMIT 1`;
  if (existing) return { error: "A user with this email already exists." };

  const passwordHash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO "User" (id, email, name, "passwordHash")
    VALUES (${randomUUID()}, ${email}, ${name || null}, ${passwordHash})
  `;

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  if (session.user?.id === id) throw new Error("You cannot delete your own account.");

  await sql`DELETE FROM "User" WHERE id = ${id}`;
  revalidatePath("/admin/users");
}
