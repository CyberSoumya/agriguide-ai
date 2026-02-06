import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mountain, Lightbulb, Sun, Droplets, Camera } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImageUploader } from '@/components/ImageUploader';
import { SoilResultCard } from '@/components/SoilResultCard';
import { useLanguage } from '@/contexts/LanguageContext';

// Simulated soil results
const mockSoilResults = [
  {
    soilType: 'Alluvial Soil',
    characteristics: 'Rich in potash, phosphoric acid, and lime. Very fertile and suitable for a wide variety of crops. Found in river plains and deltas.',
    waterRetention: 'Medium' as const,
    fertility: 'High' as const,
    recommendedCrops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Maize'],
    fertilizerTips: [
      'Add nitrogen-based fertilizers for leafy crops',
      'Use balanced NPK for vegetable cultivation',
      'Apply organic manure to maintain fertility',
    ],
    irrigationTips: [
      'Regular irrigation needed during dry season',
      'Avoid waterlogging in monsoon',
      'Drip irrigation works well for vegetables',
    ],
  },
  {
    soilType: 'Black Soil',
    characteristics: 'Also called Regur soil. Rich in calcium, potassium, and magnesium. Swells when wet and cracks when dry. Excellent for cotton.',
    waterRetention: 'High' as const,
    fertility: 'High' as const,
    recommendedCrops: ['Cotton', 'Soybean', 'Groundnut', 'Sunflower', 'Chickpea', 'Wheat'],
    fertilizerTips: [
      'Apply phosphatic fertilizers for better yield',
      'Gypsum helps improve soil structure',
      'Use zinc sulfate for groundnut crops',
    ],
    irrigationTips: [
      'Less irrigation needed due to water retention',
      'Ensure proper drainage to prevent waterlogging',
      'Furrow irrigation is most suitable',
    ],
  },
  {
    soilType: 'Sandy Soil',
    characteristics: 'Light, warm, dry soil with low nutrient content. Drains quickly and warms up fast in spring. Good for early vegetable crops.',
    waterRetention: 'Low' as const,
    fertility: 'Low' as const,
    recommendedCrops: ['Watermelon', 'Carrot', 'Potato', 'Groundnut', 'Cucumber', 'Radish'],
    fertilizerTips: [
      'Apply organic matter to improve fertility',
      'Use slow-release fertilizers',
      'Add compost before each planting season',
    ],
    irrigationTips: [
      'Frequent light irrigation required',
      'Drip irrigation is most efficient',
      'Mulching helps retain moisture',
    ],
  },
];

const SoilPredictionPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockSoilResults[0] | null>(null);

  const handleImageSelect = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockSoilResults[Math.floor(Math.random() * mockSoilResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleAskAI = () => {
    navigate('/chat', { state: { context: result?.soilType } });
  };

  const handleTryAnother = () => {
    setResult(null);
  };

  const tips = [
    { icon: Sun, text: 'Take photo in natural daylight' },
    { icon: Droplets, text: 'Use dry soil for accurate analysis' },
    { icon: Camera, text: 'Show soil texture clearly' },
    { icon: Mountain, text: 'Include depth of soil if possible' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mb-4">
                <Mountain className="h-4 w-4" />
                Soil Analysis
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t.soil.title}
              </h1>
              <p className="text-muted-foreground">
                {t.soil.subtitle}
              </p>
            </motion.div>

            {/* Main Content */}
            {!result ? (
              <div className="space-y-8">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  title={t.soil.uploadTitle}
                  description={t.soil.uploadDescription}
                  hint={t.soil.uploadHint}
                  isAnalyzing={isAnalyzing}
                  analyzingText={t.soil.analyzing}
                />

                {/* Tips */}
                {!isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl mx-auto"
                  >
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold text-foreground">Tips for Best Results</h3>
                      </div>
                      <ul className="space-y-3">
                        {tips.map((tip, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center gap-3 text-sm text-muted-foreground"
                          >
                            <tip.icon className="h-4 w-4 text-secondary-foreground flex-shrink-0" />
                            {tip.text}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <SoilResultCard
                soilType={result.soilType}
                characteristics={result.characteristics}
                waterRetention={result.waterRetention}
                fertility={result.fertility}
                recommendedCrops={result.recommendedCrops}
                fertilizerTips={result.fertilizerTips}
                irrigationTips={result.irrigationTips}
                onAskAI={handleAskAI}
                onTryAnother={handleTryAnother}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SoilPredictionPage;
