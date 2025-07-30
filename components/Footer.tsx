'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Youtube } from 'lucide-react';
import Link from './Link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burgundy-700 text-wheat-100 py-8 shadow-inner">
      <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact */}
          <div>
            <h3 className="text-accent-gold-300 text-xl font-bold mb-6">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 hover:text-accent-gold-200 transition-colors">
                <Phone className="w-5 h-5 text-accent-gold-400" />
                <a href="tel:*5047">
                  5047*/
                  מחו"ל 972-79-971-31-55+ 
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-accent-gold-200 transition-colors">
                <Mail className="w-5 h-5 text-accent-gold-400" />
                <a href="mailto:hl50475047@gmail.com">
                  hl50475047@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent-gold-400" />
                <span>ת.ד. 57712 ירושלים </span>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-accent-gold-300 text-xl font-bold mb-6">שעות פעילות בית ההוראה</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold-400" />
                <span>שלוחה 1 24/6</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold-400" />
                <span>שלוחה 2 ממונות 21:00-23:00 <br /> ריבית 16:00-24:00</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold-400" />
                <span>שלוחה 5 (חינוך ילדים) 17:00-22:00</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold-400" />
                <span>שלוחה 6 (שלום בית) 8:00-24:00</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent-gold-400" />
                <span>שלוחה 7 (לשון הרע) 16:00-24:00</span>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-accent-gold-300 text-xl font-bold mb-6">קישורים מהירים</h3>
            <ul className="space-y-3">
              {[
                { href: "/shiurim", label: "שיעורים" },
                { href: "/books", label: "ספרי הרב" },
                { href: "/distributors", label: "מפיצים" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:text-accent-gold-200 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-accent-gold-300 text-xl font-bold mb-6">עקבו אחרינו</h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.youtube.com/channel/UCiT6KgOE1IDJ2XHE23Zk2Cg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent-gold-200 transition-colors"
              >
                <span className="bg-[#FF0000] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </span>
                <span>ערוץ היוטיוב</span>
              </a>
              <a
                href="https://chat.whatsapp.com/EYDrUBp6wdbClEJ7b6IOPX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent-gold-200 transition-colors"
              >
                <span className="bg-[#25D366] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <span>להצטרפות לקבוצת השיעורים</span>
              </a>
              <a
                href="https://chat.whatsapp.com/BvjisrQcPaHIwePCccwP5S"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-accent-gold-200 transition-colors"
              >
                <span className="bg-[#25D366] p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <span>להצטרפות לקבוצת השאלות לבית ההוראה</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-burgundy-600">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-wheat-300">
            <p> {currentYear} הלכה למעשה. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <span>האתר נבנה ועוצב ע"י</span>
        <a href="https://webpro650.co.il" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
          <img src="/webpro-logo.jpg" alt="WebPro Logo" className="h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;