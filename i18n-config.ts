export const i18n = {
    defaultLocale: "en-US",
    locales: [
      "en-US",
      "es-MX",
      "fr-FR",
      "de-DE",
      "it-IT",
      "pt-BR",
      "zh-CN",
      "ja-JP",
      "ko-KR",
      "ar-SA",
      "ru-RU"
  ],
    localeSwitcherValues: [
      {"value": "en-US", "label": "English (United States)"},
      {"value": "es-MX", "label": "Spanish (Mexico)"},
      {"value": "fr-FR", "label": "French (France)"},
      {"value": "de-DE", "label": "German (Germany)"},
      {"value": "it-IT", "label": "Italian (Italy)"},
      {"value": "pt-BR", "label": "Portuguese (Brazil)"},
      {"value": "zh-CN", "label": "Chinese (China)"},
      {"value": "ja-JP", "label": "Japanese (Japan)"},
      {"value": "ko-KR", "label": "Korean (South Korea)"},
      {"value": "ar-SA", "label": "Arabic (Saudi Arabia)"},
      {"value": "ru-RU", "label": "Russian (Russia)"}
  ]
  } as const;
  
  export type Locale = (typeof i18n)["locales"][number];