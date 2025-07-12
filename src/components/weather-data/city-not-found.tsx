import React from 'react';
import Link from 'next/link';

const CityNotFound = () => {
    return (
        <div className={'w-screen flex flex-col gap-y-10 h-screen flex items-center justify-center'}>
            <div className={'text-4xl font-semibold text-gray-600 text-center'}>
                Hmm... Looks like you entered an invalid city name.
            </div>
            <Link
                className={'px-4 py-3 rounded-lg bg-sky-500 text-gray-50 text-lg font-semibold w-[200px] text-center'}
                href={'/'}
            >
                Go Back
            </Link>
        </div>
    );
};

export default CityNotFound;
