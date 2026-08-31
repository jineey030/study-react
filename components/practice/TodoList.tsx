'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() === '') {
        return;
    }

    const newId =
        todos.length > 0
            ? Math.max(...todos.map(todo => todo.id)) + 1
            : 1;

    const newTodo = {
        id: newId,
        text: text,
        completed: false
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setText('');
  };

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React 공부하기', completed: false },
    { id: 2, text: '운동하기', completed: false },
    { id: 3, text: '책 읽기', completed: false }
  ]);

  useEffect(() => {
    console.log("Todo 목록이 변경되었습니다." + "\n" + "현재 Todo 개수: " + todos.length);

    if(todos.length === 0){
        console.log("할 일이 없습니다☺️");
    }
  }, [todos]);

  useEffect(() => {
    const isFinished = 
        todos.length > 0 &&
        todos.every(todo => todo.completed);

    if(isFinished){
        console.log("🎉 모든 할 일을 완료하였습니다!");
    }
    
  }, [todos]);

  const handleDelete = (id:number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">할 일 목록</h2>

      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li 
            key={todo.id}
            className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm flex items-center justify-between gap-3"
            >
            <div className="flex items-center gap-3">
                <input 
                type="checkbox" 
                checked={todo.completed}
                className="w-4 h-4 text-blue-600 rounded border-zinc-300 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700" 
                onChange={() => handleToggle(todo.id)}
                />
                <span className={todo.completed ? "line-through text-zinc-400 dark:text-zinc-500" : ""}>
                    {todo.text}
                </span>
            </div>

            <button 
                className="px-2 py-1 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 transition" 
                onClick={() => handleDelete(todo.id)}
            >
                삭제
            </button>
            </li>
        ))}
      </ul>

      <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="할 일을 입력하세요"
          className="px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
        />
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 transition shadow-sm"
        >
        추가
        </button>
    </div>
  );
}
