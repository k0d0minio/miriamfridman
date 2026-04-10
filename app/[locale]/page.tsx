import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-4 py-16">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("intro")}
        </p>
      </div>
      <div>
        <Button asChild>
          <Link href="/contact">{t("ctaContact")}</Link>
        </Button>
      </div>
    </main>
  );
}
