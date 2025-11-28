"use client";

import clsx from "clsx";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type NavItem = { label: string; href: string };

const secondaryNav: NavItem[] = [
  { label: "доставка и оплата", href: "/payment" },
  { label: "FAQ", href: "/faq" },
  { label: "наши магазины", href: "/store" }
];

const primaryNav: NavItem[] = [
  { label: "каталог", href: "#catalog" },
  { label: "отзывы", href: "#reviews" },
  { label: "обо мне", href: "#about" }
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
      if (!href.startsWith("#")) {
        setOpen(false);
        return;
      }

      event.preventDefault();
      if (pathname !== "/") {
        router.push(`/${href}`);
        setOpen(false);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    },
    [pathname, router]
  );

  return (
    <header className="sticky top-0 z-30 w-full">
      <div className="section-shell mt-6">
        <div className="glass relative flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-10">
            <button
              className="rounded-lg border border-black/5 p-2 lg:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Открыть меню"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-200 to-rose-200 shadow-soft" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg uppercase tracking-[0.12em]">
                  Home Secret
                </span>
                <span className="text-xs text-[var(--muted)]">
                  свечи • духи • диффузоры
                </span>
              </div>
            </Link>
            <nav className="hidden items-center gap-4 text-sm uppercase tracking-[0.08em] text-[var(--muted)] lg:flex">
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-full px-3 py-2 transition hover:bg-white",
                    pathname === item.href ? "text-[var(--ink)]" : ""
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <nav className="hidden items-center gap-3 text-sm uppercase tracking-[0.08em] text-[var(--muted)] lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href === "#catalog" ? "/#catalog" : item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className="rounded-full px-3 py-2 transition hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-2 text-[var(--ink)]">
              <button className="rounded-full p-2 hover:bg-white/70" aria-label="Личный кабинет">
                <User size={18} />
              </button>
              <button className="rounded-full p-2 hover:bg-white/70" aria-label="Избранное">
                <Heart size={18} />
              </button>
              <button className="rounded-full p-2 hover:bg-white/70" aria-label="Корзина">
                <ShoppingBag size={18} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {open ? (
        <div className="section-shell">
          <div className="glass mt-2 flex flex-col gap-2 px-5 py-4 text-sm uppercase tracking-[0.08em] text-[var(--muted)] lg:hidden">
            {[...secondaryNav, ...primaryNav].map((item) => (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                className="rounded-lg px-2 py-2 transition hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
};
