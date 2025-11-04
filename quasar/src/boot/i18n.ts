import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en' as the master schema for the resource
export type MessageSchema = typeof messages['en'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

const STORAGE_KEY = 'app:locale';

function resolveInitialLocale(): MessageLanguages {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Normalize legacy stored value 'en-US' to 'en'
      if (stored === 'en-US') return 'en' as MessageLanguages;
      if (stored === 'en') return 'en' as MessageLanguages;
      if (stored in messages) return stored as MessageLanguages;
    }
  } catch {
    /* ignore */
  }
  // Fallback to browser language if matching, else 'en'
  const nav = (navigator?.language || navigator?.languages?.[0] || '').toLowerCase();
  if (nav.startsWith('en') && 'en' in messages) return 'en' as MessageLanguages;
  if (nav.startsWith('da') && 'da' in messages) return 'da' as MessageLanguages;
  if (nav.startsWith('de') && 'de' in messages) return 'de' as MessageLanguages;
  if (nav.startsWith('no') && 'no' in messages) return 'no' as MessageLanguages;
  if (nav.startsWith('sv') && 'sv' in messages) return 'sv' as MessageLanguages;
  return 'en' as MessageLanguages;
}

export default defineBoot(({ app }) => {
  const initialLocale = resolveInitialLocale();
  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});