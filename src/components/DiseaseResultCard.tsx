import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

export type Severity = 'low' | 'medium' | 'high';

interface DiseaseResultCardProps {
  diseaseName: string;
  confidence: number;
  severity: Severity;
  treatment: string[];
  prevention: string[];
  onAskAI: () => void;
  onTryAnother: () => void;
}

export function DiseaseResultCard({
  diseaseName,
  confidence,
  severity,
  treatment,
  prevention,
  onAskAI,
  onTryAnother,
}: DiseaseResultCardProps) {
  const { t } = useLanguage();

  const severityConfig = {
    low: {
      label: t.disease.severityLow,
      icon: CheckCircle,
      className: 'bg-severity-low text-white',
      bgClass: 'bg-severity-low/10',
    },
    medium: {
      label: t.disease.severityMedium,
      icon: AlertTriangle,
      className: 'bg-severity-medium text-accent-foreground',
      bgClass: 'bg-severity-medium/10',
    },
    high: {
      label: t.disease.severityHigh,
      icon: XCircle,
      className: 'bg-severity-high text-white',
      bgClass: 'bg-severity-high/10',
    },
  };

  const config = severityConfig[severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className={`rounded-2xl overflow-hidden border border-border ${config.bgClass}`}>
        {/* Header */}
        <div className="bg-card p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t.disease.diseaseName}
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {diseaseName}
              </h3>
            </div>
            <Badge className={config.className}>
              <SeverityIcon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          
          {/* Confidence Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{t.disease.confidence}</span>
              <span className="font-medium text-foreground">{confidence}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card/50 p-6 space-y-6">
          {/* Treatment */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.disease.treatment}
            </h4>
            <ul className="space-y-2">
              {treatment.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.disease.prevention}
            </h4>
            <ul className="space-y-2">
              {prevention.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card p-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button onClick={onAskAI} className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            {t.disease.askAI}
          </Button>
          <Button onClick={onTryAnother} variant="outline" className="flex-1">
            {t.disease.tryAnother}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
