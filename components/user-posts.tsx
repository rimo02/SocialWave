"use client"
import { Post } from '@/lib/model/post'
import React, { useEffect, useState } from 'react'
import PostCard from './post-card'


const UserPost = (id: string) => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/posts?id=${id}`)
        const json = await res.json();
        setPosts(json.data)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
      }
    }
    fetchPosts();
  }, [id])


  return (
    <div className='p-3 grid grid-cols-1 md:grid-cols-2 xlg:grid-cols-3'>
      {posts.map((post, idx) => {
        return (
          <div
            key={post._id || idx}
          >
            <PostCard post={post} />
          </div>
        );
      })}
    </div>
  );
}

export default UserPost