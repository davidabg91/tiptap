// Bulgarian labels for the review tag keys, for alerts sent to the venue.
// Keep in sync with TAGS in src/lib/ratingI18n.ts.

const TAGS_BG: Record<string, string> = {
  slow: 'Дълго чакане',
  rude: 'Неучтиво отношение',
  wrong_order: 'Грешна поръчка',
  cold_food: 'Студена храна',
  bill_issue: 'Грешка в сметката',
  ignored: 'Никой не ни обърна внимание',
  ok_service: 'Нормално обслужване',
  bit_slow: 'Малко бавно',
  friendly: 'Любезен персонал',
  busy: 'Много натоварено',
  good_food: 'Хубава храна',
  could_better: 'Може и по-добре',
  kind: 'Много любезно отношение',
  fast: 'Бързо обслужване',
  recommend: 'Чудесни препоръки',
  attentive: 'Внимание към детайла',
  atmosphere: 'Приятна атмосфера',
  will_return: 'Ще дойдем отново',
};

export const tagLabelBg = (key: string): string => TAGS_BG[key] ?? key;
