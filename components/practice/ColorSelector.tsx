interface ColorSelectorProps {
  changeColor(color: string): void;
}

export default function ColorSelector({ changeColor }: ColorSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">색상 선택</h2>

      <div className="flex gap-2">
        <button 
          className="px-4 py-2 font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg active:scale-95 transition shadow-sm" 
          onClick={() => changeColor('red')}
        >
          빨강 선택
        </button>

        <button 
          className="px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 transition shadow-sm" 
          onClick={() => changeColor('blue')}
        >
          파랑 선택
        </button>
      </div>
    </div>
  );
}
