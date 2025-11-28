import Image from "next/image";

const aboutText =
  "Я – Яна. В 2021 году начала лить свечи, позже ко мне присоединилась мама, и теперь мы вместе создаём свечи и духи во всех форматах. Мы многократно тестировали каждую формулу, поэтому свечи горят ровно и без туннелей, а парфюмерия раскрывается многослойно и держится часами.";

const bullets = [
 "Натуральный соевый воск и отдушки США по стандарту IFRA",
 "Многие ароматы — унисекс, комфортные для дома и улицы",
 "Сборка вручную и контроль перед каждой отправкой"
];

export const AboutSection = () => (
  <section id="about" className="section-shell mt-16 lg:mt-20">
    <div className="glass grid gap-10 overflow-hidden p-6 md:grid-cols-2 md:p-10">
      <div className="space-y-5">
        <p className="section-title text-sm text-[var(--muted)]">о бренде</p>
        <h3 className="font-display text-3xl tracking-[0.06em] text-[var(--ink)]">
          Ручная работа из Новосибирска
        </h3>
        <p className="text-[var(--muted)]">{aboutText}</p>
        <ul className="space-y-3 text-[var(--muted)]">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative overflow-hidden rounded-3xl shadow-card">
        <Image
          src="https://static.tildacdn.com/tild6234-6166-4130-a239-646536333336/photo.jpg"
          alt="Команда Home Secret"
          width={900}
          height={680}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          since 2021
        </div>
      </div>
    </div>
  </section>
);
