'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle } from 'lucide-react';

const trainingMaterials = [
  {
    id: 'tm1',
    title: 'Proper Handwashing Techniques',
    description: 'A video guide to reduce pathogen spread on your farm.',
    type: 'video',
    imageId: 'training-clean-hands',
  },
  {
    id: 'tm2',
    title: 'Equipment Disinfection',
    description: 'Learn how to properly clean and disinfect your farm equipment.',
    type: 'video',
    imageId: 'training-disinfection',
  },
  {
    id: 'tm3',
    title: 'New Animal Quarantine',
    description:
      'Best practices for quarantining new animals to prevent disease introduction.',
    type: 'article',
    imageId: 'training-quarantine',
  },
  {
    id: 'tm4',
    title: 'Visitor Protocols',
    description: 'Managing visitors on your farm to minimize biosecurity risks.',
    type: 'article',
    imageId: 'training-visitors',
  },
];

export default function TrainingPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold">
          {t('welcomeToTraining')}
        </h1>
        <p className="text-muted-foreground">{t('trainingDescription')}</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {trainingMaterials.map((material) => {
          const image = PlaceHolderImages.find(
            (p) => p.id === material.imageId
          );
          return (
            <Card key={material.id} className="overflow-hidden">
              <CardHeader className="p-0">
                {image && (
                  <div className="relative aspect-video">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                    {material.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle className="h-16 w-16 text-white/80" />
                      </div>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline mb-2 text-xl">
                  {material.title}
                </CardTitle>
                <CardDescription>{material.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {material.type === 'video' ? 'Watch Video' : 'Read Article'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
