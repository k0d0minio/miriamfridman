"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";

export type ContactState =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "generic";
      fieldErrors?: Record<string, string>;
    }
  | null;

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (val) =>
      val.length === 0 || /^[\d\s+().\-/]{6,}$/.test(val),
    { message: "phoneInvalid" },
  );

const schema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: phoneSchema,
  message: z.string().trim().min(10),
});

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get("website")?.toString() ?? "";
  if (honeypot.length > 0) {
    return { ok: true };
  }

  const t = await getTranslations("Validation");
  const raw = {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "firstName") fieldErrors.firstName = t("firstNameRequired");
      else if (key === "lastName") fieldErrors.lastName = t("lastNameRequired");
      else if (key === "email") fieldErrors.email = t("emailInvalid");
      else if (key === "message") fieldErrors.message = t("messageMin");
      else if (key === "phone") fieldErrors.phone = t("phoneInvalid");
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  // TODO: send via email provider (e.g. Resend) when configured, using
  // `${parsed.data.firstName} ${parsed.data.lastName}`.trim() as display name.
  return { ok: true };
}
