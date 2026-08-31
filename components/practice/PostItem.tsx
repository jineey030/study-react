'use client';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostItemProps {
  post: Post;
  onDetail: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PostItem ( {post, onDetail, onDelete} :PostItemProps) {
    return (
        <li className="mb-4">
            <div
                className="font-semibold cursor-pointer"
                onClick={() => onDetail(post.id)}
            >
                {post.id}. {post.title}
            </div>
            <button 
                    className="px-2.5 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 active:scale-95 transition whitespace-nowrap"
                    onClick={() => onDelete(post.id)}
                >
                삭제</button>
        </li>
    );
}
