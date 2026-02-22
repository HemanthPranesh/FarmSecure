'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  GraduationCap,
  HeartPulse,
  Menu,
  Tractor,
  User,
  Settings,
  LogOut,
  Globe,
  ShieldAlert,
  Home,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { languages, useLanguage } from '@/contexts/LanguageContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
  { href: '/dashboard/my-farm', icon: Home, label: 'myFarm' },
  { href: '/dashboard/checklist', icon: ClipboardList, label: 'checklist' },
  { href: '/dashboard/chatbot', icon: MessageSquare, label: 'chatbot' },
  { href: '/dashboard/training', icon: GraduationCap, label: 'training' },
  {
    href: '/dashboard/health-history',
    icon: HeartPulse,
    label: 'healthHistory',
  },
  {
    href: '/dashboard/community',
    icon: ShieldAlert,
    label: 'community',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguage();
  const farmerAvatar = PlaceHolderImages.find((p) => p.id === 'farmer-avatar');

  const handleLanguageChange = (langCode: string) => {
    const selectedLang = languages.find((l) => l.code === langCode);
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  };

  const sidebarContent = (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === href
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground'
          }`}
        >
          <Icon className="h-4 w-4" />
          {t(label)}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Tractor className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">{t('appName')}</span>
            </Link>
          </div>
          <div className="flex-1">{sidebarContent}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Tractor className="h-6 w-6 text-primary" />
                  <span className="font-headline text-xl">{t('appName')}</span>
                </Link>
              </div>
              <div className="mt-4">{sidebarContent}</div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <div className="mr-4">
            <Select onValueChange={handleLanguageChange} value={language.code}>
              <SelectTrigger className="w-32">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  {farmerAvatar && (
                    <AvatarImage
                      src={farmerAvatar.imageUrl}
                      alt={farmerAvatar.description}
                      data-ai-hint={farmerAvatar.imageHint}
                    />
                  )}
                  <AvatarFallback>F</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                {t('profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                {t('settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
