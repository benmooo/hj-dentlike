import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import zh_CN from '../../locales/zh_CN.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  availableLocales: ['en', 'zh_CN'],
  messages: {
    en,
    zh_CN,
  },
})
