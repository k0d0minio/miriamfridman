"use client";

import { submitContact, type ContactState } from "@/app/[locale]/contact/actions";
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
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

export type ContactFormProps = {
  showPhone?: boolean;
  messageMinRows?: number;
  cardTitle?: string;
  cardDescription?: string;
  className?: string;
  messageLabelKey?: "message" | "messageShort";
};

export function ContactForm({
  showPhone = false,
  messageMinRows = 5,
  cardTitle,
  cardDescription,
  className,
  messageLabelKey = "messageShort",
}: ContactFormProps) {
  const t = useTranslations("Contact");
  const [state, formAction, isPending] = useActionState<
    ContactState,
    FormData
  >(submitContact, null);

  const title = cardTitle === undefined ? t("title") : cardTitle;
  const description =
    cardDescription === undefined ? t("descriptionShort") : cardDescription;
  const showHeader = title.length > 0 || description.length > 0;

  return (
    <Card className={cn("w-full", className)}>
      {showHeader ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-firstName">{t("firstName")}</Label>
                <Input
                  id="contact-firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  aria-invalid={Boolean(
                    state?.ok === false && state.fieldErrors?.firstName,
                  )}
                  aria-describedby={
                    state?.ok === false && state.fieldErrors?.firstName
                      ? "contact-firstName-error"
                      : undefined
                  }
                />
                {state?.ok === false && state.fieldErrors?.firstName ? (
                  <p
                    id="contact-firstName-error"
                    className="text-destructive text-sm"
                  >
                    {state.fieldErrors.firstName}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-lastName">{t("lastName")}</Label>
                <Input
                  id="contact-lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  aria-invalid={Boolean(
                    state?.ok === false && state.fieldErrors?.lastName,
                  )}
                  aria-describedby={
                    state?.ok === false && state.fieldErrors?.lastName
                      ? "contact-lastName-error"
                      : undefined
                  }
                />
                {state?.ok === false && state.fieldErrors?.lastName ? (
                  <p
                    id="contact-lastName-error"
                    className="text-destructive text-sm"
                  >
                    {state.fieldErrors.lastName}
                  </p>
                ) : null}
              </div>
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

            {showPhone ? (
              <div className="space-y-2">
                <Label htmlFor="contact-phone">{t("phone")}</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(
                    state?.ok === false && state.fieldErrors?.phone,
                  )}
                  aria-describedby={
                    state?.ok === false && state.fieldErrors?.phone
                      ? "contact-phone-error"
                      : undefined
                  }
                />
                {state?.ok === false && state.fieldErrors?.phone ? (
                  <p
                    id="contact-phone-error"
                    className="text-destructive text-sm"
                  >
                    {state.fieldErrors.phone}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="contact-message">{t(messageLabelKey)}</Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={messageMinRows}
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
