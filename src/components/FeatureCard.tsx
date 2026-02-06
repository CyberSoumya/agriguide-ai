import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: 'default' | 'accent' | 'soil';
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  variant = 'default',
}: FeatureCardProps) {
  const variants = {
    default: 'bg-card border-border hover:border-primary/30',
    accent: 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40',
    soil: 'bg-gradient-to-br from-secondary/50 to-card border-secondary hover:border-secondary/80',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    accent: 'bg-accent/20 text-accent-foreground',
    soil: 'bg-secondary text-secondary-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${variants[variant]}`}
    >
      <div className={`inline-flex p-3 rounded-xl mb-4 ${iconVariants[variant]}`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent transform translate-x-8 -translate-y-8 rotate-45" />
      </div>
    </motion.div>
  );
}
