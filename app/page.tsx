'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { languages, useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const { t, language, setLanguage } = useLanguage();
  const loginBg = PlaceHolderImages.find((p) => p.id === 'login-background');

  const handleLanguageChange = (langCode: string) => {
    const selectedLang = languages.find((l) => l.code === langCode);
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt={loginBg.description}
          fill
          className="object-cover opacity-20"
          data-ai-hint={loginBg.imageHint}
          priority
        />
      )}
      <div className="absolute top-4 right-4 z-10">
        <Select onValueChange={handleLanguageChange} value={language.code}>
          <SelectTrigger className="w-40 bg-background/80 backdrop-blur-sm">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <main className="z-10">
        <Card className="w-full max-w-md border-2 border-primary/20 bg-background/80 shadow-2xl backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-5xl font-bold text-primary">
              {t('appName')}
            </CardTitle>
            <CardDescription className="pt-2 text-lg">
              {t('tagline')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-6">
            <Button asChild size="lg" className="font-bold">
              <Link href="/dashboard">{t('farmerLogin')}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-bold">
              <Link href="/dashboard">{t('adminLogin')}</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
