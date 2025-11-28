"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const stats = [
  { label: "Запуск", value: "2021" },
  { label: "Ароматов", value: "25+" },
  { label: "Лояльные клиенты", value: "12K" }
];

export const Hero = () => {
  return (
    <section className="section-shell mt-10 lg:mt-16">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-white/80 via-amber-50/80 to-sky-50/70 p-8 shadow-card md:p-12">
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute -bottom-12 right-0 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
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
            <h1 className="font-display text-4xl leading-tight tracking-[0.08em] text-[var(--ink)] sm:text-5xl">
              Home Secret Shop
              <br />
              <span className="text-[var(--accent)]">ароматы, свечи и диффузоры</span> с тёплым характером
            </h1>
            <p className="max-w-2xl text-lg text-[var(--muted)]">
              Соевый воск, безопасные отдушки IFRA, честная доставка и сеть офлайн-магазинов по всей стране. Мы
              адаптировали контент и данные с вашего прежнего сайта в новый стек Next.js 16 + React 19.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#catalog" className="button-primary">
                Смотреть каталог
              </Link>
              <Link href="/faq" className="button-secondary">
                Узнать больше (FAQ)
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 pt-3 text-sm text-[var(--muted)]">
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">100% предоплата через VK и сайт</span>
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">
                Соевый воск + хлопковые и деревянные фитили
              </span>
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">Поддержка доставки СДЭК и Почта РФ</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="glass relative w-full max-w-md overflow-hidden px-6 py-7"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-amber-50/60" />
            <div className="relative space-y-4">
              <p className="text-sm uppercase tracking-[0.1em] text-[var(--muted)]">живая статистика бренда</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/80 p-4 shadow-soft">
                    <div className="text-xl font-semibold text-[var(--ink)]">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-amber-200/80 to-white p-4 text-sm text-[var(--ink)] shadow-soft">
                <div className="font-semibold">Арт-вдохновение</div>
                <p className="text-[var(--muted)]">
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
