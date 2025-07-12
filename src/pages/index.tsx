import { Nunito } from 'next/font/google';
import Search from '@/components/landing/search';
import React from 'react';
import { useRouter } from 'next/router';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function Home() {
    const router = useRouter();

    const handleSubmit = React.useCallback((search: string) => router.push(`/weather-data?city=${search}`), [router]);

    return (
        <main className={`w-screen h-screen flex flex-col  bg-gray-200  ${nunito.className}`}>
            <div className={'p-10 text-sky-500 text-2xl font-bold mx-auto md:mx-0'}>What&apos;s The Weather!</div>
            <div className={'flex flex-col gap-y-10 justify-center flex-grow items-center p-10'}>
                <h1 className="text-4xl font-bold text-center text-gray-600 md:w-[50vw] lg:w-[30vw]">
                    Get to know about the weather of your fav city!
                </h1>
                <Search onSubmit={handleSubmit} />
            </div>
            <div className={'flex flex-col gap-y-2 items-center mb-10'}>
                <div>
                    Made with ❤️ by{' '}
                    <a
                        className={'text-violet-500 font-medium'}
                        href="https://www.linkedin.com/in/ziya-rashid-56023324b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    >
                        Md Ziya Rashid
                    </a>
                </div>
                <div>
                    Check it out on{' '}
                    <a className={'text-violet-500 font-medium'} href={'https://github.com/ziyarashidd'}>
                        GitHub
                    </a>
                </div>
            </div>
        </main>
    );
}
