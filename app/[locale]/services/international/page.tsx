import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type ServiceBlock = {
  title: string;
  items: string[];
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("servicesInternationalTitle"),
    description: t("servicesInternationalDescription"),
  };
}

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-foreground/40 shrink-0" aria-hidden>
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicesInternationalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesInternational");
  const coreItems = t.raw("coreItems") as string[];
  const blocks = t.raw("blocks") as ServiceBlock[];
  const clientBullets = t.raw("clientBullets") as string[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 md:gap-16 md:py-16">
      <header className="space-y-4 text-center md:text-left">
        <Badge variant="secondary" className="mx-auto md:mx-0">
          {t("badge")}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:mx-0">
          {t("subtitle")}
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="core-heading">
        <h2
          id="core-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          {t("coreTitle")}
        </h2>
        <Card>
          <CardContent className="pt-6">
            <ItemList items={coreItems} />
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
        aria-label={t("title")}
      >
        {blocks.map((block) => (
          <Card key={block.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg leading-snug">
                {block.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ItemList items={block.items} />
            </CardContent>
          </Card>
        ))}
      </section>

      <Separator />

      <section className="space-y-4" aria-labelledby="academic-heading">
        <h2
          id="academic-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          {t("academicTitle")}
        </h2>
        <Card>
          <CardContent className="text-muted-foreground pt-6 text-base leading-relaxed">
            {t("academicBody")}
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6" aria-labelledby="client-heading">
        <h2
          id="client-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          {t("clientTitle")}
        </h2>
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/90 text-base leading-relaxed">
              {t("clientLead")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemList items={clientBullets} />
          </CardContent>
        </Card>
        <p className="text-muted-foreground text-base leading-relaxed">
          {t("clientClosing")}
        </p>
      </section>
    </main>
  );
}
