import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Lightbulb, Sun, Target, Image, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImageUploader } from '@/components/ImageUploader';
import { DiseaseResultCard, Severity } from '@/components/DiseaseResultCard';
import { useLanguage } from '@/contexts/LanguageContext';

// Simulated disease results
const mockDiseaseResults = [
  {
    diseaseName: 'Late Blight',
    confidence: 92,
    severity: 'high' as Severity,
    treatment: [
      'Apply copper-based fungicide immediately',
      'Remove and destroy affected leaves',
      'Improve air circulation around plants',
      'Avoid overhead watering',
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Rotate crops every 2-3 years',
      'Apply preventive fungicide during humid weather',
      'Monitor plants regularly for early signs',
    ],
  },
  {
    diseaseName: 'Powdery Mildew',
    confidence: 88,
    severity: 'medium' as Severity,
    treatment: [
      'Spray neem oil solution (2ml per liter)',
      'Apply sulfur-based fungicide',
      'Remove heavily infected leaves',
      'Increase plant spacing',
    ],
    prevention: [
      'Ensure good air circulation',
      'Avoid excessive nitrogen fertilizer',
      'Water at the base, not on leaves',
      'Plant resistant varieties',
    ],
  },
  {
    diseaseName: 'Nitrogen Deficiency',
    confidence: 85,
    severity: 'low' as Severity,
    treatment: [
      'Apply urea fertilizer (30-40 kg/acre)',
      'Use ammonium sulfate for acidic soils',
      'Add organic compost rich in nitrogen',
      'Foliar spray of 2% urea solution',
    ],
    prevention: [
      'Test soil before planting season',
      'Include legumes in crop rotation',
      'Apply balanced NPK fertilizer',
      'Maintain soil organic matter',
    ],
  },
];

const PlantDiseasePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockDiseaseResults[0] | null>(null);

  const handleImageSelect = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockDiseaseResults[Math.floor(Math.random() * mockDiseaseResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleAskAI = () => {
    navigate('/chat', { state: { context: result?.diseaseName } });
  };

  const handleTryAnother = () => {
    setResult(null);
  };

  const tips = [
    { icon: Sun, text: t.disease.tips.tip1 },
    { icon: Target, text: t.disease.tips.tip2 },
    { icon: Image, text: t.disease.tips.tip3 },
    { icon: AlertCircle, text: t.disease.tips.tip4 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <Leaf className="h-4 w-4" />
                AI-Powered Detection
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t.disease.title}
              </h1>
              <p className="text-muted-foreground">
                {t.disease.subtitle}
              </p>
            </motion.div>

            {/* Main Content */}
            {!result ? (
              <div className="space-y-8">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  title={t.disease.uploadTitle}
                  description={t.disease.uploadDescription}
                  hint={t.disease.uploadHint}
                  isAnalyzing={isAnalyzing}
                  analyzingText={t.disease.analyzing}
                />

                {/* Tips */}
                {!isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-xl mx-auto"
                  >
                    <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-accent" />
                        <h3 className="font-semibold text-foreground">{t.disease.tips.title}</h3>
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
                            <tip.icon className="h-4 w-4 text-primary flex-shrink-0" />
                            {tip.text}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <DiseaseResultCard
                diseaseName={result.diseaseName}
                confidence={result.confidence}
                severity={result.severity}
                treatment={result.treatment}
                prevention={result.prevention}
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

export default PlantDiseasePage;
