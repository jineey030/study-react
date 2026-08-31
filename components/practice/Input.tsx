import { useState } from 'react'

interface InputProps {
  onInputText(txt: string): void;
}

export default function Input(
  {onInputText}: InputProps
) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onInputText(text); 
    setText(''); 
  };

  return (
    <div>
       <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="값을 입력하세요"
        className="px-3 py-1 border rounded-md dark:bg-zinc-850 dark:border-zinc-700"
      />
       <button 
        onClick={handleSubmit}
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition"
       >제출</button>
    </div>
  );
}
