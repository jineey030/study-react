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
import Login from "@/components/practice/Login"
import TodoList from "@/components/practice/TodoList"
import ReqAPI from "@/components/practice/ReqAPI"
import Async from "@/components/practice/Async"
import Product, { products, type CartType } from "@/components/practice/Product"
import Cart from "@/components/practice/Cart"
import ExpenseApp from "@/components/budget-book/ExpenseApp"

export default function Home() {
  // 화면 전환을 위한 상태 (기본값: 'home')
  const [currentView, setCurrentView] = React.useState("home");

  // 날짜
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });

  // 카운팅 수정
  const [count, setCount] = React.useState(0);
  function upCnt(){
    setCount(prevCount => prevCount + 1);
  }

  // 색깔 바꾸기
  const [color, setColor] = React.useState("없음");
  function changeColor(color: string){
    setColor(color);
  }

  // 숫자 고르기
  const [number, setNumber] = React.useState(0);
  function handleSelectNumber(number: number){
    setNumber(number);
  }

  // 입력값 보여주기
  const [txt, setTxt] = React.useState("");

  // 로그인/로그아웃
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // 상품 개수
  const [qty, setQty] = React.useState<CartType[]>([]);

  // 장바구니 상품 담기
  function addToCart(id:string){
    setQty(prevQty => {
      const exists = prevQty.some(q => q.id === id);
      if (exists) {
        return prevQty.map(q => q.id === id ? { ...q, qty: q.qty + 1 } : q);
      } else {
        return [...prevQty, { id, qty: 1 }];
      }
    });
  }

  // 장바구니 수량 추가
  function upCart(id: string){
    setQty(prevQty => 
      prevQty.map(qty => 
        qty.id === id ? { ...qty, qty: qty.qty + 1 } : qty
      )
    );
  }

  // 장바구니 수량 삭제
  function downCart(id: string) {
    setQty(prevQty =>
      prevQty
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  }
      
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen py-12">
      <main className="flex flex-col w-full max-w-3xl gap-8 px-6">
        
        <h1 className="text-3xl font-bold text-center mb-2">React 실습 모음</h1>

        {/* 상단 네비게이션 버튼 (화면 전환용) */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button 
            onClick={() => setCurrentView("home")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "home" ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            전체 보기
          </button>
          <button 
            onClick={() => setCurrentView("calendar")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "calendar" ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            캘린더
          </button>
          <button 
            onClick={() => setCurrentView("counter")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "counter" ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            Counter
          </button>
          <button 
            onClick={() => setCurrentView("todo")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "todo" ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            Todo List
          </button>
          <button 
            onClick={() => setCurrentView("cart")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "cart" ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            장바구니
          </button>
          <button 
            onClick={() => setCurrentView("budget")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === "budget" ? "bg-blue-500 text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"}`}
          >
            가계부
          </button>
        </div>

        {/* 1. 전체 보기 화면 */}
        {currentView === "home" && (
          <div className="flex flex-col gap-8">
            <p className="text-center text-zinc-500">상단 버튼을 눌러 각 실습 화면으로 전환하거나 아래에서 전체를 확인할 수 있습니다.</p>
          </div>
        )}

        {/* 캘린더 연습 */}
        {(currentView === "home" || currentView === "calendar") && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 self-start">📅 캘린더 연습</h2>
            <Card className="mx-auto w-fit p-0 border-none shadow-none">
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
          </section>
        )}

        {/* Counter */}
        {(currentView === "home" || currentView === "counter") && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🔢 Counter (useState)</h2>
            <Counter />
          </section>
        )}

        {/* Profile */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">👤 Profile (Props)</h2>
            <Profile name="철수" />
          </section>
        )}

        {/* 부모-자식 State 전달 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🔄 부모-자식 State 전달</h2>
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:items-center">
              <h1>현재 카운트: {count}</h1>
              <button onClick={upCnt} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition">
                +1
              </button>
              <CounterDisplay count={count} />
            </div>
          </section>
        )}

        {/* 색상 선택 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🎨 색상 선택 (함수 전달)</h2>
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:items-center">
              <h1>현재 선택한 색상: {color}</h1>
              <ColorSelector changeColor={changeColor} />
            </div>
          </section>
        )}

        {/* 숫자 선택 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🔢 숫자 선택 (콜백)</h2>
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:items-center">
              <h1>현재 선택한 숫자: {number}</h1>
              <NumberSelector onSelectNumber={handleSelectNumber} />
            </div>
          </section>
        )}
        
        {/* Input 연습 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">⌨️ Input 연습</h2>
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:items-center">
              <h1>현재 입력값: {txt}</h1>
              <Input onInputText={setTxt} />
            </div>
          </section>
        )}

        {/* 조건부 렌더링 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🔐 조건부 렌더링 (로그인)</h2>
            <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:items-center">
              <h1>로그인 상태:</h1>
              {isLoggedIn && (
                <p className="text-green-600 font-semibold">
                  로그인 <br /> 환영합니다, 철수님!
                </p>
              )}
              {!isLoggedIn && <p className="text-zinc-400">로그아웃</p>}
              <Login isLoggedIn={isLoggedIn} onLogin={setIsLoggedIn} />
            </div>
          </section>
        )}

        {/* Todo List */}
        {(currentView === "home" || currentView === "todo") && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">📝 Todo List</h2>
            <TodoList />
          </section>
        )}

        {/* API 데이터 가져오기 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🌐 API 데이터 가져오기</h2>
            <ReqAPI />
          </section>
        )}

        {/* 글 상세보기 */}
        {currentView === "home" && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">👀 글 상세 보기</h2>
            <Async />
          </section>
        )}

        {/* 장바구니 담기 */}
        {(currentView === "home" || currentView === "cart") && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🛒 장바구니</h2>
            <Product onAddCart={addToCart}/>
            <Cart qty={qty} onUpCart={upCart} onDownCart={downCart}/>
          </section>
        )}

        {/* 가계부 */}
        {(currentView === "home" || currentView === "budget") && (
          <section className="w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">🐖 가계부</h2>
            <ExpenseApp />
          </section>
        )}
      </main>
    </div>
  );
}
