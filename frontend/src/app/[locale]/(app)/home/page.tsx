'use client';
import Card from '@/components/Card';
import { NoData } from '@/components/NoData';
import useUserContext from '@/context/userContext/useUserContext';
import { useTranslations } from 'next-intl';
import { MdOutlineCelebration } from 'react-icons/md';

export default function Home() {
  const { userData } = useUserContext();
  const t = useTranslations();
  return (
    <>
      <div className="flex md:flex-row flex-col  gap-2">
        <Card className="max-w-full text-center">
          <p className="flex gap-2 items-center font-bold text-xl mb-2">
            <MdOutlineCelebration size={28} />
            {t('labels.welcome')} {userData?.name?.toLocaleUpperCase()} :-
          </p>
          <NoData />
        </Card>
      </div>
    </>
  );
}
