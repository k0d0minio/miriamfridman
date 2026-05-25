import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import portrait from "@/public/brand/miri-fridman.png";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const specialtyItems = t.raw("specialtyItems") as string[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 md:py-16">
      <header className="grid items-start gap-8 md:grid-cols-[auto_1fr] md:gap-10">
        <div className="relative order-first mx-auto size-40 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-4 ring-primary/10 sm:size-48 md:order-0">
          <Image
            src={portrait}
            alt={t("title")}
            fill
            sizes="(min-width: 768px) 12rem, 11rem"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("lead")}
          </p>
        </div>
      </header>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("specialtyTitle")}
        </h2>
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/90 text-base leading-relaxed">
              {t("specialtyLead")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground marker:text-primary list-inside list-disc space-y-2 text-sm leading-relaxed md:text-base">
              {specialtyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
