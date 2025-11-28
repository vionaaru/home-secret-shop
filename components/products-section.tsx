"use client";

import { products } from "@/data/products";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { useState } from "react";

export const ProductsSection = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <section id="catalog" className="section-shell mt-16 space-y-6 lg:mt-20">
      <div className="flex flex-col gap-2">
        <p className="section-title text-sm text-[var(--muted)]">каталог</p>
        <h2 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)] sm:text-4xl">
          Шесть форматов, одна ДНК бренда
        </h2>
        <p className="max-w-3xl text-[var(--muted)]">
          Используем натуральный соевый воск, отдушки по стандарту IFRA и проверенные рецептуры, собранные с 2021 года.
          Каждая карточка подтягивает ароматы и объёмы из выгрузки старого сайта.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilters products={products} onFilter={setFilteredProducts} />
        </div>

        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="text-6xl">🔍</div>
              <div>
                <h3 className="font-display text-xl text-[var(--ink)]">Товары не найдены</h3>
                <p className="text-[var(--muted)] mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
