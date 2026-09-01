export interface ProductType {
    id: string;
    name: string;
    price: number;
}

export interface CartType {
    id: string;
    qty: number;
}

export const products: ProductType[] = [
    {
        id: 'a1',
        name: '신발',
        price: 25000
    }, {
        id: 'a2',
        name: '옷',
        price: 12000
    }, {
        id: 'a3',
        name: '가방',
        price: 46000
    }
];

interface ProductProps {
    onAddCart(id: string): void;
}

export default function Product( { onAddCart } : ProductProps){
    return (
        <ul className="flex flex-col gap-2">
            {products.map((product) => 
                <li 
                key={product.id}
                className="px-4 py-2.5 text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm flex items-center justify-between gap-3"
                >
                    <div className="flex items-center gap-3">
                        <span>
                            {product.name} ({product.price}원)
                        </span>
                    </div>
                    <button 
                        onClick={() => onAddCart(product.id)}
                        className="px-4 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg active:scale-95 transition shadow-sm"
                        >
                        + 장바구니 담기
                    </button>
                </li>
            )}
        </ul>
    );
}