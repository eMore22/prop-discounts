"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, ExternalLink, CheckCircle, ShoppingCart, Award, Calendar, FileText } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  cover_image?: string;
  amazon_link: string;
  price: string;
  pages: number;
  publish_date: string;
  rating?: number;
  reviews?: number;
  category: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Trading Books & Resources | Prop Firm Discounts';
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Trading Books</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Coming soon! Check back for our trading education resources.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const featuredBook = books[0];
  const otherBooks = books.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Trading Books & Resources</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Master prop trading with our comprehensive guides
            </p>
          </div>
        </div>
      </section>

      {/* Featured Book */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Book Cover */}
            <div className="relative">
              {featuredBook.cover_image ? (
                <img 
                  src={featuredBook.cover_image} 
                  alt={featuredBook.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              ) : (
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                  <div className="text-center text-white">
                    <BookOpen className="w-32 h-32 mx-auto mb-4" />
                    <p className="text-2xl font-bold">{featuredBook.title}</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Award className="w-5 h-5" />
                FEATURED
              </div>
            </div>

            {/* Book Details */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {featuredBook.title}
              </h2>
              {featuredBook.subtitle && (
                <p className="text-xl text-gray-600 mb-4">{featuredBook.subtitle}</p>
              )}
              
              {featuredBook.rating && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(featuredBook.rating!)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {featuredBook.rating} ({featuredBook.reviews} reviews)
                  </span>
                </div>
              )}

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {featuredBook.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-blue-600">{featuredBook.price}</div>
                <div className="text-gray-500">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    {featuredBook.pages} pages
                  </div>
                  {featuredBook.publish_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredBook.publish_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>

              <a
                href={featuredBook.amazon_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy on Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Books */}
      {otherBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Books</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                {book.cover_image ? (
                  <img src={book.cover_image} alt={book.title} className="w-full h-64 object-cover" />
                ) : (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 flex items-center justify-center h-64">
                    <BookOpen className="w-20 h-20 text-white" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{book.price}</div>
                  
                  <a
                    href={book.amazon_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy on Amazon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}