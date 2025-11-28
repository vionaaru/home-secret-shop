"use client";

import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import clsx from "clsx";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
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

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.14)]">
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
          {product.highlight ? (
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] shadow-soft">
              {product.highlight}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Избранное"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition hover:scale-105"
          onClick={() => setFavorite((prev) => !prev)}
        >
          <Heart
            className={clsx("h-4 w-4 transition", favorite ? "fill-rose-500 text-rose-500" : "text-[var(--ink)]")}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-[var(--ink)]">{product.name}</h3>
          <p className="text-sm text-[var(--muted)]">{product.description}</p>
          <div className="flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
            <span>{displayPrice.current}</span>
            {displayPrice.old ? (
              <span className="text-sm font-normal text-[var(--muted)] line-through">{displayPrice.old}</span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--bg-strong)] px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {product.variants.map((variant) => (
            <div key={variant.label} className="space-y-2">
              <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{variant.label}</div>
              <div className="flex flex-wrap gap-2">
                {variant.options.slice(0, 6).map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelect(variant.label, option.label)}
                    className={clsx(
                      "rounded-full border px-3 py-1 text-sm transition",
                      selected[variant.label] === option.label
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)]"
                        : "border-black/10 bg-[var(--bg-strong)] text-[var(--muted)]"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
                {variant.options.length > 6 ? (
                  <span className="rounded-full bg-[var(--bg-strong)] px-3 py-1 text-xs text-[var(--muted)]">
                    +{variant.options.length - 6} ещё
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="button-primary mt-auto w-full justify-center"
        >
          <ShoppingBag className="h-4 w-4" />
          {added ? "Добавлено" : "В корзину"}
        </button>
      </div>
    </div>
  );
};
