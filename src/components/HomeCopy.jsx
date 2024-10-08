import React, { useState } from 'react';
import ImageConverter from './ImageConverter';
import TipCard from './TipCard';
import DimmableContainer from './DimmableContainer';
import SwipeableTipCards from './SwipeableTipCards';
import VideoResetScreen from './VideoResetScreen';

// Import your icons here
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
  const [showVideoReset, setShowVideoReset] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  const tips = [
    {
      icon: SEOIcon,
      title: 'SEO-Optimized File Names',
      description: 'Use concise, keyword-rich file names with hyphens for better SEO and user experience.',
      borderColor: '#EA552B',
    },
    {
      icon: CompressionIcon,
      title: 'Efficient File Compression',
      description: 'Compress files to under 1MB to ensure quick loading times and optimal web performance.',
      borderColor: '#9674E6',
    },
    {
      icon: OptimizedIcon,
      title: 'Optimize for Performance',
      description:
        'Your image will be optimized for fast loading, high quality, and SEO, boosting your web presence and visibility.',
      borderColor: '#1ABCFE',
    },
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
    setShowVideoReset(true);
    setProcessingComplete(false);
    setIsProcessing(false);
    setHeaderVisible(false); // Hide the header when showing the video reset screen
  };

  const handleVideoEnd = () => {
    setShowVideoReset(false);
    setHeaderVisible(true); // Show the header once the video ends
  };

  return (
    <div className="flex mt-24 flex-col min-h-screen bg-white relative">
      {headerVisible && !processingComplete && !showVideoReset && (
        <div
          className="md:rounded-3xl w-full h-[200px] md:h-[250px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(234,85,43,0.05) 0%, rgba(234,85,43,0.5) 20%, rgba(150,116,230,0.5) 50%, rgba(26,188,254,0.5) 80%, rgba(26,188,254,0.05) 100%)',
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 0,
            opacity: 0.8,
          }}
        ></div>
      )}

      {headerVisible && !processingComplete && !showVideoReset && (
        <DimmableContainer dim={isProcessing}>
          {iconStyles.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt="Decorative Icon"
              className="hidden md:flex absolute z-10"
              style={{ ...icon.style, opacity: 0.7 }}
            />
          ))}
        </DimmableContainer>
      )}

      <div className="flex-grow flex flex-col items-center justify-start pt-2 md:pt-12 relative z-20">
        {headerVisible && !processingComplete && !showVideoReset && (
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e]">
              <span className="block md:inline">Streamline</span>
              <span className="block md:hidden">Your Images</span>
            </h1>
            <p className="text-base md:text-2xl text-[#1e1e1e] mt-4">The easiest way to convert files to WebP</p>
          </header>
        )}

        <div className="relative z-20 mb-4"> {/* Added margin-bottom for spacing */}
          {!showVideoReset ? (
            <ImageConverter
              onProcessingComplete={() => setProcessingComplete(true)}
              setIsProcessing={setIsProcessing}
              onReset={handleReset} // Pass handleReset to the ImageConverter
            />
          ) : (
            <VideoResetScreen onVideoEnd={handleVideoEnd} hideHeader={setHeaderVisible} />
          )}
        </div>

        {/* Mobile Tip Cards */}
        {headerVisible && !processingComplete && !showVideoReset && (
          <div className="md:hidden w-full">
            <SwipeableTipCards tips={tips} />
          </div>
        )}
      </div>

      {headerVisible && !processingComplete && !showVideoReset && (
        <DimmableContainer dim={isProcessing}>
          <div
            className="hidden md:flex absolute bottom-[80px] left-1/2 transform -translate-x-1/2 flex justify-center items-end"
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
