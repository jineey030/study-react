import { type CartType, products } from "@/components/practice/Product"

interface CartProps {
    qty: CartType[];
    onUpCart(id:string): void;
    onDownCart(id:string): void;
}

export default function Cart({ qty, onUpCart, onDownCart }: CartProps) {
    if (qty.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-zinc-400 text-sm">
                장바구니가 비어 있습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                장바구니 목록
            </h3>
            {qty.map((item) => {
                const product = products.find(p => p.id === item.id);
                if (!product) return null;

                return (
                    <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs"
                    >
                        {/* 상품 정보 */}
                        <div className="flex flex-col">
                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                                {product.name}
                            </span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                {product.price.toLocaleString()}원
                            </span>
                        </div>

                        {/* 수량 및 버튼 조작부 */}
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium">
                                <span className="text-zinc-400">수량:</span>
                                <span className="text-zinc-900 dark:text-zinc-100">{item.qty}개</span>
                            </div>

                            <div className="flex gap-1.5">
                                <button 
                                    onClick={() => onUpCart(item.id)} 
                                    className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95 transition"
                                >
                                    +
                                </button>
                                <button 
                                    onClick={() => onDownCart(item.id)} 
                                    className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 active:scale-95 transition"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}