export type VariantOption = {
  label: string;
  price?: number;
  oldPrice?: number;
};

export type ProductVariant = {
  label: string;
  options: VariantOption[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  description: string;
  highlight?: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
};

const aromaPalette = [
  "Дух шамана",
  "Снежная пихта",
  "Манго & кокосовое молоко",
  "Мох & папоротник",
  "Дубовый мох & янтарь",
  "Персиковый нектар",
  "Табак & ваниль",
  "Смородина & мята",
  "Морская соль & орхидея",
  "Розовые кристаллы",
  "Антикварная библиотека",
  "Заснеженный можжевельник",
  "Розовое шампанское",
  "Грейпфрут & мята",
  "Египетский янтарь",
  "Груша в бренди",
  "Вино Тосканы",
  "Летние закаты"
];

const candleExtras = ["Чистый хлопок", "Чао-какао", "Карамельный попкорн", "Горячий хлеб"];

export const products: Product[] = [
  {
    id: "oil-perfume",
    name: "Масляные духи",
    slug: "oil-perfume",
    price: 690,
    oldPrice: 890,
    description:
      "Роликовые масляные духи на базе фракции кокосового масла и косметического силикона. Средняя стойкость 3–4 часа, мягко раскрываются на коже и волосах.",
    highlight: "Ролик 10 мл, 18 ароматов",
    tags: ["унисекс", "масло", "roll-on"],
    images: [
      "https://static.tildacdn.com/tild3934-3366-4236-a438-666631333662/A7209435.JPG",
      "https://static.tildacdn.com/tild6139-6663-4864-b661-356461313633/A7201962.jpg"
    ],
    variants: [
      { label: "Аромат", options: aromaPalette.map((label) => ({ label })) },
      { label: "Объём", options: [{ label: "10 мл", price: 690, oldPrice: 890 }] }
    ]
  },
  {
    id: "spray-perfume",
    name: "Спрей-духи",
    slug: "spray-perfume",
    price: 690,
    oldPrice: 890,
    description:
      "Самые интенсивные в линейке: парфюмерный концентрат на косметическом спирте. Одного распыления хватает на день, доступны тревел и полноразмер.",
    highlight: "Форматы 5 и 10 мл",
    tags: ["спрей", "интенсивные", "унисекс"],
    images: [
      "https://static.tildacdn.com/tild3736-3861-4732-b132-643033326361/1.jpg",
      "https://static.tildacdn.com/tild3039-6264-4635-a430-336139313630/90.jpg"
    ],
    variants: [
      { label: "Аромат", options: aromaPalette.concat("Розовое шампанское").map((label) => ({ label })) },
      {
        label: "Объём",
        options: [
          { label: "5 мл", price: 690, oldPrice: 890 },
          { label: "10 мл", price: 890, oldPrice: 1190 }
        ]
      }
    ]
  },
  {
    id: "solid-perfume",
    name: "Твёрдые духи",
    slug: "solid-perfume",
    price: 590,
    oldPrice: 790,
    description:
      "Ненавязчивые ароматы на базе соевого воска, масла кокоса и виноградной косточки. Работают как skin-scent: можно наносить на волосы и точки пульса.",
    highlight: "Металлическая банка 20 г",
    tags: ["воск", "лайт-аромат", "безспиртовые"],
    images: [
      "https://static.tildacdn.com/tild6434-6331-4939-b061-376239656336/IMG_7330.jpg",
      "https://static.tildacdn.com/tild3765-3836-4339-b935-613431633862/IMG_7321.jpg"
    ],
    variants: [
      {
        label: "Аромат",
        options: aromaPalette
          .concat(["Чистый хлопок", "Розовое шампанское"])
          .map((label) => ({ label }))
      },
      { label: "Объём", options: [{ label: "20 мл", price: 590, oldPrice: 790 }] }
    ]
  },
  {
    id: "candle-30",
    name: "Свеча 30 мл",
    slug: "candle-30",
    price: 390,
    oldPrice: 590,
    description:
      "Карманная свеча из натурального соевого воска. Быстро прогревает пространство и отлично подходит для тревел-формата или теста аромата.",
    highlight: "Тревел-формат, хлопковый фитиль",
    tags: ["свеча", "соевый воск", "travel"],
    images: [
      "https://static.tildacdn.com/tild6665-6566-4038-b833-343037383437/30_.jpg",
      "https://static.tildacdn.com/tild3534-3938-4839-b061-393833326664/30__2.jpg"
    ],
    variants: [
      { label: "Аромат", options: aromaPalette.concat(candleExtras).concat("Розовое шампанское").map((label) => ({ label })) },
      { label: "Фитиль", options: [{ label: "Хлопковый", price: 390, oldPrice: 590 }] }
    ]
  },
  {
    id: "candle-100",
    name: "Свеча 100 мл",
    slug: "candle-100",
    price: 590,
    oldPrice: 890,
    description:
      "Домашняя свеча в стекле: хлопковый или деревянный фитиль, плавный прогрев и выразительный шлейф. 3–4 часа комфортного горения за один сеанс.",
    highlight: "Хлопковый или деревянный фитиль",
    tags: ["свеча", "лонг-берн", "соевый воск"],
    images: [
      "https://static.tildacdn.com/tild3133-3132-4437-a264-303636356166/1.jpg",
      "https://static.tildacdn.com/tild6362-6230-4462-a233-386130343466/2.jpg"
    ],
    variants: [
      {
        label: "Аромат",
        options: aromaPalette
          .concat(["Карамельный попкорн", "Чао-какао", "Горячий хлеб", "Чистый хлопок", "Розовое шампанское"])
          .map((label) => ({ label }))
      },
      {
        label: "Фитиль",
        options: [
          { label: "Хлопковый", price: 590, oldPrice: 890 },
          { label: "Деревянный", price: 590, oldPrice: 890 }
        ]
      }
    ]
  },
  {
    id: "diffuser",
    name: "Аромадиффузор для дома",
    slug: "diffuser",
    price: 1190,
    oldPrice: 1490,
    description:
      "Стеклянный диффузор с фибровыми палочками: регулируем интенсивность количеством палочек, хватает в среднем на 1–3 месяца даже в просторной комнате.",
    highlight: "50 мл, палочки в комплекте",
    tags: ["диффузор", "дом", "фибровые палочки"],
    images: [
      "https://static.tildacdn.com/tild3431-3732-4934-b737-656266306564/A7201768.jpg",
      "https://static.tildacdn.com/tild6430-3962-4661-a566-343833356330/A7201774.jpg"
    ],
    variants: [
      {
        label: "Аромат",
        options: [
          "Дух шамана",
          "Мох & папоротник",
          "Дубовый мох & янтарь",
          "Персиковый нектар",
          "Табак & ваниль",
          "Смородина & мята",
          "Морская соль & орхидея",
          "Заснеженный можжевельник",
          "Вино Тосканы"
        ].map((label) => ({ label }))
      },
      { label: "Объём", options: [{ label: "50 мл", price: 1190, oldPrice: 1490 }] }
    ]
  }
];
