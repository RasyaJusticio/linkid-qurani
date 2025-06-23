import AppWrapper from '@/components/layouts/app-wrapper';
import { Spinner } from '@/components/ui/spinner';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const PARENT_URL = import.meta.env.VITE_PARENT_URL ?? 'https://link.id';

type RedirectPageProps = {
    linkIdLogo: string;
};

const RedirectPage: React.FC<RedirectPageProps> = ({ linkIdLogo }) => {
    useTranslation('redirect');

    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const counter = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(counter);
                    window.location.href = `${PARENT_URL}/qurani`;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(counter);
    }, []);

    return (
        <AppWrapper>
            <Head title="Qurani" />
            <main className="grid h-screen w-full place-items-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] px-2 md:px-0 dark:from-[#1e1e1e] dark:to-[#3a3a3a]">
                <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-100 px-12 py-10 shadow-sm md:h-fit md:w-128 md:rounded-lg dark:bg-neutral-700">
                    <img src={linkIdLogo} alt="Link.id" className="w-full max-w-90" />
                    <Trans
                        i18nKey={'fromMain'}
                        ns={'redirect'}
                        components={{
                            redirect: <Link href={`${PARENT_URL}/qurani`} className="text-accent" />,
                        }}
                        parent={'p'}
                        className="mt-4 text-center text-lg"
                    />
                    <Trans
                        i18nKey={'countdown'}
                        ns={'redirect'}
                        values={{
                            count: countdown,
                        }}
                        components={{
                            redirect: <Link href={`${PARENT_URL}/qurani`} className="text-accent" />,
                            countdown: <span className="text-accent" />,
                        }}
                        parent={'p'}
                        className="mt-12 mb-4 text-center text-lg text-foreground/60"
                    />
                    <Spinner className="size-14 text-accent dark:text-neutral-100" />
                    <Trans
                        i18nKey={'notRedirected'}
                        ns={'redirect'}
                        components={{
                            redirect: <Link href={`${PARENT_URL}/qurani`} className="text-accent" />,
                        }}
                        parent={'p'}
                        className="mt-4 text-center text-foreground/60"
                    />
                </div>
            </main>
        </AppWrapper>
    );
};

export default RedirectPage;
