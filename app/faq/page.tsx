import { FaqAccordion } from "@/components/faq-accordion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { faqs } from "@/data/faqs";

export default function FaqPage() {
  return (
    <div className="pb-16">
      <Header />
      <section className="section-shell mt-12 space-y-3">
        <p className="section-title text-sm text-[var(--muted)]">faq</p>
        <h1 className="font-display text-4xl tracking-[0.08em] text-[var(--ink)]">Ответы на вопросы</h1>
        <p className="max-w-3xl text-[var(--muted)]">
          Полный перенос раздела «Важно знать»: составы, инструкции по использованию свечей, диффузоров и духов, скидки,
          условия доставки и возврата.
        </p>
      </section>
      <section className="section-shell mt-8">
        <FaqAccordion items={faqs} />
      </section>
      <Footer />
    </div>
  );
}
