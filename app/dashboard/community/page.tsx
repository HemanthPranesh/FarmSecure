'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldAlert } from 'lucide-react';

const communityAlerts = [
  {
    id: 'alert1',
    title: 'Avian Influenza Outbreak in Maharashtra',
    date: '2024-08-01',
    content:
      'A new strain of Avian Influenza (H5N1) has been reported in poultry farms across several districts in Maharashtra. Farmers are advised to increase biosecurity measures, monitor their flocks for any signs of illness, and report any suspected cases to the local veterinary authorities immediately. Avoid contact between wild birds and domestic poultry.',
    severity: 'High',
  },
  {
    id: 'alert2',
    title: 'New Lumpy Skin Disease (LSD) Variant Detected',
    date: '2024-07-25',
    content:
      'A new variant of Lumpy Skin Disease has been identified in cattle in parts of Uttar Pradesh. The new strain shows higher transmissibility. Vaccination is highly recommended. Please consult your local vet for the new vaccine protocol.',
    severity: 'Medium',
  },
  {
    id: 'alert3',
    title: 'Foot-and-Mouth Disease (FMD) Vaccination Campaign',
    date: '2024-07-20',
    content:
      'The government is launching a district-wide FMD vaccination campaign starting August 15th. Ensure all your livestock are registered and available for vaccination. This is a crucial step in preventing FMD outbreaks in our region.',
    severity: 'Low',
  },
  {
    id: 'alert4',
    title: 'Reminder: Disinfection Protocols for Farm Vehicles',
    date: '2024-07-18',
    content:
      'This is a reminder to all farmers to strictly adhere to disinfection protocols for all vehicles entering and leaving the farm premises. This is a simple but effective measure to prevent the spread of various pathogens.',
    severity: 'Low',
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <ShieldAlert className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold">{t('community')}</h1>
          <p className="text-muted-foreground">
            {t('communityChannelDescription')}
          </p>
        </div>
      </header>
      <div className="space-y-4">
        {communityAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="font-headline text-xl">
                  {alert.title}
                </CardTitle>
                {getSeverityBadge(alert.severity)}
              </div>
              <CardDescription>{`Posted on: ${alert.date}`}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{alert.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
