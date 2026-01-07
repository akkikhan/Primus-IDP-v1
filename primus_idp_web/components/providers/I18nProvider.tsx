'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLocaleContext } from '@/contexts/LocaleContext';

/**
 * I18n Provider component
 * Wraps NextIntlClientProvider with dynamic locale and messages from LocaleContext
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, messages } = useLocaleContext();

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={process.env.NEXT_PUBLIC_TIMEZONE ?? 'UTC'}
    >
      {children}
    </NextIntlClientProvider>
  );
}



