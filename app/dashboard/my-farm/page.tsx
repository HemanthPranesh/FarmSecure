'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';

const farmDetailsSchema = z.object({
  farmType: z.string().min(1, 'Please select a farm type.'),
  livestockCount: z.coerce
    .number()
    .int()
    .min(0, 'Livestock count must be a positive number.'),
});

type FarmDetailsFormValues = z.infer<typeof farmDetailsSchema>;

export default function MyFarmPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FarmDetailsFormValues>({
    resolver: zodResolver(farmDetailsSchema),
    defaultValues: {
      farmType: 'poultry',
      livestockCount: 100,
    },
  });

  async function onSubmit(data: FarmDetailsFormValues) {
    setIsSubmitting(true);
    console.log('Submitting farm details:', data);
    // Here you would typically save the data to a database.
    // We'll simulate it with a delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Farm Details Saved',
      description: 'Your farm information has been updated successfully.',
    });
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl">
          <Home /> My Farm
        </CardTitle>
        <CardDescription>
          Manage your farm's details here. This information helps in providing
          tailored recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="farmType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a farm type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="pig">Pig</SelectItem>
                      <SelectItem value="cattle">Cattle</SelectItem>
                      <SelectItem value="sheep_goat">Sheep/Goat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="livestockCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Livestock</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
