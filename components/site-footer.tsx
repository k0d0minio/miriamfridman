import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const tNav = await getTranslations("Nav");
  const tHome = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#0A3556] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/lockup-horizontal-reversed.svg"
            alt={tNav("brand")}
            className="mx-auto h-10 w-auto md:mx-0"
          />
          <p className="text-sm text-white/70">{tFooter("tagline")}</p>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <a
            href={tHome("phoneHref")}
            className="text-sm font-medium text-white underline-offset-4 hover:underline"
          >
            {tHome("phoneLabel")}: {tHome("phoneDisplay")}
          </a>
          <p className="text-xs text-white/60">
            © {year} {tNav("brand")} · {tFooter("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
