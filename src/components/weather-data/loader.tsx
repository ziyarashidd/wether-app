import React from 'react';

const Loader = () => {
    return (
        <div className={'w-screen h-screen flex items-center justify-center animate-pulse'}>
            <div className={'text-4xl font-semibold text-gray-600'}>Loading your data...</div>
        </div>
    );
};

export default Loader;
