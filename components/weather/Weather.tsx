'use client';

import { useState } from 'react';

export default function Weather() {
    const [city, setCity] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${city || '서울'} 날씨 검색을 수행합니다.`);
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
                            placeholder="도시를 입력하세요 (예: 서울)"
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

            {/* 날씨 결과 카드 영역 */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-zinc-900 dark:to-zinc-800 text-white rounded-2xl shadow-md border border-transparent dark:border-zinc-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-5xl p-3 bg-white/10 dark:bg-zinc-800 rounded-2xl backdrop-blur-sm">
                            ☀️
                        </span>
                        <div>
                            <h4 className="text-2xl font-bold tracking-tight">서울</h4>
                            <p className="text-blue-100 dark:text-zinc-400 text-sm font-medium">맑음</p>
                        </div>
                    </div>

                    {/* 가운데/오른쪽: 기온 및 상세 정보 */}
                    <div className="flex flex-col sm:items-end w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-white/20 dark:border-zinc-700">
                        <div className="text-4xl font-extrabold tracking-tight mb-2">
                            27°C
                        </div>
                        <div className="flex items-center gap-4 text-xs sm:text-sm text-blue-100 dark:text-zinc-300 font-medium">
                            <span className="flex items-center gap-1 bg-white/10 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                💧 습도 65%
                            </span>
                            <span className="flex items-center gap-1 bg-white/10 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                                💨 바람 2.4m/s
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}