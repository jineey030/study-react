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
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      if (!response.ok) {
        throw new Error('네트워크 응답이 정상적이지 않습니다.');
      }

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error('에러 발생:', error);
      setError('🚨 게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(search.toLowerCase());
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
      ) : error ? (
        <div className="flex flex-col items-start gap-3">
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
          >
            다시시도
          </button>
        </div>
      ) : (
        <div>
          <ul>
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

          {visibleCount < filteredPosts.length && (
            <button 
              onClick={handleLoadMore}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-300 dark:hover:bg-zinc-600 transition mt-4"
            >
              더보기 ({visibleCount}/{filteredPosts.length})
            </button>
          )}
        </div>
      )}
    </div>    
  );
}