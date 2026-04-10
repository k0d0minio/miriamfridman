"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div
      className="flex items-center gap-1 text-sm"
      role="group"
      aria-label={t("language")}
    >
      <Link
        href={pathname}
        locale="en"
        className={cn(
          "rounded-md px-2 py-1 transition-colors hover:bg-accent",
          locale === "en" && "bg-accent font-medium text-accent-foreground",
        )}
      >
        EN
      </Link>
      <span className="text-muted-foreground" aria-hidden>
        |
      </span>
      <Link
        href={pathname}
        locale="pt"
        className={cn(
          "rounded-md px-2 py-1 transition-colors hover:bg-accent",
          locale === "pt" && "bg-accent font-medium text-accent-foreground",
        )}
      >
        PT
      </Link>
    </div>
  );
}
