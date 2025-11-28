"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { products } from "@/data/products";
import { Heart, ShoppingBag, Star, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  params: { slug: string };
};

export default function ProductPage({ params }: Props) {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const product = useMemo(() => {
    return products.find(p => p.slug === params.slug);
  }, [params.slug]);

  const displayPrice = useMemo(() => {
    if (!product) return { current: "", old: null };

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

  // Инициализация выбранных вариантов
  useMemo(() => {
    if (product && Object.keys(selected).length === 0) {
      const initial: Record<string, string> = {};
      product.variants.forEach((variant) => {
        if (variant.options[0]) {
          initial[variant.label] = variant.options[0].label;
        }
      });
      setSelected(initial);
    }
  }, [product, selected]);

  if (!product) {
    return (
      <div className="pb-16">
        <Header />
        <section className="section-shell mt-16 text-center space-y-4">
          <h1 className="font-display text-3xl text-[var(--ink)]">Товар не найден</h1>
          <Link href="/#catalog" className="button-primary inline-flex">
            Вернуться в каталог
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const handleSelect = (variantLabel: string, value: string) => {
    setSelected((prev) => ({ ...prev, [variantLabel]: value }));
  };

  const handleAdd = () => {
    addItem(product, selected);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const toggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="pb-16">
      <Header />

      {/* Breadcrumbs */}
      <section className="section-shell mt-8">
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-[var(--ink)] transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-[var(--ink)]">{product.name}</span>
        </nav>
      </section>

      <section className="section-shell mt-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[var(--bg-strong)]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[var(--accent)]" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)] mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-[var(--muted)]">(12 отзывов)</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-semibold text-[var(--ink)]">{displayPrice.current}</span>
                {displayPrice.old && (
                  <span className="text-xl font-normal text-[var(--muted)] line-through">{displayPrice.old}</span>
                )}
              </div>

              <p className="text-[var(--muted)] leading-relaxed">{product.description}</p>
            </div>

            {/* Варианты товара */}
            <div className="space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.label} className="space-y-3">
                  <div className="text-sm font-medium text-[var(--ink)]">{variant.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => handleSelect(variant.label, option.label)}
                        className={`rounded-xl border px-4 py-3 text-sm transition ${
                          selected[variant.label] === option.label
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)] font-medium"
                            : "border-black/10 bg-[var(--bg-strong)] text-[var(--muted)] hover:border-black/20"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Теги */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--bg-strong)] px-3 py-1 text-sm text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Действия */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 button-primary justify-center"
              >
                <ShoppingBag className="h-4 w-4" />
                {added ? "Добавлено" : "В корзину"}
              </button>
              <button
                onClick={toggleFavorite}
                className={`rounded-xl border p-3 transition-colors ${
                  isFavorite(product.id)
                    ? "border-rose-500 bg-rose-50 text-rose-500"
                    : "border-black/10 bg-[var(--bg-strong)] text-[var(--muted)] hover:border-black/20"
                }`}
                aria-label="Избранное"
              >
                <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Отзывы */}
        <div className="mt-16 space-y-6">
          <h2 className="font-display text-2xl text-[var(--ink)]">Отзывы (12)</h2>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-semibold">
                    А
                  </div>
                  <div>
                    <div className="font-medium text-[var(--ink)]">Анна К.</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[var(--muted)]">
                  Отличный аромат! Горючая смесь держится долго, запах приятный и ненавязчивый.
                  Рекомендую всем, кто ищет качественную альтернативу импортным свечам.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
