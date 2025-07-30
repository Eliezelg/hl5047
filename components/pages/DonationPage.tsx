'use client';

import { useEffect, useState } from 'react';
import { Heart, Sparkles, Flame } from 'lucide-react';
import ImageCarousel from '../ImageCarousel';
import Image from 'next/image';

const DonationOption = ({ amount, link, image }: { amount: string; link: string; image: string }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6"
  >
    <div className="flex items-center gap-8">
      <div className="relative w-48 h-48 flex-shrink-0">
        <Image
          src={image}
          alt={amount}
          fill
          style={{ objectFit: 'contain' }}
          loading="eager"
          sizes="(max-width: 768px) 192px, 192px"
          quality={85}
        />
      </div>
      <div className="text-right flex-grow">
        <h3 className="text-2xl font-bold text-primary-800">
          שותפות בבנייה של
          <span className="block text-accent-gold mt-2">{amount} ₪ לחודש</span>
        </h3>
        <button className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors mt-4">
          להצטרפות
        </button>
      </div>
    </div>
  </a>
);

const DonationPage = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Charger les images du dossier BinyanCatalog
    const loadImages = async () => {
      try {
        const response = await fetch('/api/getBinyanImages');
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <div>
      {/* Première section : Image principale Binyan2 */}
      <section className="relative w-full h-screen">
        <Image
          src="/BinyanCatalog/binyan02.jpg"
          alt="Binyan"
          fill
          className="object-contain md:object-cover"
          style={{
            objectPosition: 'center 20%'
          }}
          priority
          quality={85}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </section>

      {/* Deuxième section : Contenu avec fond */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/Binyan/hitsonivide.png')",
          }}
        />
        <div className="absolute inset-0 bg-primary-950/40" />

        {/* Contenu */}
        <div className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-8 h-8 text-accent-gold" />
                <h1 className="text-4xl font-bold text-primary-800">מאירים את העולם באור התורה וההלכה</h1>
                <Flame className="w-8 h-8 text-accent-gold" />
              </div>

              <h2 className="text-3xl font-bold text-primary-700 mb-8">
                בוא להיות שותף בזכויות נצח!
              </h2>

              <div className="mb-12">
                <p className="text-xl text-primary-800 mb-4">
                  בהקמת בניין הלכה למעשה
                </p>
                <p className="text-lg text-primary-700">
                  בראשות מורינו הגאון הרב אופיר מלכא שליט"א
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Options de donation */}
                <div className="space-y-6">
                  <DonationOption amount="100" link="https://nedar.im/qJhl" image="/Binyan/bronze.jpg" />
                  <DonationOption amount="200" link="https://nedar.im/aSFR" image="/Binyan/silver.jpg" />
                  <DonationOption amount="400" link="https://nedar.im/SaeD" image="/Binyan/gold.jpg" />
                </div>

                {/* Vidéo */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
                  <video
                    controls
                    className="w-full rounded-lg shadow-lg"
                    poster="/Binyan/hitsonivide.png"
                  >
                    <source src="/Binyan/Binyan.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg">
                <p className="text-lg text-primary-800 font-medium">
                  זכות התורה תגן בעדכם ובעד ביתכם ותזכו לכל מילי דמיטב
                </p>
              </div>

              {/* Carrousel d'images */}
              <div className="mt-12 rounded-xl overflow-hidden shadow-2xl">
                <ImageCarousel images={images} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;