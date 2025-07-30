'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from './Link';

const Hero = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((element, index) => {
      element.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => {
        element.classList.remove('opacity-0', 'translate-y-4');
        element.classList.add('opacity-100', 'translate-y-0');
      }, index * 200);
    });
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/BethMidrash.webp"
          alt="Beth Midrash background"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={85}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-primary-950/40"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-on-load transition-all duration-700 ease-out text-5xl md:text-6xl font-bold text-white mb-8">
            ברוכים הבאים לבית ההוראה
            <span className="animate-on-load block text-primary-300">"הלכה למעשה"</span>
          </h1>
          <div className="animate-on-load flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 ease-out mt-12">
            <Link
              href="/cours"
              className="bg-primary-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-300/50"
            >
              שיעורי הרב להאזנה ישירה ולהורדה
            </Link>
            <a
              href="/questions"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-300/50"
            >
              שאלות ותשובות
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;