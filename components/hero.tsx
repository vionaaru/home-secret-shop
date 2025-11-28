"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Search } from "lucide-react";
import { useState } from "react";

const stats = [
  { label: "Запуск", value: "2021" },
  { label: "Ароматов", value: "25+" },
  { label: "Лояльные клиенты", value: "12K" }
];

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Свечи", href: "/#catalog", icon: "🕯️" },
    { name: "Духи", href: "/#catalog", icon: "🌸" },
    { name: "Диффузоры", href: "/#catalog", icon: "💧" },
    { name: "Избранное", href: "/favorites", icon: "❤️" }
  ];

  return (
    <section className="section-shell mt-10 lg:mt-16">
      <div className="relative overflow-hidden rounded-[32px] card-elegant p-8 md:p-12 lg:p-16">
        {/* Декоративные элементы */}
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-pink-200/30 to-rose-200/20 blur-3xl float-animation" />
        <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gradient-to-tl from-amber-200/25 to-yellow-200/15 blur-3xl float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-purple-200/20 to-pink-200/15 blur-2xl float-animation" style={{ animationDelay: '2s' }} />

        {/* Декоративные звездочки */}
        <div className="absolute top-8 right-8 text-2xl opacity-60">✨</div>
        <div className="absolute bottom-12 left-12 text-xl opacity-40">🌸</div>
        <div className="absolute top-1/3 right-1/4 text-lg opacity-50">💫</div>
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 space-y-5"
          >
            <div className="pill inline-flex items-center gap-2 bg-white/70">
              <Sparkles className="h-4 w-4 text-amber-700" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-900">
                новый node.js интерфейс
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight tracking-[0.08em] text-[var(--ink)] sm:text-5xl lg:text-6xl">
              <span className="text-gradient sparkle">Home Secret</span>
              <br />
              <span className="text-[var(--accent)]">ароматы, свечи и диффузоры</span>
              <br />
              <span className="text-sm sm:text-base text-[var(--muted)] font-light">с тёплым и нежным характером</span>
            </h1>
            <p className="max-w-2xl text-lg text-[var(--muted)]">
              Соевый воск, безопасные отдушки IFRA, честная доставка и сеть офлайн-магазинов по всей стране. Мы
              адаптировали контент и данные с вашего прежнего сайта в новый стек Next.js 16 + React 19.
            </p>
            {/* Быстрый поиск */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Найти аромат..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm text-[var(--ink)] placeholder-[var(--muted)] focus:border-white/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/#catalog" className="button-primary">
                Смотреть каталог
              </Link>
              <Link href="/faq" className="button-secondary">
                Узнать больше (FAQ)
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 pt-3 text-sm text-[var(--muted)]">
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">100% предоплата через VK и сайт</span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">
                  Соевый воск + хлопковые и деревянные фитили
                </span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">Поддержка доставки СДЭК и Почта РФ</span>
              </div>

              {/* Категории */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted)] font-medium">Популярные категории</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-white"
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="card-elegant relative w-full max-w-md overflow-hidden px-8 py-8"
          >
            <div className="relative space-y-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.1em] text-[var(--muted)] font-medium mb-2">✨ Живая статистика бренда</p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="rounded-2xl bg-gradient-to-br from-white/90 to-pink-50/50 p-4 shadow-soft border border-white/60"
                  >
                    <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)] font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="divider-elegant"></div>

              <div className="rounded-2xl bg-gradient-to-r from-[var(--accent-rose)]/10 via-[var(--accent)]/5 to-[var(--accent-gold)]/10 p-5 border border-white/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🌟</span>
                  <div className="font-semibold text-[var(--ink)]">Арт-вдохновение</div>
                </div>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Эксперименты 2021 года выросли в коллекцию нишевых ароматов: духи, свечи, диффузоры. Каждая партия
                  собирается вручную и тестируется перед отгрузкой.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
