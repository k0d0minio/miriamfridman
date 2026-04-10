"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const linkClass =
  "text-muted-foreground hover:text-foreground transition-colors";

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground shrink-0 text-sm font-semibold tracking-tight"
          >
            {t("brand")}
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label={t("mainNav")}
          >
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex-wrap gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={linkClass}>
                      {t("home")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={linkClass}>
                      {t("about")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground bg-transparent hover:bg-muted/50">
                    {t("services")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2">
                    <ul className="flex min-w-[200px] flex-col gap-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/portugal"
                            className="w-full justify-start"
                          >
                            {t("servicesPortugal")}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/services/international"
                            className="w-full justify-start"
                          >
                            {t("servicesInternational")}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className={linkClass}>
                      {t("contact")}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                aria-label={t("openMenu")}
              >
                <MenuIcon className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{t("brand")}</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 px-4 pb-4"
                aria-label={t("mainNav")}
              >
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {t("home")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {t("about")}
                  </Link>
                </SheetClose>
                <p className="text-muted-foreground px-3 pt-2 text-xs font-medium tracking-wide uppercase">
                  {t("services")}
                </p>
                <SheetClose asChild>
                  <Link
                    href="/services/portugal"
                    className="hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium pl-6"
                  >
                    {t("servicesPortugal")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/services/international"
                    className="hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium pl-6"
                  >
                    {t("servicesInternational")}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="hover:bg-muted rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {t("contact")}
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
