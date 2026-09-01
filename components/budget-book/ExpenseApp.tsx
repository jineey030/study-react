import { useState } from 'react';
import { Plus } from 'lucide-react';

type CategoryType = 'food' | 'traffic' | 'shopping';
type FilterCategory = 'all' | CategoryType;

type Expense = {
    id: string;
    title: string;
    amount: number;
    category: CategoryType;
    date: string;
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

    const today = new Date().toISOString().split('T')[0];

    const [amount, setAmount] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(today);

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
            date: date
        };

        setList(prevList => [...prevList, newData]);

        // 입력창 초기화
        setText('');
        setAmount('');
        setDate('');
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

    const dateGroups = filteredList.reduce(
        (acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = [];
            }

            acc[item.date].push(item);

            return acc;
        },
        {} as Record<string, Expense[]>
    );

    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');

        return `${year}년 ${month}월 ${day}일`;
    };

    // 데이터
    const categoryTotal = list.reduce(
        (acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
            return acc;
        },
        { food: 0, traffic: 0, shopping: 0 } as Record<CategoryType, number>
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            {/* 제목 */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    🧾 나의 가계부
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                    나의 지출 내역을 한눈에 관리해보세요.
                </p>
            </div>

            {/* 입력 영역 */}
            <div className="p-5 mb-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                <h4 className="mb-4 font-semibold text-zinc-800 dark:text-zinc-100">
                    지출 추가
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* 카테고리 */}
                    <select
                        value={category}
                        onChange={e =>
                            setCategory(
                                e.target.value as CategoryType
                            )
                        }
                        className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
                    >
                        <option value="food">🍚 식비</option>
                        <option value="traffic">🚕 교통</option>
                        <option value="shopping">🛍️ 쇼핑</option>
                    </select>

                    {/* 날짜 */}
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
                    />

                    {/* 금액 */}
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="금액"
                        className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
                    />

                    {/* 항목 */}
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="항목"
                        className="px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
                    />

                    {/* 추가 버튼 */}
                    <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center gap-1 px-4 py-2.5 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition active:scale-95"
                    >
                        <Plus size={18} />
                        추가
                    </button>
                </div>
            </div>

            {/* 전체 지출 */}
            <div className="p-5 mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white shadow-sm">
                <p className="text-sm text-blue-100">
                    전체 지출
                </p>

                <p className="mt-1 text-3xl font-bold">
                    {totalAmount.toLocaleString()}원
                </p>
            </div>

            {/* 필터 */}
            <div className="flex gap-2 mb-5 overflow-x-auto">
                {filterOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() =>
                            setFilterCategory(option.value)
                        }
                        className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition ${
                            filterCategory === option.value
                                ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* 카테고리별 지출 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {categories.map(category => {
                    const info = categoryInfo[category];
                    const amount = categoryTotal[category] || 0;

                    return (
                        <div
                            key={category}
                            className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-9 h-9 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                    {info.icon}
                                </div>

                                <span className="text-sm font-medium text-zinc-500">
                                    {info.name}
                                </span>
                            </div>

                            <p className="mt-3 text-xl font-bold text-zinc-900 dark:text-white">
                                {amount.toLocaleString()}
                                <span className="ml-1 text-sm font-normal text-zinc-500">
                                    원
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 지출 목록 */}
            <div className="flex flex-col gap-6">
                {Object.entries(dateGroups)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([date, items]) => (
                        <section key={date}>
                            {/* 날짜 */}
                            <div className="flex items-center gap-3 mb-3">
                                <h4 className="font-bold text-zinc-800 dark:text-zinc-100">
                                    {formatDate(date)}
                                </h4>

                                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />

                                <span className="text-xs text-zinc-400">
                                    {items.length}건
                                </span>
                            </div>

                            {/* 해당 날짜의 지출 */}
                            <ul className="flex flex-col gap-2">
                                {items.map(item => (
                                    <li
                                        key={item.id}
                                        className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">

                                            {/* 카테고리 */}
                                            <div className="flex items-center gap-2 w-24 flex-shrink-0">
                                                <span className="text-xl">
                                                    {categoryInfo[item.category].icon}
                                                </span>

                                                <span className="text-sm text-zinc-500">
                                                    {categoryInfo[item.category].name}
                                                </span>
                                            </div>

                                            {/* 내용 */}
                                            <div className="flex-1 min-w-0">
                                                {editId === item.id ? (
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={e =>
                                                            setEditText(e.target.value)
                                                        }
                                                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <p className="font-medium text-zinc-800 dark:text-zinc-100 truncate">
                                                        {item.title}
                                                    </p>
                                                )}
                                            </div>

                                            {/* 금액 */}
                                            <div className="w-32 flex-shrink-0 text-right">
                                                {editId === item.id ? (
                                                    <input
                                                        type="number"
                                                        value={editAmount}
                                                        onChange={e =>
                                                            setEditAmount(e.target.value)
                                                        }
                                                        className="w-full px-2 py-2 text-right border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                ) : (
                                                    <p className="font-bold text-zinc-900 dark:text-white">
                                                        {item.amount.toLocaleString()}
                                                        <span className="ml-1 text-xs font-normal text-zinc-500">
                                                            원
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            {/* 버튼 */}
                                            <div className="flex gap-2 flex-shrink-0">
                                                {editId === item.id ? (
                                                    <button
                                                        onClick={handleSave}
                                                        className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                                                    >
                                                        저장
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(item.id)
                                                        }
                                                        className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                                                    >
                                                        수정
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
            </div>

            {/* 데이터가 없을 때 */}
            {list.length === 0 && (
                <div className="py-16 text-center">
                    <div className="text-4xl mb-3">
                        🧾
                    </div>

                    <p className="font-medium text-zinc-600 dark:text-zinc-300">
                        아직 지출 내역이 없습니다.
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">
                        위에서 지출을 추가해보세요.
                    </p>
                </div>
            )}
        </div>
    );
}
