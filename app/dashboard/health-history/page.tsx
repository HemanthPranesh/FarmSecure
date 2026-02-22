'use client';

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
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const chartData = [
  { date: "Apr '24", score: 75 },
  { date: "May '24", score: 80 },
  { date: "Jun '24", score: 88 },
  { date: "Jul '24", score: 92 },
];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const historyData = [
  {
    date: '2024-07-28',
    score: 92,
    recommendation:
      'Excellent work! Maintain current protocols and consider reviewing your pest control effectiveness.',
  },
  {
    date: '2024-06-25',
    score: 88,
    recommendation:
      'Good progress. Focus on ensuring all staff are consistently using footbaths.',
  },
  {
    date: '2024-05-22',
    score: 80,
    recommendation:
      'A solid baseline. Improve visitor log enforcement and quarantine protocols.',
  },
  {
    date: '2024-04-19',
    score: 75,
    recommendation: 'Good start. Ensure equipment is disinfected more regularly.',
  },
];

export default function HealthHistoryPage() {
  const { t } = useLanguage();

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {t('healthScoreTrend')}
          </CardTitle>
          <CardDescription>
            Your farm's biosecurity health score over the last few months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            {t('checklistHistory')}
          </CardTitle>
          <CardDescription>
            A log of all your past checklist submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('score')}</TableHead>
                <TableHead className="text-right">
                  {t('recommendation')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((item) => (
                <TableRow key={item.date}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.score}%</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      {t('view')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
