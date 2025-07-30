'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Link from './Link';
import { useEffect, useState } from 'react';
import { Book } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const BookCard = ({ title, imageUrl, price, id }: {
  title: string;
  imageUrl?: string;
  price: string;
  id: string;
}) => (
  <Link href={`/books/${id}`} className="block">
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-primary-200">
      <div className="relative aspect-[3/4] max-h-[250px] w-full flex items-center justify-center bg-white">
        <img 
          src={imageUrl || '/books/default.png'} 
          alt={title} 
          className="max-w-full max-h-full object-contain mx-auto p-2" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <div className="p-3 text-center">
        <h3 className="font-bold text-sm mb-1 text-primary-900 line-clamp-2">{title}</h3>
        <span className="text-sm font-semibold text-primary-700 whitespace-pre-line line-clamp-3">{price}</span>
      </div>
    </div>
  </Link>
);

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Error loading books');
        console.error('Error loading books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !books.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-primary-900">ספרי הרב</h2>
          <Link href="/books" className="text-primary-600 hover:text-primary-700 flex items-center gap-2 text-base font-medium">
            <span>לכל הספרים</span>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="py-4"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCard
                  id={book.id}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  price={book.price || ''}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
            <ChevronRight className="w-6 h-6 text-primary-700" />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
            <ChevronLeft className="w-6 h-6 text-primary-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
