'use client';

import { useState } from 'react';

interface ProfileProps {
  name: string;
}

export default function Profile({ name }: ProfileProps) {
  const [age, setAge] = useState(20);

  function upAge() {
    setAge(prevAge => prevAge + 1);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">프로필 (useState)</h2>
      
      <div className="flex flex-col gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            안녕하세요, <span className="text-blue-500">{name}</span>님!
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            현재 나이: <span className="font-bold">{age}</span>세
          </p>
        </div>

        <div>
          <button 
            onClick={upAge} 
            className="px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 transition shadow-sm"
          >
            나이 +1
          </button>
        </div>
      </div>
    </div>
  );
}
