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
}

export default function PostItem ( {post, onDetail} :PostItemProps) {
    return (
        <li className="mb-4">
            <div
                className="font-semibold cursor-pointer"
                onClick={() => onDetail(post.id)}
            >
                {post.id}. {post.title}
            </div>
        </li>
    );
}