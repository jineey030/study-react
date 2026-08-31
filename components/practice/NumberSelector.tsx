interface NumberSelectorProps {
  onSelectNumber(number:number): void;
}

export default function NumberSelector(
  {onSelectNumber}: NumberSelectorProps
) {
  return (
    <div>
      <h2>숫자 선택</h2>

      <button onClick={() => onSelectNumber(1)}>
        1
      </button>

      <button onClick={() => onSelectNumber(2)}>
        2
      </button>

      <button onClick={() => onSelectNumber(3)}>
        3
      </button>
    </div>
  );
}
