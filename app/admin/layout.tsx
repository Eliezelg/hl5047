'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Video, 
  Users, 
  LogOut,
  Building,
  UserSquare2
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('admin_auth');
    router.push('/login');
  };

  const menuItems = [
    { href: '/admin/weekly', label: 'שיעור שבועי', icon: Calendar },
    { href: '/admin/books', label: 'ספרי הרב', icon: BookOpen },
    { href: '/admin/qa', label: 'מאמרים', icon: FileText },
    { href: '/admin/distributors', label: 'מפיצים', icon: Users },
    { href: '/admin/rabbis', label: 'רבנים', icon: UserSquare2 },
  ];

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-primary-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">ניהול האתר</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-3 text-sm hover:bg-primary-700 ${
                  isActive ? 'bg-primary-700' : ''
                }`}
              >
                <Icon className="w-5 h-5 ml-2" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-3 text-sm hover:bg-primary-700 w-full mt-4 text-red-300 hover:text-red-200"
          >
            <LogOut className="w-5 h-5 ml-2" />
            <span>התנתק</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}