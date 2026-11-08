/**
 * Translations for the guest rating page.
 *
 * Tags are stored in the database as stable keys (e.g. "slow"), so a German
 * guest's review still reads in Bulgarian on the manager's dashboard.
 */

export const LANGS = ['bg', 'en', 'de', 'ro', 'ru'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = {
  bg: 'Български',
  en: 'English',
  de: 'Deutsch',
  ro: 'Română',
  ru: 'Русский',
};

export const LOCALES: Record<Lang, string> = {
  bg: 'bg-BG',
  en: 'en-GB',
  de: 'de-DE',
  ro: 'ro-RO',
  ru: 'ru-RU',
};

export type Sentiment = 'low' | 'mid' | 'high';

export const sentimentOf = (stars: number): Sentiment => (stars <= 2 ? 'low' : stars === 3 ? 'mid' : 'high');

export const TAG_KEYS: Record<Sentiment, string[]> = {
  low: ['slow', 'rude', 'wrong_order', 'cold_food', 'bill_issue', 'ignored'],
  mid: ['ok_service', 'bit_slow', 'friendly', 'busy', 'good_food', 'could_better'],
  high: ['kind', 'fast', 'recommend', 'attentive', 'atmosphere', 'will_return'],
};

const TAGS: Record<string, Record<Lang, string>> = {
  slow:        { bg: 'Дълго чакане', en: 'Long wait', de: 'Lange Wartezeit', ro: 'Așteptare lungă', ru: 'Долгое ожидание' },
  rude:        { bg: 'Неучтиво отношение', en: 'Impolite staff', de: 'Unhöflicher Service', ro: 'Personal nepoliticos', ru: 'Невежливое обслуживание' },
  wrong_order: { bg: 'Грешна поръчка', en: 'Wrong order', de: 'Falsche Bestellung', ro: 'Comandă greșită', ru: 'Перепутали заказ' },
  cold_food:   { bg: 'Студена храна', en: 'Cold food', de: 'Kaltes Essen', ro: 'Mâncare rece', ru: 'Холодная еда' },
  bill_issue:  { bg: 'Грешка в сметката', en: 'Mistake on the bill', de: 'Fehler in der Rechnung', ro: 'Greșeală în notă', ru: 'Ошибка в счёте' },
  ignored:     { bg: 'Никой не ни обърна внимание', en: 'We felt ignored', de: 'Wir wurden ignoriert', ro: 'Ne-am simțit ignorați', ru: 'На нас не обращали внимания' },
  ok_service:  { bg: 'Нормално обслужване', en: 'Service was okay', de: 'Service war in Ordnung', ro: 'Servire decentă', ru: 'Обслуживание нормальное' },
  bit_slow:    { bg: 'Малко бавно', en: 'A bit slow', de: 'Etwas langsam', ro: 'Puțin lent', ru: 'Немного медленно' },
  friendly:    { bg: 'Любезен персонал', en: 'Friendly staff', de: 'Freundliches Personal', ro: 'Personal amabil', ru: 'Приветливый персонал' },
  busy:        { bg: 'Много натоварено', en: 'Very busy', de: 'Sehr voll', ro: 'Foarte aglomerat', ru: 'Очень много людей' },
  good_food:   { bg: 'Хубава храна', en: 'Good food', de: 'Gutes Essen', ro: 'Mâncare bună', ru: 'Вкусная еда' },
  could_better:{ bg: 'Може и по-добре', en: 'Could be better', de: 'Da geht noch mehr', ro: 'Se poate mai bine', ru: 'Можно лучше' },
  kind:        { bg: 'Много любезно отношение', en: 'Very kind', de: 'Sehr freundlich', ro: 'Foarte amabil', ru: 'Очень любезно' },
  fast:        { bg: 'Бързо обслужване', en: 'Fast service', de: 'Schneller Service', ro: 'Servire rapidă', ru: 'Быстрое обслуживание' },
  recommend:   { bg: 'Чудесни препоръки', en: 'Great recommendations', de: 'Tolle Empfehlungen', ro: 'Recomandări excelente', ru: 'Отличные рекомендации' },
  attentive:   { bg: 'Внимание към детайла', en: 'Attention to detail', de: 'Aufmerksam bis ins Detail', ro: 'Atenție la detalii', ru: 'Внимание к деталям' },
  atmosphere:  { bg: 'Приятна атмосфера', en: 'Lovely atmosphere', de: 'Schöne Atmosphäre', ro: 'Atmosferă plăcută', ru: 'Приятная атмосфера' },
  will_return: { bg: 'Ще дойдем отново', en: "We'll come back", de: 'Wir kommen wieder', ro: 'Vom reveni', ru: 'Придём снова' },
};

/** A tag key in the given language; unknown values (older reviews) pass through. */
export function tagLabel(key: string, lang: Lang = 'bg'): string {
  return TAGS[key]?.[lang] ?? key;
}

interface Dict {
  title: string;
  question: string;
  choose: string;
  starLabels: [string, string, string, string, string];
  headlines: [string, string, string, string, string];
  subtext: Record<Sentiment, string>;
  tagsHeading: Record<Sentiment, string>;
  commentLabel: string;
  placeholderLow: string;
  placeholder: string;
  lowNotice: string;
  submitLow: string;
  submit: string;
  sending: string;
  loading: string;
  notFoundTitle: string;
  notFoundText: string;
  errorGeneric: string;
  errorRateLimited: string;
  errorCaptcha: string;
  successTitle: Record<Sentiment, string>;
  successText: Record<Sentiment, string>;
  tipTitle: string;
  tipNote: string;
  tipAmountHint: string;
  tipAmountAuto: string;
  tipOther: string;
  tipCta: string;
  tipDemo: string;
  googleTitle: string;
  googleText: string;
  googleCta: string;
  googleDemo: string;
  voucherTitle: string;
  voucherShow: string;
  voucherValid: string;
  again: string;
  language: string;
}

const DICT: Record<Lang, Dict> = {
  bg: {
    title: 'Оценете обслужването',
    question: 'Как беше обслужването днес?',
    choose: 'Изберете оценка',
    starLabels: ['Много лошо', 'Лошо', 'Средно', 'Отлично', 'Перфектно!'],
    headlines: ['Съжаляваме за лошото изживяване', 'Съжаляваме, че не беше добре', 'Благодарим за честната оценка', 'Радваме се, че ви хареса!', 'Благодарим ви!'],
    subtext: {
      low: 'Кажете ни какво се случи — ще го прочете управителят.',
      mid: 'Какво можем да направим по-добре?',
      high: 'Какво ви хареса най-много?',
    },
    tagsHeading: { low: 'Какъв беше проблемът?', mid: 'Как мина?', high: 'Какво ви хареса?' },
    commentLabel: 'Коментар (по желание)',
    placeholderLow: 'Опишете какво се случи…',
    placeholder: 'Споделете няколко думи…',
    lowNotice: 'Отговорът ви отива директно при управителя на заведението.',
    submitLow: 'Изпрати на управителя',
    submit: 'Изпрати оценката',
    sending: 'Изпращане…',
    loading: 'Зареждане…',
    notFoundTitle: 'Картата не е разпозната',
    notFoundText: 'Този код не отговаря на активен сервитьор. Моля, свържете се с персонала.',
    errorGeneric: 'Оценката не беше изпратена — проверете връзката и опитайте отново.',
    errorRateLimited: 'Вече изпратихте оценка за този сервитьор. Благодарим!',
    errorCaptcha: 'Не успяхме да потвърдим, че не сте робот. Опитайте отново.',
    successTitle: { low: 'Съобщението ви е изпратено', mid: 'Благодарим за мнението!', high: 'Благодарим ви!' },
    successText: {
      low: 'Управителят ще го види веднага. Благодарим, че ни казахте.',
      mid: 'Ще го използваме, за да станем по-добри.',
      high: '{name} ще се зарадва на оценката ви.',
    },
    tipTitle: 'Оставете бакшиш на {name}',
    tipNote: 'Плащате директно на получателя — TipTap не получава и не съхранява пари.',
    tipAmountHint: 'Въведете избраната сума на следващата страница.',
    tipAmountAuto: 'Сумата ще бъде попълнена автоматично.',
    tipOther: 'Друга сума',
    tipCta: 'Към плащането',
    tipDemo: 'Демо: тук гостът отваря платежната страница на сервитьора (напр. Revolut) и плаща директно.',
    googleTitle: 'Споделете опита си в Google',
    googleText: 'Един отзив помага на други гости да ни открият.',
    googleCta: 'Напишете отзив в Google',
    googleDemo: 'Демо: тук гостът отваря страницата за отзив в Google.',
    voucherTitle: 'Подарък от заведението',
    voucherShow: 'Покажете кода на персонала при следващото посещение.',
    voucherValid: 'Валиден до {date}',
    again: 'Нова оценка',
    language: 'Език',
  },
  en: {
    title: 'Rate the service',
    question: 'How was your service today?',
    choose: 'Choose a rating',
    starLabels: ['Very bad', 'Bad', 'Okay', 'Great', 'Perfect!'],
    headlines: ["We're sorry about your experience", "Sorry it wasn't good", 'Thanks for the honest rating', "We're glad you enjoyed it!", 'Thank you so much!'],
    subtext: {
      low: 'Tell us what happened — the manager will read it.',
      mid: 'What could we do better?',
      high: 'What did you like most?',
    },
    tagsHeading: { low: 'What went wrong?', mid: 'How was it?', high: 'What did you like?' },
    commentLabel: 'Comment (optional)',
    placeholderLow: 'Describe what happened…',
    placeholder: 'Share a few words…',
    lowNotice: 'Your feedback goes straight to the venue manager.',
    submitLow: 'Send to the manager',
    submit: 'Send rating',
    sending: 'Sending…',
    loading: 'Loading…',
    notFoundTitle: 'Card not recognised',
    notFoundText: "This code doesn't belong to an active waiter. Please ask the staff.",
    errorGeneric: "Your rating wasn't sent — check your connection and try again.",
    errorRateLimited: "You've already rated this waiter. Thank you!",
    errorCaptcha: "We couldn't verify you're not a robot. Please try again.",
    successTitle: { low: 'Your message has been sent', mid: 'Thanks for your feedback!', high: 'Thank you!' },
    successText: {
      low: 'The manager will see it right away. Thank you for telling us.',
      mid: "We'll use it to get better.",
      high: '{name} will be happy to see your rating.',
    },
    tipTitle: 'Leave a tip for {name}',
    tipNote: 'You pay the recipient directly — TipTap never receives or holds any money.',
    tipAmountHint: 'Enter the amount on the next page.',
    tipAmountAuto: 'The amount will be filled in for you.',
    tipOther: 'Other',
    tipCta: 'Continue to payment',
    tipDemo: "Demo: here the guest opens the waiter's own payment page (e.g. Revolut) and pays directly.",
    googleTitle: 'Share your experience on Google',
    googleText: 'A review helps other guests find us.',
    googleCta: 'Write a Google review',
    googleDemo: 'Demo: here the guest opens the Google review page.',
    voucherTitle: 'A gift from the venue',
    voucherShow: 'Show this code to the staff on your next visit.',
    voucherValid: 'Valid until {date}',
    again: 'New rating',
    language: 'Language',
  },
  de: {
    title: 'Bewerten Sie den Service',
    question: 'Wie war der Service heute?',
    choose: 'Bewertung wählen',
    starLabels: ['Sehr schlecht', 'Schlecht', 'Okay', 'Sehr gut', 'Perfekt!'],
    headlines: ['Das tut uns sehr leid', 'Schade, dass es nicht gut war', 'Danke für Ihre ehrliche Bewertung', 'Schön, dass es Ihnen gefallen hat!', 'Vielen herzlichen Dank!'],
    subtext: {
      low: 'Sagen Sie uns, was passiert ist — die Leitung liest es.',
      mid: 'Was können wir besser machen?',
      high: 'Was hat Ihnen am besten gefallen?',
    },
    tagsHeading: { low: 'Was lief schief?', mid: 'Wie war es?', high: 'Was hat gefallen?' },
    commentLabel: 'Kommentar (optional)',
    placeholderLow: 'Beschreiben Sie, was passiert ist…',
    placeholder: 'Ein paar Worte…',
    lowNotice: 'Ihr Feedback geht direkt an die Leitung des Lokals.',
    submitLow: 'An die Leitung senden',
    submit: 'Bewertung senden',
    sending: 'Wird gesendet…',
    loading: 'Wird geladen…',
    notFoundTitle: 'Karte nicht erkannt',
    notFoundText: 'Dieser Code gehört zu keinem aktiven Mitarbeiter. Bitte wenden Sie sich an das Personal.',
    errorGeneric: 'Die Bewertung wurde nicht gesendet — bitte Verbindung prüfen und erneut versuchen.',
    errorRateLimited: 'Sie haben diesen Mitarbeiter bereits bewertet. Danke!',
    errorCaptcha: 'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte erneut versuchen.',
    successTitle: { low: 'Ihre Nachricht wurde gesendet', mid: 'Danke für Ihr Feedback!', high: 'Vielen Dank!' },
    successText: {
      low: 'Die Leitung sieht sie sofort. Danke, dass Sie es uns sagen.',
      mid: 'Wir nutzen es, um besser zu werden.',
      high: '{name} freut sich über Ihre Bewertung.',
    },
    tipTitle: 'Trinkgeld für {name}',
    tipNote: 'Sie zahlen direkt an den Empfänger — TipTap erhält oder verwahrt kein Geld.',
    tipAmountHint: 'Geben Sie den Betrag auf der nächsten Seite ein.',
    tipAmountAuto: 'Der Betrag wird automatisch eingetragen.',
    tipOther: 'Anderer Betrag',
    tipCta: 'Weiter zur Zahlung',
    tipDemo: 'Demo: Hier öffnet der Gast die Zahlungsseite des Kellners (z. B. Revolut) und zahlt direkt.',
    googleTitle: 'Teilen Sie Ihre Erfahrung auf Google',
    googleText: 'Eine Bewertung hilft anderen Gästen, uns zu finden.',
    googleCta: 'Google-Bewertung schreiben',
    googleDemo: 'Demo: Hier öffnet der Gast die Google-Bewertungsseite.',
    voucherTitle: 'Ein Geschenk des Hauses',
    voucherShow: 'Zeigen Sie diesen Code beim nächsten Besuch dem Personal.',
    voucherValid: 'Gültig bis {date}',
    again: 'Neue Bewertung',
    language: 'Sprache',
  },
  ro: {
    title: 'Evaluați servirea',
    question: 'Cum a fost servirea astăzi?',
    choose: 'Alegeți o notă',
    starLabels: ['Foarte rău', 'Rău', 'Acceptabil', 'Foarte bine', 'Perfect!'],
    headlines: ['Ne pare rău pentru experiența dvs.', 'Ne pare rău că nu a fost bine', 'Mulțumim pentru sinceritate', 'Ne bucurăm că v-a plăcut!', 'Vă mulțumim din suflet!'],
    subtext: {
      low: 'Spuneți-ne ce s-a întâmplat — managerul va citi.',
      mid: 'Ce putem face mai bine?',
      high: 'Ce v-a plăcut cel mai mult?',
    },
    tagsHeading: { low: 'Ce nu a mers?', mid: 'Cum a fost?', high: 'Ce v-a plăcut?' },
    commentLabel: 'Comentariu (opțional)',
    placeholderLow: 'Descrieți ce s-a întâmplat…',
    placeholder: 'Câteva cuvinte…',
    lowNotice: 'Mesajul dvs. ajunge direct la managerul localului.',
    submitLow: 'Trimite managerului',
    submit: 'Trimite evaluarea',
    sending: 'Se trimite…',
    loading: 'Se încarcă…',
    notFoundTitle: 'Card nerecunoscut',
    notFoundText: 'Acest cod nu aparține unui ospătar activ. Vă rugăm să întrebați personalul.',
    errorGeneric: 'Evaluarea nu a fost trimisă — verificați conexiunea și încercați din nou.',
    errorRateLimited: 'Ați evaluat deja acest ospătar. Mulțumim!',
    errorCaptcha: 'Nu am putut verifica faptul că nu sunteți robot. Încercați din nou.',
    successTitle: { low: 'Mesajul dvs. a fost trimis', mid: 'Mulțumim pentru părere!', high: 'Vă mulțumim!' },
    successText: {
      low: 'Managerul îl va vedea imediat. Mulțumim că ne-ați spus.',
      mid: 'Îl vom folosi ca să ne îmbunătățim.',
      high: '{name} se va bucura de evaluarea dvs.',
    },
    tipTitle: 'Lăsați un bacșiș pentru {name}',
    tipNote: 'Plătiți direct destinatarului — TipTap nu primește și nu păstrează bani.',
    tipAmountHint: 'Introduceți suma pe pagina următoare.',
    tipAmountAuto: 'Suma va fi completată automat.',
    tipOther: 'Altă sumă',
    tipCta: 'Continuă la plată',
    tipDemo: 'Demo: aici oaspetele deschide pagina de plată a ospătarului (ex. Revolut) și plătește direct.',
    googleTitle: 'Spuneți-vă părerea pe Google',
    googleText: 'O recenzie îi ajută pe alți oaspeți să ne găsească.',
    googleCta: 'Scrieți o recenzie Google',
    googleDemo: 'Demo: aici oaspetele deschide pagina de recenzii Google.',
    voucherTitle: 'Un cadou din partea localului',
    voucherShow: 'Arătați codul personalului la următoarea vizită.',
    voucherValid: 'Valabil până la {date}',
    again: 'Evaluare nouă',
    language: 'Limba',
  },
  ru: {
    title: 'Оцените обслуживание',
    question: 'Как вас обслужили сегодня?',
    choose: 'Выберите оценку',
    starLabels: ['Очень плохо', 'Плохо', 'Нормально', 'Отлично', 'Идеально!'],
    headlines: ['Нам очень жаль', 'Жаль, что было не очень', 'Спасибо за честную оценку', 'Рады, что вам понравилось!', 'Огромное спасибо!'],
    subtext: {
      low: 'Расскажите, что случилось — это прочитает управляющий.',
      mid: 'Что мы можем улучшить?',
      high: 'Что понравилось больше всего?',
    },
    tagsHeading: { low: 'Что пошло не так?', mid: 'Как всё прошло?', high: 'Что понравилось?' },
    commentLabel: 'Комментарий (по желанию)',
    placeholderLow: 'Опишите, что произошло…',
    placeholder: 'Пара слов…',
    lowNotice: 'Ваш отзыв попадёт напрямую к управляющему заведения.',
    submitLow: 'Отправить управляющему',
    submit: 'Отправить оценку',
    sending: 'Отправка…',
    loading: 'Загрузка…',
    notFoundTitle: 'Карта не распознана',
    notFoundText: 'Этот код не связан с активным официантом. Обратитесь, пожалуйста, к персоналу.',
    errorGeneric: 'Оценка не отправлена — проверьте соединение и попробуйте снова.',
    errorRateLimited: 'Вы уже оценили этого официанта. Спасибо!',
    errorCaptcha: 'Не удалось подтвердить, что вы не робот. Попробуйте ещё раз.',
    successTitle: { low: 'Ваше сообщение отправлено', mid: 'Спасибо за отзыв!', high: 'Спасибо!' },
    successText: {
      low: 'Управляющий увидит его сразу. Спасибо, что сообщили.',
      mid: 'Мы учтём его, чтобы стать лучше.',
      high: 'Ваша оценка порадует: {name}.',
    },
    tipTitle: 'Чаевые — {name}',
    tipNote: 'Оплата идёт напрямую получателю — TipTap не получает и не хранит деньги.',
    tipAmountHint: 'Введите сумму на следующей странице.',
    tipAmountAuto: 'Сумма будет подставлена автоматически.',
    tipOther: 'Другая сумма',
    tipCta: 'Перейти к оплате',
    tipDemo: 'Демо: здесь гость открывает платёжную страницу официанта (например, Revolut) и платит напрямую.',
    googleTitle: 'Поделитесь впечатлением в Google',
    googleText: 'Отзыв помогает другим гостям найти нас.',
    googleCta: 'Написать отзыв в Google',
    googleDemo: 'Демо: здесь гость открывает страницу отзыва в Google.',
    voucherTitle: 'Подарок от заведения',
    voucherShow: 'Покажите этот код персоналу при следующем визите.',
    voucherValid: 'Действителен до {date}',
    again: 'Новая оценка',
    language: 'Язык',
  },
};

export function dict(lang: Lang): Dict {
  return DICT[lang];
}

/** Replace {placeholders} in a translated string. */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m);
}

const STORAGE_KEY = 'tiptap_lang';

/** The guest's saved choice, else the phone's language, else English. */
export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch { /* storage blocked */ }
  const preferred = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : [];
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0];
    if ((LANGS as readonly string[]).includes(base)) return base as Lang;
  }
  return 'en';
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch { /* storage blocked */ }
}
