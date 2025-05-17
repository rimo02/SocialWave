'use client'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Home,
  Search,
  MessageSquare,
  Bell,
  PlusSquare,
  User,
  Users
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-2 py-6 h-auto",
        active && "font-medium text-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState('Home');

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home" },
    { icon: <Search className="h-5 w-5" />, label: "Explore" },
    { icon: <Bell className="h-5 w-5" />, label: "Notifications" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Messages" },
    { icon: <Users className="h-5 w-5" />, label: "Friends" },
    { icon: <User className="h-5 w-5" />, label: "Profile" },
    { icon: <PlusSquare className="h-5 w-5" />, label: "Create" },
  ];

  return (
    <div className="hidden md:flex md:w-64 lg:w-72 flex-col gap-2 border-r border-border p-4 sticky top-20 h-[calc(100vh-4rem)]">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={currentTab === item.label}
            onClick={() => setCurrentTab(item.label)}
          />
        ))}
      </nav>

      {/* Example floating menu button (uncomment if needed) */}
      {/* 
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 rounded-full text-foreground shadow-lg"
      >
        <Menu className='h-5 w-5' />
      </Button> 
      */}
    </div>
  );
};

export default Sidebar;
