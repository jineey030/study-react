'use client';

import { useState } from 'react';

interface ProfileProps {
  name:string;
}

export default function Profile({ name }: ProfileProps) {
  // 1. 나이를 저장할 state를 만들어보세요.
  //    초기 나이는 20살입니다.
  const [age, setAge] = useState(20);


  // 2. 나이를 1 증가시키는 함수를 만들어보세요.
  function upAge(){
    setAge(prevAge => prevAge + 1);
  }

  return (
    <div>
      <h1>
        안녕하세요, {name}님!
      </h1>

      <p>
        현재 나이: {age}
      </p>

      <button onClick={upAge} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition">
        나이 +1
      </button>
    </div>
  );
}
