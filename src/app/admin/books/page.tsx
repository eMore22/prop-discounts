"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Link as LinkIcon, Plus, Edit, Trash2, Save, X, AlertCircle, CheckCircle } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  coverImage: string;
  amazonLink: string;
  price: string;
  pages: number;
  publishDate: string;
  rating?: number;
  reviews?: number;
  category: string;
  asin?: string;
}

export default function BooksAdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [amazonUrl, setAmazonUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [bookData, setBookData] = useState<Partial<Book>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    checkAuth();
    loadBooks();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const fetchBookData = async () => {
    if (!amazonUrl.trim()) {
      setFetchError('Please enter an Amazon URL');
      return;
    }

    setFetching(true);
    setFetchError('');

    try {
      const response = await fetch('/api/books/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amazonUrl: amazonUrl.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch book data');
      }

      const data = await response.json();
      
      setBookData({
        title: data.title,
        author: data.author,
        description: data.description,
        coverImage: data.coverImage,
        amazonLink: amazonUrl.trim(),
        price: data.price,
        pages: parseInt(data.pages) || 0,
        publishDate: data.publishDate || new Date().toISOString().split('T')[0],
        rating: parseFloat(data.rating) || 0,
        reviews: parseInt(data.reviews) || 0,
        category: 'Trading Education',
        asin: data.asin,
        id: data.asin || Date.now().toString()
      });

      setMessage({ type: 'success', text: 'Book data fetched successfully! Review and save below.' });
      
    } catch (error: any) {
      setFetchError(error.message || 'Failed to fetch book data');
      setMessage({ type: 'error', text: 'Could not fetch book data. You can enter manually below.' });
    } finally {
      setFetching(false);
    }
  };

  const handleSaveBook = async () => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) throw new Error('Failed to save book');

      setMessage({ type: 'success', text: 'Book saved successfully!' });
      setIsAdding(false);
      setAmazonUrl('');
      setBookData({});
      loadBooks();
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save book' });
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete book');

      setMessage({ type: 'success', text: 'Book deleted successfully!' });
      loadBooks();
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete book' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Manage Books</h1>
              <p className="text-xl text-blue-100">Add books from Amazon automatically</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                : 'bg-red-50 border-2 border-red-200 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              )}
              <p className="font-semibold">{message.text}</p>
            </div>
          )}

          {!isAdding && (
            <div className="mb-6">
              <button 
                onClick={() => setIsAdding(true)} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add New Book
              </button>
            </div>
          )}

          {isAdding && (
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Book from Amazon</h2>

              {/* Step 1: Paste Amazon URL */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  Step 1: Paste Amazon Book URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={amazonUrl}
                    onChange={(e) => setAmazonUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/XXXXXXXXXX"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                  <button
                    onClick={fetchBookData}
                    disabled={fetching}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      fetching 
                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {fetching ? 'Fetching...' : 'Fetch Data'}
                  </button>
                </div>
                {fetchError && (
                  <p className="text-sm text-red-600 mt-2">{fetchError}</p>
                )}
              </div>

              {/* Step 2: Review/Edit Book Data */}
              {Object.keys(bookData).length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Review & Edit Book Details</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={bookData.title || ''}
                        onChange={(e) => setBookData({...bookData, title: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                      <input
                        type="text"
                        value={bookData.author || ''}
                        onChange={(e) => setBookData({...bookData, author: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                      <input
                        type="text"
                        value={bookData.price || ''}
                        onChange={(e) => setBookData({...bookData, price: e.target.value})}
                        placeholder="$19.99"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
                      <input
                        type="number"
                        value={bookData.pages || ''}
                        onChange={(e) => setBookData({...bookData, pages: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        value={bookData.description || ''}
                        onChange={(e) => setBookData({...bookData, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveBook}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Save className="w-5 h-5" />
                      Save Book
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setAmazonUrl('');
                        setBookData({});
                      }}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Books List */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h3 className="text-2xl font-bold text-white">Your Books ({books.length})</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {books.map((book) => (
                <div key={book.id} className="p-6 hover:bg-blue-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg p-4 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{book.title}</h4>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{book.price}</span>
                          <span>•</span>
                          <span>{book.pages} pages</span>
                          {book.rating && (
                            <>
                              <span>•</span>
                              <span>★ {book.rating}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {books.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No books added yet</p>
                <p className="text-gray-500">Click "Add New Book" to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}