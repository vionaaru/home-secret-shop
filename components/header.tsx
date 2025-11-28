"use client";

import clsx from "clsx";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";

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
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-rose)] to-[var(--accent-gold)] shadow-soft group-hover:shadow-glow transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg">🌸</div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg uppercase tracking-[0.12em] text-gradient group-hover:scale-105 transition-transform duration-300">
                  Home Secret
                </span>
                <span className="text-xs text-[var(--muted)]">
                  ✨ свечи • духи • диффузоры
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
              <Link href="/favorites" className="relative rounded-full p-2 hover:bg-white/70" aria-label="Избранное">
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative rounded-full p-2 hover:bg-white/70" aria-label="Корзина">
                <ShoppingBag size={18} />
                {getTotalItems() > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-pink-900/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="card-elegant absolute right-4 top-20 w-80 max-w-[calc(100vw-2rem)] rounded-3xl p-6 shadow-2xl focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню навигации"
          >
            <div className="space-y-6">
              {/* Заголовок меню */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <h3 className="font-display text-lg text-gradient">Меню</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Основная навигация */}
              <nav className="space-y-2">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)] font-medium">Навигация</p>
                <div className="space-y-1">
                  {primaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                      onClick={(event) => handleNavigate(event, item.href)}
                      className="block rounded-xl px-4 py-3 text-[var(--ink)] transition hover:bg-white/70 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Второстепенная навигация */}
              <nav className="space-y-2">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)] font-medium">Информация</p>
                <div className="space-y-1">
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-[var(--muted)] transition hover:bg-white/70 hover:text-[var(--ink)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Аккаунт и корзина */}
              <div className="border-t border-black/5 pt-4 space-y-2">
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/70"
                >
                  <div className="relative">
                    <ShoppingBag size={20} />
                    {getTotalItems() > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-[var(--ink)]">Корзина</span>
                </Link>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/70">
                  <User size={20} />
                  <span className="font-medium text-[var(--muted)]">Личный кабинет</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};
