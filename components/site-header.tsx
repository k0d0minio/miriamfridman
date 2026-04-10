import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getTranslations } from "next-intl/server";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground hover:text-foreground/80">
            {t("home")}
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground"
          >
            {t("contact")}
          </Link>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
