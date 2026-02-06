import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: t.about.step1.title,
      description: t.about.step1.description,
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Cpu,
      title: t.about.step2.title,
      description: t.about.step2.description,
      color: 'bg-accent/20 text-accent-foreground',
    },
    {
      icon: Lightbulb,
      title: t.about.step3.title,
      description: t.about.step3.description,
      color: 'bg-success/10 text-success',
    },
    {
      icon: MessageSquare,
      title: t.about.step4.title,
      description: t.about.step4.description,
      color: 'bg-info/10 text-info',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.about.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.about.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-8 md:space-y-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center z-10 relative`}>
                        <step.icon className="h-7 w-7" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link to="/plant-disease">
                <Button size="lg" className="group">
                  Get Started Now
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our machine learning models are trained on thousands of images from Indian farms, 
                ensuring accurate detection for local crop varieties and soil types.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { value: '50,000+', label: 'Training Images' },
                { value: '95%', label: 'Accuracy Rate' },
                { value: '100+', label: 'Disease Types' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
