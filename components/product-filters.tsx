"use client";

import type { Product } from "@/data/products";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Search, X, Filter } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
};

export const ProductFilters = ({ products, onFilter }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Получаем все уникальные типы товаров
  const productTypes = useMemo(() => {
    const types = products.map(p => p.name.split(' ')[0]); // Берем первое слово из названия
    return Array.from(new Set(types));
  }, [products]);

  // Получаем все уникальные теги
  const allTags = useMemo(() => {
    const tags = products.flatMap(p => p.tags);
    return Array.from(new Set(tags));
  }, [products]);

  // Получаем диапазон цен
  const priceRangeBounds = useMemo(() => {
    const prices = products.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
  }, [products]);

  // Фильтрация продуктов
  const filteredProducts = useMemo(() => {
    setIsFiltering(true);
    const result = products.filter(product => {
      // Поиск по названию и описанию
      const matchesSearch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Фильтр по типу
      const matchesType = selectedTypes.length === 0 ||
        selectedTypes.some(type => product.name.toLowerCase().includes(type.toLowerCase()));

      // Фильтр по цене
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Фильтр по тегам
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => product.tags.includes(tag));

      return matchesSearch && matchesType && matchesPrice && matchesTags;
    });

    // Имитация задержки фильтрации
    setTimeout(() => setIsFiltering(false), 150);
    return result;
  }, [products, searchQuery, selectedTypes, priceRange, selectedTags]);

  // Обновляем родительский компонент при изменении фильтров
  useMemo(() => {
    onFilter(filteredProducts);
  }, [filteredProducts, onFilter]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setPriceRange(priceRangeBounds);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedTypes.length > 0 || selectedTags.length > 0 ||
    priceRange[0] !== priceRangeBounds[0] || priceRange[1] !== priceRangeBounds[1];

  return (
    <>
      {/* Desktop версия */}
      <div className="hidden lg:block glass p-6 space-y-6">
        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Поиск по названию, описанию или аромату..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>

      {/* Типы товаров */}
      <div className="space-y-3">
        <h4 className="font-medium text-[var(--ink)]">Тип товара</h4>
        <div className="flex flex-wrap gap-2">
          {productTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedTypes.includes(type)
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white/70 text-[var(--muted)] hover:bg-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Ценовой диапазон */}
      <div className="space-y-3">
        <h4 className="font-medium text-[var(--ink)]">Цена</h4>
        <div className="space-y-2">
          <div className="flex gap-4 text-sm text-[var(--muted)]">
            <span>от {priceRange[0]} ₽</span>
            <span>до {priceRange[1]} ₽</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={priceRangeBounds[0]}
              max={priceRangeBounds[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <input
              type="range"
              min={priceRangeBounds[0]}
              max={priceRangeBounds[1]}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Теги */}
      <div className="space-y-3">
        <h4 className="font-medium text-[var(--ink)]">Особенности</h4>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                selectedTags.includes(tag)
                  ? "bg-[var(--accent)] text-white"
                  : "bg-white/70 text-[var(--muted)] hover:bg-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Очистить фильтры */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          <X size={16} />
          Очистить фильтры
        </button>
      )}

        {/* Результаты */}
        <div className="pt-4 border-t border-black/5">
          <p className="text-sm text-[var(--muted)] flex items-center gap-2">
            {isFiltering ? (
              <>
                <LoadingSpinner size="sm" />
                Поиск...
              </>
            ) : (
              <>
                Найдено товаров: <span className="font-medium text-[var(--ink)]">{filteredProducts.length}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Mobile версия */}
      <div className="lg:hidden space-y-4">
        <div className="flex gap-3">
          {/* Поиск */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white/50 focus:border-[var(--accent)] focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Кнопка фильтров */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className={`relative rounded-xl border px-4 py-3 transition-colors ${
              hasActiveFilters
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-black/10 bg-white/50 text-[var(--muted)]"
            }`}
          >
            <Filter size={18} />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
            )}
          </button>
        </div>

        <div className="text-sm text-[var(--muted)]">
          Найдено товаров: <span className="font-medium text-[var(--ink)]">{filteredProducts.length}</span>
        </div>
      </div>

      {/* Mobile filters modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 glass rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg text-[var(--ink)]">Фильтры</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Типы товаров */}
              <div className="space-y-3">
                <h4 className="font-medium text-[var(--ink)]">Тип товара</h4>
                <div className="flex flex-wrap gap-2">
                  {productTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        selectedTypes.includes(type)
                          ? "bg-[var(--accent)] text-white"
                          : "bg-white/70 text-[var(--muted)]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ценовой диапазон */}
              <div className="space-y-3">
                <h4 className="font-medium text-[var(--ink)]">Цена</h4>
                <div className="space-y-2">
                  <div className="flex gap-4 text-sm text-[var(--muted)]">
                    <span>от {priceRange[0]} ₽</span>
                    <span>до {priceRange[1]} ₽</span>
                  </div>
                  <input
                    type="range"
                    min={priceRangeBounds[0]}
                    max={priceRangeBounds[1]}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={priceRangeBounds[0]}
                    max={priceRangeBounds[1]}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Теги */}
              <div className="space-y-3">
                <h4 className="font-medium text-[var(--ink)]">Особенности</h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-3 py-1 text-sm transition ${
                        selectedTags.includes(tag)
                          ? "bg-[var(--accent)] text-white"
                          : "bg-white/70 text-[var(--muted)]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Действия */}
              <div className="flex gap-3 pt-4 border-t border-black/5">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex-1 button-secondary justify-center"
                  >
                    Сбросить
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 button-primary justify-center"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
