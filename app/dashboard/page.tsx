'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Dashboard() {
  const { t } = useLanguage();
  const trainingImage = PlaceHolderImages.find(
    (p) => p.id === 'training-clean-hands'
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <Card className="sm:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline">
              {t('currentHealthScore')}
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              {t('greatScore')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary bg-primary/10">
              <div className="text-5xl font-bold text-primary">92%</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-headline">{t('quickActions')}</CardTitle>
            <CardDescription>
              Get started with your farm's biosecurity tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/dashboard/checklist">{t('startNewChecklist')}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full">
              <Link href="/dashboard/chatbot">{t('askAiAssistant')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="font-headline">
                {t('upcomingEvents')}
              </CardTitle>
              <CardDescription>
                Upcoming vet visits, vaccinations, and other important events.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                {t('viewAll')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">FMD Vaccination Drive</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      District-wide initiative for Foot-and-Mouth Disease.
                    </div>
                  </TableCell>
                  <TableCell className="text-right">2024-08-15</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Vet Visit</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Scheduled check-up for the new calves.
                    </div>
                  </TableCell>
                  <TableCell className="text-right">2024-08-20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('recentTraining')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center gap-4">
              {trainingImage && (
                <div className="relative h-20 w-20 overflow-hidden rounded-md">
                  <Image
                    src={trainingImage.imageUrl}
                    alt={trainingImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={trainingImage.imageHint}
                  />
                </div>
              )}
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Proper Handwashing Techniques
                </p>
                <p className="text-sm text-muted-foreground">
                  A video guide to reduce pathogen spread.
                </p>
              </div>
            </div>
            <Button asChild size="sm" className="w-full">
              <Link href="/dashboard/training">{t('viewAll')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
