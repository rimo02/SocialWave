"use client"
import CreatePostForm from '@/components/create-post';
import Feed from '@/components/feed';
import ProfileCard from '@/components/profile-card';
import SuggestedUsers from '@/components/suggested-users';
import { SafeUser } from '@/lib/model/user';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const { data: session } = useSession();
    const [currentUser, setCurrentUser] = useState<SafeUser>();

    useEffect(() => {
        if (!session?.user.username) return;

        const fetchUser = async () => {
            const res = await fetch(`/api/users/${session?.user?.username}`, {
                cache: 'no-store',
            });

            if (res.ok) {
                const data = await res.json();
                setCurrentUser(data);
            }
        }
        fetchUser();
    }, [session?.user?.username])

    if (session?.user?.id) {
    }

    return (
        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='col-span-1 md:col-span-2 space-y-6 py-2 h-screen'>
                <CreatePostForm />
                <Feed />
            </div>
            <div className='hidden md:block space-y-6'>
                {currentUser && <ProfileCard user={currentUser} />}
                {currentUser && <SuggestedUsers />}
            </div>
        </div>
    );
};

export default Home;
