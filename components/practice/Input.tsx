import { useState } from 'react'

interface InputProps {
  onInputText(txt: string): void;
}

export default function Input({ onInputText }: InputProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onInputText(text); 
    setText(''); 
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">텍스트 입력</h2>
      
      <div className="flex gap-2">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="값을 입력하세요"
          className="px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
        />
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 transition shadow-sm"
        >
          제출
        </button>
      </div>
    </div>
  );
}
