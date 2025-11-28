"use client";

import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import clsx from "clsx";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, memo } from "react";

type Props = {
  product: Product;
};

export const ProductCard = memo(({ product }: Props) => {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach((variant) => {
      if (variant.options[0]) {
        initial[variant.label] = variant.options[0].label;
      }
    });
    return initial;
  });

  const displayPrice = useMemo(() => {
    const base = product.price;
    const baseOld = product.oldPrice;

    // если выбран вариант с ценой — используем её
    const variantWithPrice = product.variants
      .map((variant) => variant.options.find((opt) => opt.label === selected[variant.label]))
      .find((opt) => opt?.price);

    return {
      current: formatPrice(variantWithPrice?.price ?? base),
      old: baseOld ? formatPrice(variantWithPrice?.oldPrice ?? baseOld) : null
    };
  }, [product, selected]);

  const handleSelect = (variantLabel: string, value: string) => {
    setSelected((prev) => ({ ...prev, [variantLabel]: value }));
  };

  const handleQuickAdd = () => {
    addItem(product, selected);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleDetailedAdd = () => {
    addItem(product, selected);
    setAdded(true);
    setShowModal(false);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl card-elegant focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        aria-label={`Перейти к товару ${product.name}`}
      >
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
          </div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.highlight && (
              <span className="rounded-full bg-gradient-to-r from-[var(--accent)]/90 to-[var(--accent-2)]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-soft border border-white/20">
                ✨ {product.highlight}
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              aria-label="Избранное"
              className="rounded-full bg-white/90 p-2 shadow-md transition hover:scale-105 z-10"
              onClick={(e) => {
                e.preventDefault();
                if (isFavorite(product.id)) {
                  removeFromFavorites(product.id);
                } else {
                  addToFavorites(product);
                }
              }}
            >
              <Heart
                className={clsx("h-4 w-4 transition", isFavorite(product.id) ? "fill-rose-500 text-rose-500" : "text-[var(--ink)]")}
              />
            </button>
            <button
              type="button"
              aria-label="Быстрый просмотр"
              className="rounded-full bg-white/90 p-2 shadow-md transition hover:scale-105 opacity-0 group-hover:opacity-100 z-10"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              <Eye className="h-4 w-4 text-[var(--ink)]" />
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleQuickAdd();
            }}
            className="absolute bottom-3 left-3 right-3 button-primary justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <ShoppingBag className="h-4 w-4" />
            {added ? "Добавлено" : "Быстро добавить"}
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[var(--ink)] line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient">{displayPrice.current}</span>
              {displayPrice.old && (
                <span className="text-sm font-normal text-[var(--muted)] line-through opacity-70">{displayPrice.old}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-2)]/10 px-3 py-1 text-[var(--muted)] border border-[var(--accent)]/20 font-medium">
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="button-secondary mt-auto w-full justify-center"
          >
            Выбрать вариант
          </button>
        </div>
      </Link>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <div
            className="glass max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 id="product-modal-title" className="font-semibold text-[var(--ink)]">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold text-[var(--ink)]">{displayPrice.current}</span>
                      {displayPrice.old && (
                        <span className="text-sm font-normal text-[var(--muted)] line-through">{displayPrice.old}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-[var(--muted)]">{product.description}</p>

              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.label} className="space-y-3">
                    <div className="text-sm font-medium text-[var(--ink)]">{variant.label}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleSelect(variant.label, option.label)}
                          className={clsx(
                            "rounded-xl border p-3 text-sm transition text-left",
                            selected[variant.label] === option.label
                              ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)] font-medium"
                              : "border-black/10 bg-[var(--bg-strong)] text-[var(--muted)] hover:border-black/20"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleDetailedAdd}
                className="button-primary w-full justify-center"
              >
                <ShoppingBag className="h-4 w-4" />
                {added ? "Добавлено" : "Добавить в корзину"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProductCard.displayName = "ProductCard";
