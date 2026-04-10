import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tNav = await getTranslations("Nav");
  const services = t.raw("services") as string[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 md:gap-16 md:py-16">
      <section className="space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:mx-0">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <Button asChild>
            <Link href="/contact">{tNav("contact")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={t("phoneHref")}>{t("phoneLabel")}: {t("phoneDisplay")}</a>
          </Button>
        </div>
      </section>

      <Separator />

      <section className="space-y-6" aria-labelledby="expert-heading">
        <h2
          id="expert-heading"
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {t("expertTitle")}
        </h2>
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/90 text-base leading-relaxed">
              {t("expertLead")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm leading-relaxed md:text-base">
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section
        className="space-y-8"
        aria-labelledby="work-together-heading"
      >
        <div className="space-y-2 text-center md:text-left">
          <h2
            id="work-together-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            {t("workTogetherTitle")}
          </h2>
          <p className="text-muted-foreground text-lg">
            <a
              href={t("phoneHref")}
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              {t("phoneLabel")}: {t("phoneDisplay")}
            </a>
          </p>
        </div>
        <ContactForm cardTitle="" cardDescription="" messageMinRows={4} />
      </section>
    </main>
  );
}
