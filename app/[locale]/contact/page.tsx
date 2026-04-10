import { ContactForm } from "./contact-form";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-12">
      <ContactForm />
    </main>
  );
}
