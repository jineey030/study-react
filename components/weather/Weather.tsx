'use client';

import { useState, useEffect } from 'react';

type WeatherData = {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
};

const cityMap: Record<string, string> = {
    서울: 'Seoul',
    부산: 'Busan',
    인천: 'Incheon',
    대구: 'Daegu',
    대전: 'Daejeon',
    광주: 'Gwangju',
    울산: 'Ulsan',
};

const getWeatherInfo = (code: number) => {
    if (code === 0) {
        return {
            description: '맑음',
            icon: '☀️',
        };
    }

    if (code === 1 || code === 2 || code === 3) {
        return {
            description: '구름 많음',
            icon: '⛅',
        };
    }

    if (code === 45 || code === 48) {
        return {
            description: '안개',
            icon: '🌫️',
        };
    }

    if (code >= 51 && code <= 57) {
        return {
            description: '이슬비',
            icon: '🌦️',
        };
    }

    if (code >= 61 && code <= 67) {
        return {
            description: '비',
            icon: '🌧️',
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            description: '눈',
            icon: '❄️',
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            description: '소나기',
            icon: '🌦️',
        };
    }

    if (code >= 95 && code <= 99) {
        return {
            description: '뇌우',
            icon: '⛈️',
        };
    }

    return {
        description: '알 수 없음',
        icon: '🌤️',
    };
};

export default function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    // 최근 검색 상태
    const [recentCities, setRecentCities] = useState<string[]>([]);

    const searchGeoAPI = async (searchCity: string) => {
        try {
            const englishCity = cityMap[searchCity] || searchCity || 'Seoul';

            const params = new URLSearchParams({
                name: englishCity,
                count: '1',
                language: 'en',
                format: 'json',
            });
            
            const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('지역 검색에 실패했습니다.');
            }

            const data = await response.json();
            
            if (!data.results || data.results.length === 0) {
                return null;
            }

            const result = data.results[0];

            setRecentCities(prev => {
                const newCities = [
                    result.name,
                    ...prev.filter(item => item !== result.name)
                ];

                return newCities.slice(0, 3);
            });

            return result;
        } catch(error) {
            console.error('지역 검색 에러:', error);
        }
    };

    const getWeather = async (latitude: number, longitude: number) => {
        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
            current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
        });

        const url = `https://api.open-meteo.com/v1/forecast?${params}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        }

        return await response.json();
    };

    const fetchWeatherData = async (targetCity: string) => {
        const result = await searchGeoAPI(targetCity);

        if (!result) {
            return;
        }

        const weatherData = await getWeather(
            result.latitude,
            result.longitude
        );

        const weatherInfo = getWeatherInfo(
            weatherData.current.weather_code
        );

        setWeather({
            city: result.name,
            temperature: weatherData.current.temperature_2m,
            description: weatherInfo.description,
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: weatherData.current.wind_speed_10m,
            weatherCode: weatherData.current.weather_code
        });
    };

    // 1. 처음 마운트되었을 때 기본('서울') 날씨 불러오기
    useEffect(() => {
        fetchWeatherData('서울');
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const searchCity = city || 'Seoul';
        await fetchWeatherData(searchCity);
    };

    const handleRecentSearch = async (recentCity: string) => {
        setCity(recentCity);
        await fetchWeatherData(recentCity);
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            {/* 날씨 검색 영역 */}
            <form onSubmit={handleSearch} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-2xl">🌤️</span>
                        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 whitespace-nowrap">
                            날씨 검색
                        </h3>
                    </div>
                    
                    <div className="flex w-full gap-2">
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="도시를 입력하세요 (서울, 인천, 대전, 대구, 광주, 울산, 부산)"
                            className="flex-1 px-4 py-2.5 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-500 rounded-xl hover:bg-blue-600 active:scale-95 transition shadow-sm whitespace-nowrap"
                        >
                            검색
                        </button>
                    </div>
                </div>
            </form>

            {/* 2. 최근 검색어 UI 개선 영역 */}
            {recentCities.length > 0 && (
                <div className="flex items-center gap-3 px-1">
                    <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        최근 검색
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {recentCities.map(item => (
                            <button
                                key={item}
                                onClick={() => handleRecentSearch(item)}
                                className="px-3.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 transition shadow-sm"
                            >
                                📍 {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 날씨 결과 카드 영역 */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-zinc-900 dark:to-zinc-800 text-white rounded-2xl shadow-md border border-transparent dark:border-zinc-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl p-3 bg-white/10 dark:bg-zinc-800 rounded-2xl backdrop-blur-sm">
                            {weather ? getWeatherInfo(weather.weatherCode).icon : '🌤️'}
                        </span>
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight">{weather?.city || '로딩 중...'}</h4>
                            <p className="text-blue-100 dark:text-zinc-400 text-sm font-medium">{weather?.description || '잠시만 기다려주세요'}</p>
                        </div>
                    </div>

                    {/* 가운데/오른쪽: 기온 및 상세 정보 */}
                    <div className="flex flex-col sm:items-end w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-white/20 dark:border-zinc-700">
                        <div className="text-4xl font-extrabold tracking-tight mb-2">
                            {weather ? `${weather.temperature}°C` : '-'}
                        </div>
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-blue-100 dark:text-zinc-300 font-medium">
                            <span className="flex items-center gap-1 bg-white/10 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                💧 습도 {weather ? `${weather.humidity}%` : '-'}
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                💨 바람 {weather ? `${weather.windSpeed}m/s` : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
