"use client";

import { submitContact, type ContactState } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [state, formAction, isPending] = useActionState<
    ContactState,
    FormData
  >(submitContact, null);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {state?.ok === true ? (
          <p className="text-muted-foreground text-sm">{t("success")}</p>
        ) : (
          <form action={formAction} className="relative space-y-6">
            <div
              className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden"
              aria-hidden
            >
              <Label htmlFor="contact-website">{t("honeypotLabel")}</Label>
              <Input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-name">{t("name")}</Label>
              <Input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={Boolean(state?.ok === false && state.fieldErrors?.name)}
                aria-describedby={
                  state?.ok === false && state.fieldErrors?.name
                    ? "contact-name-error"
                    : undefined
                }
              />
              {state?.ok === false && state.fieldErrors?.name ? (
                <p id="contact-name-error" className="text-destructive text-sm">
                  {state.fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">{t("email")}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(
                  state?.ok === false && state.fieldErrors?.email,
                )}
                aria-describedby={
                  state?.ok === false && state.fieldErrors?.email
                    ? "contact-email-error"
                    : undefined
                }
              />
              {state?.ok === false && state.fieldErrors?.email ? (
                <p id="contact-email-error" className="text-destructive text-sm">
                  {state.fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">{t("message")}</Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                aria-invalid={Boolean(
                  state?.ok === false && state.fieldErrors?.message,
                )}
                aria-describedby={
                  state?.ok === false && state.fieldErrors?.message
                    ? "contact-message-error"
                    : undefined
                }
              />
              {state?.ok === false && state.fieldErrors?.message ? (
                <p
                  id="contact-message-error"
                  className="text-destructive text-sm"
                >
                  {state.fieldErrors.message}
                </p>
              ) : null}
            </div>

            {state?.ok === false && state.error === "generic" ? (
              <p className="text-destructive text-sm">{t("errorGeneric")}</p>
            ) : null}

            {state?.ok === false &&
            state.error === "validation" &&
            !state.fieldErrors ? (
              <p className="text-destructive text-sm">{t("errorValidation")}</p>
            ) : null}

            <Button type="submit" disabled={isPending}>
              {isPending ? t("sending") : t("submit")}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
