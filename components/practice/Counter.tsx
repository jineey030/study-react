'use client';

import { useState } from 'react';

function Counter() {
  // 여기에 필요한 state를 만들어보세요.
  const [count, setCount] = useState(0);

  // 여기에 이벤트 핸들러를 만들어보세요.
  function upCount(){
    setCount(prevCount => prevCount + 1);
  }

  function downCount(){
    setCount(prevCount => prevCount - 1);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-xl shadow-md w-fit">
      <div className="flex gap-3">
        <button 
          onClick={upCount} 
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition"
        >
          +1
        </button>
        <button 
          onClick={downCount} 
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 transition"
        >
          -1
        </button>
      </div>
      <div className="text-lg font-medium text-gray-700">
        현재 카운트: <span className="font-bold text-black">{count}</span>
      </div>
    </div>
  );
}

export default Counter;
