import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { paymentSections } from "@/data/payment";

export default function PaymentPage() {
  return (
    <div className="pb-16">
      <Header />
      <section className="section-shell mt-12 space-y-3">
        <p className="section-title text-sm text-[var(--muted)]">доставка и оплата</p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-[var(--ink)]">Как мы доставляем</h1>
        <p className="max-w-3xl text-[var(--muted)]">
          Контент перенесён из вашего блока «Доставка и оплата». Предоплата 100%, основной канал — СДЭК, альтернативно
          Почта РФ или поставка в офлайн-магазины.
        </p>
      </section>

      <section className="section-shell mt-8">
        <FaqAccordion items={paymentSections.map((item) => ({ question: item.title, answer: item.body }))} />
      </section>
      <Footer />
    </div>
  );
}
