'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from './Link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredMenu(null);
    }, 1000);
    setTimeoutId(id);
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="הלכה למעשה" className="h-24" />
          </Link>
          
          <nav className={`${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-white shadow-lg' : 'hidden'} lg:relative lg:block lg:shadow-none lg:items-center`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-5 p-4 lg:p-0">
              <Link
                href="/shiurim"
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                שיעורי הרב
              </Link>

              <Link 
                href="/books" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                ספרי הרב
              </Link>
              <Link 
                href="/downloads" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
              הורדות
              </Link>
              <Link 
                href="/cours" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                שיעורי אודיו
              </Link>
              <Link 
                href="/rabbis" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                רבני בית ההוראה
              </Link>
              <Link 
                href="/Binyan" 
                className="text-xl font-bold relative overflow-hidden group px-8 py-3 rounded-lg shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-accent-gold-400 to-accent-gold-600 group-hover:bg-gradient-to-l"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-gradient-to-l from-accent-gold-600 to-accent-gold-400 opacity-0 group-hover:opacity-100"></span>
                <span className="relative text-burgundy-900 group-hover:text-burgundy-800">קרן לבניין</span>
              </Link>
              <Link 
                href="/questions" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                שאלות ותשובות
              </Link>
              <Link 
                href="/distributors" 
                className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 block lg:inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                מפיצים
              </Link>
                {/* Sous-menu לוחות ברכות */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('brachot')}
                onMouseLeave={handleMouseLeave}
                onClick={() => isMenuOpen && setHoveredMenu(hoveredMenu === 'brachot' ? null : 'brachot')}
              >
                <button className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 w-full text-right lg:w-auto">
                  לוחות ברכות
                 <span className={`mr-1 transition-transform ${hoveredMenu === 'brachot' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {hoveredMenu === 'brachot' && (
                  <div className="lg:absolute static right-0 mt-2 py-2 lg:w-48 w-full bg-white lg:rounded-lg lg:shadow-xl z-50">

                    <Link
                      href="/luach"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח ברכות
                    </Link>

                    <Link
                      href="/shehecheyanu"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח שהחיינו ותולעים
                    </Link>
                    <Link
                      href="/kelim"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח שהחיינו בגדים וכלים
                    </Link>
                    <Link
                      href="/reach"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח ברכות הריח
                    </Link>
                  </div>
                )}
              </div>

              {/* Sous-menu לוחות שבת */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('shabbat')}
                onMouseLeave={handleMouseLeave}
                onClick={() => isMenuOpen && setHoveredMenu(hoveredMenu === 'shabbat' ? null : 'shabbat')}
              >
                <button className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 w-full text-right lg:w-auto">
                  לוחות שבת
                  <span className={`mr-1 transition-transform ${hoveredMenu === 'shabbat' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {hoveredMenu === 'shabbat' && (
                  <div className="lg:absolute static right-0 mt-2 py-2 lg:w-48 w-full bg-white lg:rounded-lg lg:shadow-xl z-50">

                    <Link
                      href="/muktzeh"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח מוקצה
                    </Link>
                    <Link
                      href="/boneh"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      לוח בונה וסותר ואוהל
                    </Link>
                  </div>
                )}
              </div>

              {/* Sous-menu אודות */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                onClick={() => isMenuOpen && setHoveredMenu(hoveredMenu === 'about' ? null : 'about')}
              >
                <button className="text-burgundy-700 hover:text-burgundy-500 text-[17.5px] py-2 w-full text-right lg:w-auto">
                  אודות
                  <span className={`mr-1 transition-transform ${hoveredMenu === 'about' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {hoveredMenu === 'about' && (
                  <div className="lg:absolute static right-0 mt-2 py-2 lg:w-48 w-full bg-white lg:rounded-lg lg:shadow-xl z-50">
                    <Link
                      href="/about/rav"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      אודות רב בית ההוראה
                    </Link>
                    <Link
                      href="/about/beit-horaah"
                      className="block px-4 py-3 text-burgundy-700 hover:text-burgundy-500 text-[17.5px] hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      אודות בית ההוראה
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.matara.pro/nedarimplus/online/?mosad=7008758"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-burgundy-700 text-white px-6 py-2 rounded-lg hover:bg-burgundy-600 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              תרומה
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;