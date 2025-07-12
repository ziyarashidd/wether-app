import React from 'react';
import { useRouter } from 'next/router';
import { Nunito } from 'next/font/google';
import { IWeatherData } from '../../types';
import Loader from '@/components/weather-data/loader';
import axios from 'axios';
import WeatherDataView from '@/components/weather-data/weather-data-view';
import CityNotFound from '@/components/weather-data/city-not-found';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const getBackgroundImage = (weatherType: string): string => {
    if (weatherType === 'Clouds') {
        return 'https://wallpapercave.com/wp/wp7033716.jpg';
    } else if (weatherType === 'Thunderstorm') {
        return 'https://images.hdqwalls.com/download/thunderstorm-01-1920x1080.jpg';
    } else if (weatherType === 'Drizzle') {
        return 'https://image.winudf.com/v2/image/Y29tLmZyZWUud2FsbHBhcGVycy5nbGFzcy5oZF9zY3JlZW5zaG90c18wXzc3NTljYThh/screen-0.webp?fakeurl=1&type=.webp';
    } else if (weatherType === 'Rain') {
        return 'https://wallpapercave.com/wp/Z0kmvgB.jpg';
    } else if (weatherType === 'Snow') {
        return 'https://wallpaperset.com/w/full/5/0/8/240516.jpg';
    } else if (weatherType === 'Clear') {
        return 'https://wallpapercave.com/wp/wp6680526.jpg';
    } else if (weatherType === 'Haze' || weatherType === 'Fog') {
        return 'https://images.hdqwalls.com/wallpapers/field-fog-trees-blue-weather-cold-4k-5k-ee.jpg';
    }

    return '';
};

const WeatherData = () => {
    const city = useRouter().query.city;
    const [weatherData, setWeatherData] = React.useState<IWeatherData | null>(null);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        city !== undefined &&
            axios({
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            })
                .then((res) => {
                    const data = res.data;
                    const weatherData: IWeatherData = {
                        weather: data.weather[0].main,
                        feelsLike: data.main.feels_like,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        temp: data.main.temp,
                        tempMax: data.main.temp_max,
                        tempMin: data.main.temp_min,
                        windSpeed: data.wind.speed,
                        icon: data.weather[0].icon,
                        countryCode: data.sys.country,
                        city: data.name,
                        visibility: data.visibility,
                    };

                    axios({
                        url: `https://restcountries.com/v3.1/alpha/${weatherData.countryCode}`,
                    })
                        .then((res) => {
                            const data = res.data;
                            weatherData.countryCode = data[0].name.common;
                            setWeatherData(weatherData);
                        })
                        .catch(() => {
                            setWeatherData(weatherData);
                        })
                        .finally(() => setLoaded(true));
                })
                .catch(() => {
                    setLoaded(true);
                });
    }, [city]);

    return (
        <div
            className={`min-h-screen w-screen bg-gray-200 ${nunito.className} `}
            style={{
                backgroundImage: `url(${weatherData && getBackgroundImage(weatherData.weather)})`,
                // height: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            {!loaded && <Loader />}
            {loaded && weatherData !== null && <WeatherDataView weatherDate={weatherData} />}
            {loaded && weatherData === null && <CityNotFound />}
        </div>
    );
};

export default WeatherData;
