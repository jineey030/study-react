interface LoginProps {
    isLoggedIn: boolean;
    onLogin: (value: boolean) => void;
}

export default function Login ({ isLoggedIn, onLogin }: LoginProps) {

    const handleClick = () => {
        onLogin(!isLoggedIn);
    };

    return (
        <div>
            <button 
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition" 
                onClick={handleClick}
            >
                {isLoggedIn ? "로그아웃" : "로그인"}
            </button>
        </div>
    );
}