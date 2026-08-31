'use client';

import { useState, useEffect } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default function ReqAPI() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("에러 발생:", error);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="게시글 검색"
          className="flex-1 px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm text-sm"
        />
      </div>

      <h1>[게시물 목록]</h1>

      {loading ? (
        <p> 로딩중 ...</p>
      ) : (
        <div>
          <ul>
            {/* slice를 사용해 앞에서부터 visibleCount 개수만큼만 렌더링 */}
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <li key={post.id} className="mb-4">
                <div className="font-semibold">
                  {post.id}. {post.title}
                </div>
                <div className="text-zinc-500 pl-4">
                  {post.body}
                </div>
              </li>
            ))}
          </ul>

          {/* 전체 개수보다 보여주고 있는 개수가 적을 때만 '더보기' 버튼 노출 */}
          {visibleCount < filteredPosts.length && (
            <button 
              onClick={handleLoadMore}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
            >
              더보기 ({visibleCount}/{filteredPosts.length})
            </button>
          )}
        </div>
      )}
    </div>    
  );
}
