'use client';

import { useState } from 'react';

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
  onEdit: (id: number, title: string) => void;
}

export default function PostItem ({ post, onDetail, onDelete, onEdit }: PostItemProps) { 
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);

    const handleSave = () => {
        setIsEditing(false);
        onEdit(post.id, editTitle); 
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    return (
        <li className="mb-4 flex items-center justify-between p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm">
           <div
                className="font-semibold cursor-pointer flex-1 mr-4 text-zinc-800 dark:text-zinc-200"
                onClick={() => onDetail(post.id)}
            >
                {post.id}.&nbsp;

                {isEditing ? (
                    <input 
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full mt-1 px-3 py-1.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <span>{post.title}</span>
                )}
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
                {isEditing ? (
                    <button 
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 active:scale-95 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSave();
                        }}
                    >
                        저장
                    </button>
                ) : (
                    <button 
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:scale-95 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                    >
                        수정
                    </button>
                )}
                
                <button 
                    className="px-2.5 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 active:scale-95 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(post.id);
                    }}
                >
                    삭제
                </button>
            </div>
        </li>
    );
}
