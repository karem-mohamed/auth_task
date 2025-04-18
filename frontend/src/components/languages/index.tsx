'use client';

import { usePathname, useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale } from '@/hooks/useLocale';
import { LANGS } from '@/app-constants/languages';
import { TfiWorld } from 'react-icons/tfi';
import Cookies from 'js-cookie';

export default function Languages({
  isSliderOpen,
}: {
  isSliderOpen?: boolean;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleLanguage() {
    Cookies.set('locale', locale === LANGS.ar ? LANGS.en : LANGS.ar);
    replace(`${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`, {
      locale: locale === LANGS.ar ? LANGS.en : LANGS.ar,
    });
  }

  return (
    <button
      type="button"
      className="w-full bg-green-500 p-2 flex [&:lang(ar)]:flex-row-reverse items-center gap-2 [&>svg]:text-greyscale400 [&>svg]:text-xl font-bahij text-xs"
      onClick={handleLanguage}
    >
      {isSliderOpen ? (
        <p className="m-auto text-center text-lg">
          {locale === LANGS.ar ? 'English' : 'عربى'}
        </p>
      ) : (
        <TfiWorld className="m-auto" size={20} />
      )}
    </button>
  );
}
