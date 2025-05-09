import { getRequestConfig } from 'next-intl/server';
import { routing } from './navigation';
import { Locale } from './types/locale';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../src/messages/${locale}.json`)).default,
  };
});
