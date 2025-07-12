import React from 'react';

type Props = {
    className?: string;
    children?: React.ReactNode;
};

const DetailCard: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={`p-8 bg-gray-500/30 backdrop-blur rounded-xl ${className} shadow-lg hover:shadow-2xl transition-all ease-out duration-300`}
        >
            {children}
        </div>
    );
};

export default DetailCard;
