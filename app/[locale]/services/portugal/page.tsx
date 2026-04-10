import { ContactForm } from "@/components/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type ServiceCategory = {
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
    title: t("servicesPortugalTitle"),
    description: t("servicesPortugalDescription"),
  };
}

function CategoryList({ items }: { items: string[] }) {
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

export default async function ServicesPortugalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPortugal");
  const categories = t.raw("categories") as ServiceCategory[];

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

      <section aria-label={t("title")}>
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((cat, index) => (
              <AccordionItem key={cat.title} value={`cat-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                  <CategoryList items={cat.items} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg leading-snug">
                  {cat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CategoryList items={cat.items} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-8" aria-labelledby="portugal-contact-heading">
        <div className="space-y-2 text-center md:text-left">
          <h2
            id="portugal-contact-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            {t("contactTitle")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("contactLead")}</p>
        </div>
        <ContactForm cardDescription="" messageMinRows={5} />
      </section>
    </main>
  );
}
