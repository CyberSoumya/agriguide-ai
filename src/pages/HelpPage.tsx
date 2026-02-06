import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const HelpPage = () => {
  const { t } = useLanguage();

  const faqs = [
    { question: t.help.faq.q1, answer: t.help.faq.a1 },
    { question: t.help.faq.q2, answer: t.help.faq.a2 },
    { question: t.help.faq.q3, answer: t.help.faq.a3 },
    { question: t.help.faq.q4, answer: t.help.faq.a4 },
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <HelpCircle className="h-4 w-4" />
                Support
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.help.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.help.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.help.faq.title}
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-border rounded-xl px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t.help.contact.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.help.contact.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  {t.help.contact.call}
                </Button>
                <Button size="lg" variant="outline" className="group">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t.help.contact.whatsapp}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Additional Help */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-primary/5 border border-primary/20"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Video Tutorials
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Watch step-by-step guides on how to use all features of the app
                </p>
                <Button variant="outline" size="sm">
                  Watch Videos
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-accent/10 border border-accent/30"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Community Forum
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other farmers and share your experiences
                </p>
                <Button variant="outline" size="sm">
                  Join Community
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
