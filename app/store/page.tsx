import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StoreGrid } from "@/components/store-grid";
import { storeLocations } from "@/data/stores";

export default function StorePage() {
  return (
    <div className="pb-16">
      <Header />
      <section className="section-shell mt-12 space-y-3">
        <p className="section-title text-sm text-[var(--muted)]">оффлайн</p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-[var(--ink)]">Наши магазины</h1>
        <p className="max-w-3xl text-[var(--muted)]">
          Актуальные адреса партнёров из вашего файла «Магазины»: Санкт-Петербург, Москва, Казань, Екатеринбург,
          Новосибирск и ещё 8 городов. Фильтр по городам работает мгновенно на клиенте.
        </p>
      </section>

      <section className="section-shell mt-8">
        <StoreGrid stores={storeLocations} />
      </section>
      <Footer />
    </div>
  );
}
