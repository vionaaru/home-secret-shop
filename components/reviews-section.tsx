import { reviews } from "@/data/reviews";

export const ReviewsSection = () => (
  <section id="reviews" className="section-shell mt-16 space-y-6 lg:mt-20">
    <div className="flex flex-col gap-2">
      <p className="section-title text-sm text-[var(--muted)]">отзывы</p>
      <h2 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)] sm:text-4xl">
        Что говорят клиенты
      </h2>
      <p className="max-w-2xl text-[var(--muted)]">
        Собрали живые отзывы из раздела «Отзывы» на старом сайте, включая любимые ароматы и впечатления от доставки.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <article
          key={review.name}
          className="glass flex h-full flex-col gap-3 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
        >
          <div className="text-sm font-semibold text-[var(--ink)]">{review.name}</div>
          <div className="text-xs uppercase tracking-[0.08em] text-amber-900">{review.pros}</div>
          <p className="text-[var(--muted)]">{review.body}</p>
        </article>
      ))}
    </div>
  </section>
);
