interface NumberSelectorProps {
  onSelectNumber(number: number): void;
}

export default function NumberSelector({ onSelectNumber }: NumberSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">숫자 선택</h2>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onSelectNumber(1)}
          className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-700 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 rounded-lg active:scale-95 transition shadow-sm"
        >
          1
        </button>

        <button 
          onClick={() => onSelectNumber(2)}
          className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-700 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 rounded-lg active:scale-95 transition shadow-sm"
        >
          2
        </button>

        <button 
          onClick={() => onSelectNumber(3)}
          className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-700 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-700 rounded-lg active:scale-95 transition shadow-sm"
        >
          3
        </button>
      </div>
    </div>
  );
}
