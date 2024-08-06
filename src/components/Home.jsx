// src/components/Home.js

import React, { useState } from 'react';
import ImageConverter from './ImageConverter';
import TipCard from './TipCard';
import DimmableContainer from './DimmableContainer';
import SEOIcon from '../assets/icons/seoicon.svg';
import CompressionIcon from '../assets/icons/compressionicon.svg';
import OptimizedIcon from '../assets/icons/optimizedicon.svg';
import WebflowIcon from '../assets/icons/webflow.svg';
import WixIcon from '../assets/icons/wix.svg';
import WordPressIcon from '../assets/icons/wordpress.svg';
import FramerIcon from '../assets/icons/framer.svg';
import ShopifyIcon from '../assets/icons/shopify.svg';
import SquarespaceIcon from '../assets/icons/squarespace.svg';
import CanvaIcon from '../assets/icons/canva.svg';
import FigmaIcon from '../assets/icons/figma.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import InstagramIcon from '../assets/icons/Instagram.svg';
import TiktokIcon from '../assets/icons/tiktok.svg';

const Home = () => {
  const [processingComplete, setProcessingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const gradientStyle = {
    width: '100%',
    height: '250px',
    background: 'linear-gradient(90deg, rgba(234,85,43,0.05) 0%, rgba(234,85,43,0.5) 20%, rgba(150,116,230,0.5) 50%, rgba(26,188,254,0.5) 80%, rgba(26,188,254,0.05) 100%)',
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 0,
    opacity: 0.8
  };

  const tips = [
    {
      icon: SEOIcon,
      title: "SEO-Optimized File Names",
      description: "Use concise, keyword-rich file names with hyphens for better SEO and user experience.",
      borderColor: '#EA552B'
    },
    {
      icon: CompressionIcon,
      title: "Efficient File Compression",
      description: "Compress files to under 1MB to ensure quick loading times and optimal web performance.",
      borderColor: '#9674E6'
    },
    {
      icon: OptimizedIcon,
      title: "Optimize for Performance",
      description: "Your image will be optimized for fast loading, high quality, and SEO, boosting your web presence and visibility.",
      borderColor: '#1ABCFE'
    }
  ];

  const iconStyles = [
    { src: WebflowIcon, style: { top: '50%', left: '-25%', width: '100px', height: '100px' } },
    { src: WixIcon, style: { top: '22%', right: '-10%', width: '50px', height: '50px' } },
    { src: WordPressIcon, style: { top: '40%', left: '-48%', width: '80px', height: '80px' } },
    { src: FramerIcon, style: { top: '50%', right: '-20%', width: '80px', height: '80px' } },
    { src: ShopifyIcon, style: { top: '30%', right: '-35%', width: '100px', height: '100px' } },
    { src: SquarespaceIcon, style: { top: '40%', right: '-55%', width: '100px', height: '100px' } },
    { src: CanvaIcon, style: { top: '28%', left: '-10%', transform: 'translateX(-50%)', width: '80px', height: '80px' } },
    { src: FigmaIcon, style: { top: '18%', left: '-30%', transform: 'translateX(-50%)', width: '80px', height: '80px' } },
    { src: FacebookIcon, style: { top: '38%', left: '-20%', transform: 'translateX(-50%)', width: '80px', height: '80px' } },
    { src: InstagramIcon, style: { top: '28%', right: '-20%', transform: 'translateX(-50%)', width: '80px', height: '80px' } },
    { src: TiktokIcon, style: { top: '42%', right: '-30%', transform: 'translateX(-50%)', width: '80px', height: '80px' } },

  ];

  const handleReset = () => {
    setProcessingComplete(false);
    setIsProcessing(false);
  };

  return (
    <div className="flex mt-24 flex-col min-h-screen bg-white relative">
      {!processingComplete && <div className="rounded-3xl" style={gradientStyle}></div>}

      {!processingComplete && (
        <DimmableContainer dim={isProcessing}>
          {iconStyles.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt="Decorative Icon"
              className="absolute z-10"
              style={{ ...icon.style, opacity: 0.7 }}
            />
          ))}
        </DimmableContainer>
      )}

      <div className="flex-grow flex flex-col items-center justify-start pt-12 relative z-20">
        {!processingComplete && (
          <header className="text-center mb-8">
            <h1 className="text-5xl md:text-5xl font-bold text-[#1e1e1e]">
              Streamline Your Images
            </h1>
            <p className="text-base md:text-2xl text-[#1e1e1e] mt-4">
              The easiest way to convert files to WebP
            </p>
          </header>
        )}

        <div className="relative z-20">
          <ImageConverter 
            onProcessingComplete={() => setProcessingComplete(true)} 
            setIsProcessing={setIsProcessing}
          />
        </div>
      </div>

      {!processingComplete && (
        <DimmableContainer dim={isProcessing}>
          <div
            className="absolute bottom-[80px] left-1/2 transform -translate-x-1/2 flex justify-center items-end"
            style={{ gap: '80px', marginBottom: '48px' }}
          >
            {tips.map((tip) => (
              <TipCard
                key={tip.title}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
                borderColor={tip.borderColor}
              />
            ))}
          </div>
        </DimmableContainer>
      )}
    </div>
  );
};

export default Home;
