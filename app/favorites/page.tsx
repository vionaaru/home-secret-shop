"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/product-card";
import { useFavorites } from "@/lib/favorites-context";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="pb-16">
        <Header />
        <section className="section-shell mt-16">
          <EmptyState
            icon={Heart}
            title="Избранное пустое"
            description="Добавляйте товары в избранное, чтобы быстро находить их позже"
            action={
              <Link href="/#catalog" className="button-primary inline-flex">
                Перейти в каталог
              </Link>
            }
          />
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <Header />
      <section className="section-shell mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)]">
            Избранное ({favorites.length})
          </h1>
          <button
            onClick={clearFavorites}
            className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Очистить избранное
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
