"use client";

import type { StoreLocation } from "@/data/stores";
import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  stores: StoreLocation[];
};

export const StoreGrid = ({ stores }: Props) => {
  const [city, setCity] = useState<string>("Все");

  const cities = useMemo(() => ["Все", ...Array.from(new Set(stores.map((s) => s.city)))], [stores]);
  const visible = useMemo(
    () => (city === "Все" ? stores : stores.filter((store) => store.city === city)),
    [city, stores]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cities.map((item) => (
          <button
            key={item}
            className={`rounded-full px-3 py-2 text-sm transition ${
              item === city
                ? "bg-[var(--accent)] text-white shadow-md"
                : "bg-white text-[var(--muted)] shadow-soft hover:-translate-y-0.5"
            }`}
            onClick={() => setCity(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((store) => (
          <article key={`${store.city}-${store.name}-${store.address}`} className="glass space-y-3 p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image src={store.image} alt={store.name} fill className="object-cover" sizes="80px" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{store.city}</div>
                <div className="font-semibold text-[var(--ink)]">{store.name}</div>
                {store.place ? <div className="text-xs text-[var(--muted)]">{store.place}</div> : null}
              </div>
            </div>
            <p className="text-sm text-[var(--muted)]">{store.address}</p>
            {store.note ? <p className="text-xs text-amber-900">{store.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
};
