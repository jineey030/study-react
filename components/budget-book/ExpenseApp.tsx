import { useState } from 'react';
import { Plus } from 'lucide-react';

type CategoryType = 'food' | 'traffic' | 'shopping';
type FilterCategory = 'all' | CategoryType;

type Expense = {
    id: string;
    title: string;
    amount: number;
    category: CategoryType;
};

const categoryInfo = {
    food: {
        name: '식비',
        icon: '🍚',
    },
    traffic: {
        name: '교통',
        icon: '🚕',
    },
    shopping: {
        name: '쇼핑',
        icon: '🛍️',
    },
};

const categories: CategoryType[] = [
    'food',
    'traffic',
    'shopping',
];

export default function ExpenseApp() {
    // 입력용 카테고리
    const [category, setCategory] = useState<CategoryType>('food');

    // 필터용 카테고리
    const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

    const [amount, setAmount] = useState('');
    const [text, setText] = useState('');

    const [list, setList] = useState<Expense[]>([]);

    const [editId, setEditId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [editAmount, setEditAmount] = useState('');

    // 추가
    const handleSubmit = () => {
        if (!text || !amount) return;

        const newId =
            list.length > 0
                ? String(
                      Number(
                          Math.max(
                              ...list.map(item => Number(item.id))
                          )
                      ) + 1
                  )
                : '1';

        const newData: Expense = {
            id: newId,
            title: text,
            amount: Number(amount),
            category: category,
        };

        setList(prevList => [...prevList, newData]);

        // 입력창 초기화
        setText('');
        setAmount('');
    };

    // 삭제
    const handleDelete = (id: string) => {
        setList(prevList =>
            prevList.filter(item => item.id !== id)
        );
    };

    // 수정
    const handleEdit = (id: string) => {
        const item = list.find(item => item.id === id);
        if (!item) return;

        setEditId(item.id);
        setEditText(item.title);
        setEditAmount(String(item.amount));
    };

    // 저장
    const handleSave = () => {
        setList(prevList =>
            prevList.map(item =>
                item.id === editId
                    ? {
                        ...item,
                        title: editText,
                        amount: Number(editAmount),
                    }
                    : item
            )
        );

        setEditId(null);
    };

    // 필터링
    const filteredList = list.filter(item =>
        filterCategory === 'all' ||
        item.category === filterCategory
    );

    // 전체 지출
    const totalAmount = list.reduce(
        (total, item) => total + item.amount,
        0
    );

    // 필터
    const filterOptions: {
        value: FilterCategory;
        label: string;
    }[] = [
        { value: 'all', label: '전체' },
        { value: 'food', label: '식비' },
        { value: 'traffic', label: '교통' },
        { value: 'shopping', label: '쇼핑' },
    ];

    // 데이터
    const categoryTotal = list.reduce(
        (acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
            return acc;
        },
        { food: 0, traffic: 0, shopping: 0 } as Record<CategoryType, number>
    );

    return (
        <div className="flex flex-col gap-4 mb-6">
            <h3 className="text-lg font-bold">
                🧾 나의 가계부
            </h3>

            {/* 입력 영역 */}
            <div className="flex flex-row gap-2">
                <select
                    value={category}
                    onChange={e =>
                        setCategory(
                            e.target.value as CategoryType
                        )
                    }
                    className="p-2 border rounded-lg"
                >
                    <option value="food">식비</option>
                    <option value="traffic">교통</option>
                    <option value="shopping">쇼핑</option>
                </select>

                <input
                    value={amount}
                    onChange={e =>
                        setAmount(e.target.value)
                    }
                    placeholder="금액을 입력하세요"
                    className="px-3 py-2 border rounded-lg"
                />

                <input
                    value={text}
                    onChange={e =>
                        setText(e.target.value)
                    }
                    placeholder="항목을 입력하세요"
                    className="px-3 py-2 border rounded-lg"
                />

                <button
                    onClick={handleSubmit}
                    className="flex flex-row items-center gap-1 px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                    <Plus size={18} />
                    추가
                </button>
            </div>

            {/* 전체 지출 */}
            <div className="py-2 border-t border-zinc-200">
                <p className="text-lg font-bold">
                    전체 지출:{' '}
                    {totalAmount.toLocaleString()}원
                </p>
            </div>

            {/* 필터 */}
            <div className="flex gap-2 pt-1">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => setFilterCategory(option.value)}
                        className={`px-3 py-2 border rounded-lg ${
                            filterCategory === option.value
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-zinc-700'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* 카테고리별 지출 */}
            <div className="grid grid-cols-3 gap-3">
                {categories.map(category => {
                    const info = categoryInfo[category];
                    const amount = categoryTotal[category] || 0;

                    return (
                        <div 
                            key={category}
                            className="p-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-base">
                                    {info.icon}
                                </div>
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                    {info.name}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    {amount.toLocaleString()}
                                </span>
                                <span className="text-xs text-zinc-500 ml-0.5">원</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 지출 목록 */}
            <ul className="flex flex-col gap-2">
                {filteredList.map(item => (
                    <li
                        key={item.id}
                        className="px-4 py-3 bg-zinc-50 border rounded-lg flex items-center justify-between gap-4"
                    >
                        {/* 내용 영역 */}
                        <div className="flex items-center justify-between flex-1 gap-4 min-w-0">
                            <div className="flex items-center gap-2 min-w-[100px] flex-shrink-0">
                                <span>{categoryInfo[item.category].icon}</span>
                                <span className="text-sm font-medium text-zinc-500">
                                    {categoryInfo[item.category].name}
                                </span>
                            </div>

                            {/* 타이틀 / 수정 input */}
                            <div className="flex-1 min-w-0">
                                {editId !== item.id ? (
                                    <div className="text-zinc-800 dark:text-zinc-100 font-medium truncate">
                                        {item.title}
                                    </div>
                                ) : (
                                    <input 
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full px-2 py-1 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                )}
                            </div>          

                            {/* 금액 / 금액 수정 input */}
                            <div className="w-28 text-right flex-shrink-0">
                                {editId !== item.id ? (
                                    <div className="font-bold text-zinc-900 dark:text-white">
                                        {item.amount.toLocaleString()}원
                                    </div>
                                ) : (
                                    <input 
                                        type="text"
                                        value={editAmount}
                                        onChange={(e) => setEditAmount(e.target.value)}
                                        className="w-full px-2 py-1 text-sm text-right bg-white dark:bg-zinc-800 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                )}
                            </div>        
                        </div>

                        {/* 버튼 영역 */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {editId === item.id ? (
                                <button
                                    onClick={() => handleSave()}
                                    className="px-3 py-1 text-sm text-white bg-green-500 rounded"
                                >
                                    저장
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded"
                                >
                                    수정
                                </button>
                            )}

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
