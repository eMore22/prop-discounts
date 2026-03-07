"use client";
// src/app/admin/books/page.tsx
// Books are now managed directly in the main admin dashboard under the Books tab.
// This page redirects there automatically.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminBooksRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Redirecting to Admin Dashboard...</p>
      </div>
    </div>
  );
}