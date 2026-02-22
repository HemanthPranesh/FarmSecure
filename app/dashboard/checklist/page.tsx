'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import {
  getGuidance,
  GuidanceOutput,
} from '@/ai/flows/guidance-based-on-health-score';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const checklistSchema = z.object({
  q1: z.string().min(1, 'Please select an option.'),
  q2: z.string().min(1, 'Please select an option.'),
  q3: z.string().min(1, 'Please select an option.'),
  q4: z.string().min(1, 'Please select an option.'),
  q5: z.string().min(1, 'Please select an option.'),
});

type ChecklistFormValues = z.infer<typeof checklistSchema>;

const questions = [
  { id: 'q1', text: 'Are footbaths at all farm entrances maintained and used?' },
  { id: 'q2', text: 'Is there a logbook for all visitors and vehicles?' },
  { id: 'q3', text: 'Are new animals quarantined for at least 30 days?' },
  {
    id: 'q4',
    text: 'Is farm equipment cleaned and disinfected between uses?',
  },
  { id: 'q5', text: 'Is there a pest control program in place?' },
];

export default function ChecklistPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    recommendation: string;
  } | null>(null);

  const form = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: { q1: '', q2: '', q3: '', q4: '', q5: '' },
  });

  async function onSubmit(data: ChecklistFormValues) {
    setIsSubmitting(true);
    setResult(null);
    try {
      const score = calculateScore(data);
      const answers = { ...data };
      const guidanceResult: GuidanceOutput = await getGuidance({
        healthScore: score,
        answers,
      });

      setResult({
        score: score,
        recommendation: guidanceResult.recommendation,
      });
    } catch (error) {
      console.error('Error getting guidance:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate recommendation. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function calculateScore(data: ChecklistFormValues): number {
    let score = 0;
    const totalQuestions = Object.keys(data).length;
    for (const key in data) {
      if ((data as any)[key] === 'yes') {
        score++;
      }
    }
    return Math.round((score / totalQuestions) * 100);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {t('checklist')}
          </CardTitle>
          <CardDescription>
            Complete this daily biosecurity checklist to assess your farm's
            health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {questions.map((q, index) => (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={q.id as keyof ChecklistFormValues}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">
                        {index + 1}. {q.text}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t('submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Dialog
        open={!!result || isSubmitting}
        onOpenChange={(open) => !open && setResult(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              {t('checklistResult')}
            </DialogTitle>
            <DialogDescription>
              Your biosecurity score and AI-powered recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isSubmitting && !result && (
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p>Calculating score and generating recommendations...</p>
              </div>
            )}
            {result && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-center text-lg font-medium">
                    {t('yourHealthScore')}
                  </h3>
                  <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary bg-primary/10">
                    <span className="text-5xl font-bold text-primary">
                      {result.score}%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    {t('aiGeneratedRec')}
                  </h3>
                  <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                    {result.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
          <Button onClick={() => setResult(null)}>{t('close')}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
