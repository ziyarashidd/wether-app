import React from 'react';
import { IWeatherData } from '../../../types';
import Link from 'next/link';
import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import UnitSwitch from '@/components/weather-data/unit-switch';
import DetailCard from '@/components/weather-data/detail-card';
import Image from 'next/image';
import moment from 'moment';
import { useRouter } from 'next/router';

type Props = {
    weatherDate: IWeatherData | null; // allow null for invalid data
};

const isDarkEnabled = (weatherType: string): boolean => {
    return ['Thunderstorm', 'Rain', 'Drizzle', 'Haze', 'Fog'].includes(weatherType);
};

const calculateTemperature = (kelvin: number, isCelsius: boolean): string => {
    if (isCelsius) {
        return Number(kelvin - 273.15).toFixed(0);
    }
    return Number((kelvin - 273.15) * (9 / 5) + 32).toFixed(0);
};

const WeatherDataView: React.FC<Props> = ({ weatherDate }) => {
    const router = useRouter();

    // Show error if weatherDate is null or missing city name
    if (!weatherDate || !weatherDate.city) {
        return (
            <div className="text-center mt-10">
                <p className="text-xl mb-4">Hmm... Looks like you entered an invalid city name.</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const [isCelsius, setIsCelsius] = React.useState(true);
    const toggleUnit = React.useCallback(() => setIsCelsius((prev) => !prev), []);

    return (
        <div
            className={`backdrop-blur-sm p-5 md:p-10 min-h-screen flex flex-col ${
                isDarkEnabled(weatherDate.weather) ? 'text-gray-100' : 'text-gray-800'
            }`}
        >
            <Link href="/" className="w-fit outline-none">
                <KeyboardArrowLeftRounded fontSize="large" />
            </Link>

            <div
                className={
                    'my-10 md:w-[90vw] lg:w-[70vw] mx-auto h-fit flex flex-col md:flex-row gap-10 justify-between md:items-center md:my-auto'
                }
            >
                <div className={'flex flex-col gap-y-5 md:w-1/3'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <div className={'flex flex-row items-start gap-x-2'}>
                            <div className={'text-6xl font-black'}>
                                {calculateTemperature(weatherDate.temp, isCelsius)}
                            </div>
                            <div className={'text-2xl font-semibold'}>°{isCelsius ? 'C' : 'F'}</div>
                        </div>
                        <UnitSwitch onPress={toggleUnit} isCelsius={isCelsius} />
                    </div>
                    <div className={'text-4xl font-medium'}>
                        {weatherDate.city}, {weatherDate.countryCode}
                    </div>
                    <div className={'font-medium text-xl'}>
                        {moment().format('hh:mm A')} | H: {calculateTemperature(weatherDate.tempMax, isCelsius)} °{isCelsius ? 'C' : 'F'}, L: {calculateTemperature(weatherDate.tempMin, isCelsius)} °{isCelsius ? 'C' : 'F'}
                    </div>
                </div>

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3'}>
                    <DetailCard className={'md:col-span-2 flex flex-row gap-x-5 items-center justify-between'}>
                        <div className={'text-3xl font-semibold'}>{weatherDate.weather}</div>
                        <Image
                            src={`https://openweathermap.org/img/wn/${weatherDate.icon}@2x.png`}
                            alt={weatherDate.weather}
                            width={100}
                            height={100}
                        />
                    </DetailCard>
                    <DetailCard className={'flex flex-row gap-x-5 items-center justify-between'}>
                        <div className={'text-3xl font-semibold'}>Humidity</div>
                        <div className={'text-3xl font-semibold'}>{weatherDate.humidity}%</div>
                    </DetailCard>
                    <DetailCard className={'flex flex-row gap-x-5 items-center justify-between'}>
                        <div className={'text-3xl font-semibold'}>Wind Speed</div>
                        <div className={'text-3xl font-semibold'}>{weatherDate.windSpeed} km/h</div>
                    </DetailCard>
                    <DetailCard className={'flex flex-row gap-x-5 items-center justify-between'}>
                        <div className={'text-3xl font-semibold'}>Feel Like</div>
                        <div className={'text-3xl font-semibold'}>
                            {calculateTemperature(weatherDate.feelsLike, isCelsius)} °{isCelsius ? 'C' : 'F'}
                        </div>
                    </DetailCard>
                    <DetailCard className={'flex flex-row gap-x-5 items-center justify-between'}>
                        <div className={'text-3xl font-semibold'}>Visibility</div>
                        <div className={'text-3xl font-semibold'}>{weatherDate.visibility / 1000} km</div>
                    </DetailCard>
                </div>
            </div>
        </div>
    );
};

export default WeatherDataView;
