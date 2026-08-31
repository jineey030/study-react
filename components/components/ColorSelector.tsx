interface ColorSelectorProps {
  changeColor(color: string): void;
}

export default function ColorSelector(
  {changeColor}: ColorSelectorProps
) {
  return (
    <div>
      <h2>색상 선택</h2>

      <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => changeColor('red')}>
        빨강 선택
      </button>

      <br />

      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => changeColor('blue')}>
        파랑 선택
      </button>
    </div>
  );
}
