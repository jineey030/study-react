interface CounterDisplayProps {
  count: number;
}

export default function CounterDisplay({count}: CounterDisplayProps) {
  return (
    <div>
      <h2>자식 컴포넌트</h2>
      <p>전달받은 카운트: {count}</p>
    </div>
  );
}
