import { ContactForm } from "@/components/contact-form";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-12">
      <p className="text-muted-foreground text-center text-lg leading-relaxed md:text-left">
        {t("description")}
      </p>
      <ContactForm
        showPhone
        messageMinRows={6}
        cardDescription=""
        messageLabelKey="message"
      />
    </main>
  );
}
