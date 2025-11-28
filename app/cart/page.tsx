"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="pb-16">
        <Header />
        <section className="section-shell mt-16">
          <EmptyState
            icon={ShoppingBag}
            title="Корзина пуста"
            description="Добавьте понравившиеся товары в корзину, чтобы оформить заказ"
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
            Корзина ({items.length})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            Очистить корзину
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const variantPrice = item.product.variants
                .map((variant) => {
                  const option = variant.options.find((opt) => opt.label === item.selectedVariants[variant.label]);
                  return option?.price ?? 0;
                })
                .reduce((sum, price) => sum + price, 0);

              const itemPrice = variantPrice || item.product.price;

              return (
                <div key={item.id} className="glass p-5 flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-semibold text-[var(--ink)] truncate">
                      {item.product.name}
                    </h3>

                    <div className="space-y-1 text-sm text-[var(--muted)]">
                      {Object.entries(item.selectedVariants).map(([label, value]) => (
                        <div key={label}>
                          <span className="font-medium">{label}:</span> {value}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-[var(--bg-strong)]"
                          aria-label="Уменьшить количество"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-[var(--bg-strong)]"
                          aria-label="Увеличить количество"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-[var(--ink)]">
                          {formatPrice(itemPrice * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-[var(--muted)]">
                            {formatPrice(itemPrice)} × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[var(--muted)] hover:text-red-500 transition-colors p-1"
                    aria-label="Удалить товар"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="glass p-6 sticky top-24 space-y-4">
              <h3 className="font-semibold text-[var(--ink)]">Итого</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="text-[var(--ink)]">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Доставка</span>
                  <span className="text-[var(--ink)]">Бесплатно</span>
                </div>
              </div>

              <hr className="border-black/5" />

              <div className="flex justify-between font-semibold text-lg">
                <span>К оплате</span>
                <span className="text-[var(--accent)]">{formatPrice(getTotalPrice())}</span>
              </div>

              <button className="button-primary w-full justify-center">
                Оформить заказ
              </button>

              <p className="text-xs text-[var(--muted)] text-center">
                После оформления заказа мы свяжемся с вами в VK для уточнения деталей
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
