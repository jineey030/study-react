'use client'

import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import Counter from "@/components/practice/Counter"
import Profile from "@/components/practice/Profile"
import CounterDisplay from "@/components/practice/CounterDisplay"
import ColorSelector from "@/components/practice/ColorSelector";
import NumberSelector from "@/components/practice/NumberSelector"
import Input from "@/components/practice/Input"

export default function Home() {

  // 날짜
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  // 카운팅 수정
  const [count, setCount] = React.useState(0);
  function upCnt(){
    setCount(prevCount => prevCount +1);
  }

  // 색깔 바꾸기
  const [color, setColor] = React.useState("없음");
  function changeColor(color:string){
    setColor(color);
  }

  // 숫자 고르기
  const [number, setNumber] = React.useState(0);
  function handleSelectNumber(number:number){
    setNumber(number);
  }

  // 입력값 보여주기
  const [txt, setTxt] = React.useState("");
   
  return (
    
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* 캘린더 만들기 */}
        <Card className="mx-auto w-fit p-0">
          <CardContent className="p-0">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </CardContent>
        </Card>

        {/* useState 사용 */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Counter />
        </div>

        {/* props와 useState 차이 연습 */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
           <Profile
              name="철수"
            />
        </div>

        <br/>

        {/* 부모 -> 자식 useState 전달 */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <h1>현재 카운트: {count}</h1>
          <button onClick={upCnt} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition">
            +1
          </button>
          <CounterDisplay count ={count}/>
        </div>

        {/* 함수 전달 */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
           <h1>
              현재 선택한 색상: {color}
            </h1>

            <ColorSelector changeColor={changeColor}/>
        </div>

        {/* callback */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <h1>
            현재 선택한 숫자: {number}
          </h1>
          <NumberSelector onSelectNumber={handleSelectNumber}/>
        </div>
        
        {/* input 연습 */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <h1> 현재 입력값: {txt}</h1>

          <Input onInputText={setTxt}/>
        </div>
        
      </main>
    </div>
  );
}
