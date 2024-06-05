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
      {"value": "es-MX", "label": "Español (México)"},
      {"value": "fr-FR", "label": "Français (France)"},
      {"value": "de-DE", "label": "Deutsch (Deutschland)"},
      {"value": "it-IT", "label": "Italiano (Italia)"},
      {"value": "pt-BR", "label": "Português (Brasil)"},
      {"value": "zh-CN", "label": "中文 (中国)"},
      {"value": "ja-JP", "label": "日本語 (日本)"},
      {"value": "ko-KR", "label": "한국어 (대한민국)"},
      {"value": "ar-SA", "label": "العربية (المملكة العربية السعودية)"},
      {"value": "ru-RU", "label": "Русский (Россия)"}
    ]
  } as const;
  
  export type Locale = (typeof i18n)["locales"][number];