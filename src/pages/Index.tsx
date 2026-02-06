import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Camera, 
  Mountain, 
  MessageSquare, 
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/FeatureCard';
import heroFarm from '@/assets/hero-farm.jpg';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: t.features.disease.title,
      description: t.features.disease.description,
      variant: 'accent' as const,
    },
    {
      icon: Mountain,
      title: t.features.soil.title,
      description: t.features.soil.description,
      variant: 'soil' as const,
    },
    {
      icon: MessageSquare,
      title: t.features.chat.title,
      description: t.features.chat.description,
      variant: 'default' as const,
    },
    {
      icon: Globe,
      title: t.features.multilingual.title,
      description: t.features.multilingual.description,
      variant: 'default' as const,
    },
  ];

  const stats = [
    { value: '50K+', label: 'Farmers Helped' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '100+', label: 'Crop Diseases' },
    { value: '3', label: 'Languages' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={heroFarm} 
              alt="Beautiful farmland" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          
          <div className="container relative py-20 md:py-28 lg:py-36">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4" />
                AI-Powered Smart Farming
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-foreground mb-6"
              >
                {t.hero.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                {t.hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/plant-disease">
                  <Button size="lg" className="w-full sm:w-auto group">
                    <Leaf className="h-5 w-5 mr-2" />
                    {t.hero.ctaDisease}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/soil-prediction">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                    <Mountain className="h-5 w-5 mr-2" />
                    {t.hero.ctaSoil}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle className="h-4 w-4 text-success" />
                {t.hero.trustedBy}
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 left-10 hidden lg:block"
            >
              <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-success" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-20 right-20 hidden lg:block"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                <Mountain className="h-6 w-6 text-accent-foreground" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-foreground mb-4"
              >
                {t.features.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                {t.features.subtitle}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                  variant={feature.variant}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-foreground mb-4">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground mb-8">
                Take a photo of your plant or soil and get instant AI-powered insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/plant-disease">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t.hero.ctaDisease}
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {t.nav.chat}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
