export const Footer = () => (
  <footer className="mt-16 border-t border-black/5 bg-white/70 py-10 text-sm text-[var(--muted)]">
    <div className="section-shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="text-base font-semibold text-[var(--ink)]">ИП Ларионов Александр Сергеевич</div>
        <div>ИНН 540303178088 · ОГРНИП 322547600081374</div>
        <div>г. Новосибирск</div>
        <div>
          E-mail:{" "}
          <a className="underline underline-offset-2" href="mailto:home.secret.shopp@gmail.com">
            home.secret.shopp@gmail.com
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-[var(--ink)]">
        <a href="https://home-secret.shop/" className="rounded-full bg-[var(--bg-strong)] px-3 py-2">
          Главная
        </a>
        <a href="/payment" className="rounded-full bg-[var(--bg-strong)] px-3 py-2">
          Доставка
        </a>
        <a href="/faq" className="rounded-full bg-[var(--bg-strong)] px-3 py-2">
          FAQ
        </a>
        <a href="/store" className="rounded-full bg-[var(--bg-strong)] px-3 py-2">
          Магазины
        </a>
      </div>
      <div className="text-xs text-[var(--muted)]">© Все права защищены. 2025</div>
    </div>
  </footer>
);
