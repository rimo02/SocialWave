"use client"
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { SearchIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Input } from './ui/input'
import ToggleTheme from './toggle-theme'
import { useRouter } from 'next/navigation'
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
    }
    return (
        <header className={cn(
            "sticky top-0 w-full transition-all duration-200 flex justify-between border-b-1 z-50 py-1 pl-3",
            isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
        )}>
            <div className='flex items-center space-x-1'>
                <Link href="/" className='text-2xl font-bold'>
                    <span className='text-primary'>Social</span>
                    <span className='text-accent-foreground'>Wave</span>
                </Link>
            </div>
            <div className='hidden md:flex gap-2 py-3 px-10 items-center'>
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <SearchIcon className='h-8 w-5 mt-0.5 left-8 relative' />
                        <Input
                            placeholder='Search...'
                            className='w-100 pl-11 rounded-2xl'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
                <ToggleTheme />
                {session ? (
                    <div className='flex gap-4 items-center'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className='relative w-8 h-8 rounded-full overflow-hidden cursor-pointer'>
                                    <Image
                                        src={session.user?.image as string}
                                        alt='User image'
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align='start'>
                                <DropdownMenuItem onClick={() => router.push(`/profile/${session?.user?.username}`,)}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <button onClick={() => signIn("google")} className='hover:text-primary cursor-pointer'>
                        Sign In
                    </button>
                )}
            </div>

        </header>
    )
}

export default Header