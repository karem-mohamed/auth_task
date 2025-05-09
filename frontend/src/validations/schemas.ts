import { messages } from '@/messages';
import { Locale } from '@/types/locale';
import { createTranslator } from 'next-intl';
import { object, string } from 'yup';

const email = (locale: Locale) => {
  const t = createTranslator({ locale: locale, messages: messages[locale] });
  return string()
    .required(t('messages.emailRequired'))
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      t('messages.invalidEmail')
    );
};

const password = (locale: Locale) => {
  const t = createTranslator({ locale: locale, messages: messages[locale] });
  return string()
    .required(t('messages.passwordRequired'))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      t('messages.inValidPass')
    );
};

export const loginSchema = (locale: Locale) => {
  const t = createTranslator({ locale: locale, messages: messages[locale] });
  return object({
    email: email(locale),
    password: password(locale),
  });
};

export const registerSchema = (locale: Locale) => {
  const t = createTranslator({ locale: locale, messages: messages[locale] });
  return object({
    name: string()
      .min(3, t('messages.shortLongUsername'))
      .max(15, t('messages.shortLongUsername'))
      .required(t('messages.usernameRequired')),
    email: email(locale),
    password: password(locale),
  });
};

export const resetSchema = (locale: Locale) => {
  return object({
    email: email(locale),
  });
};
export const otpSchema = (locale: Locale) => {
  const t = createTranslator({ locale: locale, messages: messages[locale] });
  return object({
    otp: string()
      .min(4, t('messages.shortLongOtp'))
      .required(t('messages.required')),
    newPassword: password(locale),
  });
};
