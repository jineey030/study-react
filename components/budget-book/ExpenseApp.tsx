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

export default function ExpenseApp() {
    // 입력용 카테고리
    const [category, setCategory] = useState<CategoryType>('food');

    // 필터용 카테고리
    const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');

    const [amount, setAmount] = useState('');
    const [text, setText] = useState('');

    const [list, setList] = useState<Expense[]>([]);

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
            <div className="py-4 border-t border-zinc-200">
                <p className="text-lg font-bold">
                    전체 지출:{' '}
                    {totalAmount.toLocaleString()}원
                </p>
            </div>

            {/* 지출 목록 */}
            <ul className="flex flex-col gap-2">
                {filteredList.map(item => (
                    <li
                        key={item.id}
                        className="px-4 py-3 bg-zinc-50 border rounded-lg flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <span>
                                {categoryInfo[item.category].icon}
                            </span>

                            <span>
                                {categoryInfo[item.category].name}
                            </span>

                            <span>
                                {item.title}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span>
                                {item.amount.toLocaleString()}원
                            </span>

                            <button
                                onClick={() =>
                                    handleDelete(item.id)
                                }
                                className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 필터 */}
            <div className="flex gap-2 pt-3">
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
        </div>
    );
}
