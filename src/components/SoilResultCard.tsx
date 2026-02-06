import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sprout, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface SoilResultCardProps {
  soilType: string;
  characteristics: string;
  waterRetention: 'Low' | 'Medium' | 'High';
  fertility: 'Low' | 'Medium' | 'High';
  recommendedCrops: string[];
  fertilizerTips: string[];
  irrigationTips: string[];
  onAskAI: () => void;
  onTryAnother: () => void;
}

export function SoilResultCard({
  soilType,
  characteristics,
  waterRetention,
  fertility,
  recommendedCrops,
  fertilizerTips,
  irrigationTips,
  onAskAI,
  onTryAnother,
}: SoilResultCardProps) {
  const { t } = useLanguage();

  const levelColors = {
    Low: 'bg-destructive/10 text-destructive',
    Medium: 'bg-warning/10 text-warning',
    High: 'bg-success/10 text-success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-secondary/30 to-card">
        {/* Header */}
        <div className="bg-card p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t.soil.soilType}
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {soilType}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-soil flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg bg-soil-loamy/50" />
            </div>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground">
            {characteristics}
          </p>

          {/* Quick Stats */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4 text-info" />
                <span className="text-xs text-muted-foreground">{t.soil.waterRetention}</span>
              </div>
              <Badge variant="secondary" className={levelColors[waterRetention]}>
                {waterRetention}
              </Badge>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Sprout className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">{t.soil.fertility}</span>
              </div>
              <Badge variant="secondary" className={levelColors[fertility]}>
                {fertility}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Recommended Crops */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">
              {t.soil.recommendedCrops}
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendedCrops.map((crop, index) => (
                <motion.div
                  key={crop}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {crop}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fertilizer Tips */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.soil.fertilizer}
            </h4>
            <ul className="space-y-2">
              {fertilizerTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30"
                >
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Irrigation Tips */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-info" />
              {t.soil.irrigation}
            </h4>
            <ul className="space-y-2">
              {irrigationTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-info/30"
                >
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card p-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button onClick={onAskAI} className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            {t.soil.askAI}
          </Button>
          <Button onClick={onTryAnother} variant="outline" className="flex-1">
            {t.soil.tryAnother}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
