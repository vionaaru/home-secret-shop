import { AboutSection } from "@/components/about-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { ReviewsSection } from "@/components/reviews-section";
import { faqs } from "@/data/faqs";

const usp = [
  { title: "Соответствие IFRA", text: "Используем безопасные отдушки и соевый воск производства США." },
  { title: "Доставка в 2–3 дня", text: "Отправляем через СДЭК или Почту РФ, трек — сразу после отгрузки." },
  { title: "Бонусы", text: "Бесплатная доставка от 5 000 ₽ + скидка 20% на День рождения." }
];

export default function HomePage() {
  return (
    <div className="pb-16">
      <Header />
      <Hero />

      <section className="section-shell mt-10 grid gap-4 md:grid-cols-3">
        {usp.map((item) => (
          <article key={item.title} className="glass h-full p-5 shadow-soft">
            <div className="text-sm uppercase tracking-[0.08em] text-[var(--muted)]">{item.title}</div>
            <p className="text-[var(--ink)]">{item.text}</p>
          </article>
        ))}
      </section>

      <ProductsSection />
      <AboutSection />
      <ReviewsSection />

      <section className="section-shell mt-16 space-y-4 lg:mt-20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-title text-sm text-[var(--muted)]">faq</p>
            <h3 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)] sm:text-4xl">
              Важно знать
            </h3>
          </div>
          <a href="/faq" className="button-secondary">
            Полный раздел FAQ
          </a>
        </div>
        <FaqAccordion items={faqs} limit={3} />
      </section>

      <Footer />
    </div>
  );
}
