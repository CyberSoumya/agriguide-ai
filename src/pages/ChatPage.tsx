import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatInterface } from '@/components/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <Bot className="h-4 w-4" />
                AI Assistant
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t.chat.title}
              </h1>
              <p className="text-muted-foreground">
                {t.chat.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ChatInterface />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ChatPage;
