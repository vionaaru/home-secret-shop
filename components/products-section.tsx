import { products } from "@/data/products";
import { ProductCard } from "./product-card";

export const ProductsSection = () => {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
