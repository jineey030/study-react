interface LoginProps {
    isLoggedIn: boolean;
    onLogin: (value: boolean) => void;
}

export default function Login ({ isLoggedIn, onLogin }: LoginProps) {
    const handleClick = () => {
        onLogin(!isLoggedIn);
    };

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">인증 관리</h2>
            <div>
                <button 
                    className={`px-4 py-2 font-medium text-white rounded-lg active:scale-95 transition shadow-sm ${
                        isLoggedIn 
                            ? "bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600" 
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={handleClick}
                >
                    {isLoggedIn ? "로그아웃" : "로그인"}
                </button>
            </div>
        </div>
    );
}
