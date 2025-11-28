export const Footer = () => (
  <footer className="mt-16 border-t border-[var(--accent)]/20 bg-gradient-to-t from-white/80 to-[var(--bg-strong)]/50 py-12 text-sm text-[var(--muted)] relative overflow-hidden">
    {/* Декоративные элементы */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"></div>
    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[var(--accent-rose)]/10 to-transparent blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-[var(--accent-gold)]/10 to-transparent blur-3xl"></div>

    <div className="section-shell relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌸</span>
          <div className="text-base font-semibold text-[var(--ink)]">ИП Ларионов Александр Сергеевич</div>
        </div>
        <div className="space-y-1 text-xs">
          <div>ИНН 540303178088 · ОГРНИП 322547600081374</div>
          <div>г. Новосибирск</div>
          <div>
            E-mail:{" "}
            <a className="text-gradient hover:underline underline-offset-2 transition-all" href="mailto:home.secret.shopp@gmail.com">
              home.secret.shopp@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-[var(--ink)]">
        <a href="https://home-secret.shop/" className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-2)]/10 hover:from-[var(--accent)]/20 hover:to-[var(--accent-2)]/20 px-4 py-2 border border-[var(--accent)]/20 transition-all duration-300 hover:shadow-soft">
          ✨ Главная
        </a>
        <a href="/payment" className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-2)]/10 hover:from-[var(--accent)]/20 hover:to-[var(--accent-2)]/20 px-4 py-2 border border-[var(--accent)]/20 transition-all duration-300 hover:shadow-soft">
          📦 Доставка
        </a>
        <a href="/faq" className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-2)]/10 hover:from-[var(--accent)]/20 hover:to-[var(--accent-2)]/20 px-4 py-2 border border-[var(--accent)]/20 transition-all duration-300 hover:shadow-soft">
          ❓ FAQ
        </a>
        <a href="/store" className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-2)]/10 hover:from-[var(--accent)]/20 hover:to-[var(--accent-2)]/20 px-4 py-2 border border-[var(--accent)]/20 transition-all duration-300 hover:shadow-soft">
          🏪 Магазины
        </a>
      </div>

      <div className="text-xs text-[var(--muted)] flex items-center gap-2">
        <span>💖</span>
        <span>© Все права защищены. 2025</span>
      </div>
    </div>
  </footer>
);
