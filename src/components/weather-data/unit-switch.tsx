import React from 'react';

type Props = {
    isCelsius: boolean;
    onPress: () => void;
};

const UnitSwitch: React.FC<Props> = ({ isCelsius, onPress }) => {
    return (
        <button onClick={onPress} className={'flex flex-row p-1 bg-gray-600/80 rounded-lg shadow-xl'}>
            <div
                className={`rounded-lg text-gray-50 ${
                    isCelsius && 'bg-gray-50/70 text-gray-600'
                } p-3 transition-all ease-out duration-300`}
            >
                °C
            </div>
            <div
                className={`text-gray-50 rounded-lg ${
                    !isCelsius && 'bg-gray-50/70 text-gray-600'
                } p-3 transition-all ease-out duration-300`}
            >
                °F
            </div>
        </button>
    );
};

export default UnitSwitch;
